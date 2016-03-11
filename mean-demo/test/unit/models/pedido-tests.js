// Pedido Test Cases
// -----------------------------

// Modules Dependencies:
//  - Assert (http://nodejs.org/api/assert.html)
var assert = require('assert');

// Require basic config files and DB connection
require('../../../utils/dbconnect');

// Global Variables for the test case
var Pedido, pedido;

// Unit Tests
describe('Model Test Pedido', function(){
    before(function(){
        // Before all tests
        Pedido = require("../../../models/pedido.js");
    });

    describe('Pedido', function(){
        // It show create a new document in the database
        it('add a pedido', function(done){
            pedido = new Pedido({ name: 'pedido'+Math.floor((Math.random() * 10) + 1)});
            pedido.save(done);
        });

    });
});
