import axios from "axios";



const $http = axios.create({
    baseURL:process.env.REACT_APP_BASE_URL,
    withCredentials:true
})

$http.interceptors.response.use((config)=>{
    return config
},async(error)=>{
    const originalRequest = error.config

    if(error.response.status === 401 && error.config && !error.config._isRetry){
        originalRequest._isRetry = true
        try{
            const response = await axios.get(`${process.env.REACT_APP_BASE_UR}/refresh`)
            localStorage.setItem('token',response.data.token.accessToken)
            return $http.request(originalRequest)
        }
        catch (e) {
            console.log(e)
        }
    }
})


export {
    $http
}