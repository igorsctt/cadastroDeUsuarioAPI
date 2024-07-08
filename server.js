import express, { response } from 'express'; // Importa o módulo express
import cors from 'cors';
import { PrismaClient } from '@prisma/client'; // Importa o Prisma Client

const prisma = new PrismaClient(); // Cria uma nova instância do Prisma Client
const app = express(); // Cria uma instância do Express
app.use(express.json()); // Middleware para analisar o corpo das requisições em JSON
app.use(cors())

// Rota para obter todos os usuários
app.get('/usuarios', async (req, res) => {
    console.log(response.data)
    try {
        const users = await prisma.user.findMany(); // Busca todos os usuários no banco de dados
        res.status(200).json(users); // Retorna a lista de usuários com status 200 (OK)
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar usuários" }); // Retorna um erro com status 500 (Internal Server Error)
    }
});

// Rota para criar um novo usuário
app.post('/usuarios', async (req, res) => {
    try {
        const newUser = await prisma.user.create({
            data: {
                email: req.body.email, // Obtém o email do corpo da requisição
                age: req.body.age, // Obtém a idade do corpo da requisição
                name: req.body.name // Obtém o nome do corpo da requisição
            }
        });
        res.status(201).json({ message: "Usuário criado com sucesso", user: newUser }); // Retorna o novo usuário com status 201 (Created)
    } catch (error) {
        res.status(500).json({ error: "Erro ao criar usuário" }); // Retorna um erro com status 500 (Internal Server Error)
    }
});

// Rota para atualizar um usuário existente
app.put('/usuarios/:id', async (req, res) => {
    try {
        const updatedUser = await prisma.user.update({
            where: {
                id: parseInt(req.params.id, 10) // Converte o id da string para inteiro
            },
            data: {
                email: req.body.email, // Obtém o novo email do corpo da requisição
                age: req.body.age, // Obtém a nova idade do corpo da requisição
                name: req.body.name // Obtém o novo nome do corpo da requisição
            }
        });
        res.status(200).json({ message: "Usuário atualizado com sucesso", user: updatedUser }); // Retorna o usuário atualizado com status 200 (OK)
    } catch (error) {
        res.status(500).json({ error: "Erro ao atualizar usuário" }); // Retorna um erro com status 500 (Internal Server Error)
    }
});

// Rota para deletar um usuário
app.delete('/usuarios/:id', async (req, res) => {
    try {
        await prisma.user.delete({
            where: {
                id: parseInt(req.params.id, 10) // Converte o id da string para inteiro
            }
        });
        res.status(200).json({ message: "Usuário deletado com sucesso" }); // Retorna uma mensagem de sucesso com status 200 (OK)
    } catch (error) {
        res.status(500).json({ error: "Erro ao deletar usuário" }); // Retorna um erro com status 500 (Internal Server Error)
    }
});

// Inicia o servidor na porta 3000
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
