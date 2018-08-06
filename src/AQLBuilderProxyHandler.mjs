'use strict';


import log from 'ee-log';
import AQLBuilder from './AQLBuilder.mjs';




export default class AQLBuilderProxyHandler {


    constructor() {
        this.passThroughMethods = new Set([
            'up',
            'toJSON',
            'fromJSON',
        ]);
    }




    has(target, propertyName) {}




    get(target, propertyName, proxy) {
        if (target.hasType(propertyName)) {
            return (...parameters) => {
                const result = target.createTypeInstance(propertyName, parameters, proxy);

                if (result instanceof AQLBuilder) {
                    return new Proxy(result, new AQLBuilderProxyHandler());
                } else return result;
            };
        } else if (this.passThroughMethods.has(propertyName)) {
            return target[propertyName].bind(target);
        } else if (propertyName === 'inspect' || propertyName === 'then') {
            // console.log / ee-types do look these up
            return;
        } else if (typeof propertyName === 'string') {
            throw new Error(`AQL Type '${propertyName}' is not available!`);
        }
    }


    set() {}


    ownKeys(target) {
        return [];
    }



    getOwnPropertyDescriptor(target, propertyName) {}



    /**
    * return a new AQLBuilder instance so 
    * that th euser can work on it
    */
    construct(target, parameters) {
        return new Proxy(new AQLBuilder(...parameters), new AQLBuilderProxyHandler());
    }
}