import { tusers,tprodutos, getAllUsers, createUser, getProducts, createProduct, searchProductsByName } from "./database"
import  express, { Request, Response} from 'express'
import cors from 'cors';
import { products, users } from "./types";

const app = express()
app.use(express.json())
app.use(cors())


app.listen(3003,()=>{
    console.log('Servidor rodando na porta 3003')
})

app.get('/ping',(req:Request, res:Response)=>{
    res.send('Pong2')
})

app.get('/users', (req:Request, res:Response)=>{
    try{
    const result:users[] = tusers
    res.status(200).send(result)
    }catch(error){
        //res.send(error.message);
    }
})

app.get('/products', (req:Request, res:Response)=>{
    try{
    const query:string = req.query.q as string
    
    if(query && query.length<=0){
        res.statusCode = 404;
        throw new Error("A query tem q ter pelo menos um caractere");
    }

    const productByName = tprodutos.filter(produto=>produto.name === query)
    if(productByName.length){
        res.status(200).send(productByName)
    }else{
    const result:products[] = tprodutos
    res.status(200).send(result)
    }
}catch(error){
    res.send('aqui deu erro');
}
})

app.post('/users',(req:Request, res:Response)=>{
    try{
    const {id,name,email,password,createdAt}:users = req.body
    const searchUser = tusers.find((user) => user.id === id)
    const searchUserEmail = tusers.find((user) => user.email === email)
    if(searchUser || searchUserEmail){
    throw new Error("Id ou Email Ja Cadastrados. Por favor insira novos dados");
    }
    const newUser:users={
        id,
        name,
        email,
        password,
        createdAt
    }

    tusers.push(newUser)
    res.status(201).send('Usuario cadastrado com sucesso')
}catch(error:any){
    res.send(error.message)
}
})

app.post('/products',(req:Request, res:Response)=>{
    try{
    const {id,name,price,description,imageUrl}:products = req.body
     const searchProdId = tprodutos.find((prod) => prod.id === id)
     if(searchProdId){
        throw new Error("Id  Ja Cadastrados. Por favor insira novos dados");
     }
    const newProduct:products={
        id,
        name,
        price,
        description,
        imageUrl
    }

    tprodutos.push(newProduct)
    res.status(201).send('Produto cadastrado com sucesso')
}catch(error){
     if (error instanceof Error) {
            res.send(error.message);
        }
}
})

app.delete('/users/:id',(req:Request, res:Response) =>{
    try{
const id = req.params.id
const searchId = tusers.find((user)=>user.id===id)
if(!searchId){
    throw new Error("Usuario não encontrado")
}
const userDell = tusers.findIndex(user => user.id === id)
if(userDell>=0){
tusers.splice(userDell,1)
}
res.status(200).send('Usuario Deletado')
}catch(error){
    if(error instanceof Error){
        res.send(error.message)
    }
}
})

app.delete('/products/:id',(req:Request, res:Response) =>{
    try{
    const id = req.params.id
    const searchId = tprodutos.find((prod)=>prod.id===id)
    if(!searchId){
    throw new Error("Produto não encontrado")
}
    const prodEdit = tprodutos.findIndex(prod => prod.id === id)
    if(prodEdit>=0){
    tprodutos.splice(prodEdit,1)
    }
    res.status(200).send('Produto Deletado')
}catch(error){
    if(error instanceof Error){
        res.send(error.message)
    }
}
    })

    app.put('/products/:id', (req:Request, res:Response) =>{
        try{
        const id = req.params.id
        const searchId = tprodutos.find((prod)=>prod.id===id)
        if(!searchId){
            throw new Error("Produto não existe")
        }
       const  newName = req.body.name as string | undefined
       const newPrice =req.body.price as number | undefined
       const newDescription = req.body.description as string | undefined
       const newImageUrl = req.body.imageUrl as string | undefined

        const prodEdit = tprodutos.find((prod) => prod.id === id) as products

        prodEdit.name = newName || prodEdit.name
        prodEdit.description = newDescription || prodEdit.description
        prodEdit.imageUrl = newImageUrl|| prodEdit.imageUrl
        prodEdit.price = newPrice || prodEdit.price

    console.log(prodEdit)
    res.status(200).send({mensagem:'o item foi Alterado com sucesso'})
        }catch(error){
            if(error instanceof Error){
                res.send(error.message)
            }
        }
    })


// console.log('O aplicativo foi iniciado')
// createUser(3,'gleice','gleice@gmail.com','45689')
// getAllUsers()
// createProduct(3,'camisa', 20,'só uma camisa','asdfvbbbbbb')
// getProducts()

// console.table(searchProductsByName('caixa'))