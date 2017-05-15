---
layout: page
title: Trippin Advanced Usages
permalink: odata-services/service-usages/trippin-advanced-usages/
---

## Trippin Advanced Usages

### Singleton

#### Requesting singleton

```
GET http://services.odata.org/TripPinRESTierService/(S(3mslpb2bc0k5ufk24olpghzx))/Me
```

### Singleton

#### Requesting property of Singleton

```
GET http://services.odata.org/TripPinRESTierService/(S(3mslpb2bc0k5ufk24olpghzx))/Me/AddressInfo
```

### Derived Entity Type

#### Requesting Derived Entity Type

```
GET http://services.odata.org/TripPinRESTierService/(S(3mslpb2bc0k5ufk24olpghzx))/People('kristakemp')/Microsoft.OData.Service.Sample.TrippinInMemory.Models.Employee
```

#### Requesting a Derived Entity Collection

```
GET http://services.odata.org/TripPinRESTierService/(S(3mslpb2bc0k5ufk24olpghzx))/People/Microsoft.OData.Service.Sample.TrippinInMemory.Models.Employee
```

#### Filter on Derived Entity

```
GET http://services.odata.org/TripPinRESTierService/(S(3mslpb2bc0k5ufk24olpghzx))/People('kristakemp')/Microsoft.OData.Service.Sample.TrippinInMemory.Models.Employee?$filter=Cost ne 0
```

#### Create a Derived Entity

```javascript
POST http://services.odata.org/TripPinRESTierService/(S(3mslpb2bc0k5ufk24olpghzx))/People
{
    "@odata.type": "Microsoft.OData.Service.Sample.TrippinInMemory.Models.Manager",
    "UserName": "mirsking",
    "FirstName": "Mirs",
    "LastName": "King",
    "AddressInfo": [
    {
      "Address": "Microsoft",
      "City": {
        "Name": "Shanghai",
        "CountryRegion": "China"
      }
    }],
    "BossOffice":{
      "Address": "Microsoft",
      "City": {
        "Name": "Shanghai",
        "CountryRegion": "China"
      }
    },
    "Budget": 100
}
```

### Containment Navigation Property

#### Requesting a Contained Entity Set

```
GET http://services.odata.org/TripPinRESTierService/(S(3mslpb2bc0k5ufk24olpghzx))/People('russellwhyte')/Trips 
```

#### Filter on a Contained Entity Set

```
GET http://services.odata.org/TripPinRESTierService/(S(3mslpb2bc0k5ufk24olpghzx))/People('russellwhyte')/Trips?$filter=contains(Description, 'New York')
```

### Batch

#### Request

```javascript
POST http://services.odata.org/TripPinRESTierService/(S(3mslpb2bc0k5ufk24olpghzx))/$batch
OData-Version: 4.0
Content-Type: multipart/mixed;boundary=batch_36522ad7-fc75-4b56-8c71-56071383e77b


--batch_36522ad7-fc75-4b56-8c71-56071383e77b
Content-Type: application/http
Content-Transfer-Encoding:binary

GET http://services.odata.org/TripPinRESTierService/Airlines HTTP/1.1
Accept: application/json;odata.metadata=minimal

--batch_36522ad7-fc75-4b56-8c71-56071383e77b
Content-Type: application/http
Content-Transfer-Encoding:binary
Content-ID: 1

POST http://services.odata.org/TripPinRESTierService/Airlines HTTP/1.1
OData-Version: 4.0
Content-Type: application/json;odata.metadata=minimal
Accept: application/json;odata.metadata=minimal

{
"@odata.type" : "Microsoft.OData.SampleService.Models.TripPin.Airline",
"AirlineCode" : "EK",
"Name" : "Emirates Airline"
}

--batch_36522ad7-fc75-4b56-8c71-56071383e77b
Content-Type: application/http
Content-Transfer-Encoding:binary

GET http://services.odata.org/TripPinRESTierService/Airlines HTTP/1.1
Accept: application/json;odata.metadata=minimal

--batch_36522ad7-fc75-4b56-8c71-56071383e77b--
```

#### Response

```javascript
--batchresponse_5770c9a3-39c6-4794-99d1-dca99f6fadfc
Content-Type: application/http
Content-Transfer-Encoding: binary

HTTP/1.1 200 OK
Content-Type: application/json; odata.metadata=minimal
OData-Version: 4.0

{
  "@odata.context":"http://services.odata.org/TripPinRESTierService/$metadata#Airlines","value":[
    {
      "@odata.etag":"W/\"J0FtZXJpY2FuIEFpcmxpbmVzJw==\"","AirlineCode":"AA","Name":"American Airlines"
    },{
      "@odata.etag":"W/\"J1NoYW5naGFpIEFpcmxpbmUn\"","AirlineCode":"FM","Name":"Shanghai Airline"
    },{
      "@odata.etag":"W/\"J0NoaW5hIEVhc3Rlcm4gQWlybGluZXMn\"","AirlineCode":"MU","Name":"China Eastern Airlines"
    }
  ]
}
--batchresponse_5770c9a3-39c6-4794-99d1-dca99f6fadfc
Content-Type: application/http
Content-Transfer-Encoding: binary

HTTP/1.1 201 Created
Location: http://services.odata.org/TripPinRESTierService/Airlines('EK')
Content-Type: application/json; odata.metadata=minimal
OData-Version: 4.0

{
  "@odata.context":"http://services.odata.org/TripPinRESTierService/$metadata#Airlines/$entity","@odata.etag":"W/\"J0VtaXJhdGVzIEFpcmxpbmUn\"","AirlineCode":"EK","Name":"Emirates Airline"
}
--batchresponse_5770c9a3-39c6-4794-99d1-dca99f6fadfc
Content-Type: application/http
Content-Transfer-Encoding: binary

HTTP/1.1 200 OK
Content-Type: application/json; odata.metadata=minimal
OData-Version: 4.0

{
  "@odata.context":"http://services.odata.org/TripPinRESTierService/$metadata#Airlines","value":[
    {
      "@odata.etag":"W/\"J0FtZXJpY2FuIEFpcmxpbmVzJw==\"","AirlineCode":"AA","Name":"American Airlines"
    },{
      "@odata.etag":"W/\"J1NoYW5naGFpIEFpcmxpbmUn\"","AirlineCode":"FM","Name":"Shanghai Airline"
    },{
      "@odata.etag":"W/\"J0NoaW5hIEVhc3Rlcm4gQWlybGluZXMn\"","AirlineCode":"MU","Name":"China Eastern Airlines"
    },{
      "@odata.etag":"W/\"J0VtaXJhdGVzIEFpcmxpbmUn\"","AirlineCode":"EK","Name":"Emirates Airline"
    }
  ]
}
--batchresponse_5770c9a3-39c6-4794-99d1-dca99f6fadfc--
```

