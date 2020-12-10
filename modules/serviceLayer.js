// Service Layer module to interact with B1 Data */
// Server Configuration and User Credentials set in environment variables
const path = require('path');

module.exports = {
    Connect: function () {
        return Connect();
    },
    GetItems: function (options, response) {
        return (GetItems(options, response));
    },
    PostItems: function (options, body, response) {
        return (PostItems(options, body, response));
    }
}


//Load Configurations
var SLServer =   process.env.B1_SERVER_ENV+":"
                +process.env.B1_SLPORT_ENV 
                +process.env.B1_SLPATH_ENV;

//Load Node Modules
var req = require('request') // HTTP Client
const axios = require('axios')

var ItemGroupCode = 103; //Just for filtering

//Connect to Service Layer
let Connect = function () {
    return new Promise(function (resolve, reject) {
        const options = {
            method: "POST",
            baseURL: process.env.B1_SERVER_ENV,
            port: process.env.B1_SLPORT_ENV,
            url: process.env.B1_SLPATH_ENV+"Login",
            data:  {
                UserName: process.env.B1_USER_ENV,
                Password: process.env.B1_PASS_ENV,
                CompanyDB: process.env.B1_COMP_ENV
                }
        }

        axios.request(options).then((response) => {
            console.log(`SL Response: is ${response.status} - ${response.statusText}`)
            if (response.statusCode < 200 || response.statusCode >= 300) {
                return reject(
                    new Error(`${response.statusCode}: ${response.req.getHeader("host")} ${response.req.path}`)
                );
            } else {                
                resolve({
                    cookie: response.headers['set-cookie'],
                    SessionId: response.data.SessionId
                })
            }
        })
        .catch((err) => {
            console.error("Error calling ByD -" + err)
            reject(new Error(err));
        })
    })
}

//Retrieve Items
function GetItems(options, callback) {
    var uri = SLServer + "Items?$select=ItemCode,ItemName,"
        + "QuantityOnStock,QuantityOrderedFromVendors,QuantityOrderedByCustomers"
        + "&$filter=ItemsGroupCode%20eq%20"+ItemGroupCode
    var resp = {}

    //Set HTTP Request Options
    options.uri = uri

    console.log("Getting Items From SL on " + uri);

    //Make Request
    req.get(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            body = JSON.parse(body);
            delete body["odata.metadata"];
            return callback(null, body);
        } else {
            return callback(error);
        }
    });
}

//Create Items (Not implemented on the FrontEnd)
function PostItems(options, body, callback) {

    var uri = SLServer + "Items"
    var resp = {}

    //Set HTTP Request Options
    options.uri = uri
    body.ItemsGroupCode = ItemGroupCode
    options.body = JSON.stringify(body);

    console.log("Posting Items to SL on " + uri);
    console.log("Item body: \n" + JSON.stringify(body));

    //Make Request
    req.post(options, function (error, response, body) {
        if (!error && response.statusCode == 201) {
            body = JSON.parse(body);
            delete body["odata.metadata"];
            console.log("ITEM CREATED - " + JSON.stringify(body))
            return callback(null, body);
        } else {
            if (!error){
                error = "Can't Create SL ITEM"
                console.error(body)
            }
            return callback(error);
        }
    });
}
