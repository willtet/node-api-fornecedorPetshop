const Modelo = require('./modeloTabelaFornecedores')
const NotFound  = require('../../error/NotFound')

module.exports = {
    listar(){
        return Modelo.findAll({ raw: true })
    },

    inserir(fornecedor){
        return Modelo.create(fornecedor)
    },

    async listarId(id){
        const found = await Modelo.findOne({
            where: {
                id: id
            }
        }) 
        if(!found){
            throw new NotFound('Fornecedor não encontrado')
        }

        return found
    },

    async atualizar(id, dadosAtualizacao){
        const found = await Modelo.update(
            dadosAtualizacao,
            {
                where:
                    {id: id}
            }
        ) 
        if(!found){
            throw new NotFound('Fornecedor não encontrado')
        }

        

        return found
    },

    async deletar(id){
        return await Modelo.destroy({
            where: {
                id: id
            }
        })
    },
}