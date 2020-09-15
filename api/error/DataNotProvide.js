class DataNotProvide extends Error{
    constructor(){
        super('Não foram fornecidos dados necessarios para atualização')
        this.name = 'DataNotProvide'
        this.idErro = 2
    }
}

module.exports = DataNotProvide