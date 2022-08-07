import React from 'react';
import Card from '../components/card';
import FormGroup from '../components/form-group';

import UsuarioService from '../app/service/usuarioService';
import localStorageService from '../app/service/localStorageService';
import { msgError } from '../components/toastr';
import { withRouter } from 'react-router-dom';
import { AuthContext } from '../main/provedorAutenticacao';
 
class Login extends React.Component {

    state = { // declara as variaveis
        email: '',
        senha: '', 
    }
    
    constructor() {
        super();
        this.service = new UsuarioService();
    }

    entrar = () => {        // async diz que o metodo é assícrono
                           // await espera que a promise seja resolvida ou de erro para dps passar para proxima linha
        this.service.autenticar({
            email: this.state.email,
            senha: this.state.senha
        }).then(response => {
            this.context.iniciarSessao(response.data)
            this.props.history.push('/home')
        }).catch(erro => {
            msgError(erro.response.data)
        })
    }

    prepareCadastrar = () => {
        this.props.history.push('/cadastro')
    }

    render(){
        return(
            <div className="row">
                <div className="col-md-6" style={ { position: 'relative', left: '300px' } }>
                    <div className='bs-docs-section'>
                        <Card title="Login">
                            <div className='row'>
                                <div className='col-lg-12'>
                                    <div className='bs-component'>
                                        <fieldset>
                                            <FormGroup label="Email" htmlFor="exampleInputEmail">
                                                <input type="email" className="form-control" 
                                                value={this.state.email} onChange={e => this.setState({email: e.target.value})}
                                                id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Digite seu Email"/>
                                            </FormGroup>

                                            <FormGroup label="Senha" htmlFor="exampleInputPasswordl">
                                                <input type="password" className="form-control" 
                                                value={this.state.senha} onChange={e => this.setState({senha: e.target.value})}
                                                id="exampleInputPasswordl" aria-describedby="senhaHelp" placeholder="Digite sua Senha"/>
                                            </FormGroup>

                                            <button className="btn btn-success" 
                                                    onClick={this.entrar}>
                                                    <i className="pi pi-sign-in"></i>Entrar</button>
                                            <button className="btn btn-danger" 
                                                    onClick={this.prepareCadastrar}>
                                                    <i className="pi pi-plus"></i>Cadastrar</button>

                                        </fieldset>

                                    </div>

                                </div>

                            </div>
                        </Card>
                    </div>
                </div>

            </div>  
        )
    }
  }
  
  Login.contextType = AuthContext

  export default withRouter(Login); // recebe um componente como paramentro com outras funcionalidades (ex: navegar entre outros componentes)
  