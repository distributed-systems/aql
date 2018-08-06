'use strict';


import Type from './Type.mjs';


export default class CreateType extends Type {
    
    constructor() {
        super({
            name: 'create',
            kind: 'query',
            returnChild: true,
            validChildTypes: new Set([
                'service'
            ]),
        });
    }
}