"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchProductsByName = exports.getProducts = exports.createProduct = exports.getAllUsers = exports.createUser = exports.tprodutos = exports.tusers = void 0;
exports.tusers = [
    {
        id: 1,
        name: 'junir',
        email: 'junior@email.com',
        password: '123456',
        createdAt: 'asdfg'
    },
    {
        id: 2,
        name: 'fulano',
        email: 'fulano@email.com',
        password: '123456',
        createdAt: 'asdfg'
    }
];
exports.tprodutos = [
    {
        id: 1,
        name: 'caixa',
        price: 10,
        description: 'caixa de som',
        imageUrl: 'asdfg123'
    },
    {
        id: 2,
        name: 'mouse',
        price: 100,
        description: 'mouse optico',
        imageUrl: 'asdfg123'
    }
];
function createUser(id, name, email, password) {
    const newUser = {
        id: id,
        name: name,
        email: email,
        password: password,
        createdAt: new Date().toISOString()
    };
    exports.tusers.push(newUser);
    console.log("Cadastro realizado com sucesso");
}
exports.createUser = createUser;
function getAllUsers() {
    console.table(exports.tusers);
}
exports.getAllUsers = getAllUsers;
function createProduct(id, name, price, description, imageUrl) {
    const newProd = {
        id: id,
        name: name,
        price: price,
        description: description,
        imageUrl: imageUrl
    };
    exports.tprodutos.push(newProd);
    console.log("Cadastro de Produto realizado com sucesso");
}
exports.createProduct = createProduct;
function getProducts() {
    console.table(exports.tprodutos);
}
exports.getProducts = getProducts;
function searchProductsByName(name) {
    const findProd = exports.tprodutos.filter((produto) => produto.name.toLowerCase() === name.toLowerCase());
    return findProd;
}
exports.searchProductsByName = searchProductsByName;
//# sourceMappingURL=database.js.map