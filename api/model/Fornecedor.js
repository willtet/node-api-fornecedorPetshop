const tabelaFornecedores = require('../routes/fornecedores/tabelaFornecedores')
const InvalidField = require('../error/InvalidField')
const DataNotProvide = require('../error/DataNotProvide')


class Fornecedor{
    constructor({id, empresa, email, categoria, dataCriacao, dataAtualizacao, versao}){
        this.id = id,
        this.empresa = empresa,
        this.email =email,
        this.categoria = categoria,
        this.dataCriacao = dataCriacao,
        this.dataAtualizacao = dataAtualizacao,
        this.versao = versao
    }

    async criar(){
        this.validar()
        const result = await tabelaFornecedores.inserir({
            empresa: this.empresa,
            email: this.email,
            categoria: this.categoria
        })

        this.id = result.id
        this.dataCriacao = result.dataCriacao
        this.dataAtualizacao = result.dataAtualizacao
        this.versao = result.versao


    }

    async carregar(){
        const fornecedor = await tabelaFornecedores.listarId(this.id)
        this.empresa = fornecedor.empresa,
        this.email = fornecedor.email,
        this.categoria = fornecedor.categoria,
        this.dataCriacao = fornecedor.dataCriacao,
        this.dataAtualizacao = fornecedor.dataAtualizacao,
        this.versao = fornecedor.versao
    }

    async atualizar(){
        const fornecedor = await tabelaFornecedores.listarId(this.id)
        const campos = ['empresa', 'email', 'categoria']
        const dadosAtualizacao = {}

        campos.forEach((campo)=>{
            const valor = this[campo]
            if(typeof valor === 'string' && valor.length > 0){
                dadosAtualizacao[campo] = valor
            }
        })

        if(Object.keys(dadosAtualizacao).length === 0){
            throw new DataNotProvide()
        }

        await tabelaFornecedores.atualizar(this.id, dadosAtualizacao)
    }

    async deletar(){
        return await tabelaFornecedores.deletar(this.id) 
    }

    validar(){
        const campos = ['empresa','email','categoria']
        
        campos.forEach((campo)=>{
            const valor = this[campo]
            if(typeof valor !== 'string' || valor.length == 0){
                throw new InvalidField(campo)
            }
        })
    }
}




module.exports = Fornecedor