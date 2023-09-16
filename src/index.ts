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
    const result:users[] = tusers
    res.status(200).send(result)
})

app.get('/products', (req:Request, res:Response)=>{
    const query:string = req.query.q as string
    const productByName = tprodutos.filter(produto=>produto.name === query)
    if(productByName.length){
        res.status(200).send(productByName)
    }else{
    const result:products[] = tprodutos
    res.status(200).send(result)
    }
})

app.post('/users',(req:Request, res:Response)=>{
    const {id,name,email,password,createdAt}:users = req.body
    const newUser:users={
        id,
        name,
        email,
        password,
        createdAt
    }

    tusers.push(newUser)
    res.status(201).send('Usuario cadastrado com sucesso')
})

app.post('/products',(req:Request, res:Response)=>{
    const {id,name,price,description,imageUrl}:products = req.body
    const newProduct:products={
        id,
        name,
        price,
        description,
        imageUrl
    }

    tprodutos.push(newProduct)
    res.status(201).send('Produto cadastrado com sucesso')
})



// console.log('O aplicativo foi iniciado')
// createUser(3,'gleice','gleice@gmail.com','45689')
// getAllUsers()
// createProduct(3,'camisa', 20,'só uma camisa','asdfvbbbbbb')
// getProducts()

// console.table(searchProductsByName('caixa'))