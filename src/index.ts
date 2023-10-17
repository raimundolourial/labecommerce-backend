import { tusers,tprodutos, getAllUsers, createUser, getProducts, createProduct, searchProductsByName } from "./database"
import  express, { Request, Response} from 'express'
import cors from 'cors';
import { products, users } from "./types";
import{db} from "./database/knex"; 
import { error } from "console";


const app = express()
app.use(express.json())
app.use(cors())


app.listen(3003,()=>{
    console.log('Servidor rodando na porta 3003')
})

app.get('/ping',(req:Request, res:Response)=>{
    res.send('Pong2')
})

app.get('/users', async (req:Request, res:Response)=>{
    try{

     const result = await db.raw(`SELECT * FROM users`)
     res.status(200).send(result)
    }catch(error){
        //res.send(error.message);
    }
})

app.get('/products', async (req:Request, res:Response)=>{
    try{
    const result  = await db.raw(`SELECT * FROM produtos`)
    // const query:string = req.query.q as string
    
    // if(query && query.length<=0){
    //     res.statusCode = 404;
    //     throw new Error("A query tem q ter pelo menos um caractere");
    // }

    // const productByName = result.filter(produto =>produto.name === query)
    // if(productByName.length){
    //     res.status(200).send(productByName)
    // }else{
    // const result:products[] = tprodutos
    res.status(200).send(result)
    // }
}catch(error){
    res.send('aqui deu erro');
}
})

app.post('/users', async (req:Request, res:Response)=>{
    try{
    const {id,name,email,password,createdAt}:users = req.body
    // const searchUser = tusers.find((user) => user.id === id)
    // const searchUserEmail = tusers.find((user) => user.email === email)
    // if(searchUser || searchUserEmail){
    // throw new Error("Id ou Email Ja Cadastrados. Por favor insira novos dados");
    // }
    if(!id || !name || !email || !password || !createdAt){ //undefined
        res.status(400)
        throw new Error("Dados inválidos!")
    }
    await db.raw(`INSERT INTO users VALUES ('${id}','${name}','${email}','${password}','${createdAt}')`)
    res.status(201).send('Cadastro realizado com sucesso')
}catch(error:any){
    res.send(error.message)
}
})

app.post('/products',async (req:Request, res:Response)=>{
    try{
    const {id,name,price,description,imageUrl}:products = req.body
    //  const searchProdId = tprodutos.find((prod) => prod.id === id)
    //  if(searchProdId){
    //     throw new Error("Id  Ja Cadastrados. Por favor insira novos dados");
    //  }
    // const newProduct:products={
    //     id,
    //     name,
    //     price,
    //     description,
    //     imageUrl
    // }
 
    await db.raw(`INSERT INTO produtos VALUES ('${id}','${name}','${price}','${description}','${imageUrl}')`)
  
    res.status(201).send('Produto cadastrado com sucesso')
}catch(error){
     if (error instanceof Error) {
            res.send(error.message);
        }
}
})

app.post('/purchases', async(req:Request, res:Response)=>{

    try{
        
    const {id,buyer,products} = req.body
    let p
    let total: number[]=[]

   
    // const result = await db.raw(`SELECT price FROM produtos WHERE id ='${products[0].id}'`)
   products.forEach(async (element: {
      quantity: number; id: any;
}) => {
        [p]=(await db.raw(`SELECT price FROM produtos WHERE id ='${element.id}'`))
       await db.raw(`INSERT INTO purchases_products VALUES ('${id}','${element.id}','${element.quantity}')`)
       total.push(p.price)       
       console.log(total)
    });
    console.log('aquitota',total)
   
    // const result = products.map(async (produto: { id: any; })=> await db.raw(`SELECT price FROM produtos WHERE id ='${produto.id}'`))
  
    await db.raw(`INSERT INTO purchase VALUES ('${id}','${buyer}','${total}','14/10/2023')`)
    //  products.forEach(async (product: { id: string; quantity: number; }) =>{
    
    //  })
    
    
    res.status(201).send('Pedido realizado com sucesso')

    // await db.raw(`INSERT INTO purchase VALUES ('${id}','${buyer}}','${price}','${description}','${imageUrl}')`)

}catch{
    console.log(error)

    if (req.statusCode === 200) {
        res.status(500)
    }

    if (error instanceof Error) {
        res.send(error.message)
    } else {
        res.send("Erro inesperado")
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

    app.delete('/purchases/:id',async (req:Request, res:Response) =>{
    try{
    const id = req.params.id
    const [searchId] = await db.raw(`SELECT * FROM purchases_products WHERE purchase_id='${id}'`)
    console.log(searchId)
    if(!searchId){
    throw new Error("Produto não encontrado")
}
    await db.raw(`DELETE FROM purchases_products WHERE purchase_id='${id}' `)
    await db.raw(`DELETE FROM purchase WHERE id='${id}' `)
    
    res.status(200).send('Pedido cancelado com sucesso')
}catch(error){
    if(error instanceof Error){
        res.send(error.message)
    }
}
    })

    app.put('/products/:id', async (req:Request, res:Response) =>{
        try{
        const id = req.params.id
        // const searchId = tprodutos.find((prod)=>prod.id===id)
        // if(!searchId){
        //     throw new Error("Produto não existe")
        // }
        const newID = req.body.id
       const  newName = req.body.name as string | undefined
       const newPrice =req.body.price as number | undefined
       const newDescription = req.body.description as string | undefined
       const newImageUrl = req.body.imageUrl as string | undefined

        // const prodEdit = tprodutos.find((prod) => prod.id === id) as products

        const [prodEdit] = await db.raw(`SELECT * FROM produtos WHERE id = '${id}'`)
        console.log(prodEdit)

if(prodEdit){
        await db.raw(`UPDATE produtos SET
        id='${newID||prodEdit.id}', name='${newName||prodEdit.name}', price='${newPrice||prodEdit.price}', 
        description ='${newDescription||prodEdit.description}', image_url='${newImageUrl||prodEdit.image_url}'  WHERE id = "${id}"
        `)
        }else{
            res.status(400);
            throw new Error('Id não encontrado!');
        }

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