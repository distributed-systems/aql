'use strict';


import Type from './Type.mjs';


export default class RootType extends Type {

    constructor() {
        super({
            name: 'root',
            validChildKinds: new Set([
                'query'
            ]),
        });
    }
}