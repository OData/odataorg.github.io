.theme-font{
  color: #dd4814;
}
.navbar-default {
	background-color: #d24714;
}
.jumbotron {
  background-color: transparent;
}
.jumbotron h1{
  color: #dd4814;
}
.jumbotron .p{
  color: black;
}
.carousel {
  margin-bottom: 20px;
}
.carousel img{
  width: 100%;
  max-height: 430px;
  min-height:400px;
  opacity:0.7;
}
.carousel-control {
  width: 50px;
}
.carousel-caption {
  position: absolute;
  margin: 5% -10% 5% -10%;
  max-width: 1200px;
  max-height: 600px;
}

.dropdown-toggle:focus {
  outline:dotted;
}
.st-default-search-input::-webkit-input-placeholder{
	color: #000000 !important; 
}
.st-default-search-input{
	color: #000000 !important; 
}
@media screen and (-ms-high-contrast: black-on-white) {
  .brand
  {
	  background-color: #000000;
  }
}
.btn-default {
    color: #ffffff;
    background-color: #d23714;
    border-color: #d23714;
}
.label-success{
	background-color: #277a33;
}
.brand{
	padding-top: 1px !important;
	padding-bottom: 1px !important;
}
.alert-success {
    background-color: #f1fced;
    border-color: #d6e9c6;
    color: #366b37;
}
.nav-tabs>li.active>a, .nav-tabs>li.active>a:hover, .nav-tabs>li.active>a:focus {
    color: #706f6f;
    background-color: #ffffff;
    border: 1px solid #dddddd;
    border-bottom-color: transparent;
    cursor: default;
}
.nav-pills>li.active>a, .nav-pills>li.active>a:hover, .nav-pills>li.active>a:focus {
    color: #ffffff;
    background-color: #d23714;
}
.btn-primary {
    color: #ffffff;
    background-color: #d23714;
    border-color: #d23714;
}
a {
	color: #d23000;
}
td > a {
	color:#d23000;
}
code {
    padding: 2px 4px;
    font-size: 90%;
    color: #ce3512;
    background-color: #f9f2f4;
    border-radius: 4px;
    overflow-wrap: break-word;
}
.table {
  width: 100%;
  font-size-adjust: auto;
}
#index-guide{
  padding-left: 60px;
  padding-right: 60px;
}

.github-logo{
    float: left;
    max-width: 100px;
    max-height: 100px;
}
.floating-box {
    float: left;
    width: auto;
    height: auto;
    margin: 0px -20px 10px -20px;
    border: 3px solid #dd4814;
}

/* styles for basic tutorails*/
.tutorial-sidebar.affix {
    position: static;
}
.tutorial-sidebar .nav>li>a {
    display: block;
    font-size: 15px;
    font-weight: 500;
    color: #bf3e11;
    padding: 4px 20px;
}
.tutorial-sidebar .nav>li>a:hover, .tutorial-sidebar .nav>li>a:focus {
    padding-left: 19px;
    color: #563d7c;
    text-decoration: none;
    background-color: transparent;
    border-left: 1px solid #563d7c;
}
.tutorial-sidebar .nav>.active>a, .tutorial-sidebar .nav>.active:hover>a, .tutorial-sidebar .nav>.active:focus>a {
    padding-left: 18px;
    font-weight: 700;
    color: #563d7c;
    background-color: transparent;
    border-left: 2px solid #563d7c;
}
.tutorial-sidebar .nav .nav {
    display: none;
    padding-bottom: 10px;
}
.tutorial-sidebar .nav .nav>li>a {
    padding-top: 1px;
    padding-bottom: 1px;
    padding-left: 30px;
    font-size: 14px;
    font-weight: 400;
}
.tutorial-sidebar .nav .nav>li>a:hover, .tutorial-sidebar .nav .nav>li>a:focus {
    padding-left: 29px;
}
.tutorial-sidebar .nav .nav>.active>a, .tutorial-sidebar .nav .nav>.active:hover>a, .tutorial-sidebar .nav .nav>.active:focus>a {
    font-weight: 500;
    padding-left: 28px;
}
.tutorial-sidebar.affix, .tutorial-sidebar.affix-bottom {
    width: 213px;
}
.tutorial-sidebar.affix {
    position: fixed;
}
.tutorial-sidebar.affix-bottom {
    position: absolute;
}
.tutorial-sidebar.affix-bottom .tutorial-sidenav, .tutorial-sidebar.affix .tutorial-sidenav {
    margin-top: 0;
    margin-bottom: 0;
}
.tutorial-sidenav {
    margin-top: 20px;
    margin-bottom: 20px;
}
.dropMenu .skip-nav-elements {
	background:  #bf3e11;
	left: 50px;
	top: 50px;
}

@media (max-width: 991px) {
  .affix {
    position: static;
  	display: block;
  	float:right;
    top: 50%;
  }
}

@media (min-width:992px) {
    .tutorial-sidebar .nav>.active>ul {
    display: block;
	}
}

/* URL styling */
    /* specific for IE10 & 11, they do not support these declarations with "a" or ".wrapped" selector
      also, must use "word-wrap" property rather than "overflow-wrap" */
  
@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
  * {
    word-wrap: break-word;
  }
}

/* for all Edge, does not support these declarations with "a" or ".wrapped" selector, so must use "*" selector */
@supports (-ms-ime-align:auto) {
  * {
    word-wrap: break-word;
    overflow-wrap: break-word;
  }
}
/* all other browsers long url styling */

.wrapped {
  word-wrap:break-word;
  overflow-wrap: break-word;
}

table.reflows{
  width: 100%;
}

table.reflows th{
  text-align: left;
  border-bottom: 1px dashed silver;
}

table.reflows.cell-label {
  display: none;
}

@media screen and (max-width: 640px) {
  table.reflows th {
        display: none;
      }

   table.reflows tr td {
        float: left;
        clear: left;
        display: block;
        width: 100%;
      }

  table.reflows tr td:last-child {
        padding-bottom: 20px;
        border-bottom: 0;
      }

  table.reflows .cell-label {
        display: block;
        float:left;
      }
  table.reflows .cell-content {
        display: block;
        float:right;
      }

  table.reflows tr:nth-child(even) {
        background-color: rgba(255, 255, 255, 0.25);
  }
  table.reflows tr:nth-child(odd) {
        background-color: #F9F9F9;
  }
}

body {
  overflow-x: hidden;
}

[class*='col-'] {
  float: left;
  padding-right: $pad;
  .grid &:last-of-type {
    padding-right: 0;
  }
}
.col-2-3 {
  width: 66.66%;
}
.col-1-3 {
  width: 33.33%;
}
.col-1-2 {
  width: 50%;
}
.col-1-4 {
  width: 25%;
}
.col-1-8 {
  width: 12.5%;
}
.col-1-12 {
  width: 8.33%;
}
.col-3-4 {
  width: 75%;
}
.col-3-8 {
  width: 37.5%;
}

pre {
  border: 1px solid #424242;
}

.modal {
  display: none;
  z-index: 1;
  padding-top: 100px;
  left: 0;
  top: 0;
  background-color: black;
}

.screenshot1Lightbox {
  width: 800;
  height: 490;
  background-color: black;
}

.postcollection {
  margin-left: 20%;
  margin-right: auto;
}

@media screen and (-ms-high-contrast: active) {
     .tab-link { 
      -ms-high-contrast-adjust:none;
      color: white;
  }
}
