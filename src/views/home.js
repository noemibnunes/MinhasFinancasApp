import React from 'react'

import UsuarioService from '../app/service/usuarioService'
import localStorageService from '../app/service/localStorageService';
import { AuthContext } from '../main/provedorAutenticacao';

class Home extends React.Component{

    state = {
        saldo: 0
    }

    constructor() {
        super();
        this.usuarioService = new UsuarioService();
    }

    componentDidMount() {
        const userLogado = this.context.userAutenticado;
        this.usuarioService.obterSaldo(userLogado.id)
        .then(response => {
            this.setState({saldo: response.data})
        }).catch(error => {
            console.log(error.response)
        })
    }

    render(){
        return (
            <div className="jumbotron">
                <h1 className="display-3">Bem vindo!</h1>
                <p className="lead">Esse é seu sistema de finanças.</p>
                <p className="lead">Seu saldo para o mês atual é de R$ {this.state.saldo} </p>
                <hr className="my-4" />
                <p>E essa é sua área administrativa, utilize um dos menus ou botões abaixo para navegar pelo sistema.</p>
                
                <p className="lead">
                    <a className="btn btn-primary btn-lg" 
                        href="#/cadastro" 
                        role="button"><i className="pi pi-users"></i>  
                        Cadastrar Usuário
                    </a>
                    
                    <a className="btn btn-danger btn-lg" 
                        href="#/CadastroLancamento" 
                        role="button"><i className="pi pi-money-bill"></i>  
                         Cadastrar Lançamento
                    </a>
                </p>
            </div>
        )
    }
}

Home.contextType = AuthContext
export default Home