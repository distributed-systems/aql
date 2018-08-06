'use strict';


import Type from './Type.mjs';


export default class ServiceType extends Type {

    constructor(s) {
        super({
            name: 'service',
            validChildTypes: new Set([
                'service',
                'resource',
            ]),
            returnChild: true,
        });
    }



    /**
    * user provided data
    */
    setValues(parameters) {
        if (typeof parameters[0] === 'string' && parameters[0].length) {
            this.serviceName = parameters[0];
        } else throw new Error(`issing parameter 0 when creating an AQL service type. Expected argumetn 0 to be a serviceName!`);
    }



    /**
    * serializes the type to a json object
    */
    toJSON() {
        const data = super.toJSON();
        data.serviceName = this.serviceName;
        return data;
    }
}