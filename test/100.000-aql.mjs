'use strict';


import section from 'section-tests';
import AQL from '../AQL.mjs'
import log from 'ee-log';
import assert from 'assert';



section('AQL', (section) => {

    section.test('Instantiate the AQL Class', async() => {
        new AQL();
    });



    section.test('Create a create query', async() => {
        const query = new AQL().createQuery();
        const create = query.create();
    });



    section.test('Create a nested query', async() => {
        const query = new AQL().createQuery();
        const create = query.create().service('test');
    });



    section.test('Create a nested query, go up again', async() => {
        const query = new AQL().createQuery();
        const create = query.create().service('test').up().service('not the same');
        const json = query.toJSON();

        assert.equal(json.children[0].children[0].serviceName, 'test');
        assert.equal(json.children[0].children[1].serviceName, 'not the same');
    });



    section.test('Serialize a nested query', async() => {
        const query = new AQL().createQuery();
        query.create().service('test');

        const json = query.toJSON();

        assert(json);
        assert.equal(json.type, 'root');
        assert.equal(json.children[0].children[0].serviceName, 'test');
    });
});