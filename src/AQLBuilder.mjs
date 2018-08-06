'use strict';



export default class AQLBuilder {



    constructor({
        rootType,
        currentType,
        parent,
        types,
    }) {
        this.types = types;
        this.currentType = currentType;
        this.parent = parent;


        // set the default nodes & the root node
        if (rootType) this.rootType = rootType;
        else {
            this.createTypeInstance('root');
            this.rootType = this.currentType;
        }
    }




    /**
    * let the user get the parent instance
    */
    up() {
        if (this.parent) return this.parent;
        else throw new Error(`Cannot return the AQL parent type, this is the root type already!`);
    }






    /**
    * create an instance of a type
    */
    createTypeInstance(typeName, parameters, proxy) {
        if (this.hasType(typeName)) {
            const TypeConstructor = this.getType(typeName);
            const typeInstance = new TypeConstructor();


            if (parameters && parameters.length) typeInstance.setValues(parameters);

            // try to a dd the child. this may fail fi the current type
            // rejects the child type because of formal invalidity
            if (this.currentType) this.currentType.addChild(typeInstance);
            else this.currentType = typeInstance;
            
            // it the child should be the new current
            // type that is worked upon we return a
            // new objects with the current instanc
            // as prototype and justthe currenttype
            // set to the new child type. this gives the
            // user the freeedom to cache instances
            // and continue to work on multiple levels
            // at the same time.
            if (typeInstance.returnChild) {
                const instance = new AQLBuilder({
                    currentType: typeInstance,
                    rootType: this.rootType,
                    types: this.types,
                    parent: proxy,
                });

                return instance;
            } else {
                return this;
            }
        } else throw new Error(`AQL cannot create type '${typeName}', it does not exist!`);
    }





    /**
    * return the types construcot if avilable
    */
    getType(typeName) {
        if (this.hasType(typeName)) return this.types.get(typeName);
        else throw new Error(`Cannot get AQL type '${typeName}', it does not exist!`);
    }



    /**
    * checks if a given type was registered
    */
    hasType(typeName) {
        return this.types.has(typeName);
    }


    /**
    * serialize the objects to json format
    */
    toJSON() {
        return this.rootType.toJSON();
    }
}