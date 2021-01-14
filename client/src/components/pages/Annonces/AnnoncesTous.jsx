import React, { Component } from 'react';

require('./_annonces.scss');

class AnnoncesTous extends Component {

    constructor() {
        super();
        this.state = {
            nom_action: '',
            lieu: '',
            date_debut: '',
            date_fin: '',
            annonces: [],
            user: [],
            profilAnnonces: [],
            profilUser: [],
            id: '',


        };
        this.handleChange = this.handleChange.bind(this);
        this.creerAnnonce = this.creerAnnonce.bind(this);
    }

    creerAnnonce(e) {
        if (this.state.id) {
            const token = localStorage.getItem('token');
            fetch(`/village/annonce/${this.state.id}`, {
                method: 'PUT',
                body: JSON.stringify(this.state),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    this.setState({
                        nom_action: '',
                        lieu: '',
                        date_debut: '',
                        date_fin: '',
                        id: ''
                    });
                    this.fechAnnonces();
                });

        } else {
            const token = localStorage.getItem('token');
            fetch('/village/annonce/', {
                method: 'POST',
                body: JSON.stringify(this.state),
                headers: {
                    'Content-Type': 'application/json', // objet avec le tipe de contenu format json
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    //M.toast({ html'Animal ajouté'})
                    this.setState({
                        nom_action: '',
                        lieu: '',
                        date_debu: '',
                        date_fin: ''
                    });
                    this.fechAnnonces();  //pour montrer 
                })
                .catch(err => console.error(err));
        }
        e.preventDefault();
    }
    componentDidMount() {
        this.fechAnnonce(); // pour regarder les array du serveur 
        this.fechAnnonces();

    }

    fechAnnonce() {
        fetch(`/village/annonces/`)
            .then(res => res.json())
            .then(data => {
                //console.log('pepito', data)
                this.setState({ annonces: data, user: data.user }); //revisar aqui annonces
                console.log('firulais', this.state.user);
                console.log('corocoros', this.state.annonces);
            });

    }

    async fechAnnonces() {
        {
            const token = localStorage.getItem('token');
            //console.log('token', token)
            await fetch(`/village/annonceUser/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => response.json())
                .then(data => {
                    //console.log('auto', data)
                    this.setState({ profilAnnonces: data.Annonces, profilUser: data });
                    //console.log('pepitona', this.state.profilUser);
                });
        }
    }

    annonceDelete(id) {
        if (window.confirm("Vous-êtes sûr d'éliminer cet Annonces?")) {
            const token = localStorage.getItem('token');
            fetch(`/village/annonce/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(res => res.json())
                .then(data => console.log(data));
            this.fechAnnonces();
        }
    }

    annoncePut(id) {
        fetch(`/village/annonce/${id}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.setState({
                    nom_action: data.nom_action,
                    lieu: data.lieu,
                    date_debut: data.date_debut,
                    date_fin: data.date_fin,
                    id: data.id
                })
            });
    }

    handleChange(e) {
        const { name, value } = e.target;  //pour recouperer les inputs
        console.log(this.state)
        this.setState({
            [name]: value
        });
    }


    render(

    ) {
        return (
            <form className="jumbo" onSubmit={this.creerAnnonce}>
                <h2 className="text-center">Toutes les annonces </h2>


                <div className="table">
                    {
                        this.state.annonces.map(item => {
                            return (
                                <ul className="tex" key={item.id}>
                                    <h6> {item.user.prenom} {item.user.nom} a annoncé le : {item.createdAt}</h6>
                                    <li>Commentaire : {item.nom_action} </li>
                                    <li>Lieu : {item.lieu}</li>
                                    <li>Date debut : {item.date_debut}</li>
                                    <li>Date fin : {item.date_fin}</li>
                                    <button className="editer" onClick={() => this.annoncePut(item.id)}>
                                        Répondre
                                    </button>
                                </ul>
                            )
                        })
                    }
                </div>
            </form>
        )
    }
}

export default AnnoncesTous