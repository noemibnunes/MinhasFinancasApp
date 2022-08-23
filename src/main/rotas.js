import React from 'react';

import Login from '../views/login';
import Cadastro from '../views/Cadastro';
import Home from '../views/home';

import{ Route, Switch, Redirect, BrowserRouter } from 'react-router-dom';
import ConsultaLancamento from '../views/lancamento/consultaLancamento';
import CadastroLancamento from '../views/lancamento/cadastroLancamento';
import LandingPage from '../views/landingPage';
import { AuthConsumer } from './provedorAutenticacao';
//HashRouter - provedor de rotas da aplicação
//Switch - mesma lógica do Switch case

function RotasAutenticada({component: Component, isUserAutenticado, ...props}) { // Componente React válido porque aceita um único argumento de objeto “props” (que significa propriedades) com dados e retorna um elemento React
    return (
        <Route {...props} render={ (componentProps) => {
            if(isUserAutenticado){
                return (
                    <Component {... componentProps} />
                )
            } else {
                return (
                    <Redirect to={{pathname: '/login', state: {from: componentProps.location}}}/>
                )
            }
        }} />
    )
}
function Rotas(props){
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={LandingPage}/>
                <Route path="/login" component={Login}/> 
                <Route path="/cadastro" component={Cadastro}/> 
                
                <RotasAutenticada isUserAutenticado={props.isUserAutenticado} path="/home" component={Home}/> 
                <RotasAutenticada isUserAutenticado={props.isUserAutenticado} path="/consultaLancamento" component={ConsultaLancamento}/>
                <RotasAutenticada isUserAutenticado={props.isUserAutenticado} path="/cadastroLancamento/:id?" component={CadastroLancamento}/> 
            </Switch>
        </BrowserRouter>

    )
}

export default () => (
    <AuthConsumer>
        { (context) => (<Rotas isUserAutenticado={context.isAutenticado} />) }
    </AuthConsumer>
);