const express = require('express')
const bodyParser = require('body-parser')
const config = require('config')

const routerFornecedor = require('./routes/fornecedores')
const NotFound = require('./error/NotFound')
const InvalidField = require('./error/InvalidField')
const DataNotProvide = require('./error/DataNotProvide')
const TypeNotSupported = require('./error/TypeNotSupported')

const acceptFormat = require('./Serialize').acceptFormat
const SerializerError = require('./Serialize').SerializeError

const app = express()

app.use(bodyParser.json())
app.use((req,res,next)=>{
    let reqFormat = req.header('Accept')
    if(reqFormat === '*/*'){
        reqFormat = 'application/json'
    }
    if(acceptFormat.indexOf(reqFormat) === -1){
        res.status(406)
        res.end()
    }
    res.setHeader('Content-Type',reqFormat)
    next()
})

app.use('/api/fornecedores',routerFornecedor)
app.use((erro, req, res, next)=>{
    let status = 500

    if(erro instanceof NotFound){
        status = 404
    }
    if(erro instanceof InvalidField || erro instanceof DataNotProvide){
        status = 400
    }
    if(erro instanceof TypeNotSupported){
        status = 406
    }

    const error = new SerializerError(res.getHeader('Content-Type'))
    res.status(status)
    res.send(
        error.serialize({
            mensagem: erro.message,
            id: erro.idError 
        })
    )
})

app.listen(config.get('api.port'), ()=>{
    console.log(`Api rodando na porta ${config.get('api.port')}`);
})