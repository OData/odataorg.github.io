---
layout: page
title: Request A Key To Identify Yourself to Trippin
permalink: odata-services/service-usages/request-key-tutorial/
---

## Request A Key To Identify Yourself to Trippin

To request a key, you should firstly visit 
[https://services.odata.org/TripPinRESTierService](https://services.odata.org/TripPinRESTierService), 
and the key is returned in the address bar of your brower.

For example, after you visit 
[https://services.odata.org/TripPinRESTierService](https://services.odata.org/TripPinRESTierService), 
the address bar will be replaced by 

```
https://services.odata.org/TripPinRESTierService/(S(1iit5imcudlfb3hd1duwtznk))/
```

, and the `(S(1iit5imcudlfb3hd1duwtznk))` part is your unique key.


### Usages in Browsers

If you want to modify the data of Trippin service without any negative impact by other users, 
you need to insert the key into the url everytime you request.

For example, if you are going to remove a person in Trippin, 
you will use the request payload as following,

```
DELETE https://services.odata.org/TripPinRESTierService/People('russellwhyte')
```

. But you need firstly insert your key between `TripPinRESTierService` and `People('russellwhyte')`. 
Therefore, the real url you you will use will be 

```
DELETE https://services.odata.org/TripPinRESTierService/(S(1iit5imcudlfb3hd1duwtznk))/People('russellwhyte')
```

### Usages in Postman

There are two ways to insert key into the urls.

The first one is the same with the `Usages in Browsers`. And the other is to use the environment concept in Postman.

#### Use Environment Concept in Postman

1. To understand environment concept in postman, please refer to 
[Setting up an environment with variables](https://learning.postman.com/docs/sending-requests/managing-environments).

2. Please import the postman collection which needs environment configuration to simplify the key configuration.
[![Import Postman Collection For Write](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/7e8ea944a01c65d2cdc3)

3. Add an environment in postman and add a variable named key with the value you get from above, 
such as `(S(1iit5imcudlfb3hd1duwtznk))` into the environment.

4. Enjoy your unique read/write Trippin.