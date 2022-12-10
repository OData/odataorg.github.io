---
layout: post
title: Enterprise Mobile Application Development using OData
date: 2015-10-06 17:59:43.000000000 +08:00
author: Sumit Sarkar
---

In my role as Chief Data Evangelist for Progress Software, it's important to promote best practices for data connectivity and integration patterns. In thinking about an architecture for building enterprise mobile applications at Progress Software, I made the recommendation to leverage OData for the connectivity.  

Below is a tutorial on building an enterprise mobile application by leveraging end-to-end solutions in the OData.org ecosystem. 

#Building Enterprise Mobile Applications using OData

From the OData ecosystem, we selected the [Telerik Platform for mobile application development] (https://www.telerik.com/platform#overview) and Progress DataDirect Cloud for the [Greenfield Data Integration](https://www.progress.com/blogs/greenfield-hybrid-data-integration-with-salesforce-and-odata) using OData.

* To start with, register for a [DataDirect Cloud trial](https://pacific.progress.com/console/register?productName=d2c&ignoreCookie=true) and [Telerik platform trial](https://www.telerik.com/login/v2/platform?ReturnUrl=https%3a%2f%2fidentity.telerik.com%2fv2%2foauth%2ftelerik%2fauthorize%3fclient_id%3duri%253aappshell%26redirect_uri%3dhttps%253a%252f%252fplatform.telerik.com%252f%26response_type%3dcode%26state%3d7B021E8).

Note: [New in Telerik Platform Enterprise](https://www.telerik.com/blogs/overview-of-telerik-platform-enterprise-enhancements), DataDirect Cloud connectors are now integrated into a single platform.
* Login to DataDirect Cloud by clicking on "Connect Data".
 
* You will be redirected to DataDirect Cloud Dashboard. The first step here would be to create a Data Source definition. On the Dashboard, you can click on "Data Sources" tab to the left of Dashboard and then you would have to click on "Data Stores" on the Next Screen.

![DataDirect Cloud OData sources](/assets/enterprise-mobile1.png)
 
* You will be presented with list of cloud and on-premise data sources that are currently supported by DataDirect Cloud. For this tutorial I chose Salesforce.com as my cloud data source. For enterprise mobile applications, it's common to select on-premise data sources such as Oracle or DB2 which can be accessed [securely behind the corporate firewall](https://www.progress.com/cloud-data-integration/solutions/cloud-connectivity-on-premise-data).
* Once you select your data source, you will have to fill in details like Data Source Name, which can be any name you want, User Id and password for your Salesforce account and security token which can be obtained from your account settings in Salesforce.com. Once you have filled in those details, you can click on "Test Connection". If it is successful, you will be notified and you can save the data source.
* Now we need to enable OData for the above source. Click on OData tab, beside the General tab of Datasource.
* On the OData tab, click Edit Configuration. You will be shown Configure Schema wizard where you can select the Schema and the tables that you want to expose through OData.

![DataDirect Cloud OData Objects](/assets/enterprise-mobile2.png)
 
* Primary keys will be represented with golden key beside the primary key column. If there is no primary key, you would have to set the primary key manually and click on Save & Close once you are done.
* If OData configuration is done properly, you will have a green tick mark at the Datasource listing as shown below.

![DataDirect Cloud OData Objects](/assets/enterprise-mobile3.png) 

* The base access URI for accessing the data sources in DataDirect cloud will be https://service.datadirectcloud.com/api/odata/<Data Source Name>. 
* For more on how to access the data using DataDirect Cloud's OData API visit [here](https://documentation.progress.com/output/DataDirect/DataDirectCloud/index.html#page/odata/getting-started-with-the-odata-api.html).
Next, Log in to your account at Telerik Mobile App Builder platform [here](https://www.telerik.com/login/v2/platform?ReturnUrl=https%3a%2f%2fidentity.telerik.com%2fv2%2foauth%2ftelerik%2fauthorize%3fclient_id%3duri%253aappshell%26redirect_uri%3dhttps%253a%252f%252fplatform.telerik.com%252f%26response_type%3dcode%26state%3d7B021E8)
* Click on "Create App" to create a new application. On the next screen, select "Hybrid App" if you want to build the application for Android/Windows/iOS. Select start from a blank app as your starting point and fill in the application name and create the App.

![Build mobile app across all platforms](/assets/enterprise-mobile4.png) 
 
* On the next screen, click on create App builder Hybrid Project and choose blank (JavaScript), fill in the Project Name and create project. You are free to choose any other template if you want to.
* Now you will be shown the Project Navigator and the code files. Open up the code files and you can write your own code in HTML, CSS and JavaScript to access the data from OData API from DataDirect Cloud.
* The platform includes an emulator that you could check app compatible across different operating systems. To do that click on Run on the top header of page and you will be shown the below options.

![Cross platform mobile emulator](/assets/enterprise-mobile5.png) 
 
* You can also debug the JavaScript code using Chrome's Developer tools and if you are using Firefox, you can use Firebug Add-on to debug the application.
* The following are the screenshots of Hybrid app running on Android that I built to access the Data from any data source that is supported by DirectData Cloud using its OData API.
  
![Enterprise Mobile Application](/assets/enterprise-mobile6.png) 
  
#Let's Connect:

Sumit Sarkar, Chief Data Evangelist

Progress Software

@SAsInSumit

[www.linkedin.com/in/meetsumit](www.linkedin.com/in/meetsumit)

Progress Software also [serves on the OASIS OData Technical Committee](https://www.oasis-open.org/committees/tc_home.php?wg_abbrev=odata) and we're interested in learning more about your experiences with OData for mobile development.

Special thanks to Saikrishna Teja Bobba, Developer Evangelist with Progress DataDirect, who helped put this tutorial together.
