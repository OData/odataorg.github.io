const { test, expect } = require('@playwright/test');
const fs = require('node:fs/promises');
const path = require('node:path');
const { createHash } = require('node:crypto');

for (const cdnAvailable of [true, false]) {
  test(`site interactions with jQuery CDN ${cdnAvailable ? 'available' : 'unavailable'}`, async ({ page, context, request }, testInfo) => {
    const siteRoot = path.resolve(__dirname, '..', process.env.SITE_DIRECTORY || '_site');
    const origin = 'https://odata.test';
    const jqueryPath = '/public/jquery-3.8.0.min.js';
    const jqueryCdn = 'https://code.jquery.com/jquery-3.8.0.min.js';
    const bootstrapUrl = 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js';
    const bootstrapResponse = await request.get(bootstrapUrl, { maxRetries: 3 });
    expect(bootstrapResponse.ok(), 'Download the Bootstrap version used by the site').toBe(true);
    const bootstrap = await bootstrapResponse.body();
    expect(createHash('sha256').update(bootstrap).digest('hex')).toBe('53964478a7c634e8dad34ecc303dd8048d00dce4993906de1bacf67f663486ef');
    await fs.access(path.join(siteRoot, 'index.html'));
    const requests = [];
    const errors = [];
    const knownErrors = [];
    const unexpectedRequests = [];
    page.on('pageerror', error => {
      // The existing screenshot handler dereferences a missing element on Escape.
      if (error.message === "Cannot read properties of null (reading 'style')" && /window\.onkeyup/.test(error.stack || '')) {
        knownErrors.push(error.message);
      } else {
        errors.push(error.message);
      }
    });
    await context.route('**/*', async route => {
      const url = new URL(route.request().url());
      requests.push(url.href);
      if (['image', 'font', 'media'].includes(route.request().resourceType())) {
        return route.fulfill({ status: 204 });
      }
      if (url.href === jqueryCdn) {
        return cdnAvailable ? route.fulfill({ path: path.join(siteRoot, 'public', 'jquery-3.8.0.min.js'), contentType: 'application/javascript' }) : route.abort('failed');
      }
      if (url.href === bootstrapUrl) {
        return route.fulfill({ body: bootstrap, contentType: 'application/javascript' });
      }
      if (url.hostname === 'api.swiftype.com') {
        const callback = url.searchParams.get('callback');
        expect(callback, 'Search requests use JSONP').toBeTruthy();
        const records = Array.from({ length: url.searchParams.get('q') === 'empty' ? 0 : 12 }, (_, index) => ({ id: `result-${index}`, title: `Result ${index + 1}`, sections: ['Documentation'], url: `${origin}/libraries/?result=${index}` }));
        const data = { record_count: records.length, records: { page: records }, info: { page: { num_pages: 1, current_page: 1, total_result_count: records.length } } };
        return route.fulfill({ contentType: 'application/javascript', body: `${callback}(${JSON.stringify(data)});` });
      }
      if (url.origin === origin || url.origin === 'https://www.odata.org') {
        let filename = path.resolve(siteRoot, '.' + decodeURIComponent(url.pathname).split('/').join(path.sep));
        expect(filename === siteRoot || filename.startsWith(siteRoot + path.sep), 'Serve files only from the generated site').toBe(true);
        let body;
        try {
          if ((await fs.stat(filename)).isDirectory()) filename = path.join(filename, 'index.html');
          body = await fs.readFile(filename);
        } catch (error) {
          if (!['ENOENT', 'ENOTDIR'].includes(error.code)) throw error;
          return route.fulfill({ status: 404, body: 'Not found' });
        }
        const contentType = { '.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css' }[path.extname(filename)] || 'application/octet-stream';
        return route.fulfill({ body, contentType });
      }
      if (route.request().resourceType() === 'stylesheet') {
        return route.fulfill({ status: 204 });
      }
      unexpectedRequests.push(`${url.origin}${url.pathname}`);
      return route.abort('blockedbyclient');
    });

    await test.step('load one jQuery version with the expected fallback behavior', async () => {
      expect((await page.goto(origin)).status()).toBe(200);
      await page.waitForFunction(() => window.jQuery && jQuery('#main-search-input').data('swiftype-config-autocomplete'));
      expect(await page.evaluate(() => jQuery.fn.jquery)).toBe('3.8.0');
      expect(requests.filter(url => url === jqueryCdn)).toHaveLength(1);
      expect(requests.filter(url => url === origin + jqueryPath)).toHaveLength(cdnAvailable ? 0 : 1);
      await expect(page.locator('script[src*="jquery-2."], script[src*="jquery-3.0.0"]')).toHaveCount(0);
    });

    await test.step('operate both dropdowns with pointer and keyboard', async () => {
      for (let index = 0; index < 2; index++) {
        const dropdown = page.locator('.dropdown-toggle').nth(index);
        await dropdown.click();
        await expect(dropdown).toHaveAttribute('aria-expanded', 'true');
        await dropdown.click();
        await expect(dropdown).toHaveAttribute('aria-expanded', 'false');
      }
      await page.locator('.dropdown-toggle').first().press('ArrowDown');
      await expect(page.locator('.dropdown').first()).toHaveClass(/open/);
      await page.keyboard.press('Escape');
      await expect(page.locator('.dropdown').first()).not.toHaveClass(/open/);
    });

    await test.step('expand and collapse mobile navigation', async () => {
      await page.setViewportSize({ width: 600, height: 900 });
      await page.locator('.navbar-toggle').click();
      await expect(page.locator('#odata-navbar-collapse')).toHaveClass(/\bin\b/);
      await page.locator('.navbar-toggle').click();
      await expect(page.locator('#odata-navbar-collapse')).not.toHaveClass(/\bin\b|\bcollapsing\b/);
      await page.setViewportSize({ width: 1280, height: 900 });
    });

    await test.step('move the carousel forwards and backwards', async () => {
      await page.evaluate(() => { jQuery('#myCarousel').carousel('pause').carousel(1); });
      await expect(page.locator('#myCarousel .item').nth(1)).toHaveClass(/active/);
      await expect(page.locator('#myCarousel .next')).toHaveCount(0);
      await page.evaluate(() => { jQuery('#myCarousel').carousel(0); });
      await expect(page.locator('#myCarousel .item').first()).toHaveClass(/active/);
    });

    await test.step('render suggestions and support keyboard interaction and empty queries', async () => {
      const input = page.locator('#main-search-input');
      await input.fill('odata');
      await input.press('End');
      await expect(page.locator('.autocomplete-result')).toHaveCount(12);
      await expect(page.locator('.autocomplete-result').first()).toContainText('Result 1');
      await expect(input).toHaveAttribute('aria-expanded', 'true');
      await expect(page.locator('#main-search-instructions')).toBeVisible();
      await input.press('ArrowDown');
      await expect(input).toHaveAttribute('aria-activedescendant', /.+/);
      await input.press('Escape');
      await expect(input).toHaveAttribute('aria-expanded', 'false');
      await input.fill('');
      await input.press('Backspace');
      await expect(page.locator('.autocomplete-result')).toHaveCount(0);
      await Promise.all([
        page.waitForRequest(request => request.url().includes('/suggest.json') && new URL(request.url()).searchParams.get('q') === 'empty'),
        input.fill('empty').then(() => input.press('End'))
      ]);
      await page.waitForFunction(() => jQuery.active === 0);
      await expect(page.locator('.autocomplete-result')).toHaveCount(0);
      expect(await page.evaluate(() => jQuery('#main-search-input').data('swiftype-list').parent().is(':visible'))).toBe(false);
    });

    for (const pathname of ['/libraries/', '/ecosystem/', '/documentation/', '/blog/']) {
      await test.step(`render ${pathname} and preserve its interactions`, async () => {
        expect((await page.goto(origin + pathname)).status()).toBe(200);
        await page.waitForFunction(() => window.jQuery && jQuery('#main-search-input').data('swiftype-config-autocomplete'));
        expect(await page.evaluate(() => jQuery.fn.jquery)).toBe('3.8.0');
        expect((await page.locator('main').innerText()).trim().length).toBeGreaterThan(100);
        if (pathname === '/libraries/') {
          await page.locator('[role=tab]').nth(1).click();
          await expect(page.locator('[role=tab]').nth(1)).toHaveAttribute('aria-selected', 'true');
          await page.locator('[role=tab]').nth(1).press('ArrowRight');
          await expect(page.locator('[role=tab]').nth(2)).toHaveAttribute('aria-selected', 'true');
          await page.setViewportSize({ width: 600, height: 900 });
          await expect(page.locator('b.cell-label').first()).toBeAttached();
          const labelCount = await page.locator('b.cell-label').count();
          await page.setViewportSize({ width: 500, height: 900 });
          await expect(page.locator('b.cell-label')).toHaveCount(labelCount);
          await page.setViewportSize({ width: 1280, height: 900 });
          await expect(page.locator('b.cell-label')).toHaveCount(0);
        }
        if (pathname === '/ecosystem/') {
          await page.locator('a[data-toggle=pill][href="#consumers"]').click();
          await expect(page.locator('#consumers')).toHaveClass(/active/);
          await expect(page.locator('#producers')).not.toHaveClass(/active/);
          await page.locator('a[data-toggle=pill][href="#sdk"]').click();
          await expect(page.locator('#sdk')).toHaveClass(/active/);
        }
      });
    }

    await test.step('submit full-page search requests', async () => {
      await Promise.all([
        page.waitForRequest(request => request.url().includes('/engines/search.json') && new URL(request.url()).searchParams.get('q') === 'odata'),
        page.evaluate(() => { location.hash = 'stq=odata&stp=1'; })
      ]);
      await page.waitForFunction(() => jQuery.active === 0);
    });

    await test.step('serve the updated asset without the old library', async () => {
      expect(await page.evaluate(async () => (await fetch('/public/jquery-3.0.0.min.js')).status)).toBe(404);
      expect(await page.evaluate(async () => (await fetch('/public/jquery-3.8.0.min.js')).status)).toBe(200);
    });

    if (knownErrors.length > 0) {
      testInfo.annotations.push({ type: 'known issue', description: 'The existing screenshot Escape handler assumes #screenshot1 exists.' });
      await testInfo.attach('known-browser-errors', { body: JSON.stringify(knownErrors, null, 2), contentType: 'application/json' });
    }
    expect(unexpectedRequests, 'No unmocked external scripts or production requests').toEqual([]);
    expect(errors, 'No unexpected browser errors').toEqual([]);
  });
}
