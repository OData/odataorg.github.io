# Introduction

This repository is the source code for [www.odata.org](http://www.odata.org) built with Jekyll. Site admins regularly updates the contents to the site.

# Contribution Guide

## Create blogs
OData lovers can write blogs to share their experiences with OData. Blogs will be published at [www.odata.org/blog](http://www.odata.org/blog). To create a blog post :

-  Create a **markdown** file under *_posts* folder. 
- Name the file `yyyy-mm-dd-your-blog-title.md`
- Inside the markdown file, follow the templates:  (If you are not familiar with markdown syntax, please refer to the *Appendix A* section below.
```
---
layout: post
title: your blog title
date: 2010-03-17 17:59:43.000000000 +08:00
author: Name you want to display
---
[Optional]Description of yourself

Contents of your blog post in Markdown syntax
```


- If you want to  add images in your post, please add the image under *assets* folder first and the `src` url should be `/assets/img.png`
- If you want to add code in your post, please refer to the *Appendix B* section below.

- Then create a pull request for your update, we will publish your blog post after a quick review.

## Update ecosystem

Information about ecosystem will be published at http://www.odata.org/ecosystem. Five categories under ecosystem is now available for contribution, including producers,  consumers, live services, sdk (sample-code) and tutorials. 

To create a new item of one category : 

- Create a **markdown** file under *_ecosys/category* folder. 
- Name the file `your-item-title.md`
- Inside the markdown file, follow the templates: 
```
---
layout: default
category: your category
title: your item title 
link:  URL of your item
[for **SDK** category ONLY]download: download link of your item
---
Description of your item
```

## Update libraries

 Information of OData libraries will be published at http://www.odata.org/libraries.
 
 To create a new library: 

- Create a **markdown** file under *_libraries* folder. 
- Name the file `your-item-title.md`
- Inside the markdown file, follow the templates: 
```
---
category: your category
name: your library name
link: possible supported document link of this library
version: supported OData version(s) of this library 
object:  URL of your item
downloads:
	- source: source name1
	  link: download link1
	- source: source name2
	  link: download link2
---
Description of your library
```
The category of the libraries is defined as follows:
```
 net ---> libraries information on the .NET platform
 java ---> libraries information on the Java platform
 javascript ---> libraries information on the JavaScript platform
 cpp ---> libraries information on the C++ platform
 other ---> libraries information on other platforms
``` 

## Other improvements

Other improvements including general site improvement ideas, modifying existing pages, adding new pages and etc, please [create a GitHub issue](https://github.com/ODataOrg/odataorg.github.io/issues) or [create a pull request](https://github.com/ODataOrg/odataorg.github.io/pulls).

# Appendix A: Markdown Syntax

We highly recommend using Markdown to create a blog post. 

> Markdown is a text-to-HTML conversion tool for web writers. Markdown allows you to write using an easy-to-read, easy-to-write plain text format, then convert it to structurally valid XHTML (or HTML).

### Markdown Basics
Markdown is very easy to use, with syntax below, you can write a pretty blog post.
#### Headings
You can create a heading by adding one or more `#` symbols before your heading text. 
```
# h1
## h2
…
###### h6
```
#### Blockquotes
You can indicate blockquotes with a `>`.
```
In the words of Abraham Lincoln:
> Pardon my french
```
#### Styling text
```
*This text will be italic*
**This text will be bold**
```
#### Lists
You can make an **unordered** list by preceding list items with either `*` or `-`
```
* Item
* Item

- Item
- Item
```
You can make an **ordered** list by preceding list items with a number.
```
1. Item 1
2. Item 2
```
#### Code formatting
Use single backtick (`) to format text in a special monospace format. 

You can use triple backticks to format text as its own distinct block.


#### Links
You can create an inline link by wrapping link text in brackets ( [ ] ), and then wrapping the link in parentheses ( ( ) ).
```
[Visit GitHub!](www.github.com)
```
### More if you need
If you need more advanced guidelines, please refer to:

- [Mastering Markdown](https://guides.github.com/features/mastering-markdown/)
- [Daring Fireball: Markdown Syntax Documentation](http://daringfireball.net/projects/markdown)

# Appendix B: Code Formatting

There are two ways to formatting your code in a blog post.

**Markdown coding formatting**
You can use coding format supported in Markdown, use triple backticks to format text as its own distinct block. This is very easy to use, but not support syntax highlighting 

**Jekyll supported code formatting**
Since our site is built with Jekyll, you can also use Jekyll supported code formatting, which supports **syntax highlight**. To render a code block with syntax highlighting, surround your code as follows:
```
{% highlight ruby %}
def foo
  puts 'foo'
end
{% endhighlight %}
```
The argument to the `highlight` tag (`ruby` in the example above) is the language identifier. `ruby` here is a short name, for regually used short names:
- `csharp` for C#
- `javascript` for JavaScript
- `ruby` for Ruby
- `cpp` for C++
- `c` for C
- `java` for Java
- `json` for JSON
- `php` for PHP
- `python` for Python

If the language you used not listed above, please look for the “short name” on the [Pygments’ Lexers page](http://pygments.org/docs/lexers/).
