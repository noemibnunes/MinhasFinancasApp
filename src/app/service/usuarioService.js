import ApiService from "../apiService";
import ErroValidacao from "../exception/erroValidacao";

class UsuarioService extends ApiService {

    constructor() {
        super(`/api/usuarios`);
    }

    autenticar(credenciais) {
        return this.post(`/autenticar`, credenciais);
    }

    obterSaldo(id){
        return this.get(`/obterSaldo/${id}`);
    }

    salvar(usuario) {
        return this.post(`/salvar`, usuario);
    }
    
    validar(usuario) {
        const erros = []

        if(!usuario.nome){
            erros.push('O campo Nome é obrigatório!')
        }

        if(!usuario.email){
            erros.push('O campo Email é obrigatório!')
        } else if (!usuario.email.match(/^[a-z0-9./+@[a-z0-9]+\.[a-z]/)) {
            erros.push('Informe um Email válido!')
        }

        if(!usuario.senha || !usuario.senhaRepeticao){
            erros.push('Digite a senha 2x!')
        }

        if(usuario.senha !== usuario.senhaRepeticao){
            erros.push('As Senhas não são idênticas!')
        }

        if(erros && erros.length > 0){
            throw new ErroValidacao(erros);
        }
    }
}

export default UsuarioService;