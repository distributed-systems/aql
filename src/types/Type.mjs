'use strict';


export default class Type {


    constructor({
        name,
        kind = 'default',
        validChildKinds = new Set(),
        validChildTypes = new Set(),
        returnChild = false,
    }) {
        if (typeof name !== 'string' || !name.length) throw new Error(`Missing options paramter 'name'!`);
        this.name = name;


        // defines if this node shoudl returned if it is 
        // the last child added to a parent
        this.returnChild = returnChild;


        // kinds allow the types to be grouped
        // for the formal query valdiation
        this.kind = kind;


        // defines which kinds and types of children can be added
        this.validChildKinds = validChildKinds;
        this.validChildTypes = validChildTypes;


        // each type may have children that form a query
        this.children = new Set();
    }



    /**
    * receives user values
    */
    setValues() {
        throw new Error(`The AQL type '${this.getName()}' does not expect any user defined values!`);
    }



    /**
    * returns the name of this type
    */
    getName() {
        return this.name;
    }





    /**
    * returns the kind of this type
    */
    getType() {
        return this.kind;
    }




    /**
    * add child type
    */
    addChild(childInstance) {
        if (this.acceptsChild(childInstance)) {
            this.children.add(childInstance);
        } else throw new Error(`The AQL child type '${childInstance.getName()}' is not a valid child of the type '${this.getName()}'!`);
    }




    /**
    * decides if a child node can be accepted by
    * this type. this is a formal query validation
    * mechanism
    */
    acceptsChild(childInstance) {
        return this.validChildTypes.has(childInstance.getName()) || this.validChildKinds.has(childInstance.getType());
    }




    /**
    * serializes the type to a json object
    */
    toJSON() {
        return {
            type: this.getName(),
            children: [...this.children.values()].map(child => child.toJSON())
        }
    }
}