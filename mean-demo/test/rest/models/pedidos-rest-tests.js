// Pedidos REST API
// -----------------------------

// Modules Dependencies:
//  - Assert (http://nodejs.org/api/assert.html)
//  - SuperAgent (http://visionmedia.github.io/superagent/)
var assert = require('assert'),
    config = require('../../../config'),
    superagent = require('superagent');

// Require basic config files and DB connection
require('../../../utils/dbconnect');

// Global Variables for the test case
var Pedido, pedido, agent, pedidoId, d;
d = 'http://'+config.app.domain+":"+config.app.port;

// Unit Tests
describe('REST API Pedido '+d+"/api/v1/pedidos", function(){
    before(function(done){
        // Before all tests
        Pedido = require("../../../models/pedido.js");
        // It show create a new document in the database
        pedido = new Pedido({ name: 'pedido'+Math.floor((Math.random() * 10) + 1)});
        pedido.save(function(err, doc){
            pedidoId = doc._id;    
        });
        // Get domain
        d = config.app.domain+":"+config.app.port;
        // Start agent
        agent = superagent.agent();
        // Login if necesary
        agent
          .post(d+'/admin')
          .send({ email: "admin@anyandgo.com", password: "123456" })
          .end(function(res) {
              assert.ok(res.ok);
              done();
          });
    });

    describe('Pedidos REST', function(){
        it('GET /api/v1/pedidos', function(done){
            agent
              .get(d+'/api/v1/pedidos')
              .end(function(res) {
                  assert.ok(res.ok);
                  assert.ok(res.body.length>0);
                  done();
              });
        });
        it('GET /api/v1/pedidos/count', function(done){
            agent
              .get(d+'/api/v1/pedidos/count')
              .end(function(res) {
                  assert.ok(res.ok);
                  assert.ok(res.body.count > 0);
                  done();
              });
        });
        it('POST /api/v1/pedidos', function(done){
            agent
              .post(d+'/api/v1/pedidos')
              .send({ name: 'Test Creation Pedido' })
              .end(function(res) {
                  assert.ok(res.ok);
                  assert.ok(res.body.name === 'Test Creation Pedido');
                  done();
              });
        });
        it('PUT /api/v1/pedidos/:pedidoId', function(done){
            agent
              .put(d+'/api/v1/pedidos/'+pedidoId)
              .send({ name: 'Test Change Pedido' })
              .end(function(res) {
                  assert.ok(res.ok);
                  assert.ok(res.body.name === 'Test Change Pedido');
                  done();
              });
        });
        it('DELETE /api/v1/pedidos/:pedidoId', function(done){
            agent
              .del(d+'/api/v1/pedidos/'+pedidoId)
              .end(function(res) {
                  assert.ok(res.ok);
                  assert.ok(JSON.stringify(res.body) === '{}');
                  done();
              });
        });
        it('DELETE /api/v1/pedidos', function(done){
            agent
              .del(d+'/api/v1/pedidos/')
              .end(function(res) {
                  assert.ok(res.ok);
                  assert.ok(JSON.stringify(res.body) === '{}');
                  done();
              });
        });

    });
});
