import { Container } from './main/classes/container'
const product1 = {
    title: "product1",
    price: 1250,
    thumbnail: "url1"
}
const product2 = {
    title: "product2",
    price: 5100,
    thumbnail: "url2"
}
const product3 = {
    title: "product3",
    price: 6500,
    thumbnail: "url3"
}

const fs = require('fs')
let filepath = "./productos.txt";
let iDCounter;
let items;
//if file doesn't exists or if it is empty
if(!fs.existsSync(filepath) || fs.readFileSync(filepath,'utf8').length == 0){
    iDCounter = 0;
    items = [];
}
else{
    //loads previous items to the list
    items = JSON.parse(fs.readFileSync(filepath,'utf8'))
    //gets the highest ID and assigns the counter that value+1 to be the next ID to assign.
    iDCounter = Math.max(...items.map(item => item.id))+1;
}
const container = new Container(filepath, fs, items, iDCounter);
container.save(product1)
container.save(product2)
container.save(product3)
console.log(container.getAll());
container.deleteAll()
console.log(container.getAll());
container.save(product3)
console.log(container.getAll());
container.saveDataOnFile();