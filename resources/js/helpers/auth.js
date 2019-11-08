import Axios from "axios";

export function login(credentials){
    return new Promise((resolve, reject) => {
        Axios.post('/api/auth/login', credentials)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject('Wrong Email or Password.');
            })
    })
}

export function getLocalUser(){
    const userStr = localStorage.getItem('user');

    if(!userStr){
        return null; 
    }

    return JSON.parse(userStr);
}