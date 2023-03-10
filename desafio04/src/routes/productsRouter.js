import { Router, json } from 'express';
import ProductManager from '../manager/productos.js';


const manager = new ProductManager();
const productsRouter = Router();
productsRouter.use(json())


productsRouter.get('/', async(req, res) => {
    const products = await manager.getProducts();
    const { limit } = Number(req.query);

    if(limit) {
     res.send(products.slice(0, limit));
    }else{
     res.send(products);
    } 
})


productsRouter.get('/:id', async(req, res) => {
    const ProductId  = Number(req.params.id);
    const productById = await manager.getProductById(ProductId);

    if (!productById) {
      return res
      .status(404)
      .send( {error:`El producto con el id: ${id} no existe`})
  }
  res.send(productById);
});

productsRouter.post('/', async(req, res) => {
    const  {title, description, price, code, stock, category} = req.body;
    const productProperties = {title, description, price, code, stock, category}

    if (Object.values(productProperties).includes(undefined)) {
        return res.status(400).send({error: "No se han ingresado todos los datos"})
    } 
    const products = await manager.getProducts();
    const newProduct ={
        ...req.body,
        thumbail:[],
        status:true,
        id: await manager.updateId(products),
    }
    await manager.addProduct(title, description, price, code, stock, category)
    req.socketServer.emit("newProduct", newProduct)
    res.status(201).send(newProduct);
});


productsRouter.put('/:id', async(req, res) => {
    const productId = Number(req.params.id);
    await manager.updateProduct(productId, req.body)
    const updateProduct =  await manager.getProductById(productId)
    if (!updateProduct) {
    return res.status(400).send({error: "No se han ingresado todos los datos"}) 
    }
    res.status(201).send(updateProduct);
    req.socketServer.emit("updateProduct", updateProduct)   
});

productsRouter.delete('/:id', async(req, res) => {   
    const productId = Number(req.params.id);
    await manager.deleteProduct(productId);
    const products = await manager.getProducts();
    res.status(201).send(products);
    req.socketServer.emit("deleteProduct", products) 
})

export default productsRouter;