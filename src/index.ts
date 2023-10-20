// import { tusers, tprodutos, getAllUsers, createUser, getProducts, createProduct, searchProductsByName } from "./database"
import express, { Request, Response } from 'express'
import cors from 'cors';
import { products, users } from "./types";
import { db } from "./database/knex";
import { error } from "console";


const app = express()
app.use(express.json())
app.use(cors())


app.listen(3003, () => {
    console.log('Servidor rodando na porta 3003')
})

app.get('/ping', (req: Request, res: Response) => {
    res.send('Pong2')
})

app.get('/users', async (req: Request, res: Response) => {
    try {

        //const result = await db.raw(`SELECT * FROM users`)
        const result = await db('users')
        res.status(200).send(result)
    } catch (error) {
       
    }
})

app.get('/products/', async (req: Request, res: Response) => {
    try {
      const {name}= req.query
         if(name){
            const result = await db('produtos').select().where('name','=',`${name}`)
            res.status(200).send(result)
        
         }else{
        const result = await db('produtos')
        res.status(200).send(result)
        
         }
        
       
    } catch (error) {
        res.send('aqui deu erro');
    }
})

app.get('/purchase/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const [result] = await db.select("*").from("purchases_products").join('purchase', 'purchase_id', '=', 'id').where('purchase_id', '=', `${id}`).andWhere('id', '=', `${id}`)
        const [user] = await db.select('id', 'name', 'email').from('users').where('id', '=', `${result.buyer}`)
        const produt = await db.select('id', 'name', 'price', 'description', 'image_url', 'quantity').from('produtos').join('purchases_products', 'product_id', '=', 'id').where('purchase_id', '=', `${id}`)
        console.log(result, ' agora o comprador', user)
        console.log(produt)

        const resultComplet = {
            purchaseId: result.purchase_id,
            buyerId: user.id,
            buyerName: user.name,
            buyerEMail: user.email,
            totalPrice: result.total_price,
            createdAt: result.created_at,
            products: produt
        }
        res.status(200).send(resultComplet)
    } catch {
        res.send('aqui deu erro');
    }
})

app.post('/users', async (req: Request, res: Response) => {
    try {
        const { id, name, email, password, createdAt }: users = req.body
        
        if (!id || !name || !email || !password || !createdAt) { //undefined
            res.status(400)
            throw new Error("Dados inválidos!")
        }
        const newUser = {
            id: id,
            name: name,
            email: email,
            password: password,
            creat_at: createdAt
        }
        //await db.raw(`INSERT INTO users VALUES ('${id}','${name}','${email}','${password}','${createdAt}')`)
        await db('users').insert(newUser)
        res.status(201).send('Cadastro realizado com sucesso')
    } catch (error: any) {
        res.send(error.message)
    }
})

app.post('/products', async (req: Request, res: Response) => {
    try {
        const { id, name, price, description, imageUrl }: products = req.body
        //  const searchProdId = tprodutos.find((prod) => prod.id === id)
        //  if(searchProdId){
        //     throw new Error("Id  Ja Cadastrados. Por favor insira novos dados");
        //  }
        const newProduct = {
            id,
            name,
            price,
            description,
            image_url: imageUrl
        }

        //await db.raw(`INSERT INTO produtos VALUES ('${id}','${name}','${price}','${description}','${imageUrl}')`)
        await db('produtos').insert(newProduct)
        res.status(201).send('Produto cadastrado com sucesso')
    } catch (error) {
        if (error instanceof Error) {
            res.send(error.message);
        }
    }
})

app.post('/purchases', async (req: Request, res: Response) => {

    try {

        const { id, buyer, products } = req.body
        let total = 0.0
        if(!id){
            throw new Error('Id invalido')
        }
        if(!buyer){
            throw new Error('Usuario invalido')
        }
        console.log(products[0].id,products[0].quantity,id)
        console.log(products.length)
        for(let i=0;i< products.length;i++){
            if(products[i]){
            let [p2] = await db.raw(`SELECT price FROM produtos WHERE id ='${products[i].id}'`)
            console.log(p2)
            total = total + (p2.price*products[i].quantity)
            }
            else{
                throw new Error('Produto invalido')
            }
        }
        console.log(total)
        await db.raw(`INSERT INTO purchase VALUES ('${id}','${buyer}','${total}','14/10/2023')`)
       

             products.map(async (element: {
              quantity: number; id: string;
        }) => {
    
               await db.raw(`INSERT INTO purchases_products VALUES ('${id}','${element.id}',${element.quantity})`)
            
            });
            


        //     // const result = products.map(async (produto: { id: any; })=> await db.raw(`SELECT price FROM produtos WHERE id ='${produto.id}'`))

        //    await db.raw(`INSERT INTO purchase VALUES ('${id}','${buyer}','${total}','14/10/2023')`)
        //     //  products.forEach(async (product: { id: string; quantity: number; }) =>{

        //     //  })


        res.status(201).send('Pedido realizado com sucesso')

        // await db.raw(`INSERT INTO purchase VALUES ('${id}','${buyer}}','${price}','${description}','${imageUrl}')`)

    } catch {
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



app.delete('/purchases/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const [searchId] = await db.raw(`SELECT * FROM purchases_products WHERE purchase_id='${id}'`)
       
        if (!searchId) {
            throw new Error("Produto não encontrado")
        }
        await db.raw(`DELETE FROM purchases_products WHERE purchase_id='${id}' `)
        await db.raw(`DELETE FROM purchase WHERE id='${id}' `)

        res.status(200).send('Pedido cancelado com sucesso')
    } catch (error) {
        if (error instanceof Error) {
            res.send(error.message)
        }
    }
})

app.put('/products/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        // const searchId = tprodutos.find((prod)=>prod.id===id)
        // if(!searchId){
        //     throw new Error("Produto não existe")
        // }
        const newID = req.body.id
        const newName = req.body.name as string | undefined
        const newPrice = req.body.price as number | undefined
        const newDescription = req.body.description as string | undefined
        const newImageUrl = req.body.imageUrl as string | undefined

        // const prodEdit = tprodutos.find((prod) => prod.id === id) as products

        const [prodEdit] = await db.raw(`SELECT * FROM produtos WHERE id = '${id}'`)
        console.log(prodEdit)

        if (prodEdit) {
            await db.raw(`UPDATE produtos SET
        id='${newID || prodEdit.id}', name='${newName || prodEdit.name}', price='${newPrice || prodEdit.price}', 
        description ='${newDescription || prodEdit.description}', image_url='${newImageUrl || prodEdit.image_url}'  WHERE id = "${id}"
        `)
        } else {
            res.status(400);
            throw new Error('Id não encontrado!');
        }

        console.log(prodEdit)
        res.status(200).send({ mensagem: 'o item foi Alterado com sucesso' })
    } catch (error) {
        if (error instanceof Error) {
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
