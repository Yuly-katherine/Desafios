import { json, Router } from "express";
import ProductManager from '../manager/productos.js';


const manager = new ProductManager();
const viewsRouter = Router()
viewsRouter.use(json())

viewsRouter.get("/", async (req,res)=>{
    const products = await manager.getProducts()
    console.log(products)
    res.render("home", {products})
})

viewsRouter.get("/real-time-products", async (req,res)=>{
    const products = await manager.getProducts()
    res.render("real_time_products" , {products})            
    
})

export default viewsRouter