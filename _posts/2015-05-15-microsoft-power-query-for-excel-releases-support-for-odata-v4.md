---
layout: post
title: 'Microsoft Power Query for Excel Releases Support for OData V4'
author: Mike Pizzo
---

Microsoft is pleased to announce enhanced support for OData V4 in the [latest release](http://www.microsoft.com/en-us/download/details.aspx?id=39379) of Power Query for Excel.

Microsoft Power Query for Excel is an Excel add-in that enhances the self-service Business Intelligence experience in Excel by simplifying data discovery, access and collaboration.

Microsoft Power Query for Excel has supported OData since its first release. The long awaited support for the [OASIS OData V4 Standard](https://www.oasis-open.org/committees/tc_home.php?wg_abbrev=odata) entered private preview earlier this year and was officially released last week. This release addresses customer demand to take advantage of the growing number of services adopting OData V4, and the richer set of functionality available through that standard.

Microsoft Power Query for Excel’s OData V4 support leverages the built-in functionality of the OData service to bring only the relevant data back into Excel. New features of OData V4 such as nested filters allow better query optimization by pushing more predicates to the service where supported.

However, OData services are not required to support advanced query features to work with Microsoft Power Query for Excel. Services need only comply with the basic requirements defined in the [OData V4 Minimal Conformance](http://docs.oasis-open.org/odata/odata/v4.0/errata02/os/complete/part1-protocol/odata-v4.0-errata02-os-part1-protocol-complete.html#_Toc406398370) level. Services are free to support as much or as little query functionality as makes sense for their service. A simple publishing service can expose data in an OData V4 compliant [JSON format](http://docs.oasis-open.org/odata/odata-json-format/v4.0/odata-json-format-v4.0.html), described through [OData V4 metadata](http://docs.oasis-open.org/odata/odata/v4.0/odata-v4.0-part3-csdl.html), and Microsoft Power Query for Excel will read the data and process results locally. More capable services can describe their level of support through the use of the [OData V4 Capabilities Vocabulary](http://docs.oasis-open.org/odata/odata/v4.0/errata02/os/complete/vocabularies/Org.OData.Capabilities.V1.xml), and Microsoft Power Query for Excel will customize the OData query according to the native query capabilities of the service.

With enhanced query functionality and the ability to customize queries according to the service’s capabilities, Microsoft Power Query for Excel’s OData V4 support provides the most efficient standards-compliant protocol for getting cloud data into Excel.