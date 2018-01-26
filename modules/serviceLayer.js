/* Service Layer module to interact with B1 Data */
/* Server Configuration and User Credentials set in the /config.json file */
module.exports = {
    Connect: function (response) {
        return (Connect(response));
    },
    GetItems: function (options, response) {
        return (GetItems(options, response));
    },
    PostItem: function (body, response) {
        return (PostItem(body, response));
    }
}

//Load Local configuration file
var cfg = require('../config.json');
var SLServer = cfg.B1.Server+ ":"+cfg.ServiceLayer.Port+cfg.ServiceLayer.Path;

//Load Node Modules
var req = require('request') // HTTP Client

function Connect(callback){
    var uri = SLServer+"Login"
    var resp = {}

    //B1 Login Credentials
    var data = {   UserName: cfg.B1.UserName,
                    Password: cfg.B1.Password,
                    CompanyDB:cfg.B1.CompanyDB};
    
    //Set HTTP Request Options
    options = {uri: uri,body: JSON.stringify(data)}    
    
    console.log("Connecting to SL on "+ uri);
    //Make Request
    req.post(options,function(error, response, body){
        if (!error && response.statusCode == 200) {
            
            body = JSON.parse(body);         
            console.log(body)

            resp.cookie = response.headers['set-cookie']
            resp.SessionId = body.SessionId;
        
            return callback(null, resp);
        } else {
            return callback(error);
        }
    });

}

function GetItems(options,callback){
    var uri = SLServer  +"Items?$select=ItemCode,ItemName,"
                        +"QuantityOnStock,QuantityOrderedFromVendors,QuantityOrderedByCustomers"
    var resp = {}
 
    //Set HTTP Request Options
    options.uri = uri
    
    console.log("Getting Items From SL on "+ uri);
    
    //Make Request
    req.get(options,function(error, response, body){
        if (!error && response.statusCode == 200) {      
            body = JSON.parse(body);         
            delete body["odata.metadata"];
            return callback(null, body);
        } else {
            return callback(error);
        }
    });
}

function PostItem(callback){
    
}