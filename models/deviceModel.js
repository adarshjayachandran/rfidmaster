var mongoose = require('mongoose');
var Schema = mongoose.Schema;

 var deviceSchema = new Schema( {
	
	d_id: Number,
	device_no: Number,
	device_location:String
}),
Devicetbl = mongoose.model('devicetbl', deviceSchema);

module.exports = Devicetbl;
