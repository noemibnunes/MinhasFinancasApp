import React from 'react'

import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import SelectMenu from '../../components/selectMenu'

import { withRouter } from 'react-router-dom'
import * as msg from '../../components/toastr'

import LancamentoService from '../../app/service/lancamentoService'
import LocalStorageService from '../../app/service/localStorageService'

class CadastroLancamentos extends React.Component {

    state = {
        id: null,
        descricao: '',
        valor: '',
        mes: '',
        ano: '',
        tipo: '',
        status: '',
        usuario: null,
        atualizando: false
    }

    constructor(){
        super();
        this.service = new LancamentoService();
    }

    componentDidMount(){
        const params = this.props.match.params
       
        if(params.id){
            this.service
                .obterPorId(params.id)
                .then(response => {
                    this.setState( {...response.data, atualizando: true} )
                })
                .catch(erros => {
                    msg.msgError(erros.response.data)
                })
        }
    }

    submit = () => {
        const userLogado = LocalStorageService.obterItem('_usuario_logado')

        const { descricao, valor, mes, ano, tipo } = this.state;
        const lancamento = { descricao, valor, mes, ano, tipo, usuario: userLogado.id };

        try{
            this.service.validar(lancamento)
        }catch(erro){
            const mensagens = erro.mensagens;
            mensagens.forEach(messages => msg.msgError(messages));
            return false;
        }     

        this.service
            .salvar(lancamento)
            .then(response => {
                this.props.history.push('/consultaLancamentos')
                msg.msgSucesso('Lançamento cadastrado com sucesso!')
            }).catch(error => {
                msg.msgError(error.response.data)
            })
    }

    atualizar = () => {
        const { descricao, valor, mes, ano, tipo, status, usuario, id } = this.state;

        const lancamento = { descricao, valor, mes, ano, tipo, usuario, status, id };
        
        this.service
            .atualizar(lancamento)
            .then(response => {
                this.props.history.push('/consultaLancamento')
                msg.msgSucesso('Lançamento atualizado com sucesso!')
            }).catch(error => {
                msg.msgError(error.response.data)
            })
    }

    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({ [name] : value })
    }

    render(){
        const tipos = this.service.obterListaTipos();
        const meses = this.service.obterListaMeses();

        return (
            <Card title={ this.state.atualizando ? 'Atualização de Lançamento'  : 'Cadastro de Lançamento' }>
                <div className="row">
                    <div className="col-md-12">
                        <FormGroup id="inputDescricao" label="Descrição" >
                            <input id="inputDescricao" type="text" 
                                   className="form-control" 
                                   name="descricao"
                                   value={this.state.descricao}
                                   onChange={this.handleChange}  />
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <FormGroup id="inputAno" label="Ano">
                            <input id="inputAno" 
                                   type="text"
                                   name="ano"
                                   value={this.state.ano}
                                   onChange={this.handleChange} 
                                   className="form-control" />
                        </FormGroup>
                    </div>
                    <div className="col-md-6">
                        <FormGroup id="inputMes" label="Mês">
                            <SelectMenu id="inputMes" 
                                        value={this.state.mes}
                                        onChange={this.handleChange}
                                        lista={meses} 
                                        name="mes"
                                        className="form-control" />
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                         <FormGroup id="inputValor" label="Valor">
                            <input id="inputValor" 
                                   type="text"
                                   name="valor"
                                   value={this.state.valor}
                                   onChange={this.handleChange} 
                                   className="form-control" />
                        </FormGroup>
                    </div>

                    <div className="col-md-4">
                         <FormGroup id="inputTipo" label="Tipo">
                            <SelectMenu id="inputTipo" 
                                        lista={tipos} 
                                        name="tipo"
                                        value={this.state.tipo}
                                        onChange={this.handleChange}
                                        className="form-control" />
                        </FormGroup>
                    </div>

                    <div className="col-md-4">
                         <FormGroup id="inputStatus" label="Status">
                            <input type="text" 
                                   className="form-control" 
                                   name="status"
                                   value={this.state.status}
                                   disabled />
                        </FormGroup>
                    </div>

                   
                </div>
                <div className="row">
                     <div className="col-md-6" >
                        { this.state.atualizando ? 
                            (
                                <button onClick={this.atualizar} 
                                        className="btn btn-success">
                                        <i className="pi pi-refresh"></i> Atualizar
                                </button>
                            ) : (
                                <button onClick={this.submit} 
                                        className="btn btn-success">
                                        <i className="pi pi-save"></i> Salvar
                                </button>
                            )
                        }
                        <button onClick={e => this.props.history.push('/consultaLancamento')} 
                                className="btn btn-danger">
                                <i className="pi pi-times"></i>Cancelar
                        </button>
                    </div>
                </div>
            </Card>
        )
    }
}

export default withRouter(CadastroLancamentos);