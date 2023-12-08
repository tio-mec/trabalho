import {fastify} from 'fastify'
import { DatabaseMemory } from './database-memory.js'

const database = new DatabaseMemory()
const server = fastify()

server.get('/', () => {
    return 'Rota padrão'
})

server.post('/reparo', (request, reply) => {
// Acessando dados do corpo da requisição
    const {loja, precoreparo, nconcertos} = request.body
// Exibindo dados
//    console.log(body)
   
    // return 'cadastrar'
    database.create({
        loja: loja,
        precoreparo: precoreparo,
        nconcertos: nconcertos,
    })

    return reply.status(201).send
})

server.get('/reparo', (request) => {
    const search = request.query.search
    console.log(search)
    const reparos = database.list(search)
    console.log(reparos)
    return reparos
})

server.put('/reparos/:id', (request, reply) => {
    const reparoId = request.params.id
    const {loja, precoreparo, nconcertos} = request.body
    database.update(reparoId, {
        loja: loja,
        precoreparo: precoreparo,
        nconcertos: nconcertos,
    })
    return reply.status(204).send()
})

server.delete('/reparos/:id', (request, reply) => {
    const reparoId = request.params.id

    database.delete(reparoId)

    return reply.status(204).send()
}) 

server.listen({
    port: 3333,
})