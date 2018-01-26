/* Service Layer module to interact with B1 Data */
/* Server Configuration and User Credentials set in the /config.json file */

module.exports = {
    Connect: function (response) {
        return (Connect(response));
    },
    GetItems: function (response) {
        return (GetItems(response));
    },
    PostItem: function (body, response) {
        return (PostItem(body, response));
    }
}

function Connect(callback){

}

function GetItems(body,callback){
    
}

function PostItem(callback){
    
}