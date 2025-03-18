import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app  = express()
app.use(express.json())

app.post('/users', async (req, res) => {
    
    await prisma.user.create({
        data: {
            name: req.body.name,
            age: req.body.age,
            email: req.body.email
        }
    })

    res.status(201).json(req.json)
})

app.get('/users', async (req, res) => {

    const users = await prisma.user.findMany()

    res.status(200).json(users)
})

app.put('/Users/:id', async (req, res) => {

    await prisma.user.update({
        where: {
            id: req.params.id
        },
        data:{
            name: req.body.name,
            age: req.body.age,
            email: req.body.email
        }
    })
    res.status(200).json(req.body)
})

app.delete('/Users/:id', async (req, res) => {

    await prisma.user.delete({
        where: {
            id: req.params.id,
        },
    })
    res.status(200).json({ message: 'User deleted' })
})

app.listen(3000)

//eoMjNwt3P93uyhPn
//leonardo