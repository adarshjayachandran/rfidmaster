var express = require('express');
var router = express.Router();
var session = require('express-session');
var Usermodel = require('../models/userModel');
var VehicleRfidModel = require('../models/vehiclerfidModel');
var VehicleRfidSingleModel = require('../models/vehiclerfidsingleModel');
var DeviceModel = require('../models/deviceModel')
var RfidModel = require('../models/rfidModel');
var VehicleModel = require('../models/vehicleModel');
var vehno = require('../models/vehno');
var rfidno = require('../models/rfidno');
var app = express();
var session = require('express-session');
var mongoose = require('mongoose');
var MongoStore = require('connect-mongo')(session);
mongoose.connect('mongodb://localhost/vehiclerfid_db', {useNewUrlParser: true  });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
});
app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}));

/****get request**/
router.get('/', function (req, res, next) {
	return res.render('index');
});
router.get('/login', function (req, res, next) {
	 return res.render('login');
});
router.get('/register', function (req, res, next) {
	return res.render('register');
});
router.get('/home', function (req, res, next) {
	return res.render('home');
});
router.get('/reg_vehicle_rfid', function (req, res, next) {
	return res.render('regvehiclerfid');
});
router.get('/recharge_account', function (req, res, next) {
	return res.render('rechargeaccount');
});
router.get('/fine_details', function (req, res, next) {
	return res.render('finedetails');
});
router.get('/log_details', function (req, res, next) {
	return res.render('logdetails');
});
router.get('/account_balance', function (req, res, next) {
	return res.render('accountbalance');
});
router.get('/vehicle_details', function (req, res, next) {
	return res.render('vehicledetails');
});

router.get('/view_user', function (req, res, next) {
	return res.render('viewuser');
});
router.get('/view_device', function (req, res, next) {
	return res.render('viewdevice');
});
router.get('/admin_log_details', function (req, res, next) {
	return res.render('adminlogdetails');
});
/****post request***/
router.get('/vehicledeptdata', function (req, res, next) {

db.collection('vehicledepttbls').aggregate([




]).toArray(function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        else
        {
        	console.log(result);
        	res.json(result);
        }
    });

});


router.get('/useraccountdata', function (req, res, next) {

db.collection('useraccountstbl').aggregate([

{

			$lookup:
			{
				from:"usertbls",
				localField:"f_u_id",
				foreignField:"u_id",
				as:"usertbls"
			}
		
		
  },


]).toArray(function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        else
        {
        	console.log(result);
        	res.json(result);
        }
    });

});



router.get('/logdata', function (req, res, next) {

db.collection('activitytbls').aggregate([

{

			$lookup:
			{
				from:"devicetbls",
				localField:"device_no",
				foreignField:"device_no",
				as:"devicetbl"
			}
		
  },
{

			$lookup:
			{
				from:"vehiclerfidsingletbls",
				localField:"rfid_no",
				foreignField:"rfid_no",
				as:"vehiclerfiddata"
			}	



},


]).toArray(function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        else
        {
        	console.log(result);
        	res.json(result);
        }
    });

});



router.get('/checking', function (req, res, next) {




db.collection('vehiclerfidsingletbls').aggregate([

{

			$lookup:
			{
				from:"usertbls",
				localField:"f_u_id",
				foreignField:"u_id",
				as:"usertbls"
			}
		
  },
  {
      $match: { "usertbls.u_id":{ $ne : []}  }
 }

]).toArray(function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        else
        {
        	console.log(result);
        	res.json(result);
        }
    });

/*
db.collection('vehiclerfidtbls').aggregate([

{

			$lookup:
			{
				from:"vehicletbls",
				localField:"f_v_id",
				foreignField:"v_id",
				as:"vehicletbls",

			}
  },
 {
      $match: { "vehicletbls.vehicle_no":{ $ne : []}  }
 }
]).toArray(function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        else
        {
        	console.log(result);
        	res.json(result);
        }
    });*/
//VehicleRfidModel
/*db.collection('vehiclerfidtbls').aggregate([
   {

			$lookup:
			{
				from:"vehicletbls",
				localField:"f_v_id",
				foreignField:"v_id",
				as:"vehicletbls",

			}
  },
   {
      $match: { "vehicletbls.vehicle_no":{ $ne : []}  }
   }	
		

	]).toArray(function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        else
        {
        	console.log(result);
        	res.json(result);
        }
    });
/*
		db.collection('vehiclerfidtbls').aggregate([
		{
			
			$lookup:
			{
				from:"vehicletbls",
				localField:"vehicletbl.f_v_id",
				foreignField:"v_id",
				as:"vehicletbl",






			}
		},
		{
			$lookup:
			{
				from:"rfidtbls",
				localField:"f_r_id",
				foreignField:"r_id",
				as:"rfidtbl"
			}
		},
		{
			$lookup:
			{
				from:"usertbls",
				localField:"f_u_id",
				foreignField:"u_id",
				as:"usertbl"
			}
		}

	]).toArray(function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        else
        {
        	console.log(result);
        	res.json(result);
        }
    });*/





});


