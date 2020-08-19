---
layout: post
title: "OData JavaScript library - o.js explained"
date: 2016-02-22 23:14:00.000000000 +01:00
author: Jan Hommes
---

o.js is a small (minified 14.4 KB) client-side library for requesting data from an OData service. It is designed to run in a browser environment, however it also runs in node.js. In a browser environment it has no dependencies on other libraries and can be used standalone. The main goal of the library is, to provide a simple solution to query OData services from any browser. If you like to use it you can install it via `npm install odata` or just download the o.min.js file from this [GitHub repository](https://github.com/janhommes/o.js) and add it to your webpage in a `<script>`-tag.

In this tutorial I will show you how easy you can use it in your web application and explain to you [the example app](http://www.janhommes.de/o.js/example/). This application using some extended *routing* functionalities of o.js in combination with *knockout.js* to display detailed information about the OData TripPinService, a example service provided by odata.org.

# Getting started with o.js
The installation of o.js is simple. You just need to include the `o.js` file into your page and you are ready to query OData services:
{% highlight html %}
<script src="path/to/o.min.js"></script>
{% endhighlight %}

o.js adds a `o()` function to the global namespace. This function can be used to define a query. It returns a oHandler, which then allows to retrive, change or push data to the service:

{% highlight javascript %}
var oHandler = o('https://services.odata.org/V4/(S(wptr35qf3bz4kb5oatn432ul))/TripPinServiceRW/People');
oHandler.get(function(data) {
    console.log(data); // data of the TripPinService/People endpoint
});
{% endhighlight %}
The example above shows how to get the data from the defined handler with the `get()` function. The `get()`-function accepts an success- and error-callback to get the return of the request. If you prefer to use promise, you can use [q.js](https://github.com/kriskowal/q). The following example shows how to get data from the endpoint and manipulate the result with promise:

{% highlight javascript %}
o('https://services.odata.org/V4/(S(wptr35qf3bz4kb5oatn432ul))/TripPinServiceRW/People(\'Russell Whyte\')').get().then(function(result) {
	result.data.FirstName = 'New Name';
	return(result.save());
}).then(function(result) {
    console.log('First name is now New Name');
});
{% endhighlight %}
If you include q.js you can call the `get()` function without a callback and it returns a promise. The data is then stored in a `o.data` which you can manipulate and save by calling save(). The `save()` itself is used for POST and PUT request to the database and returns a second promise. This way the function above requested a resource, manipulates it and saves the manipulated data back to the service.

As you can see the requested service URL is quite long. If you use o.js to query one endpoint often you can configure o.js to use the same endpoint all the time:
{% highlight javascript %}
o().config({
	endpoint: 'https://services.odata.org/V4/(S(ms4wufavzmwsg3fjo3eqdgak))/TripPinServiceRW/'
});
{% endhighlight %}

From now on you can use only the resource name to query an endpoint. The following example uses the configured endpoint and the `save()` function to POST, PUT and DELETE data to the TripPinService:

{% highlight javascript %}
    o('People').post({
            UserName:name,
            FirstName:'foo',
            LastName:'bar'
    }).save().then(function(result) {
        // Because o.js does not know which key to use, you need to initialize a new handler
        var oHandler = o('People')
            .find(('\'' + result.data.UserName + '\''))
            .patch({ FirstName: 'new name' });
        return(oHandler.save());
    }).then(function(result) {
        result.delete();
        return(result.save());
    }).then(function() {
       console.log('A person was added, modified and deleted.');
    });
{% endhighlight %}
In the promise chain above o.js first adds a new user using `post()` and saves it to the service. When this is promised we initializing a new handler to find the person which was added and modify him with the `patch()` function. Afterwards we delete him from the service by using the `delete()` function.

# Chaining the query
We already used the chained function `find()` to find a specific person. o.js allows multiple functions to detail your query. The `find()` is a special case, because it allows to find a specific resource by the key. But you can also use functions to limit the result. For example you can chain your query with `.skip(2).take(5)` to request only the first 5 rows skipped by the first 2 rows. There are many more chained function and you can find a complete list in the [o.js readme](https://github.com/janhommes/o.js). Mostly you will use the where function to find something:

{% highlight javascript %}
o('People').where('FirstName == "foo"').get(function(data) {
    console.log(data); //all persons where the firstname is "foo"
});
{% endhighlight %}

> Note: o.js automatically maps some basic operations from JavaScript to OData. For complex `where` request, you need to use the OData equivalent (e.g. `FirstName eq "foo"`).

As mentioned you can chain multiple functions to build a query. The following example shows a pagination function which expands the result with the Trip result:
{% highlight javascript %}
function loadNextPage(skip) {
    o('People').expand('Trips').skip(skip).take(5).get(function(data) {
        console.log(data); // 5 People skipped by the function parameter and extended by "Trips"
    });
}
{% endhighlight %}

# Complex pages with routing
o.js has a build in hash-routing functionality. This allows you to map a oHandler to a route. It allows an easy way to display data from a OData service on a Single Page Application. [The o.js example](http://www.janhommes.de/o.js/example/#People) uses the TripPinService, knockout.js and only 70 lines of code to display some useful information from the page.

For the example we will use the `route()` function of o.js and bind the data to the DOM with knockout.js. I will not go in detail of knockout.js. If you want to learn more about knockout, you should try the excellent tutorials on knockoutjs.com.

If you try the example you will see a top navigation point `People`. This is basically a typical html hash-link `<a href="#People">People</a>` which does not change anything. But if we register a o.js route on this hash value, o.js automatically triggers the request to the configured endpoint. Therefore we first configure the endpoint:

{% highlight javascript %}
    // initialize the ko observables
	self.People=ko.observableArray([]);
	self.route=ko.observable('');
	self.detailPeople=ko.observable();
	self.isLoading=ko.observable(false);

	// configure the endpoint and define what to do while loading
	o().config({
		endpoint:'https://services.odata.org/V4/%28S%28wptr35qf3bz4kb5oatn432ul%29%29/TripPinServiceRW/',
		start:function() {
			self.isLoading(true);
		},
		ready:function() {
			self.isLoading(false);
		}
	});
{% endhighlight %}
The start and ready function defines what should be done when the request starts and what to do if the request ends. Here we just set a ko observable to true while the request is processed. We will later bind it to the DOM to display a loading spinner.

> Note: The `self` object is a reference to this. This is usually done in knockout ViewModels-Function. For easier understanding the ViewModel-Function is left out here. You can find the full file [here](https://github.com/janhommes/o.js/blob/master/example/app.js).

Afterwards you can define a route to map to the `#People` hash:
{% highlight javascript %}
o('People').route('People', function(data) {
		self.route('People');
		self.People(data);
});
{% endhighlight %}
The first parameter of the `route` function is a string that maps to the hash. The second parameter is a callback that is triggered as soon as the first parameter and the hash is equal and the request to the OData service is done. When you now click on the top navigation link the callback gets triggered with the Data from the TripPinService. This callback then sets the knockout observable `self.route` to 'People' and adds the data to the observableArray `self.People`. Afterwards you only need to bind the data to your DOM with the knockout `data-bind` property:

{% highlight html %}
<div data-bind="visible:route()==='People'">
	<!-- ko foreach: People -->
		<h4 data-bind="text:FirstName"></h4>
		<h2 data-bind="text:LastName"></h4>
		<a role="button" class="btn btn-primary" data-bind="attr { href:'#People/Detail/'+UserName }">Details</a>
	<!-- /ko -->
  </div>
{% endhighlight %}

The `self.route` parameter is used to handle the visibility of a route. We then bind all the People returned by the OData service with the `ko foreach` statement. In this statement we display the FirstName and LastName property to headings. Also we bind a href hash-link to the route `#People/Detail/ + UserName`. To handle this route we register a second o.js route-handler:

{% highlight javascript %}
o('People').where('UserName == \':0\'').expand('Trips').first().route('People/Detail/:0', function(data) {
		self.route('Detail');
		self.detailPeople(data);
	});
{% endhighlight %}

The added route is a dynamic route. With `:0` the dynamic part of the route is defined. This dynamic part is added to the OData request as soon as the route matches. So for example, if you navigate to the hash `#People/Detail/russellwhyte` the service request the resource `/People/?$format=json&$filter=UserName%20%20eq%20%20%27russellwhyte%27&$expand=Trips&$top=1`. You can add multiple dynamic parts by defining them with `:0`, `:1`, `:2` etc.

As you can see this routing also expands the Trips resource and saves all to the knockout observable `detailPeople`. Therefore we can display the Trips of the person in the details by using the following DOM binding:

{% highlight html %}
<div data-bind="visible:route()==='Detail',with:detailPeople">
    <div class="jumbotron">
        <h1 data-bind="text:FirstName + ' ' + LastName "></h1>
    </div>

	<table class="table table-hover">
		  <tbody>
			<!-- ko foreach: Trips -->
        		<tr>
        			<td data-bind="text:Name"></td>
        			<td data-bind="text:Description"></td>
        		</tr>
			<!-- /ko -->
		</tbody>
    </table>
</div>
{% endhighlight %}
That's all to display people from the TripPin-Example service and their Trips. With the `post`, `put` and `delete` functions, explained in the beginning of this post, you can now add, modify or delete this data. In the full example you can find an example to delete Trips of a user.

One last thing is the loading animation. That is quite easy to do, because we already defined the `self.isLoading` observable. By simply binding this to the DOM we can show a loading spinner to the user:
{% highlight html %}
<div class="loading" data-bind="visible:isLoading()">
	<div class="jumbotron" >
		<img src="img/ajax-loader.gif" alt="Loading ...">
		<p>Loading ...</p>
	</div>
</div>
{% endhighlight %}

# Conclusion
o.js is a simple way to query OData services fast. It allows to add CRUD operations on any OData-Service easily into your page. So everything perfect? Sadly not. o.js is not a complete OData-Solution. It only supports the basic OData functions and is not suitable for complex scenarios. For example the `batch` operation is only supported rudimentary and ETag are not supported. However, if you need a quick request or want to display some OData service on a simple webpage, o.js is the right choice.


Links:

* [o.js on Github](https://github.com/janhommes/o.js)
* [The example souce code](https://github.com/janhommes/o.js/tree/master/example)
* [The example to try it out](http://www.janhommes.de/o.js/example/)
* [The example TripPinService](https://services.odata.org/V4/%28S%28temce5hlnkmezxe0zghrzv4p%29%29/TripPinServiceRW/)
* [Knockout.js](http://www.knockoutjs.com)
