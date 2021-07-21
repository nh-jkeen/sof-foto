const GetSmartClient = function() {
    return new Promise(function(resolve, reject){
        FHIR.oauth2.ready(function(smart, err){
            if(err){
                reject(err);
            }

            resolve(smart);
        })
    })
}

export default GetSmartClient;