router.post('/login', function (req, res, next) {
	//console.log(req.body);
	Usermodel.findOne({email:req.body.email},function(err,data){
		if(data){
			
			if(data.password==req.body.password){
				//console.log("Done Login");
				req.session.userId = data.u_id;
				//console.log(req.session.userId);
				res.send({"Success":"Success!"});
				
			}else{
				res.send({"Success":"Wrong password!"});
			}
		}else{
			res.send({"Success":"This Email Is not regestered!"});
		}
	});
});



router.post('/register', function(req, res, next) {
	var userInfo = req.body;

	console.log(userInfo);

	if(!userInfo.email || !userInfo.username || !userInfo.mobileno || !userInfo.password || !userInfo.passwordConf){
		res.send();
		console.log("1not");
	} else { 
		if (userInfo.password == userInfo.passwordConf) {
			Usermodel.findOne({email:userInfo.email},function(err,data){
				if(!data){
					var c;
					Usermodel.findOne({},function(err,data){

						if (data) {
							console.log("if");
							c = data.u_id + 1;
							console.log(c);
						}else{
							c=1;
							console.log("c1");
						}

						var newUser = new Usermodel({
							u_id:c,
							username: userInfo.username,
							mobileno: userInfo.mobileno,
							email: userInfo.email,
							password: userInfo.password,
							usertype:1
						});

						newUser.save(function(err, User){
							if(err)
								console.log(err);
							else
								console.log('Success');
						});

					}).sort({_id: -1}).limit(1);
					res.send({"Success":"You are regestered,You can login now."});
				}else{
					res.send({"Success":"Email is already used."});
				}

			});
		}else{
			res.send({"Success":"password is not matched"});
		}
	}
});


router.post('/veh_rf_insingleregister',function(req,res,next){
  //console.log(req.body);
  //console.log(req.session.userId);

  var vehicle_no = req.body.vehicleno;
  var rfid_no = req.body.rfid;
  var vrs_id ;

//vehicle table registration
	VehicleRfidSingleModel.findOne({},function(err,vrsdata){
						
						if (vrsdata) {
							vrs_id = vrsdata.vrs_id + 1;
							req.session.vrs_id = vrs_id;
							console.log("vehiclerfidsingletbl"+req.session.vrs_id);
						}else{
							vrs_id=1;
							req.session.vrs_id=vrs_id;
							console.log("vehiclerfidsingletbl first entry"+req.session.vrs_id);
						}

						var newvehiclerfidsingle = new VehicleRfidSingleModel({
						    vrs_id: vrs_id,
						    vehicle_no: vehicle_no,
						    rfid_no: rfid_no,
						    f_u_id:req.session.userId 
						  });

						newvehiclerfidsingle.save(function(err, Vehicle){
							if(err)
								console.log(err);
							else
							{

								console.log('Success registration in vehiclerfidsingletbl');
								res.send({"Success":"true"});

								
							}
						});

					}).sort({_id: -1}).limit(1);

//vehicle table registration

});

router.post('/view_device',function(req,res,next){
  //console.log(req.body);
  //console.log(req.session.userId);

  var device_location = req.body.devicelocation;
  var device_no = req.body.deviceno;
  var d_id ;

//vehicle table registration
	DeviceModel.findOne({},function(err,data){
						
						if (data) {
							d_id = data.d_id + 1;
							req.session.d_id = d_id;
							console.log("vehiclerfidsingletbl"+req.session.d_id);
						}else{
							d_id=1;
							req.session.d_id=d_id;
							console.log("vehiclerfidsingletbl first entry"+req.session.d_id);
						}

						var newdevice = new DeviceModel({
						    d_id: d_id,
						    device_no: device_no,
						    device_location: device_location,
						   
						  });

						newdevice.save(function(err, Device){
							if(err)
								console.log(err);
							else
							{

								console.log('Success registration in vehiclerfidsingletbl');
								res.send({"Success":"true"});

								
							}
						});

					}).sort({_id: -1}).limit(1);

//vehicle table registration

});

router.get('/devicedata', function (req, res, next) {

db.collection('devicetbls').aggregate([




]).toArray(function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        else
        {
        	console.log(result);
        	res.json(result);
        }
    });

});






