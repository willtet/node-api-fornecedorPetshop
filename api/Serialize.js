const TypeNotSupported = require('./error/TypeNotSupported')
const jsonToXml = require('jsontoxml')

class Serialize {
    json(data){
        return JSON.stringify(data)
    }

    xml(data){
        let tag = this.tagSingular
        if(Array.isArray(data)){
            tag = this.tagPlural
            data = data.map(item => {
                return {
                    [this.tagSingular] : item
                }
            })
        }
        return jsonToXml({[tag] : data})
    }

    serialize(data){
        data = this.filter(data)
        if(this.contentType === 'application/json'){
            return this.json(data)
        }

        if(this.contentType === 'application/xml'){
            return this.xml(data)
        }

        throw new TypeNotSupported(this.contentType)
    }

    filterObject(data){
        const dataFiltered = {}

        this.publicData.forEach((campo)=>{
            if(data.hasOwnProperty(campo)){
                dataFiltered[campo] = data[campo]
            }
        })

        return dataFiltered

    }

    filter(data) {
        if (Array.isArray(data)) {
            data = data.map(item => {
                return this.filterObject(item)
            })
        } else {
            data = this.filterObject(data)
        }

        return data
    }
}

class SerializeFornecedor extends Serialize{
    constructor(contentType, extra){
        super()
        this.contentType = contentType
        this.publicData = ['id', 'empresa', 'categoria'].concat(extra || [])
        this.tagSingular = 'fornecedor'
        this.tagPlural = 'fornecedores'
    }
}

class SerializeError extends Serialize{
    constructor(contentType, extra){
        super()
        this.contentType = contentType
        this.publicData = ['id', 'mensagem'].concat(extra || [])
        this.tagSingular = 'erro'
        this.tagPlural = 'erros'
    }
}

module.exports = {
    Serialize: Serialize,
    SerializeFornecedor: SerializeFornecedor,
    SerializeError: SerializeError,
    acceptFormat : ['application/json','application/xml']
}