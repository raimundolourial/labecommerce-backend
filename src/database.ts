import { products, users } from "./types";

export const  tusers :users[]=[
    {
        id: '1',
        name: 'junir',
        email: 'junior@email.com',
        password: '123456',
        createdAt : 'asdfg'
    },
    {
        id: '2',
        name: 'fulano',
        email: 'fulano@email.com',
        password: '123456',
        createdAt : 'asdfg'
    }
]
export const tprodutos :products[]=[
    {
        id: '1',
        name: 'caixa',
        price: 10,
        description : 'caixa de som',
        imageUrl : 'asdfg123'
    },

    {
        id: '2',
        name: 'mouse',
        price: 100,
        description : 'mouse optico',
        imageUrl : 'asdfg123'
    }
]

export function createUser(id: string, name: string, email: string, password: string){
const newUser : users = {
    id: id,
    name: name,
    email: email,
    password: password,
    createdAt : new Date().toISOString()
}

tusers.push(newUser)
console.log("Cadastro realizado com sucesso")
}

export function getAllUsers(){
    console.table(tusers)

}

export function createProduct(id: string, name: string, price: number, description: string, imageUrl:string){
    const newProd : products = {
        id: id,
        name: name,
        price: price,
        description: description,
        imageUrl : imageUrl
    }
    tprodutos.push(newProd);
    console.log("Cadastro de Produto realizado com sucesso")
}

export function getProducts(){
    console.table(tprodutos)

}

export function searchProductsByName (name:string) :products[] {
const findProd :products[] = tprodutos.filter((produto)=>produto.name.toLowerCase()=== name.toLowerCase())
return findProd;

}