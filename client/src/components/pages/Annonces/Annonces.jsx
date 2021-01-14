import React, { Component } from 'react';
import AnnoncesTous from './AnnoncesTous';
require('./_annonces.scss');

class Annonces extends Component {

    constructor() {
        super();
        this.state = {
            nom_action: '',
            lieu: '',
            date_debut: '',
            date_fin: '',
            annonces: [],
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
                this.setState({ annonces: data }); //revisar aqui annonces
                //console.log('pepito', this.state.annonces);
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
                    console.log('auto', data)
                    this.setState({ profilAnnonces: data.Annonces, profilUser: data });
                    console.log('pepitona', this.state.profilUser);
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
                <h2 className="text-center">Mes Annonces </h2>
                <div>
                    <div className="form-group">

                        <div>
                            <label className="lab" htmlFor="exampleInputEmail1">Annonce</label>
                            <input type="text" className="form-control" name="nom_action"
                                onChange={this.handleChange} value={this.state.nom_action} />
                        </div>

                        <div>
                            <label className="lab" htmlFor="exampleInputEmail1">Lieu</label>
                            <input type="text" className="form-control" name="lieu"
                                onChange={this.handleChange} value={this.state.lieu} />
                        </div>


                        <div>
                            <label className="lab" htmlFor="exampleInputEmail1">Date debut</label>
                            <input type="date" className="form-control" name="date_debut"
                                onChange={this.handleChange} value={this.state.date_debut} />
                        </div>
                        <div>
                            <label className="lab" htmlFor="exampleInputEmail1">Date fin</label>
                            <input type="date" className="form-control" name="date_fin"
                                onChange={this.handleChange} value={this.state.date_fin} />
                        </div>


                    </div>
                    <div className="button-center">
                        <button className="button3" type="submit"> Sauvegarder </button>
                    </div>
                </div>
                <div className="table">
                    {
                        this.state.profilAnnonces.map(item => {
                            return (
                                <ul className="tex" key={item.id}>
                                    <li>Annonce : {item.nom_action} </li>
                                    <li>Lieu : {item.lieu}</li>
                                    <li>Date debut : {item.date_debut}</li>
                                    <li>Date fin : {item.date_fin}</li>
                                    <button className="editer" onClick={() => this.annoncePut(item.id)}>
                                        Editer
                                        </button>
                                    <button className="effacer" onClick={() => this.annonceDelete(item.id)}>
                                        Effacer
                                    </button>
                                </ul>
                            )
                        })
                    }
                </div>
                <div className="tableAnnoncesTous">
                    <AnnoncesTous />
                </div>

            </form>


        )
    }
}

export default Annonces
