import React, { Component } from 'react';

import { Link } from 'react-router-dom';

require('./_profil.scss');

class Profil extends Component {

    state = {
        loading: true,
        donUser: [],
        donUser2: [],
        profilUser: []
    }

    async componentDidMount() {
        {
            const token = localStorage.getItem('token');
            //console.log('token', token)
            await fetch(`/village/profil`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => response.json())
                .then(data => {
                    console.log('auto', data)
                    this.setState({ donUser: data.Dons, donUser2: data.Annonces, loading: false, profilUser: data });
                    //console.log('pepito', this.state.profilUser);
                    //console.log('pepi', this.state.donUser.Dons[0].titre);
                });
        }
    }



    render() {
        if (this.state.loading) {
            return <div>loading...</div>
        }
        if (!this.state.donUser) {
            return <div>******Personne******</div>
        }
        return (
            <div className="conteneur" id="cont">
                <div className="jumbo">
                    <h2 className="text-center">{this.state.profilUser.prenom} {this.state.profilUser.nom}</h2>
                    <div className="table">
                        <h6>Prenom : {this.state.profilUser.prenom}</h6>
                        <h6>Nom : {this.state.profilUser.nom}</h6>
                        <h6>Email : {this.state.profilUser.email}</h6>
                    </div>
                    <Link to="/don" >
                        <button href="" className="button3">
                            Faire Don
                    </button>
                    </Link>
                </div>
                <div className="jumbo-2">
                    <h1 className="text-center">Votre Don</h1>
                    {this.state.donUser.map(don => (
                        <div className="table-aniprofil">
                            <h6>Nom : {don.titre}</h6>
                            <h6>Montant: {don.montant}</h6>
                            <h6>Date : {don.date_don}</h6>
                        </div>
                    ))}

                </div>
                <div className="jumbo-3">
                    <h1 className="text-center">Votre Annonces</h1>
                    {this.state.donUser2.map(don => (
                        <div className="table-aniprofil">
                            <h6>Nom : {don.nom_action}</h6>
                            <h6>Montant: {don.lieu}</h6>
                            <h6>Date : {don.date_debut}</h6>
                            <h6>Date : {don.date_fin}</h6>
                        </div>
                    ))}

                </div>

            </div>

        )
    }
}

export default Profil
