import React from "react";

import AuthService from "../app/service/authService";
export const AuthContext = React.createContext()
export const AuthConsumer = AuthContext.Consumer;

const AuthProvider = AuthContext.Provider;

class ProvedorAutenticacao extends React.Component {
    state = {
        userAutenticado: null,
        isAutenticado: false
    }
    
    iniciarSessao = (user) => {
        AuthService.login(user);
        this.setState({isAutenticado: true, userAutenticado: user});
    }

    encerrarSessao = () => {
        AuthService.removerUserAutenticado();
        this.setState({isAutenticado: false, userAutenticado: null});
    }

    render() {
        const contexto = { // props e metodos que vão ser divididos com os filhos
            userAutenticado: this.state.userAutenticado,
            isAutenticado: this.state.isAutenticado,
            iniciarSessao: this.iniciarSessao,
            encerrarSessao: this.encerrarSessao
        }

        return (
            <AuthProvider value={contexto}>
                {this.props.children}
            </AuthProvider>
        )
    }
}

export default ProvedorAutenticacao;
