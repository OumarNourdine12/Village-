import axios from 'axios';

export const connexion = user => {
    return axios
        .post('village/connexion', {
            email: user.email,
            password: user.password,
            errorMessage: user.errorMessage,
        })
        .then(response => {
            //console.log('carever', response.data)
            localStorage.setItem('token', response.data.token)
            console.log(response.data)
            return response.data
        })

}
