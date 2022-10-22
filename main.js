const Container = require('./main/classes/container.js')
const {connect} = require('./server.js')
const fs = require('fs')
let filepath = "./productos.txt";
async function testConnection(){
    try {
        const serv = await connect(8080)
        console.log(`Successfully connected to port ${serv.address().port}`)
        
    } catch (error) {
        console.log(error)
    }
}
async function testContainer(){
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
    const container = new Container(filepath, fs, items, iDCounter);
    await container.save(product1)
    await container.save(product3)
    console.log(container.getAll());
    await container.save(product2)
    await container.deleteAll()
    console.log(container.getAll());
    await container.save(product3)
    console.log(container.getAll());
    await container.saveDataOnFile();
}
testConnection()
//testContainer();