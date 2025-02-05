/*
*   This content is licensed according to the W3C Software License at
*   https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
*/
(function () {
  // need to group them into smaller tab list items

  var tablists = document.querySelectorAll('[role="tablist"]');
  // For easy reference
  var keys = {
    end: 35,
    home: 36,
    left: 37,
    up: 38,
    right: 39,
    down: 40,
    delete: 46,
  };

  // Add or substract depending on key pressed -1 is left or bottom to up while 1 is top to bottom and right
  var direction = {
    37: -1,
    38: -1,
    39: 1,
    40: 1,
  };

  tablists.forEach(tablist => {
      let tabs = [];
      let panels = [];
      let delay = determineDelay();

      generateArrays();

      function generateArrays () {
        tabs.push.apply(tabs, tablist.querySelectorAll('[role="tab"]'));
        panels.push.apply(panels, tablist.parentElement.querySelectorAll('[role="tabpanel"]'));
      };

      // Bind listeners
      for (i = 0; i < tabs.length; ++i) {
        addListeners(i);
      };

      deactivateTabs();
      activateTab(tabs[0]);

      function addListeners (index) {
        tabs[index].addEventListener('keydown', keydownEventListener);

        tabs[index].addEventListener('keyup', keyupEventListener);
        tabs[index].addEventListener('click', clickEventListener);
        tabs[index].index = index;
      };

      // When a tab is clicked, activateTab is fired to activate it
      function clickEventListener (event) {
        var tab = event.target;
        activateTab(tab, true);
      };

      // Handle keydown on tabs
      function keydownEventListener (event) {
        var key = event.keyCode;

        switch (key) {
          case keys.end:
            event.preventDefault();
            // Activate last tab
            activateTab(tabs[tabs.length - 1]);
            break;
          case keys.home:
            event.preventDefault();
            // Activate first tab
            activateTab(tabs[0]);
            break;

          // Up and down are in keydown
          // because we need to prevent page scroll >:)
          case keys.up:
          case keys.down:
            determineOrientation(event);
            break;
        };
      };

      // Handle keyup on tabs
      function keyupEventListener (event) {
        var key = event.keyCode;

        if (key == " " || event.code == "Space" || key == 32  || event.code == "Enter" || key == 13	) {
          event.preventDefault();
          clickEventListener(event);
          return;
        }

        switch (key) {
          case keys.left:
          case keys.right:
            determineOrientation(event);
            break;
          case keys.delete:
            deleteTabIfDeletable(event);
            break;
        };
      };

      // When a tablist's aria-orientation is set to vertical,
      // only up and down arrow should function.
      // In all other cases only left and right arrow function.
      function determineOrientation (event) {
        var key = event.keyCode;
        var vertical = tablist.getAttribute('aria-orientation') == 'vertical';
        var proceed = false;

        if (vertical) {
          if (key === keys.up || key === keys.down) {
            event.preventDefault();
            proceed = true;
          };
        }
        else {
          if (key === keys.left || key === keys.right) {
            proceed = true;
          };
        };

        if (proceed) {
          switchTabOnArrowPress(event);
        };
      };

      // Either focus the next, previous, first, or last tab
      // depending on key pressed
      function switchTabOnArrowPress (event) {
        var pressed = event.keyCode;

        for (x = 0; x < tabs.length; x++) {
          tabs[x].addEventListener('focus', focusEventHandler);
        };

        if (direction[pressed]) {
          var target = event.target;
          if (target.index !== undefined) {
            if (tabs[target.index + direction[pressed]]) {
              tabs[target.index + direction[pressed]].focus();
            }
            else if (pressed === keys.left || pressed === keys.up) {
              focusLastTab();
            }
            else if (pressed === keys.right || pressed == keys.down) {
              focusFirstTab();
            };
          };
        };
      };

      // Activates any given tab panel
      function activateTab (tab, setFocus) {

        setFocus = setFocus || true;
        // Deactivate all other tabs
        deactivateTabs();

        // Remove tabindex attribute
        tab.setAttribute('tabindex', '0');

        // Set the tab as selected
        tab.classList.add('active');
        tab.parentElement.classList.add('active');
        tab.setAttribute('aria-selected', 'true');

        // Get the value of aria-controls (which is an ID)
        var controls = tab.getAttribute('aria-controls');

        // Remove hidden attribute from tab panel to make it visible
        var tabContent = document.getElementById(controls);

        tabContent.removeAttribute('hidden');
        tabContent.setAttribute('tabindex', '0');
        tabContent.setAttribute('aria-hidden', 'false');
        tabContent.classList.add('active');

        // Set focus when required
        if (setFocus) {
          tab.focus();
        };
      };

      // Deactivate all tabs and tab panels
      function deactivateTabs () {
        for (let t = 0; t < tabs.length; t++) {
          tabs[t].setAttribute('tabindex', '-1');
          tabs[t].setAttribute('aria-selected', 'false');
          tabs[t].classList.remove('active');
          tabs[t].parentElement.classList.remove('active');
          tabs[t].removeEventListener('focus', focusEventHandler);
        }

        for (let p = 0; p < panels.length; p++) {
          panels[p].setAttribute('hidden', 'hidden');
          panels[p].setAttribute('tabindex', '-1');
          panels[p].setAttribute('aria-hidden', 'true');
          panels[p].classList.remove('active');
        }
      };

      // Focus the first child
      function focusFirstTab () {
        tabs[0].focus();
      };

      // Focus the last child
      function focusLastTab () {
        tabs[tabs.length - 1].focus();
      };

      // Detect if a tab is deletable
      function deleteTabIfDeletable (event) {
        target = event.target;

        if (target.getAttribute('data-deletable') !== null) {
          // Delete target tab
          deleteTab(event, target);

          // Update arrays related to tabs widget
          generateArrays();

          // Activate the closest tab to the one that was just deleted
          if (target.index - 1 < 0) {
            activateTab(tabs[0]);
          }
          else {
            activateTab(tabs[target.index - 1]);
          };
        };
      };

      // Deletes a tab and its panel
      function deleteTab (event) {
        var target = event.target;
        var panel = document.getElementById(target.getAttribute('aria-controls'));

        target.parentElement.removeChild(target);
        panel.parentElement.removeChild(panel);
      };

      // Determine whether there should be a delay
      // when user navigates with the arrow keys
      function determineDelay () {
        var hasDelay = tablist.hasAttribute('data-delay');
        var delay = 0;

        if (hasDelay) {
          var delayValue = tablist.getAttribute('data-delay');
          if (delayValue) {
            delay = delayValue;
          }
          else {
            // If no value is specified, default to 300ms
            delay = 300;
          };
        };

        return delay;
      };

      //
      function focusEventHandler (event) {
        var target = event.target;

        setTimeout(checkTabFocus, delay, target);
      };

      // Only activate tab on focus if it still has focus after the delay
      function checkTabFocus (target) {
        focused = document.activeElement;

        if (target === focused) {
          activateTab(target, false);
        };
      };
  });
  
}());
