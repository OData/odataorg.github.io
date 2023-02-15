---
layout: post
title: 'Access real-time NetSuite data from Salesforce through Lightning Connect and NetSuite OData feeds.'
date: 2015-06-16
author: Mitch Graw
---

## Lightning Connect to NetSuite External Objects

Salesforce [Lightning Connect](https://www.salesforce.com/platform/services/lightning/) enables Salesforce users to connect to data from OData sources from Salesforce in the same way that users interact with standard Salesforce objects. Through Lightning Connect, Salesforce customers can build real-time analysis from within their Salesforce dashboard and other Salesforce1 apps. In this article we are going to show you how you can enable bi-directional connectivity between NetSuite CRM and ERP data from Salesforce using the [Cloud Drivers from CData Software](https://www.cdata.com/cloud/) to create OData feeds of live NetSuite data.

The [Cloud Drivers](https://www.cdata.com/cloud/) from CData Software are lightweight web applications that proxy live data through standards-based interfaces like ODATA, SOAP, REST, HTML, RSS, ATOM, JSON, XLS, and CSV, making it easily accessible across platforms and devices. The [NetSuite Cloud Driver](https://www.cdata.com/cloud/netsuite) enables you to securely feed NetSuite Leads, Contacts, and Opportunities to Salesforce Lightning Connect.

In this article, we will consume NetSuite objects in Salesforce filter lists. We will also create related lists that show related NetSuite and Salesforce objects. You can follow the same general procedure for connectign to data from any other available Cloud Drivers, including Microsoft Dynamics, QuickBooks, Oracle, Google services, etc.

The NetSuite Cloud Driver makes it easy to work with nontraditional data sources like NetSuite as tables. The tables are intuitive and the underlying OData protocol is transparent. However, the benefits are immediately apparent: OData enables you to see changes to your data in real time.

### See NetSuite as Salesforce Objects

After you have configured Salesforce to connect to the Cloud Driver, you can use NetSuite external objects just as you would standard Salesforce objects. For example, you can create a filter list to search NetSuite invoices from your dashboard:

![Invoices in Salesforce](/assets/cloud-netsuite-salesforce-lightning-connect-3.png)

You can also create a related list to display NetSuite accounts alongside your Salesforce accounts:

![NetSuite Account data in Salesforce](/assets/cloud-netsuite-salesforce-lightning-connect-4.png)

### Set Up the Cloud Driver

The same setup process can be followed for all cloud drivers: deploy, connect, and authorize.

#### Deploy

The cloud driver runs on your own server. On Windows, you can deploy the stand-alone server. On a Java servlet container, drop in the cloud driver WAR file. You can also host the cloud driver in IIS.

#### Connect

After you deploy, provide authentication values and other connection properties. The cloud driver uses authtoken-based authentication and supports the major authentication schemes. The cloud driver also supports SSL.

#### Authorize

After you connect, allow the cloud driver access to each NetSuite table you want to work with.

### Create a NetSuite Lightning Connect Data Source

After the cloud driver is running, follow the steps below to set up Lightning Connect to consume the cloud driver's NetSuite feed.

1. Log into Salesforce and click Setup -> Develop -> External Data Sources.
2. Click New External Data Source.
3. Enter values for the following properties:
    - Label: Enter a label to be used in list views and reports.
    - Name: Enter a unique identifier.
    - Type: Select the option "Lightning Connect: OData 2.0".
    - Server URL: Enter the URL to the cloud driver's OData endpoint. The format of the OData URL is https://_your-server_:8032/api.rsc.

4. In the Authentication section, set the following properties:
    - Identity Type: If all members of your organization will use the same credentials to access the cloud driver, select "Named Principal". If the members of your organization will connect with their own credentials, select "Per User".
    - Authentication Protocol: Select Password Authentication to use HTTP Basic authentication.
    - Certificate: Enter or browse to the certificate to be used to encrypt and authenticate communications from Salesforce to your server.
    - Username: Enter the username for a user known to the cloud driver.
    - Password: Enter the user's authtoken.

![Salesforce External OData source configuration](/assets/cloud-netsuite-salesforce-lightning-connect-1.png)

### Synchronize NetSuite Objects

After you have created the external data source, follow the steps below to create NetSuite external objects that reflect any changes in the data source. You will synchronize the definitions for the NetSuite external objects with the definitions for NetSuite tables.

1. Click the link for the external data source you created.
2. Click Validate and Sync.
3. Select the NetSuite tables you want to work with as external objects.
  
![Validate External Source](/assets/cloud-netsuite-salesforce-lightning-connect-2.png)

### NetSuite as a Database

The [NetSuite Cloud Driver](https://www.cdata.com/cloud/netsuite) enables you to use data access standards like OData to work with NetSuite data as a database, without loading the data into a database. Using the NetSuite Cloud Driver in Salesforce is almost the same as using the SQL Server, Oracle, or MySQL Cloud Drivers. The Cloud Driver abstracts NetSuite entities into normalized tables. This relational view provides data integrity: You can use the cloud driver to provide trusted OData feeds of NetSuite data.

Working with NetSuite transactions and lists is straightforward. To expand the lists of a table into separate tables, simply set the IncludeChildTables connection property to true and reconnect. When you connect, the NetSuite Cloud Driver dynamically obtains the table definitions. In Lightning Connect, you can sync these definitions with external objects.

#### Learn More

More information about Salesforce Lightning integration can be found on the [Salesforce1 Lightning platform page](https://www.salesforce.com/platform/services/lightning/). Learn more about the CData Cloud Drivers online at [www.cdata.com/cloud/](https://www.cdata.com/cloud/).