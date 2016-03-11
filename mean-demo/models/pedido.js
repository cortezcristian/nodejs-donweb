// Pedido Model
// -----------------------------

// Modules Dependencies:
//  - Mongoose (http://mongoosejs.com/docs/guide.html)
//
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var pedidoSchema = new Schema({
    name          : String,
    desc          : String,
    entregado : { type: Boolean, default: false, ngoform: { control: 'Toggle' }    },
	created       : Date
});

// ### Hooks
// #### Pre-Save
pedidoSchema.pre("save", function(next) {
    if(!this.created)
        this.created = new Date();
    next();
});

// ### Method:
pedidoSchema.method("instanceMethod", function(param, cb) {
    var pedido = this;
    this.save(cb);
});

// ### Static:
pedidoSchema.statics.customMethod = function (paramid, cb) {
  var Pedido = this;
  Pedido.findOne({ _id: paramid}, function(err, pedido){
      cb(err, pedido);
  });
}

// Export module
module.exports = mongoose.model('Pedido', pedidoSchema);
