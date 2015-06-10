---
layout: page
title: Understand OData in 30 minutes (developers)
date: 2015-06-10 03:44:56.000000000 +08:00
permalink: /getting-started/understand-odata-dev/
---


# What is OData

[OData](http://www.odata.org) -- short for Open Data Protocol, is an open protocol to allow the creation and consumption of **queryable** and **interoperable** RESTful APIs in a simple and standard way.



# What's this article about

One problem for a starter of OData is that [the specification of OData](http://www.odata.org/documentation) covers so much details and developers may easily get lost at the very first time. The goal of this page is to let developers understand OData within 30 minutes and start your journey programming with OData as quick as possible.


# Prerequisites

One of OData's principles is SIMPLICITY, so there is very little prerequisites needed to start your journey with OData. You ONLY need to have the very basic knowledge of :

- **Resources**. The information in your database, the data in your file system are all resources. Normally, resources are stored in some kind of data storage. OData can work with many data storages.
- **Client - Server**. We have resources, and we want resources to be interoperable on the Internet. Servers expose the resources to a certain format and clients consume the resources provided by the servers.
- **HTTP protocol**. Servers and clients communicate data via the HTTP protocol. Client talk to server by **HTTP requests** and servers answer the client by **HTTP responses**.
- **API** (application programming interface). API on Web describes the rules and the expected behavior so that resources can be accessed by clients without a need to understand how it is implemented.




# Starts NOW

To help you understand OData better, we will use a scenario called **TripPin** here. (TripPin is also a live reference service of OData V4, but we make some modification because the live TripPin covers many advanced scenarios). TripPin is for people to manage their trips. We will follow the steps of how to build such a service and how to talk to the service.

![Roadmap](/assets/understand-odata-dev-1.png)

# Step 1. Design the Model

Let's suppose we have already got the data -- information of people and their trips. Then we need to think about how to organize the  resources, in other word, design the model of the service. When talking about designing model, it includes **defining the types of data** and how **resources related to each other**.


## Data Types
First of all, let's focus on the design of `Person`. We want `People` -- a collection of `Person` in the service, which contains all users of TripPin. Each `Person` has properties : `UserName`, `FirstName`, `LastName`, `Emails`, `AddressInfo` and `Gender`.

[**Entity Type**](http://docs.oasis-open.org/odata/odata/v4.0/errata02/os/complete/part1-protocol/odata-v4.0-errata02-os-part1-protocol-complete.html#_Toc406398201). The type `Person` is an entity type in OData. Entity type is named type with a key. The property `UserName` is the key for `Person` in TripPin.

[**Entity Set**](http://docs.oasis-open.org/odata/odata/v4.0/errata02/os/complete/part1-protocol/odata-v4.0-errata02-os-part1-protocol-complete.html#_Toc406398201). The collection `People` is an entity set. Entity set are named collections of entities. In TripPin, `People` is an entity set containing `Person` entities. Conventionally in OData (and most other REST API frameworks), the entity type name is a noun an entity set name is a noun in plural form.

Properties like `UserName`, `FirstName` and others are [**Structured Properties**](http://docs.oasis-open.org/odata/odata/v4.0/errata02/os/complete/part3-csdl/odata-v4.0-errata02-os-part3-csdl-complete.html#_Toc406397941). Properties in OData can be divided into several types, including :

- **Primitive type**. OData defines the most commonly used types like `String`, `Int32`, `DateTimeOffset` and etc. For example, `FirstName` is an primitive properties with type `String`.
- **Complex type** can be seen as entity type without keys. For example, `AddressInfo` is a complex property of type `Location`.
- **Enumeration type** are nominal types that represent a series of related values. For example, `Gender` is a enumeration property of type `PersonGender` contains value `Male`, `Female` and `Unknown`.
- A **collection** of one of the above. For example, the property `Emails` is a collection of primitive types `String` which means one person can have several email addresses.


## Data Relationship
Besides properties listed above, we also need `Trips` -- collection of `Trip` which contains the information of each managed trip in a `Person`. We should have an entity set `Trips` of type `Trip` and `People` should have a way to access the resources `Trips`.

Such relationship are called [**Navigation Properties**](http://docs.oasis-open.org/odata/odata/v4.0/errata02/os/complete/part3-csdl/odata-v4.0-errata02-os-part3-csdl-complete.html#_Toc406397962) in OData. A navigation property allows navigation to related entities which means, by adding `Trips` as a navigation property to `Person`, we can access trips of a person.



# Step 2. Model and Data Representation

Now we have the raw data and the model of the data, we need to let the clients know how to consume the resources.

## Service Document

First of all, we need to let the clients know what resources are available. In OData, a request to the service root will get the **service document** containing all the available top-level resources.

> [Service documents](http://docs.oasis-open.org/odata/odata/v4.0/errata02/os/complete/part1-protocol/odata-v4.0-errata02-os-part1-protocol-complete.html#_Service_Document_Request) enable simple hypermedia-driven clients to enumerate and explore the resources offered by the data service. OData services support returning a service document from the root URL of the service (the service root).

Service document is a MUST of a OData service. In our TripPin service, the service document should look like below shows that resources `People` and `Trips` are available and as well as their types and URLs.

{% highlight javascript %}
{
    "@odata.context": "serviceRoot/$metadata",
    "value": [
        {
            "name": "People",
            "kind": "EntitySet",
            "url": "People"
        },
        {
            "name": "Trips",
            "kind": "EntitySet",
            "url": "Trips"
        }
    ]
}
{% endhighlight %}

## Metadata Document

The service document gives information of available top-level resources, the metadata document provides more, including data types, relationship of resources and etc.

> An OData [Metadata Document](http://docs.oasis-open.org/odata/odata/v4.0/errata02/os/complete/part1-protocol/odata-v4.0-errata02-os-part1-protocol-complete.html#_Metadata_Document_Request) is a representation of the data model that describes the data and operations exposed by an OData service. The Metadata Document URL MUST be the root URL of the service with $metadata appended.

The metadata document is not a MUST in OData, but we highly recommend  users support \$metadata in their OData service. Because most clients need information from \$metadata, so if the goal of the service is interoperability, \$metadata should be implemented in an OData service. In the TripPin service, we show a simplified $metadata file contains information of the data model.

{% highlight xml %}
<?xml version="1.0" encoding="utf-8"?>
<edmx:Edmx Version="4.0"
    xmlns:edmx="http://docs.oasis-open.org/odata/ns/edmx">
    <edmx:DataServices>
        <Schema Namespace="Demo"
            xmlns="http://docs.oasis-open.org/odata/ns/edm">
            <EnumType Name="PersonGender">
                <Member Name="Male" Value="0" />
                <Member Name="Female" Value="1" />
                <Member Name="Unknown" Value="2" />
            </EnumType>
            <EntityType Name="Person" OpenType="true">
                <Key>
                    <PropertyRef Name="UserName" />
                </Key>
                <Property Name="UserName" Type="Edm.String" Nullable="false" />
                <Property Name="FirstName" Type="Edm.String" Nullable="false" />
                <Property Name="LastName" Type="Edm.String" Nullable="false" />
                <Property Name="Emails" Type="Collection(Edm.String)" />
                <Property Name="AddressInfo" Type="Collection(Demo.Location)" />
                <Property Name="Gender" Type="Demo.PersonGender" />
                <NavigationProperty Name="Trips" Type="Collection(Demo.Trip)" />
            </EntityType>

            ...

            <EntityContainer Name="DefaultContainer">
                <EntitySet Name="People" EntityType="Demo.Person">
                    <NavigationPropertyBinding Path="Trips" Target="Trips" />
                </EntitySet>

                ...

            </EntityContainer>
        </Schema>
    </edmx:DataServices>
</edmx:Edmx>
{% endhighlight %}

## Data payload

In OData (V4), the raw data will be represented in [JSON format](http://json.org/) by default. For example, in TripPin, the raw data of a `Person` information looks like below. On the left side of each `:` is the property name (except for "@odata.context" which is a special field for OData) and on the right side is the value of the property.

{% highlight javascript %}
{
    "@odata.context": "serviceRoot/$metadata#People/$entity",
    "UserName": "russellwhyte",
    "FirstName": "Russell",
    "LastName": "Whyte",
    "Emails": [
        "Russell@example.com",
        "Russell@contoso.com"
    ],
    "AddressInfo": [
        {
            "Address": "187 Suffolk Ln.",
            "City": {
                "CountryRegion": "United States",
                "Name": "Boise",
                "Region": "ID"
            }
        }
    ],
    "Gender": "Male"
}
{% endhighlight %}

# Step 3. Design the REST API

We have defined the data model and know how to display the data model to the client, now we need to design the REST API. There are a lot to consider when design an API including how to do CURD, how to do paging, how to define the conventions for the URL and etc. Fortunately, OData has covered almost everything you should consider when designing a REST API.


## Retrieve Data

Now we have the TripPin data model and raw data, how clients know how to retrieve the resources? Don't worry, [OData URL conventions](#) provide details to for client to do so. Below, we list the commonly used conventions. Most of the query options below can be used together for complex logic, you can refer to [OData URL conventions](#) for further instruction. All the requests of retrieving data use HTTP `GET` method.

### Retrieve basic service information

`GET serviceRoot/`  -- return the service document

`GET serviceRoot/$metadata`  -- return the service metadata

### Retrieve top-level resources
`People` is the top-level resources in TripPin, in OData, just put the top level resource name after the service root, then you can get the resources.

`GET serviceRoot/People` -- return `People`


### Retrieve a resource by key
Client also need to get a `Person` with specific keys. To get a particular entity from the entity set in OData, just append a key segment. By default, key segments in OData services are bounded by parens because they may be composite keys, e.g., OrderLine(OrderId=1,LineNumber=1) or alternate keys, e.g., Person(SSN='000-00-0000') and Person(2115) both address the same resource.

`GET serviceRoot/People('russellwhyte')` -- return `Person` whose `UserName` is 'russellwhyte'.

### Retrieve properties

If client just wants to get a property value, for example `Emails` of a person, then you can try

`GET serviceRoot/People('russelwhyte')/Emails` -- return the property, with an object wrapper is returned rather than returning the raw primitive. This is to protect against a [JSON vulnerability](http://haacked.com/archive/2008/11/20/anatomy-of-a-subtle-json-vulnerability.aspx/).

### Filter resources

In most applications, users want to access resources under certain condition. For example, we only want to get people whose UserName contains letter 'e',

`GET serviceRoot/People?$filter=contains(UserName, 'e')` -- return `People` whose `UserName` contains the letter 'e'.

In OData `$filter` is for narrowing the result set and it supports

- [Built-in operations](http://docs.oasis-open.org/odata/odata/v4.0/errata02/os/complete/part1-protocol/odata-v4.0-errata02-os-part1-protocol-complete.html#_Toc406398302) including comparison operations like `eq`, logical operators like `and`, arithmetic operation like `add` and grouping operators.
- [Built-in query functions](http://docs.oasis-open.org/odata/odata/v4.0/errata02/os/complete/part1-protocol/odata-v4.0-errata02-os-part1-protocol-complete.html#_Toc406398303) including string functions like `contains`, date functions including `year`, math functions like `round`, type functions like `cast` and geo functions like `geo.distance`.

### Paging

Paging is a commonly used technology in Web API. There are two types of paging in OData services:

- Server can enable [server-side paging](http://docs.oasis-open.org/odata/odata/v4.0/errata02/os/complete/part1-protocol/odata-v4.0-errata02-os-part1-protocol-complete.html#_Toc406398310), returning nextLinks that client can follow to subsequent pages.
- Clients can drive paging using `$top` and `$skip`. For example,

`GET serviceRoot/People?$top=5` -- return the first 5 people

`GET serviceRoot/People?$skip=5` -- return people from the 6th to the last.

### Projection on properties

Sometimes there are a lot of properties in one entity and we don't want all of them for certain purpose, in OData, client can use `$select` to specify the structural properties and `$expand` to specify navigation properties  to  include in the response,

`GET serviceRoot/People?$select=UserName, Emails` -- return `People` only with properties `UserName` and `Emails`

`GET serviceRoot/People?$expand=Trips` -- return `People` and with navigation property `Trips` inline.

### Sorting

Sorting is another commonly used feature in web services. In OData, query options `$orderby` supports sorting results on specified properties either descending or ascending order.

`GET serviceRoot/People?$orderby=UserName desc`  -- return people in descending order on property UserName

## Editing Data

### Create

To [create a resource](http://docs.oasis-open.org/odata/odata/v4.0/errata02/os/complete/part1-protocol/odata-v4.0-errata02-os-part1-protocol-complete.html#_Toc406398326), send a `POST` to a collection, with OData headers and contents to be created in HTTP request body.

### Update

To [update a resource](http://docs.oasis-open.org/odata/odata/v4.0/errata02/os/complete/part1-protocol/odata-v4.0-errata02-os-part1-protocol-complete.html#_Toc406398329), send a `PATCH` request with the properties you wish to modify. Client can also use `PUT`, but the semantics for `PUT` require all properties to be either sent on the wire or reverted to their default values. So use `PATCH` for updating is recommended.

### Delete

To [remove a resource](http://docs.oasis-open.org/odata/odata/v4.0/errata02/os/complete/part1-protocol/odata-v4.0-errata02-os-part1-protocol-complete.html#_Toc406398331), send an `DELETE` request to the resource URL.

### Custom Operations

The `GET`, `POST`, `PATCH`, `PUT` and `DELETE` can cover most of the needs of a client talking to a RESTful services. But sometimes,  client application may have some complex logic that is not easy to implement using these HTTP verbs. For this scenario, **Operations** in OData can fit the needs.  

For example, clients want an operation to reset all the data. Then in the service we can define an **Action** called Reset, and then client can invoke the action `POST serviceRoot/Reset`. Another example,  for every person, they can have several trips with different airlines, we want an operation to return the airlines taken most by the person. Then we can define a **Function** called GetFavoriteAirline() bounded to the type `Person` and invoke the function `GET serviceRoot/People('usernme')/Namespace.GetFavoriteAirline()`.

In the above examples, we can tell that OData supports two kinds of operations :

- [Functions](http://docs.oasis-open.org/odata/odata/v4.0/errata02/os/complete/part1-protocol/odata-v4.0-errata02-os-part1-protocol-complete.html#_Toc406398351) are operations exposed by an OData service that MUST return data and MUST NOT have side effects, which means functions can only be invoked using `GET`. Functions can be further composed.
- [Actions](http://docs.oasis-open.org/odata/odata/v4.0/errata02/os/complete/part1-protocol/odata-v4.0-errata02-os-part1-protocol-complete.html#_Toc406398355) are operations exposed by an OData service that MAY have side effects and MAY return data. But actions MUST NOT be further composed. In the example above, the action Reset is invoked by `POST` meaning this will modify the data.

Both actions and functions can be bounded to a resource or not. And actions and functions can have parameters, too.


# Step 4. Advanced Scenarios

> OData should build incrementally. A very basic, compliant service should be easy to build, with additional work necessary only to support additional capabilities.

This is a very important principle for OData. Following the three steps above, you should be able to **build a very basic, compliant, service**. In this step, we will introduce the concepts in OData that will allow you to **support additional capabilities**.

## Enrich the Model

The `Trip` entity in the previous TripPin service is quite simple, only contain the information of id and description. In this part, we will see how to enrich the `Trip` model.

### Inheritance
Each trip should contain  a collection of `PlanItem` which contains separate items like flight, meeting, dinner reservation and etc. For simplicity, let's define two kinds of `PlanItem`-- `Flight`(for flight)  and `Event`(for meeting, dinners an etc.). Flight and Event should have some information in common, like id, start time and end time. But they also contain different properties also. Flight should contain information like airline and airports. Event, on the other hand, contains information like the location of the event. That is the common concept **Inheritance** in model design, and yes, OData support inheritance, both for [**Derived Entity Type**](http://docs.oasis-open.org/odata/odata/v4.0/errata02/os/complete/part1-protocol/odata-v4.0-errata02-os-part1-protocol-complete.html#_Toc406398270) and **Derived Complex Type**.

### Dynamic properties
In our design, we use the entity type `Event` to represent all items other than flight. So the problem is that, we cannot predict what properties will be needed. That's when we need **Dynamic Properties** -- properties that can be added dynamically to instances by specifying a unique property name and values. In OData, both entity type and complex type can contain dynamic properties, and we call them **Open Entity Type** and **Open Complex Type**. In the TripPin example, we declare `Event` to be an open type.

### Medias
Nowadays,  trips without pictures can not be complete. So definitely want a property `Photos` in the `Trip`. In OData, we have **Media Entities** and **Stream Properties** both can support photographs.

> A [media entity](http://docs.oasis-open.org/odata/odata/v4.0/errata02/os/complete/part1-protocol/odata-v4.0-errata02-os-part1-protocol-complete.html#_Toc406398336) is an entity that represents an out-of-band stream, such as a photograph. An entity may have one or more [stream properties](http://docs.oasis-open.org/odata/odata/v4.0/errata02/os/complete/part1-protocol/odata-v4.0-errata02-os-part1-protocol-complete.html#_Toc406398340). Stream properties are properties of type Edm.Stream.

## Improve Performance

Let's suppose that we have a TripPin service available and more and more people use that to manage their trips. It's time to consider how to improve the performance.

### Concurrency Control

Since TripPin is having more and more users, it will be quite common that many clients read and edit the same resources at the same time.  This is the well-known concurrency control problem. OData follows [Optimistic concurrency control](http://en.wikipedia.org/wiki/Optimistic_concurrency_control) principle and use the header [`ETag`](http://docs.oasis-open.org/odata/odata/v4.0/errata02/os/complete/part1-protocol/odata-v4.0-errata02-os-part1-protocol-complete.html#_Toc406398321) to support optimistic concurrency control.

### Async

Another performance issue we should consider is that when thousands of clients frequently request resources to the server, how server effectively response to the clients. Maybe the most recommended mechanism in HTTP is supporting asynchronous requests. Synchronous requests means when server receives an request, it will blocking other coming requests until the current request has been handled. OData supports [asynchronous requests](http://docs.oasis-open.org/odata/odata/v4.0/errata02/os/complete/part1-protocol/odata-v4.0-errata02-os-part1-protocol-complete.html#_Toc406398358)

### Delta

Data on the web change a lot. [Delta request](http://docs.oasis-open.org/odata/odata/v4.0/errata02/os/complete/part1-protocol/odata-v4.0-errata02-os-part1-protocol-complete.html#_Toc406398316) makes it possible to only retrieve changed information.

## Extensibility

The model for TripPin is quite complete, but still sometimes we want more extensibility. For example, you may want to constrain certain properties to be read-only ; or you may want the response of certain request to contain information more the just the raw data. In OData, **Annotations** will make this extensibility happen. And the set of annotations defined within a schema comprise a [vocabulary](http://www.odata.org/vacabularies/). There are two kinds of annotations:

- **Metadata annotations**. Metadata annotations can be used to define additional characteristics or capabilities of a metadata element, such as a service, entity type, property, function, action or parameter.
- **Instance annotations**. Instance annotations can be used to define additional information associated with a particular result, entity, property, or error; for example whether a property is read-only for a particular instance.

# Other resources

OData has a prosperous community and a lot of materails you can take advantage to learn OData. Below are most commonly used:

- [OData site](http://www.odata.org)
- [Other getting started tutorials](http://www.odata.org/getting-started)
- [OData specification](http://www.odata.org/documentation)
- [OData libraries](http://www.odata.org/libraries)
- [OData blog](http://www.odata.org/blog)


