class TypeNotSupported extends Error{
    constructor(contentType){
        super(`O tipo de conteudo ${contentType} não é suportado`)
        this.name = 'TypeNotSupported'
        this.idErro = 3
    }
}

module.exports = TypeNotSupported