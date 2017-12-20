---
layout: post
title: OData 4.01 Committee Spec Draft 3
date: 2017-12-18 17:59:43.000000000 +08:00
author: Michael Pizzo
---
The public review of [OData V4.01 Committee Specification Draft 3.0](http://docs.oasis-open.org/odata/odata/v4.01/csprd04/part1-protocol/odata-v4.01-csprd04-part1-protocol.html) concluded this week, marking the next step toward approval of the much anticipated extensions to OData V4.0.

OData v4.01 is a fully compatible extension of the OData V4.0 protocol that adopts many popular conventions, syntax and payload simplifications, and incorporates new functionality.

Some of the major enhancements in OData V4.01 include:

**Model improvements.**
OData V4.01 services can support the following new metadata constructs:

* Edm.Untyped -- For specifying that a property may be any type. Supports representing things outside of the OData data model, such as variant typed properties, mixed collections, or collections of collections.
* Keyless entity types for Singletons -- entity types used as singletons, or singleton navigation properties, no longer need to have a defined key value
* Specialization in Derived Types -- Derived types can restrict properties of a base type to be a subtype of the property's declared type.
* Ordered Collections -- Services can annotate a collection as being "Ordered", and syntax is added for referencing a member of an ordered collection of primitive or complex types for the purposes of retrieval, update, or delete, as well as inserting into a given location within an ordered collection.
* Optional Function Parameters -- Function parameters can be annotated as optional. Optional parameters may be omitted when invoking the function.

**Simplified URL patterns.**
OData V4.01 adds support for simplified URL syntax, including:

* Key as Segment -- Common semantics for representing keys within a URL as a segment, rather than enclosed in parenthesis.
* Query Option Simplification -- Query options are now case-insensitive, and can optionally omit the $ prefix.
* Optional type prefix for Enums, Durations -- Enum and duration values in a Url can be specified without the type prefix.
* Simplified Operations -- Operation names are now case-insensitive, and namespace qualification is optional.

**New Query Features.**
OData V4.01 adds support for new query functionality, including:

* Computed Properties -- Support for projecting computed properties
* Set Operations -- Support for updating/deleting/invoking actions on resources matching a particular criteria 
* New "in" operator -- Expressions containing many OR statements can be simplified with the new "in" operator
* Filtered Count -- $count can be computed on a filtered nested collection
* In-lined stream properties -- Stream properties can be requested inline within a payload
* Delta Update Payloads -- Delta payloads can now be used in updates to submit a set of changes, including nested changes, to a collection

**Simplified OData JSON Payloads.**
OData V4.01 simplifies JSON payloads to look more like custom payloads, including:

* Optional OData Prefix -- OData Prefix may be omitted from control information
* Default Namespaces -- Services can declare default namespaces in order to omit namespace prefixes from instance annotations
* Optionally Omit Null Values -- Clients can specify a preference to reduce payload size by omitting null or default values.
* Improved Async response message -- In OData V4.0, completed async responses were wrapped as an application/http response message. In 4.01, clients can request async responses be returned unwrapped.
* New delta payload representation -- OData V4.01 introduces a simplified representation for delta payloads, including nested delta sets.

**A JSON representation for CSDL Metadata.**
OData V4.01 defines a new JSON representation for CSDL Metadata.

**A JSON representation for Batch payloads.**
OData V4.01 defines a new JSON representation for batch request and response payloads.


For a full description of the new features and conventions, see [What's New in OData V4.01](http://docs.oasis-open.org/odata/new-in-odata/v4.01/new-in-odata-v4.01.html).

Please take a look and send feedback to the [OASIS OData TC](http://www.oasis-open.org/committees/comments/form.php?wg_abbrev=odata).

About the Author
----------------

Michael Pizzo is Co-Chair of the OASIS OData Technical Committee and co-editor of the OASIS Standard documents. He has worked for over 30 years in the design and delivery of data access solutions and APIs at Microsoft as a key designer and driver of Microsoft’s Data Access APIs including ODBC, OLEDB, ADO.NET, ADO.NET Entity Framework, and OData. 

Contact Michael Pizzo:
[www.linkedin.com/in/michaeljpizzo/](https://www.linkedin.com/in/michaeljpizzo/)

Follow on twitter [@michael_pizzo](https://twitter.com/michael_pizzo)