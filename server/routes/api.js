const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const assert = require('assert');

const parseString = require('xml2js').parseString;
const http = require('http');
var mongojs = require('mongojs');
var db = mongojs('mongodb://localhost:27017/mean', ['users']);
const xml2js = require('xml2js');
var cors = require('cors');
var multer = require('multer');
// converting xsls file to Json
const xlsxj = require("xlsx-to-json");


// Connect
const connection = (closure) => {
    return MongoClient.connect("mongodb://localhost:27017/mean", (err, db) => {
        if (err) return console.log(err);

        closure(db);
    });
};

// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};

// Response handling
let response = {
    status: 200,
    data: [],
    message: null
};

// Get users
router.get('/users', (req, res) => {
    connection((db) => {
        db.collection('users')
            .find()
            .toArray()
            .then((users) => {
                response.data = users;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

// Get Tasks 
router.get('/tasks', (req, res) => {
    connection((db) => {
        db.collection('tasks')
            .find()
            .toArray()
            .then((tasks) => {
                response.data = tasks;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

// find Task  by desc (modelisation)
router.get('/task', (req, res) => {
    connection((db) => {
        
        db.collection('tasks').find( { "desc": "modelisation" } )
        .each(function(err, doc) {
            assert.equal(err, null);
            if (doc != null) {
                console.dir(doc);
                 res.json(doc);
            }
            if(err)
            // } else {
                res.json("doc");
            // }
        });
    });

});

// find Task  by id
router.get('/task/:id', (req, res, next) => {
    connection((db) => {
        
        var cursor =db.collection('tasks').findOne( {_id : mongojs.ObjectID(req.params.id)}, function(err, task)  {
            if(err){
                res.send(err);
            }
            res.json(task);

        });
        

    });
});

//Auth test
router.post('/authen', cors(), (req, res, next) => {
    var user = req.body;
    if(!user){
        res.status(400);
        res.json({
            "error":"bad DATA"
        });
    }else{

        connection((db) => {
            db.collection('users').findOne(user, function (err, user) {
		if(err){
                res.send("error1");
            }
        if(user){
            res.json(user);
            console.log("user", user);
        }
        else{
            console.log("user", "null");
            res.json(null);            
        }
        /*else{
            res.status(400);
            res.json({
                "error":"bad DATA"
            });
        } */  
    
        });
        
    });
    }
        
});

//save Task
router.post('/task', (req, res, next) => {
    var task = req.body;
    if(!task.title || !task.desc){
        res.status(400);
        res.json({
            "error":"bad DATA"
        });
    }else{

        connection((db) => {
            
            var cursor =db.collection('tasks').save(task, function(err, task){
                if(err){
                    res.send(err);
                }
                
              
            });
            
    
        });
        res.json(task);
    }
    
        
});

// Delete Task  by id
router.delete('/task/:id', (req, res, next) => {
    connection((db) => {
        
        db.collection('tasks').remove( {_id : mongojs.ObjectID(req.params.id)}, function(err, task)  {
            if(err){
                res.send(err);
            }
            res.json(task);

        });
        

    });
});


// Get classifications from Database and display JSON format
router.get('/test2', (req, res) => {
    /*var fs = require('fs');
    fs.readFile('step-xml.xml', (err, data) => {
        if (err) throw err;
        var parser = new xml2js.Parser({ignoreAttrs: true});
        parser.parseString(data, function (err, result) {
        // parseString(data, function (err, result) {
            res.json(result);
            
          });
      });*/
      connection((db) => {
        db.collection('classifications')
            .find()
            .toArray()
            .then((classifications) => {
                response.data = classifications;
                res.json(response.data);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });

    });
    
    // Get ALL Classifications xml file and display JSON format
router.get('/test', (req, res) => {
    var fs = require('fs');
    fs.readFile('step-XML-V0.1.xml', (err, data) => {
        if (err) throw err;
        var parser = new xml2js.Parser({ attrkey: '@' });
    //    parser.parseString(data, function (err, result) {
         parseString(data, function (err, result) {
            res.json(result);
            
          });
      });

    });
// Get xml file and display JSON format
router.get('/test3', (req, res) => {
    var fs = require('fs');
    fs.readFile('step-xml.xml', (err, data) => {
        if (err) throw err;
        var parser = new xml2js.Parser({ attrkey: '@' });
    //    parser.parseString(data, function (err, result) {
         parseString(data, function (err, result) {
            res.json(result);
            
          });
      });

    });
      // Get xml file and display JSON format 
      // Insert JSON format in DataBase
router.get('/insertion', (req, res) => {
    var fs = require('fs');
    fs.readFile('uploads/manutanGMC.xml', (err, data) => {
        if (err) throw err;
        // var json = JSON.parse(data);

	// suppression des données dans la collection Classifications
            connection((db) => {
               db.collection('classifications').deleteMany({}); 
            });

        var parser = new xml2js.Parser({ attrkey: 'attribut' });
        parser.parseString(data, function (err, result) {
            // res.json(result);
            console.log("=>",result, "<=");

		

            var value = result['STEP-ProductInformation']['Classifications'];
            console.log(value);
        connection((db) => {
        db.collection('classifications').insert(value,{safe:true}, function(err, doc) {
            console.log(doc);
        if(err) throw err;
            res.json("file inserted ");
        });
            
          });
        });
      });
    });

//insertion after upload
router.post('/insertion2', (req, res, next) => {
    var file = req.body;
    if(!file){
        res.status(400);
        res.json({
            "error":"bad DATA"
        });
    }
	var fs = require('fs');
    	fs.readFile('step-XML-V0.1.xml', (err, data) => {
        if (err) throw err;
        // var json = JSON.parse(data);
        var parser = new xml2js.Parser({ attrkey: 'attribut' });
        parser.parseString(data, function (err, result) {
            // res.json(result);
            console.log("=>",result, "<=");
            var value = result['STEP-ProductInformation']['Classifications'];
            console.log(value);
        connection((db) => {
        db.collection('classifications').insert(value,{safe:true}, function(err, doc) {
            console.log(doc);
        if(err) throw err;
            res.json("file inserted ");
        });
            
          });
        });
      });
        
});

// Get xml file and display JSON format
const fs = require('fs');

function readJSONFile(filename, callback) {
  fs.readFile(filename, function (err, data) {
    if(err) {
      callback(err);
      return;
    }
    try {
      callback(null, JSON.parse(data));
    } catch(exception) {
      callback(exception);
    }
  });
}


router.get('/xslstest', (req, res) => {
    xlsxj({
    	input: "uploads/filiale1.xlsx", 
    	output: "uploads/outputt.json"
    }, function(err, result) {
    	if(err) {
      		console.error(err);
    	}else {

		var root = [];
		var id1 = 0;
		var id2 = 0;
		var id3 = 0;
		var id4 = 0;
		var id5 = 0;
		var classification1 = {};
		var classification2 = {};
		var classification3 = {};
		var idmd9 = 0;
		result.forEach(function(item){
      			//console.log("1");
			
			if(item["Classification level 1 ID"] != id1){
				/*if(id1 != 0){
					root.push(classification1);	
				}*/
				classification1= {};
				classification2= {};
				classification2.models = [];
				classification3= {};
				classification4= {};
				classification1.id = item["Classification level 1 ID"];
				classification1.name = item["Classification level 1 NAME"];
				id1 = classification1.id;
				//classification1.push(id1);	
				//classification1.push(name);
				classification1.classification = [];
				if(item["Classification level 2 ID"] != id2){
					//console.log("** id2 CHANGE**");
					classification2.id = item["Classification level 2 ID"];
					classification2.name = item["Classification level 2 NAME"];
					id2 = item["Classification level 2 ID"];
					classification2.classification = [];
					classification2.models = [];

				     
					/*if(item["Classification level 3 ID"] != id3){
						console.log("ID3 ", item["Classification level 3 ID"]);
						classification3.id = item["Classification level 3 ID"];
						classification3.name = item["Classification level 3 NAME"];
						id3 = classification3.id;
						console.log("** ===> id3 inserted ==**", id3);
						classification2.classification.push(classification3);
					}*/

					//classification2.push(id2);
					//classification2.push(item["Classification level 2 NAME"]);
												
					classification1.classification.push(classification2);
					
					root.push(classification1);
					classification2= {};
					//classification1= {};
					//root.push(classification1);
				}else
					console.log("** ===> id1 id2 ==**");
					/*if(item["Classification level 3 ID"] != id3){
						console.log("** id2 changed ", item["Classification level 3 ID"]);
						classification3.id = item["Classification level 3 ID"];
						classification3.name = item["Classification level 3 NAME"];
						id3 = classification3.id;
						
						classification2.classification.push(classification3);
					}*/
					//root.push(classification1);
					//classification1= {};	
				
			}else{
				if(item["Classification level 2 ID"] != id2){
					classification2.id = item["Classification level 2 ID"];
					classification2.name = item["Classification level 2 NAME"];
					id2 = classification2.id;
					classification2.classification = [];
					classification2.models = [];
					
					/*if(item["Classification level 3 ID"] != id3){
						console.log("ID3 ", item["Classification level 3 ID"]);
						classification3.id = item["Classification level 3 ID"];
						classification3.name = item["Classification level 3 NAME"];
						id3 = classification3.id;
						
						classification2.classification.push(classification3);
					}*/
					//classification2.push(id2);
					//classification2.push(item["Classification level 2 NAME"]);

					classification1.classification.push(classification2);
					//root.push(classification1);
					classification2= {};
				}
			}  
		});
		//MODELS FOR LEVEL 2
		var idmd10 = 0;
		var idp = 0;
		idattr1 = 0;
		idattr2 = 0;
		idattr3 = 0;
		result.forEach(function(item){
			//console.log("** TEST**");
			
			root.forEach(function(item10){
			var cll = item10.classification;	
			//classification3.models = [];
				model= {};
				model.products = [];
			cll.forEach(function(item11){
			if((item["Classification level 2 ID"] == item11.id)&&(item["Model ID"] != "-") && (idmd10 != item["Model ID"]) && ("-" == 					item["Classification level 3 ID"])){
								console.log("for cl2 =>  **",idmd2 );
								model.id = item["Model ID"];
								model.name = item["Model NAME"];
								idmd10 = item["Model ID"];
								//classification4.models.push(model);
								item11.models.push(model);
								console.log("Niv 2=>",item11.id);
				}
			
			var prods = item11.models;
			product= {};
			product.techattrs = [];
			
					prods.forEach(function(it){
						console.log("PROD N1 => ", idp );
						if((item["Model ID"] == it.id)&&(item["Product ID"] != "-") 
							&& (idp != item["Product ID"])){
								console.log("Product  **",idp );
								product.id = item["Product ID"];
								product.name = item["Product NAME"];
								product.shortdesc = item["short description"];
								product.longdesc = item["long description"];
								idp = item["Product ID"];
								//classification4.models.push(model);
								it.products.push(product);
								console.log("=>",it.id);
							}

					//Technical attribut ID
					var techattrs = it.products;
					techattr = {};
					
					techattrs.forEach(function(tech){
						console.log("ATTR N1 => ", idattr1 );
						if((item["Product ID"] == tech.id)&&(item["Technical attribut ID"] != "-") 
							&& (idattr1 != item["Technical attribut ID"])){
								console.log("ATTRIBUT   **",idattr1 );
								techattr.id = item["Technical attribut ID"];
								techattr.name = item["Technical attribut NAME"];
								techattr.value = item["Technical attribut VALUE"];
								techattr.unit = item["Technical attribut UNIT"];
								idattr1 = item["Technical attribut ID"];
								//classification4.models.push(model);
								tech.techattrs.push(techattr);
								console.log("ATT saved=>",tech.id);
						}
					});

					//FIN iteration
					
			});

			});
			});
		});
		var idcsv = 0;
		var idmd = 0;
		var idmd2 = 0;
		var idmd3 = 0;
		var idprod = 0;
		var idprod1 = 0;
		var idprod2 = 0;
		result.forEach(function(item){
			//console.log("** TEST**");
			idcsv++;
			root.forEach(function(item2){
				var iditem2 = 0;
				classification3= {};
				classification3.classification = [];
				classification3.models = [];
				model= {};
				model.products = [];
				var cl = item2.classification;
				cl.forEach(function(item3){
					if((iditem2 ==0 ) && (idcsv == 1)){
						console.log("** ITEM  **",item3.id);
						iditem2++;
					}
					
					if((item["Classification level 2 ID"] == item3.id) && (id3 != item["Classification level 3 ID"]) && ("-" != 						item["Classification level 3 ID"])){
						console.log("** INSERT HERE  **",item3.id);
						classification3.id = item["Classification level 3 ID"];
						classification3.name = item["Classification level 3 NAME"];
						id3 = item["Classification level 3 ID"];
						item3.classification.push(classification3);
					}
					/*else if((item["Classification level 2 ID"] == item3.id) &&
						 (id3 != item["Classification level 3 ID"]) &&
					 	("-" == item["Classification level 3 ID"])){
						
						model.id = item["Model ID"];
						model.name = item["Model NAME"];
						id3 = item["Classification level 3 ID"];
						item3.products.push(classification3);
					}*/

//MODELS
					model2= {};
					model2.products = [];
					var md2 = item3.classification;
					
					md2.forEach(function(item8){
						
						if((item["Classification level 3 ID"] == item8.id)&&(item["Model ID"] != "-") && (idmd2 != item["Model ID"])){
								console.log("M **",idmd2 );
								model2.id = item["Model ID"];
								model2.name = item["Model NAME"];
								idmd2 = item["Model ID"];
								//classification4.models.push(model);
								item8.models.push(model2);
								console.log("Niv 3=>",item8.id);
							}
					
						var prods2 = item8.models;
						product2= {};
						product2.techattrs = [];
						prods2.forEach(function(item9){
						console.log("TEST" );
						if((item["Model ID"] == item9.id)&&(item["Product ID"] != "-") 
							&& (idprod2 != item["Product ID"])){
								console.log("Product  **",idprod2 );
								product2.id = item["Product ID"];
								product2.name = item["Product NAME"];
								idprod2 = item["Product ID"];
								//classification4.models.push(model);
								item9.products.push(product2);
								console.log("=>",item9.id);
							}
							//Technical attribut ID
					var techattrs = item9.products;
					techattr = {};
					
					techattrs.forEach(function(tech){
						console.log("ATTR LEV3 => ", idattr2 );
						if((item["Product ID"] == tech.id)&&(item["Technical attribut ID"] != "-") 
							&& (idattr2 != item["Technical attribut ID"])){
								console.log("ATTRIBUT   **",idattr2 );
								techattr.id = item["Technical attribut ID"];
								techattr.name = item["Technical attribut NAME"];
								techattr.value = item["Technical attribut VALUE"];
								techattr.unit = item["Technical attribut UNIT"];
								idattr2 = item["Technical attribut ID"];
								//classification4.models.push(model);
								tech.techattrs.push(techattr);
								console.log("ATT saved=>",tech.id);
						}
					});

					//FIN iteration

					});


					});

//MODELS			
					classification4= {};
					classification4.models = [];
					var cl2 = item3.classification;
					
					cl2.forEach(function(item4){
						
						
						
						if((item["Classification level 3 ID"] == item4.id) && ("-" != item["Classification level 4 ID"])){
							/*if( id4 == 0){
								classification4.classification = [];
							}*/						
							//console.log("** ID4 **",item["Classification level 4 ID"]);
							classification4.id = item["Classification level 4 ID"];
							classification4.name = item["Classification level 4 NAME"];
							
							/*if((item["Model ID"] != "-") && (idmd != item["Model ID"])){
								
								model.id = item["Model ID"];
								model.name = item["Model NAME"];
								idmd = item["Model ID"];
								classification4.models.push(model);
								console.log("M **",item["Model ID"]);
							}*/
							if(item4.classification && (id4 != item["Classification level 4 ID"])){
								item4.classification.push(classification4);
								//console.log("** ID4 PUSH **", id4);	
							}	
							
							id4 = item["Classification level 4 ID"];
						}
					model= {};
					model.products = [];
					var md1 = item4.classification;
					
					md1.forEach(function(item6){
						
						if((item["Classification level 4 ID"] == item6.id)&&(item["Model ID"] != "-") && (idmd != item["Model ID"])){
								console.log("M **",idmd );
								model.id = item["Model ID"];
								model.name = item["Model NAME"];
								idmd = item["Model ID"];
								//classification4.models.push(model);
								item6.models.push(model);
								console.log("66=>",item6.id);
							}
					
						var prods = item6.models;
						product= {};
						product.techattrs = [];
					prods.forEach(function(item7){
						console.log("TEST" );
						if((item["Model ID"] == item7.id)&&(item["Product ID"] != "-") 
							&& (idprod != item["Product ID"])){
								console.log("Product  **",idprod );
								product.id = item["Product ID"];
								product.name = item["Product NAME"];
								idprod = item["Product ID"];
								//classification4.models.push(model);
								item7.products.push(product);
								console.log("=>",item7.id);
							}
						
						//Technical attribut ID
					var techattrs = item7.products;
					techattr = {};
					
					techattrs.forEach(function(tech){
						console.log("ATTR LEV3 => ", idattr3 );
						if((item["Product ID"] == tech.id)&&(item["Technical attribut ID"] != "-") 
							&& (idattr3 != item["Technical attribut ID"])){
								console.log("ATTRIBUT LEV 4   **",idattr3 );
								techattr.id = item["Technical attribut ID"];
								techattr.name = item["Technical attribut NAME"];
								techattr.value = item["Technical attribut VALUE"];
								techattr.unit = item["Technical attribut UNIT"];
								idattr3 = item["Technical attribut ID"];
								//classification4.models.push(model);
								tech.techattrs.push(techattr);
								console.log("ATT saved=>",tech.id);
						}
					});

					//FIN iteration

					});


					});

					/*// Integration Model and Products
					model= {};
					model.products = [];
					var mdl = item4.classification;
					
					mdl.forEach(function(item5){
						
						if((item["Classification level 4 ID"] == item5.id) && (id5 != item["Model ID"])
							&& ("-" != item["Model ID"])){
													
							console.log("** ID MODEL **",item["Model ID"]);
							model.id = item["Model ID"];
							model.name = item["Model NAME"];
							console.log("**MODEL **",model);
							
							if(item5.models && (id5 != item["Model ID"])){
								item5.models.push(model);
								console.log("** ID4 PUSH **", id5);	
							}
							
							id5 = item["Model ID"];
						}
					// Integration Model and Products
						
						
					});*/
					
	
					});
					
					/*if((item["Classification level 3 ID"] == item3.id) && (id3 != item["Classification level 3 ID"])){

						classification3.id = item["Classification level 3 ID"];
						classification3.name = item["Classification level 3 NAME"];
						id3 = item["Classification level 3 ID"];
						item3.classification.push(classification3);
					}*/
				});
				
				/*if(item["Classification level 2 ID"] == item2){
					console.log("** id2 changed ", item["Classification level 3 ID"]);
					classification3.id = item["Classification level 3 ID"];
					classification3.name = item["Classification level 3 NAME"];
					id3 = classification3.id;
					
					classification2.classification.push(classification3);
				}*/
				
			});
						
		});
	

	// MODELS ICI apres qu on a terminé iteration des CLASSIFICATIONS


	
			
	//result.forEach(function(item){
		//console.log("** TEST => rooot class**");
		/*var idtest= 0;
		var idclassif =0
		root.forEach(function(item2){
			var id_model = 0;
			var idnbr = 0;
			model= {};
			model.products = [];
			
			var cl = item2.classification;
				//item3.models

			
			var poitem = 0;
			
			cl.forEach(function(item3){
				poitem =  item3.id;
				
				item3.models = [];
				if (typeof item3.classification == 'undefined' || item3.classification.length == 0) {
    					// the array is EMPTY
					//item3.models = [];
					idnbr++;
					//console.log("** empty level => **", item3.id);
					console.log("++++");
					result.forEach(function(item){
					    if( (item3.id ==  item["Classification level 2 ID"]) && (idtest !=  item["Classification level 2 ID"])){
						//if((idtest !=  item["Classification level 1 ID"])){
							console.log("------");
							model.id = item["Model ID"];
							model.name = item["Model NAME"];
							id_model = item["Model ID"];
							idtest = item["Classification level 2 ID"];			
							item3.models.push(model);
							console.log("** level => **", item3.id);
							idtest = item["Classification level 1 ID"];
							console.log("** ID =*", idtest);
						//}
					    }
					});
					
				}
										
			});
			

		
	});*/
	/*var idtest= 0;
	var idclassif =0
	result.forEach(function(item){
		//console.log("** TEST => rooot class**");
		if(item["Classification level 3 ID"] == "-"){
		
		     root.forEach(function(item2){
			if(item["Classification level 2 ID"] == item2.classification){
		     });
		}
	
	});*/
	res.json(root);
	}	
	});

});

// insertion Fichier Manutan SFA
    // Insert JSON format is database from SFA
    router.get('/insertionsfa', (req, res) => {
        var collection;
    connection((db) => {
        collection = db.collection('productsmanutan');
         //console.log(collection);
    });
    //console.log(collection);
   
    var fs = require('fs');
    fs.readFile('uploads/manutanSFA.xml', (err, data) => {
        if (err) throw err;
        // var json = JSON.parse(data);
        var parser = new xml2js.Parser({ attrkey: 'attribut' });
        parser.parseString(data, function (err, result) {
            // res.json(result);
            console.log("=>",result, "<="); 
            var last = 0;
            var products = result['STEP-ProductInformation']['Products'];
            // suppression des données dans la collection productsmanutan
            connection((db) => {
               db.collection('productsmanutan').deleteMany({}); 
            });
            //insertion des product avec item product par product
            products.forEach((item) => {
                
                connection((db) => {
                    db.collection('productsmanutan').insert(item['Product'], {safe: true});
                });
            });                    
        
        if(err) throw err;
            
        });
            res.json("file inserted ");
      });
    });
// GET Sfa Product By ID Classification
// request ID + url
router.get('/sfa/:idclassif', (req, res) => {
            
  db.collection("productsmanutan").findOne({"ClassificationReference.attribut.ClassificationID" : req.params.idclassif}, function(err, result) {
    if (err) throw err;
    console.log(req.params.idclassif);
   res.json(result);
  });
   
});

//Login
router.post('/testing', (req, res, next) => {
    var user = req.body;
    if(!user){
        res.status(400);
        res.json({
            "error":"bad DATA"
        });
    }else{

        connection((db) => {
            db.collection('users').findOne({ username: username, password: password }, function (err, user) {
		if(err){
                res.send(err);
            }
            res.json(user);
            
    
        });
        
    });
    }
        
});
// Uploading File
var storage = multer.diskStorage({ //multers disk storage settings

        destination: function (req, file, cb) {

            cb(null, './uploads/');

        },

        filename: function (req, file, cb) {

            var datetimestamp = Date.now();

           //cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);            		    
				cb(null, file.originalname);  

        }

    });
var upload = multer({ //multer settings

                    storage: storage

                }).single('file');



    /** API path that will upload the files */

router.post('/upload', function(req, res) {

        upload(req,res,function(err){
            console.log(req.file);
            if(err){
                 res.json({error_code:1,err_desc:err});
                 return;
            }
             res.json({error_code:0,err_desc:null});
        });
    });
     

  

module.exports = router;
