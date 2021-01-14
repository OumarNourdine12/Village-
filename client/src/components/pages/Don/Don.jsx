import React, { Component } from 'react';

require('./_don.scss');

class Don extends Component {

    constructor() {
        super();
        this.state = {
            titre: '',
            montant: '',
            date_don: '',
            dons: [],
            profilDon: [],
            profilUser: [],
            id: '',

        };
        this.handleChange = this.handleChange.bind(this);
        this.creerDon = this.creerDon.bind(this);
    }

    creerDon(e) {
        if (this.state.id) {
            const token = localStorage.getItem('token');
            fetch(`/village/don/${this.state.id}`, {
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
                        titre: '',
                        montant: '',
                        date_don: '',
                        id: ''
                    });
                    this.fechDons();
                });

        } else {
            const token = localStorage.getItem('token');
            fetch('/village/don/', {
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
                        titre: '',
                        montant: '',
                        date_don: ''
                    });
                    this.fechDons();  //pour montrer 
                })
                .catch(err => console.error(err));
        }
        e.preventDefault();
    }
    componentDidMount() {
        this.fechDon(); // pour regarder les array du serveur 
        this.fechDons();

    }

    fechDon() {
        fetch(`/village/dons/`)
            .then(res => res.json())
            .then(data => {
                //console.log('pepito', data)
                this.setState({ dons: data }); //revisar aqui dons
                //console.log('pepito', this.state.dons);
            });

    }

    async fechDons() {
        {
            const token = localStorage.getItem('token');
            //console.log('token', token)
            await fetch(`/village/donUser/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => response.json())
                .then(data => {
                    console.log('auto', data)
                    this.setState({ profilDon: data.Dons, profilUser: data });
                    console.log('pepitona', this.state.profilUser);
                });
        }
    }

    donDelete(id) {
        if (window.confirm("Vous-êtes sûr d'éliminer cet Don?")) {
            const token = localStorage.getItem('token');
            fetch(`/village/don/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(res => res.json())
                .then(data => console.log(data));
            this.fechDons();
        }
    }

    donPut(id) {
        fetch(`/village/don/${id}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.setState({
                    titre: data.titre,
                    montant: data.montant,
                    date_don: data.date_don,
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
            <form className="jumbo" onSubmit={this.creerDon}>
                <h2 className="text-center">Ajoutez votre Don </h2>
                <div>
                    <div className="form-group">

                        <div>
                            <label className="lab" htmlFor="exampleInputEmail1">titre</label>
                            <input type="text" className="form-control" name="titre"
                                onChange={this.handleChange} value={this.state.titre} />
                        </div>

                        <div>
                            <label className="lab" htmlFor="exampleInputEmail1">montant</label>
                            <input type="text" className="form-control" name="montant"
                                onChange={this.handleChange} value={this.state.montant} />
                        </div>


                        <div>
                            <label className="lab" htmlFor="exampleInputEmail1">Date Don</label>
                            <input type="text" className="form-control" name="date_don"
                                onChange={this.handleChange} value={this.state.date_don} />
                        </div>


                    </div>
                    <div className="button-center">
                        <button className="button3" type="submit"> Sauvegarder </button>
                    </div>


                </div>
                <div className="table">
                    {
                        this.state.profilDon.map(item => {
                            return (
                                <ul className="tex" key={item.id}>
                                    <li>titre : {item.titre} </li>
                                    <li>montant : {item.montant}</li>
                                    <li>Date de naissance : {item.date_don}</li>

                                    <button className="editer" onClick={() => this.donPut(item.id)}>
                                        Editer
                                        </button>
                                    <button className="effacer" onClick={() => this.donDelete(item.id)}>
                                        Effacer
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

export default Don
