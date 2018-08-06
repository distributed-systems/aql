'use strict';


// import all avilable query types
import CreateQuery from './src/types/CreateType.mjs';
import RootType from './src/types/RootType.mjs';
import Service from './src/types/ServiceType.mjs';


import AQLBuilderProxyHandler from './src/AQLBuilderProxyHandler.mjs';
const ProxyConstructor = new Proxy(function() {}, new AQLBuilderProxyHandler());



export default class AQL {
    constructor() {
        this.types = new Map();
        
        // prepare types
        this.loadTypes();
    }



    /**
    * register a new type
    */
    registerType(TypeConstructor) {
        this.types.set(new TypeConstructor().getName(), TypeConstructor);
    }



    /**
    * checks if a given type was registered
    */
    hasType(typeName) {
        return this.types.has(typeName);
    }



    /**
    * load all known ypes into the types map so that
    * they can be accessed via the proxy obect
    */
    loadTypes() {
        this.registerType(CreateQuery);
        this.registerType(RootType);
        this.registerType(Service);
    }


    /**
    * create an AQL query builder instance 
    */
    createQuery() {
        return new ProxyConstructor({
            types: this.types,
        });
    }
}