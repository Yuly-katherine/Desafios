import ProductManager from './productManager.js';
import express from 'express';

const app = express();
const manager = new ProductManager();

app.get("/products", async (req, res) =>{
   const products = await manager.getProducts();
   const { limit } = req.query;

   if(limit) {
    res.send(products.slice(0, limit));
   }else{
    res.send(products);
   }
})

app.get("/products/:id", async (req, res) =>{
   const { id } = req.params;
    const productById = await manager.getProductById(parseInt(id));

    if (!productById) {
      return res
      .status(404)
      .send(`El producto con el id: ${id} no existe`)
  }
  res.send(productById);
});

app.listen(8080, ()=>{
   console.log("Server listening on port 8000");
});

