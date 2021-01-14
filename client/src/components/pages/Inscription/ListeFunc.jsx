import axios from 'axios';

export const register = newUser => {
    return axios
        .post('village/inscription', {
            prenom: newUser.nom,
            nom: newUser.nom,
            email: newUser.email,
            password: newUser.password
        })
        .then(response => {
            console.log(response.data)
            return response.data
        })
}
