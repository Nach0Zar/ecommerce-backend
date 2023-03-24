const axios = require('axios');
const { container } = require('../../src/containers/productFactory.js')
describe('Integration Test', () => {
    const product = {
        title: "productName",
        price: 12,
        thumbnail: "asd"
    }
    beforeEach(async ()=>{
        await container.deleteAll();
    })
    describe('routing', () => {

        it('creacion de un producto', async () => {
            
            const { data: resultado, status } = await axios.post('http://localhost:8080/api/productos', product)
            if (status !== 201) throw new Error('el estado debe ser 201')
            if (!resultado) throw new Error('el producto creado es nulo')
            if (!resultado) throw new Error('el producto creado no tiene id')
        })

        it('consultar todos los productos', async () => {
            await axios.post('http://localhost:8080/api/productos', product)
            let { data: productos, status }  = await axios.get('http://localhost:8080/api/productos');

            if (status !== 200) throw new Error('el estado debe ser 200')
            if (!productos || productos.length == 0) throw new Error('No se encontraron productos')

        })

        it('consulta de un producto', async () => {
            //elegir num del 12 al 50
            let productID = 12
            let { data: productoBuscado, status }  = await axios.get(`http://localhost:8080/api/productos/${productID}`);
            
            if (status !== 200) throw new Error('el estado debe ser 200')
            if (!productoBuscado) throw new Error('No se encontró el producto')
            if (productoBuscado.id !== productID) throw new Error('el producto encontrado no tiene el mismo id que el buscado')

        })
        it('borrar los productos identificados', async () => {
            //elegir num del 15 al 50
            let productID = 15
            let { data, status }  = await axios.delete(`http://localhost:8080/api/productos/${productID}`);
            
            if (status !== 200) throw new Error('el estado debe ser 200')

        })
    })
})