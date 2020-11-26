const envs = {
    
    // url: 'http://localhost:3000/', //LOCAL
    // url: "https://api-sandbox.cluberotagourmet.com.br/", //TESTE
    url: "https://api-v1.cluberotagourmet.com.br/", //PROD
}

module.exports.getApi = (env) => {
    return envs[env];
}