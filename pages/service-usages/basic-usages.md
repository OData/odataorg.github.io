## Basic Usages

[Run in Postman](https://app.getpostman.com/run-collection/522bf43d2b5f9f09f7ee){:.postman}

For usage of advanced scenarios, please refer to [Trippin Advanced Usages](service-usages/trippin-advanced-usages/).

### Requesting Data

#### Requesting EntitySet

```
GET https://services.odata.org/TripPinRESTierService/People
```

#### Requesting Single Entity by ID

```
GET https://services.odata.org/TripPinRESTierService/People('russellwhyte')
```

#### Requesting Single Property Value

```
GET https://services.odata.org/TripPinRESTierService/Airports('KSFO')/Name 
```

```
GET https://services.odata.org/TripPinRESTierService/Airports('KSFO')/Location/Address 
```

#### Requesting a Single Primitive or Enum Type Property Raw Value

```
GET https://services.odata.org/TripPinRESTierService/Airports('KSFO')/Name/$value
```

```
GET https://services.odata.org/TripPinRESTierService/People('russellwhyte')/Gender/$value
```

#### Requesting Complex Property

```
GET https://services.odata.org/TripPinRESTierService/Airports('KSFO')/Location
```

#### Requesting Collection of Complex Property
```
GET https://services.odata.org/TripPinRESTierService/People('russellwhyte')/AddressInfo
```

### Querying Data

#### System Query Option $filter

```
GET https://services.odata.org/TripPinRESTierService/People?$filter=FirstName eq 'Scott'
```

##### Filter on Complex Type Property

```
GET https://services.odata.org/TripPinRESTierService/Airports?$filter=contains(Location/Address, 'San Francisco')
```

##### Filter on Enum Properties

```
GET https://services.odata.org/TripPinRESTierService/People?$filter=Gender eq Microsoft.OData.Service.Sample.TrippinInMemory.Models.PersonGender'Female' 
```

##### Filter on Collection

```
GET https://services.odata.org/TripPinRESTierService/Airports?$select=Name, IcaoCode
```

#### System Query Option $orderby

```
GET https://services.odata.org/TripPinRESTierService/People('scottketchum')/Trips?$orderby=EndsAt desc
```

#### System Query Option $top and $skip

```
GET https://services.odata.org/TripPinRESTierService/People?$top=2 
```

```
GET https://services.odata.org/TripPinRESTierService/People?$skip=18
```

#### System Query Option $count

```
GET https://services.odata.org/TripPinRESTierService/People/$count
```

#### Lambda Operators

```
GET https://services.odata.org/TripPinRESTierService/Me/Friends?$filter=Friends/any(f:f/FirstName eq 'Scott')
```

#### System Query Option $expand

```
GET https://services.odata.org/TripPinRESTierService/People('keithpinckney')?$expand=Trips
```

##### Nested Filter in Expand

```
GET https://services.odata.org/TripPinRESTierService/People('russellwhyte')?$expand=Trips($top=1)
```

```
GET https://services.odata.org/TripPinRESTierService/People('russellwhyte')?$expand=Trips($select=TripId, Name)
```

```
GET https://services.odata.org/TripPinRESTierService/People('russellwhyte')?$expand=Trips($filter=Name eq 'Trip in US')
```

### Data Modification

**Notice:** During the following sections, you are going to modify the data of Trippin service. To prevent other users' actions affect your results, you need to request a key firstly to identify yourself to the server.
Otherwise, the results of your actions are unpredictable. The way to request a key is introduced [here](service-usages/request-key-tutorial/).

#### Create an Entity

```
POST https://services.odata.org/TripPinRESTierService/People
header:
{
	Content-Type: application/json
}
body:
{
    "UserName":"lewisblack",
    "FirstName":"Lewis",
    "LastName":"Black",
    "Emails":[
        "lewisblack@example.com"
    ],
    "AddressInfo": [
    {
      "Address": "187 Suffolk Ln.",
      "City": {
        "Name": "Boise",
        "CountryRegion": "United States",
        "Region": "ID"
      }
    }
    ]
}
```

#### Remove an Entity

```
DELETE https://services.odata.org/TripPinRESTierService/People('russellwhyte')
```

#### Update an Entity

```
PATCH https://services.odata.org/TripPinRESTierService/People('russellwhyte')
header:
{
	Content-Type: application/json
}
body:
{
    "FirstName": "Mirs",
    "LastName": "King"
}
```

### Functions and Actions

#### Invoking Unbound Functions

```
GET https://services.odata.org/TripPinRESTierService/GetNearestAirport(lat = 33, lon = -118)
```

#### Invoking bound Functions

```
Get https://services.odata.org/TripPinRESTierService/People('russellwhyte')/Trips(0)/Microsoft.OData.Service.Sample.TrippinInMemory.Models.GetInvolvedPeople
```

#### Invoking Unbound Actions

```
POST https://services.odata.org/TripPinRESTierService/ResetDataSource
```

#### Invoking Bound Actions

```
POST https://services.odata.org/TripPinRESTierService/People('russellwhyte')/Microsoft.OData.Service.Sample.TrippinInMemory.Models.ShareTrip
header:
{
	Content-Type: application/json
}
body:
{
    "userName": "scottketchum",
    "tripId": 0
}
```

### ETag Support

The etag support is divided into two parts,

First part is the “@odata.etag” annotation support, it is part of response body, and will be auto added for any entity type which has properties with ConcurrencyCheck attribute when the request is a single entity or a collection of entity (in collection case, each entity instance will have “@odata.etag” annotation).

Second part is Etag header support, this is only support when operation is against a single entity.

For more details, please refer to [Restier Documents #ETag](http://odata.github.io/RESTier/#02-04-ETAG).

#### Request ETag

##### Request Entityset with ETag

* Request

```
GET https://services.odata.org/TripPinRESTierService/Airlines
```

* Response

```javascript
{
  "@odata.context": "https://services.odata.org/TripPinRESTierService/$metadata#Airlines",
  "value": [
    {
      "@odata.etag": "W/\"J0FtZXJpY2FuIEFpcmxpbmVzJw==\"",
      "AirlineCode": "AA",
      "Name": "American Airlines"
    },
    {
      "@odata.etag": "W/\"J1NoYW5naGFpIEFpcmxpbmUn\"",
      "AirlineCode": "FM",
      "Name": "Shanghai Airline"
    },
    {
      "@odata.etag": "W/\"J0NoaW5hIEVhc3Rlcm4gQWlybGluZXMn\"",
      "AirlineCode": "MU",
      "Name": "China Eastern Airlines"
    }
  ]
}
```

#### Request Single Entity with ETag

* Request

```
GET https://services.odata.org/TripPinRESTierService/Airlines('AA')
```

* Response Header

```
HTTP/1.1 200 OK
Content-Length: 279
Content-Type: application/json; odata.metadata=minimal
ETag: W/"J0FtZXJpY2FuIEFpcmxpbmVzJw=="
```

* Response Body

```
{
  "@odata.context": "https://services.odata.org/TripPinRESTierService/$metadata#Airlines/$entity",
  "@odata.etag": "W/\"J0FtZXJpY2FuIEFpcmxpbmVzJw==\"",
  "AirlineCode": "AA",
  "Name": "American Airlines"
}
```



#### Update Entity with ETag

```
PATCH https://services.odata.org/TripPinRESTierService/Airlines('AA')
header:
{
	If-Match: W/"J0FtZXJpY2FuIEFpcmxpbmVzJw=="
}
body:
{
  "Name": "Other Airlines"
}
```

#### Delete Entity with ETag

```
DELETE https://services.odata.org/TripPinRESTierService/Airlines('AA')
header:
{
	If-Match: W/"J0FtZXJpY2FuIEFpcmxpbmVzJw=="
}
```
