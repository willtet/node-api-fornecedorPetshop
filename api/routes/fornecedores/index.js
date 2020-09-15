const express = require('express')
const router = express.Router()

const tabelaFornecedor = require('./tabelaFornecedores')
const Fornecedor = require('../../model/Fornecedor')
const SerializeFornecedor = require('../../Serialize').SerializeFornecedor

router.get('/',async (req,res)=>{
    const resultado = await tabelaFornecedor.listar()
    res.status(200)
    const serialize = new SerializeFornecedor(res.getHeader('Content-Type'),)
    res.send(
        serialize.serialize(resultado)
    )

})

router.post('/',async (req,res, next)=>{
    try{
        const data = req.body
        const fornecedor = new Fornecedor(data)
        await fornecedor.criar()
        res.status(201)
        const serialize = new SerializeFornecedor(res.getHeader('Content-Type'),['email','dataCriacao','dataAtualizacao','versao'])
        res.send(
            serialize.serialize(fornecedor)
        )
    }catch(e){
        next(e)
    }
})

router.get('/:idFornecedor',async (req,res, next)=>{
    try{
        const id = req.params.idFornecedor
        const fornecedor = new Fornecedor({id:id})
        await fornecedor.carregar()
        res.status(200)
        const serialize = new SerializeFornecedor(res.getHeader('Content-Type'),['email','dataCriacao','dataAtualizacao','versao'])
        res.send(
            serialize.serialize(fornecedor)
        )
    }catch(e){
        next(e)
    }

})

router.put('/:idFornecedor',async (req,res,next)=>{
    try{
        const id = req.params.idFornecedor
        const dados = req.body
        const concatFornecedor = Object.assign({},{id:id},dados)
    
        const fornecedor = new Fornecedor(concatFornecedor)
        await fornecedor.atualizar()
        res.status(204)
        res.end()
    }catch(e){
        next(e)
    }

})

router.delete('/:idFornecedor',async (req,res, next)=>{
    try{
        const id = req.params.idFornecedor
        const fornecedor = new Fornecedor({id:id})
        await fornecedor.carregar()
        fornecedor.deletar()
        res.status(204)
        res.end()
    }catch(e){
        next(e)
    }

})



module.exports = router