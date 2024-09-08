// https://www.youtube.com/watch?v=PyrMT0GA3sE

/**
 * criar API de usuarios
 * 
 * - criar um usuario
 * - listar todos os usuarios
 * - editar um usuario
 * - deletar um usuario
 */



import express, { response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
//importando biblioteca instalada

const app = express()
//garantia de usar o json
app.use(express.json())


const users = []

//salvar users
app.post('/usuarios',async (request, response) => {
    // console.log(request.body)
    await prisma.user.create({
        data: {
            email: request.body.email,
            name: request.body.name,
            age: request.body.age
        }
    })

    response.status(201).json(request.body)
})

//listar users
app.get('/usuarios',async (request, response) => {

    let users = []
    if(request.query) {
         users = await prisma.user.findMany ({
            where: {
                name:request.query.name,
                email:request.query.email,
                age:request.query.age
            }
         })
    } else {
        const users = await prisma.user.findMany()

    }
    // console.log(request)

    response.status(200).json(users)

    // response.send('OK, get funcionando')
})
                    //req, res

app.put('/usuarios/:id',async (request, response) => {
    // console.log(request.body)
   
    await prisma.user.update({
        where: {
            id: request.params.id
        },
        
        data: {
            email: request.body.email,
            name: request.body.name,
            age: request.body.age
        }
    })

    response.status(201).json(request.body)
})


app.delete('/usuarios/:id', async (request, response) => {
    
    await prisma.user.delete ({
        where: {
            id: request.params.id
        }
    })

response.status(200).json({ message: "Usuário deletado com sucesso!"})
})
app.listen(3000)
