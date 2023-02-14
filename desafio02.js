
const fs = require("fs");

class ProductManager {
    products = [];
    #path = './products.json';

     async addProduct (title, description, price, thumbnail, code, stock) {
        this.products = await this.getProducts();
        const product = this.products.find((element) => {
            return element.code === code
        })

        if (product) {
           return console.error(`El code: ${code} se encuentra repetido`);
        } else {
            const nuevoProducto = {
                id : this.updateId(),
                title,
                description,
                price,
                thumbnail,
                code,
                stock,
            }

            if( Object.values(nuevoProducto).includes(undefined) ) {
                return console.error('No se han ingresado todos los datos');
            } else {
                this.products = [...this.products, nuevoProducto];
                await fs.promises.writeFile(this.#path, JSON.stringify(this.products));
            }
        }
    }

    async getProducts () {
        try {
            const products = await fs.promises.readFile(this.#path, "utf-8");
            return JSON.parse(products); 
        }catch(error) {
            return [];
        }
    }

    updateId() {
        if(this.products.length !== 0) {
            const ids = this.products.map( prods => prods.id);
            let maxIds = Math.max(...ids);
            return maxIds ++
        } else {
            return 0
        }
    }
    
    async getProductById( productId ) {
        this.products = await this.getProducts()
        const product = this.products.find((element) => {
            return element.id === productId
        })
        if (!product) {
            return console.error(`El producto con el ID ${productId} no existe`);
        } else {
            return product;
        }
    }

    async updateProduct( productId, newTitle, newDescription, newPrice,newThumbnail, newCode, newStock ) {
        this.products = await this.getProducts()
        const index = this.products.findIndex((element) => {
            return element.id === productId
        })
        if (index === -1){
            return console.error(`El producto con el ID ${productId} no existe`);
        } else {
            const actualizarProducto = {
                id : productId,
                title: newTitle || this.products[index].title,
                description: newDescription || this.products[index].description,
                price: newPrice || this.products[index].price,
                thumbnail: newThumbnail || this.products[index].thumbnail,
                code: newCode || this.products[index].code,
                stock: newStock || this.products[index].stock
            }
            this.products[index] = actualizarProducto;
            await fs.promises.writeFile(this.#path, JSON.stringify(this.products));
        }
    }

    async deleteProduct( productId ) {
        this.products = await this.getProducts()
        const index = this.products.findIndex((element) => {
            return element.id === productId
        })
        if (index === -1) {
            return console.error(`El producto con el ID ${productId} no existe`);
        } else {
            this.products.splice(index, 1);
            console.log(this.products)
            await fs.promises.writeFile(this.#path, JSON.stringify(this.products));
        }
    }
}

async function main(){
    //1. Se creará una instancia de la clase “ProductManager”
    const manager = new ProductManager();

    //2. Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío []
    console.log(await manager.getProducts(), "productos")

    // 3. Se llamará al método “addProduct”
    await manager.addProduct("camiseta", "camiseta talla-s color azul", 70, "sin imagen", "#ref1569", 8)
    await manager.addProduct("jeans", "jeans talla-10", 220, "sin imagen", "#ref9456", 5)
    await manager.addProduct("buso", "tejido talla-M", 130, "sin imagen", "#ref4620", 3)
    await manager.addProduct("Tenis", "deportivos blancos", 300, "sin imagen", "#ref8915", 6)

    console.log(await manager.getProducts(), "Productos agregados")

    //4. Se llamará al método “getProductById”,se corroborará que devuelva el producto con el id especificado, en caso de no existir, debe arrojar un error

    console.log(await manager.getProductById(0), "getProductById, con id 0",)
    console.log(await manager.getProductById(6), "getProductById, con id 6",)

    //5. Se llamará al método “updateProduct” y se intentará cambiar un campo de algún producto, se evaluará que no se elimine el id y que sí se haya hecho la actualización.

    await manager.updateProduct(0, "Sudaderas", "color azul", 200, "sin imagen", "ref#9815", 9 )
    await manager.updateProduct(2, "buso tejido")

    console.log(await manager.getProducts(), "productos actualizados")

    //6. Se llamará al método “deleteProduct”, se evaluará que realmente se elimine el producto o que arroje un error en caso de no existir.

    await manager.deleteProduct(6)
    await manager.deleteProduct(2)

    console.log(await manager.getProducts(), "productos eliminados")
}

main();

