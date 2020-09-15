const modeloTable = require('../routes/fornecedores/modeloTabelaFornecedores')

modeloTable
    .sync()
    .then(()=>console.log('modelo de tabela criado'))
    .catch((erro)=>console.log(erro))

