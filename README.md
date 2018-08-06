# AQL - API Query Language

AQL is a simple json based API query lnaguage that can be used to read 
and write data from APIs that understand AQL.

## Why AQL

Why not use GraphQL? Becuase it's too complicated! AQL requests are simple
JSON encoded request payloads with a very simple structure that can be used
to read or write data. There is no magic, no new language to learn, no new 
format to implement. AQL queries can also be easily manipulated since the 
data structure is very simple and stardized.


## Design

AQL queries constists of simple nested JSON objects that can have children 
that are AQL objects or collections of AQL objects. AQL Objects have a type 
and can thus easily be extended or cusomtized.

AQL does not make assumptions about how data structures or frameworks should
be implemented other than that they can be relational. Only the implementing
framworks that can process AQL queries define how exactly resources are related
to each other and how they shoulb be queried.

When using SQL you have to define how resource a is connected to resource b 
(join x on y = z). This relations are never defined in AQL queries but are 
always provided by the framework implemnting AQL.


## What about RESTful APIs?

They are great! AQL has nothing common with RESTful APIs except for the fact
that RESTful API calls can be easily translated into AQL queries. The distributed
framework provides a restful-api-gateway service for this purpose.


## What about GraphQL APIs?

Like RESTful API calls GraphQL Queries can easily be translated into AQL Queries.


## Definition

### AQL Objects

An AQL object is a simple typed object. The only mandatatory property is `type`. 

```
{
    type: 'AQL-Query'
    children: []
}
```

This `type` property defines the type and thus content of the object. The  
following properties are reserved and must not be used for other purposes 
than described here:

- *type*: type of the AQL object. Defines what function it has.
- *children*: zero or more AQL child objects.
- *data*: contains user provided payloads.


## Why this module?

It defines a basic set of AQL objects that can be produced using the API this 
library provides. The user input when creating AQL queries can be validated
based on the definitions provided by this module.


## API

```javascript
import AQLBuilder from 'aql';

// get an instance of the AQL Builder
const aql = new AQLBuilder();

// add new AQL object types
aql.registerType(name, definition);

// remove object types
AQL.deregisterType(name);



// get vessls 100 vesselsm starting at offset 10
// ordered by the vessels name and filtereed
// by the language id the data present for the vessel
// returning only those that are availbale in english
// and only those that have tha word *cat* in its 
// description. also get all peroperties, their values
// and the exact language configuration
const query = aql.createQuery();

query.list()
    .service('wy-storage')
    .resource('vessel')
    .locale('en', 'de-ch', 'de')
    .offset(10),
    .limit(100),
    .order(
        query
            .property('name'), 
        query
            .resource('company')
            .property('name')
            .direction('descending')
    )
    .filter(
        query
            .property('description')
            .comparator('like')
            .value('%cat%'),
        query
            .service('internationalization')
            .resource('locale')
            .resource('language')
            .property('code')
            .comparator('equal')
            .value('en'),
    ).select(
        query
            .property('*'),
        query
            .resource('vesselPropertyValue')
            .property('*'),
        query
            .resource('vesselPropertyValue')
            .resource('vesselPropertyName')
            .property('*'),
        query
            .service('internationalization')
            .resource('locale')
            .property('*'),
        query
            .service('internationalization')
            .resource('locale')
            .resource('language')
            .property('*'),
        query
            .service('internationalization')
            .resource('locale')
            .resource('country')
            .property('*'),
    );



// crete a new resource
query.create()
    .service('wy-storage')
    .resource('vessel')
    .locale('de-CH')
    .data(
        query
            .property('name')
            .value('peradopa'),
        query
            .keyValues({
                name: 'peramadopa'
            }),
        v
            .create()
            .resource('vesselPropertyValue')
            .locale('de-CH')
            .data(
                query
                    .list()
                    .limit(1)
                    .resource('vesselPropertyName')
                    .filter(
                        query
                            .property('identifier')
                            .comparator('equal')
                            .value('vesselType'),
                    )
            )
    );
```