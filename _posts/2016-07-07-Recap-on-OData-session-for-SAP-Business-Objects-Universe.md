---
layout: post
title: Recap on OData session for SAP Business Objects Universe
date: 2016-07-07 17:59:43.000000000 +08:00
author: Sumit Sarkar
---
The OData road show continues with a stop at SAP Analytics conference, IBIS 2016 in Carlsbad, CA. The previous stop was the [Progress DataDirect Partner Summit in Redwood City, CA](https://www.progress.com/blogs/shifting-the-analytics-industry-at-datadirect-partner-summit) where Michael Pizzo from the OData Technical Committee co-presented with me to talk about OData specification updates and adoption across V2 and V4.x.

For this event, we talked about the future of SAP Business Objects Universes in the context of data connectivity. Starting BO 4.1 SP2, SAP introduced OData support where the Universe semantic layer (UNX) serves as both a producer and consumer.

What this means for analytics professionals is that they can connect their favorite tools across SAP Lumira, Tableau, Spotfire or Microsoft PowerBI to access the Universe in a couple of clicks without having to install any client software. There is a requirement on the server side with BI Platform services for WebApplicationContainerServer and WebIntelligence ProcessingServer. And with support for Generic OData 2.0 Sources for the Universe, there is new potential to access any OData 2.0 endpoint on the backend such as those from the [DataDirect Cloud OData Service](https://www.progress.com/odata).

This is an exciting development for the OData ecosystem and we can expect similar developments in semantic layers from other enterprise platforms across Oracle OBIEE RPD and IBM Cognos FM.

![SAP Analytics OData session](/assets/sap-analytics-odata1.png)

#We had a packed room and great Q&A:
* What limitations are there for OData REST API as a data source?
* Does it support connect live from Tableau?
* When is OData 4.0 supported?
* How would a PowerBI user connecting to the API be seen from a license perspective?
* How much data could be extracted for data visualization before violating the license based on this info? “This API is solely for the purposes of accessing semantic data, so you can’t use the API for mass data/metadata extraction, for bypassing SAP licensing, or for reverse-engineering a Universe.”

* [Download session from Slideshare](http://www.slideshare.net/SumitSarkar10/odata-and-the-future-of-business-objects-universes)
* [Learn more from the SAP Semantic Layer Product Team](bit.ly/odataunx)

#Let's Connect:

Sumit Sarkar, Chief Data Evangelist

Progress Software

@SAsInSumit
