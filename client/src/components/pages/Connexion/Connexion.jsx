import React, { Component } from 'react';
import { connexion } from './Liste.Func';
import { Link } from 'react-router-dom';

require('./_connexion.scss')


class Connexion extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            errorMessage: [],
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    onSubmit(e) {
        e.preventDefault()
        const user = {
            email: this.state.email,
            password: this.state.password,
        }
        connexion(user)
            .then(res => {
                if (res) {
                    this.props.history.push(`/profil`)
                }
            })
            .catch(err => {
                this.setState({
                    errorMessage: err.response
                });
                //console.log('pepito', this.state.errorMessage.data);
                //const title = (this.state.errorMessage.data.title);
                const description = (this.state.errorMessage.data.description);
                if (window.confirm(description)) {
                }
            })
        //console.log('coucou', user);
    }
    render() {

        return (
            <div className="conteneur" id="taille">
                <div className="row">
                    <div className="col-md-6 mt-5 mx-auto">
                        <form noValidate onSubmit={this.onSubmit}>
                            <h1>CONNEXION</h1>
                            <h2>Connectez-vous en quelques clics</h2>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    placeholder="Indiquez votre email"
                                    value={this.state.email}
                                    onChange={this.onChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Mot de passe</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    placeholder="Indiquez votre mot de passe"
                                    value={this.state.password}
                                    onChange={this.onChange}
                                />{this.state.errorMessage.title}
                            </div>
                            <div className="button-center">
                                <button type="submit" className="button">
                                    Se connecter
                            </button>
                            </div>
                        </form>
                    </div>
                </div><br></br>
                <h3>Inscrivez-vous ici <br></br>si vous n'avez jamais utilisé VIA</h3>
                <div className="button-center">
                    <button className="button2" type="submit">
                        <Link to="/inscription">
                            <h4>Inscription</h4>
                        </Link>
                    </button>
                </div><br />

            </div>
        )
    }
}

export default Connexion