router.post('/viewvehiclerfiddetails', function (req, res) {

	var searchStr = req.body.search.value;
	if(req.body.search.value)
    {
            var regex = new RegExp(req.body.search.value, "i");
            
            searchStr = { $or: [{'vehicle_no':regex },{'rfid_no': regex}] };
    }
    else
    {
         searchStr={};
    }
  
    var recordsTotal = 0;
    var recordsFiltered=0;
//VehicleRfidSingleModel  =  VehicleRfidModel
    VehicleRfidSingleModel.countDocuments({}, function(err, c) {
        recordsTotal=c;
        //console.log(c);
        VehicleRfidSingleModel.countDocuments(searchStr, function(err, c) {
            recordsFiltered=c;
            //console.log(c);
            //console.log(req.body.start);
            //console.log(req.body.length);
          //vrs_id vehicle_no rfid_no f_u_id  ==  vr_id f_v_id f_r_id f_u_id
                VehicleRfidSingleModel.find(searchStr, 'vrs_id vehicle_no rfid_no',{'skip':Number(req.body.start),'limit': Number(req.body.length) }, function (err, results) {
                    if (err) {
                        console.log('error while getting results'+err);
                        return;
                    }
            
                    var data = JSON.stringify({
                        "draw": req.body.draw,
                        "recordsFiltered": recordsFiltered,
                        "recordsTotal": recordsTotal,
                        "data": results
                    });
                    res.send(data);
                });
        
          });


   });



});






/*
router.get('/viewvehiclerfiddetails', function (req, res) {

	var searchStr = req.body.search.value;
	if(req.body.search.value)
    {
            var regex = new RegExp(req.body.search.value, "i")
            searchStr = { $or: [{'_id':regex },{'city': regex},{'state': regex }] };
    }
    else
    {
         searchStr={};
    }
    console.log(searchStr);

});*/





router.post('/rfregister',function(req,res,next){
	console.log(req.body);
	var refno = req.body;
	 var c;
	var newrfno = new rfidno({
		unique_id:c,
		rfno:refno.rfno
	});
	newrfno.save(function(err, Person){ 
 							if(err)
								console.log(err);
							else
								console.log('Success');
							
						});return res.render('rfregister.ejs');
});
router.post('/vregister',function(req,res,next){
	console.log(req.body);
	var veno = req.body;
	var a ;s

	var newvno = new vehno({
		unique_id:a,
		vno:veno.vno
	});
	newvno.save(function(err, data){
                                
							if(err)
								console.log(err);
							else
								console.log('Success');
						});return res.render('vregister.ejs');
});

 router.post('/update_device',function(req,res,next){
 	var d = req.body.did;
 	console.log(d);
 	DeviceModel.find({d_id:d},function(err,data){
 		 //if(data.d_id===2)
 		// {
             //console.log(data);
             res.json(data);
 		// }
         });
         /*var query={d_id:d};
         DeviceModel.find(query).toArray(function(err,result){
         	if(err)throw err;
         	console.log(result);
         	db.close();
         });*/
 });
 router.post('/device',function(req,res,next){
 	 var uid = req.body.updateid;
 	 console.log(req.body.updatelocation);
 	 console.log(req.body.updateno);
 	 var myquery = {d_id:uid};
 	 var newvalues = {$set:{device_no:req.body.updateno,device_location:req.body.updatelocation}};
  DeviceModel.updateOne(myquery,newvalues,function(err,data){
  	if (err) 
  		throw err;
    else
  	   return res.send({"success":"true"});
     
     });
 });


router.get('/profile', function (req, res, next) {
	console.log("profile");
	vehno.findOne({unique_id:req.session.userId},function(err,data){
		
		console.log("data");
		console.log(data);
		if(!data){
			res.redirect('/');
		}else{
			//console.log("found");
			return res.render('data.ejs', {"name":data.username,"email":data.email,"vno":data.vno});
		}
	});
});
router.get('/logout', function (req, res, next) {
	console.log("logout")
	if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
    	if (err) {
    		return next(err);
    	} else {
    		return res.redirect('/');
    	}
    });
}
});

router.get('/forgetpass', function (req, res, next) {
	res.render("forget.ejs");
});

router.post('/forgetpass', function (req, res, next) {
	//console.log('req.body');
	//console.log(req.body);
	User.findOne({email:req.body.email},function(err,data){
		console.log(data);
		if(!data){
			res.send({"Success":"This Email Is not regestered!"});
		}else{
			// res.send({"Success":"Success!"});
			if (req.body.password==req.body.passwordConf) {
			data.password=req.body.password;
			data.passwordConf=req.body.passwordConf;

			data.save(function(err, Person){
				if(err)
					console.log(err);
				else
					console.log('Success');
					res.send({"Success":"Password changed!"});
			});
		}else{
			res.send({"Success":"Password does not matched! Both Password should be same."});
		}
		}
	});
	
});


//db.bankaccountstbl.insert({ba_id:1,name:"aa",account_no:012346,account_balance:500})
//useraccountstbl ua_id f_u_id balance
//activitytbls a_id device_no rfid_no timeofentry dateofentry
//vehicledepttbls vd_id vehicle_no vehicle_type tax_paid insurance_paid
//devicetbls d_id device_no device_location

module.exports = router;