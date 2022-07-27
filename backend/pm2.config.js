module.exports = {
    apps:[{
        name:"react-register",
        script:'./build/server.js',
        env_production:{
            "NODE_ENV":"production"
        }
    }]
}