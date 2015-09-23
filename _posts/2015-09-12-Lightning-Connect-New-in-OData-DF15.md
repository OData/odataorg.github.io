---
layout: post
title: Latest on OData External Objects from Dreamforce '15
date: 2015-09-21 17:59:43.000000000 +08:00
author: Sumit Sarkar
---

Salesforce introduced support for [Lightning Connect External Objects at Dreamforce '14](http://www.odata.org/blog/salesforce-external-object-integration-using-lightning-connect-with-odata/) powered by OData.  Salesforce's Lightning Connect was initially released as an OData 2.0 read-only consumer.  And new OData functionality is being added in each release based on demand from data hungry Salesforce applications. At Dreamforce '15, I learned about several large organizations running Lightning Connect in production including [Intuit](http://diginomica.com/2015/07/09/how-intuit-integrated-their-user-experience-with-progress/), [Warranty Group](https://success.salesforce.com/ev_sessions#/session/a2q30000001B6ilAAC), [Farmers Insurance](https://success.salesforce.com/ev_sessions#/session/a2q30000001B6ilAAC), to name a few.

For my friends in the OData tribe, this is the most interesting OData consumer among SaaS applications and it's very exciting to track the evolution of its OData support.

#What's the latest on Lightning Connect OData?

##Summer '15
* Doubled limits across:
Maximum HTTP request size for OData (8MB)
Maximum HTTP response size for OData (8MB)
Maximum OData result set size (16MB)
* Access Government and Healthcare Data with OData 2.0 endpoints backed by Socrata Open Data Protocol
* Control Whether to Request Total Row Counts in OData Queries
* Enable Server-Driven Paging for an External Data Source

##Winter '16 (available in sandboxes as of this blog's publish date)
* OData 4.0 support
* Full CRUD support via OData
![Full OData CRUD support](http://docs.releasenotes.salesforce.com/en-us/winter16/release-notes/release_notes/images/external_data_source_writeable_198.png)

[See Release Notes for complete details](http://docs.releasenotes.salesforce.com/en-us/winter16/release-notes/salesforce_release_notes.htm)

These features represent growing adoption and demand for Lightning Connect, and I've worked with many of the organizations driving each one.

#Devzone Recap
The devzone is short for "Developer Zone" at Dreamforce '15 where developers exchange best practices and code.  

##Lightning Connect: Lessons Learned
My devzone session was on [Lightning Connect: Lessons Learned](https://success.salesforce.com/ev_sessions#/session/a2q300000019BHQAA2) based on a contribution to the [Salesforce Developers site](https://developer.salesforce.com/page/Building_a_Data_Integration_Proof_of_Concept_Using_Lightning_Components).  I was really excited with the turnout and engaging questions from the technical audience. Below is a recap of the Q&A:

![Lightning Connect Lessons Learned](/assets/lightningconnectdf15.png)

* Can you write back to external objects?
This feature is currently in beta, and expected to be released in Winter '16.
* Are there free options to produce OData?
The best place to learn more about the OData ecosystem is to visit [www.odata.org/ecosystem/](http://www.odata.org/ecosystem/)
* How does the feature work with very large resources?
When running common use cases for Lightning Connect through [DataDirect Cloud](https://www.progress.com/cloud-data-integration) OData endpoints, we see operators such as filters being efficiently implemented against the backend data source API resulting in fast and scalable performance.  Performance benchmarks are being developed by DataDirect R&D for those interested in specific numbers.

##Lightning Connect roadmap at Progress Software 
This includes OData production using [DataDirect Cloud](https://www.progress.com/cloud-data-integration) across the following sources: 
1. Progress Enterprise Data Warehouse
2. Oracle Marketing Cloud (Eloqua)
3. Google Analytics
4. Sumologic Big Data Analytics

##Other noteworthy sessions related to Lightning Connect around the OData Ecosystem include:

* [How Intuit Implemented Lightning Connect with Progress DataDirect](https://success.salesforce.com/ev_sessions#/session/a2q30000001DZx4AAG)
* [Exploring SQL Server Azure Database Relationships Using Lightning Connect](https://success.salesforce.com/ev_sessions#/session/a2q300000019BFuAAM)
* [Lightning Connect: Unlock Your SAP Back Office with Real Time Integration](https://success.salesforce.com/ev_sessions#/session/a2q30000001BpsdAAC)

#Summary
The OData ecosystem, including [DataDirect Cloud](https://www.progress.com/cloud-data-integration) is expanding to meet the data demands from SaaS applications such as Salesforce.  And I'm really excited about a presentation we're working on for Oracle OpenWorld next month that just might multiple that demand from SaaS applications.  

#Let's Talk:
Sumit Sarkar, Chief Data Evangelist
Progress Software
@SAsInSumit
[www.linkedin.com/in/meetsumit](www.linkedin.com/in/meetsumit)