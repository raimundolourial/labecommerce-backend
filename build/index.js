"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
console.log('O aplicativo foi iniciado');
(0, database_1.createUser)(3, 'gleice', 'gleice@gmail.com', '45689');
(0, database_1.getAllUsers)();
(0, database_1.createProduct)(3, 'camisa', 20, 'só uma camisa', 'asdfvbbbbbb');
(0, database_1.getProducts)();
console.table((0, database_1.searchProductsByName)('caixa'));
//# sourceMappingURL=index.js.map