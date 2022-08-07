import React from 'react'
import currentyFormatter from 'currency-formatter'
export default props => {

    const rows = props.lancamento.map(lancamento => {
        return (
            <tr key={lancamento.id}>
                <td>{lancamento.descricao}</td>
                <td>{currentyFormatter.format(lancamento.valor, {locale: 'pt-BR'})}</td>
                <td>{lancamento.tipo}</td>
                <td>{lancamento.mes}</td>
                <td>{lancamento.status}</td>
                <td>
                    <button onClick={e => props.alterarStatus(lancamento, 'EFETIVADO')} title="Efetivado"
                            type="button" className='btn btn-success'
                            disabled={lancamento.status !== 'PENDENTE'}>
                            <i class="pi pi-check"></i>
                    </button>
                    
                    <button onClick={e => props.alterarStatus(lancamento, 'CANCELADO')} title="Cancelado"
                            type="button" className='btn btn-warning'
                            disabled={lancamento.status !== 'PENDENTE'}>
                            <i class="pi pi-times"></i>
                    </button>

                    <button type="button" title="Editar"
                            className="btn btn-primary"
                            onClick={e => props.editAction(lancamento.id)}>
                            <i class="pi pi-pencil"></i>
                    </button>
                    <button type="button" title="Excluir"
                            className="btn btn-danger" 
                            onClick={ e => props.deleteAction(lancamento)}>
                            <i class="pi pi-trash"></i>
                    </button>
                </td>
            </tr>
        )
    })
    
    return (
        <table className="table table-hover">
            <thead>
                <tr>
                    <th scope="col">Descrição</th>
                    <th scope="col">Valor</th>
                    <th scope="col">Tipo</th>
                    <th scope="col">Mês</th>
                    <th scope="col">Situação</th>
                    <th scope="col">Ações</th>
                </tr>
            </thead>

            <tbody>
                {rows}
            </tbody>
          
        </table>
    )
}