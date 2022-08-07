import LocalStorageService from "./localStorageService";
export const USER_LOGADO = '_usuario_logado';

export default class AuthService {
    static isUserAutenticado() {
        const user = LocalStorageService.obterItem(USER_LOGADO);
        return user && user.id;
    }

    static removerUserAutenticado() {
        LocalStorageService.removerItem(USER_LOGADO);
    }

    static login(user) {
        LocalStorageService.adicionarItem(USER_LOGADO, user);
    }

    static obterUserAutenticado() {
       return LocalStorageService.obterItem(USER_LOGADO);
    }
}