import fs from "fs";

class ProductManager {
  #path = "./src/dataManager/productos.json";

  async addProduct(title, description, price, code, stock, category) {
    const products = await this.getProducts();
    const product = products.find((element) => {
      return element.code === code;
    });

    if (product) {
      return console.error(
        `El code: ${code} se encuentra repetido, no se puede agregar el producto`
      );
    } else {
      const nuevoProducto = {
        id: await this.updateId(products),
        title,
        description,
        code,
        price,
        status: true,
        stock,
        category,
        thumbnail: [],
      };

      if (Object.values(nuevoProducto).includes(undefined)) {
        return console.error("No se han ingresado todos los datos");
      } else {
        const updateProducts = [...products, nuevoProducto];
        await fs.promises.writeFile(this.#path, JSON.stringify(updateProducts));
      }
    }
  }

  async getProducts() {
    try {
      const products = await fs.promises.readFile(this.#path, "utf-8");
      return JSON.parse(products);
    } catch (error) {
      return [];
    }
  }

  async updateId(products) {
    if (products.length === 0) {
      return 0;
    } else {
      const ids = products.map((prods) => prods.id);
      let maxIds = Math.max(...ids);
      return maxIds + 1;
    }
  }

  async getProductById(productId) {
    const products = await this.getProducts();
    const product = products.find((item) => {
      return item.id === productId;
    });
    if (!product) {
      console.error(`El producto con el ID: ${productId} no existe`);
      return {}
    } else {
      return product;
    }
  }

  async updateProduct(
    productId,
    newTitle,
    newDescription,
    newCode,
    newPrice,
    newStatus,
    newStock,
    newCategory,
    newThumbnail
  ) {
    let products = await this.getProducts();
    const index = products.findIndex((element) => {
      return element.id === productId;
    });
    if (index === -1) {
      return console.error(`El producto con el ID ${productId} no existe`);
    } else {
      const actualizarProducto = {
        id: productId,
        title: newTitle || products[index].title,
        description: newDescription || products[index].description,
        price: newPrice || products[index].price,
        thumbnail: newThumbnail || products[index].thumbnail,
        code: newCode || products[index].code,
        stock: newStock || products[index].stock,
        category: newCategory || products[index].category,
        status: newStatus || products[index].status,
      };
      products[index] = actualizarProducto;
      await fs.promises.writeFile(this.#path, JSON.stringify(products));
    }
  }

  async deleteProduct(productId) {
    let products = await this.getProducts();
    const index = products.findIndex((element) => {
      return element.id === productId;
    });
    if (index === -1) {
      return console.error(`El producto con el ID ${productId} no existe`);
    } else {
      products.splice(index, 1);
      await fs.promises.writeFile(this.#path, JSON.stringify(products));
    }
  }
}

async function main(){
    //1. Se crear?? una instancia de la clase ???ProductManager???
    // const manager = new ProductManager();

    //2. Se llamar?? ???getProducts??? reci??n creada la instancia, debe devolver un arreglo vac??o []
    // console.log(await manager.getProducts(), "productos")

    // 3. Se llamar?? al m??todo ???addProduct???
    // title, description, price, code, stock, category
    // await manager.addProduct("teclado", "teclado HP", 25, "#ref5891", 8, "tecnologia")
    // await manager.addProduct("jeans", "jeans talla-10", 220, "sin imagen", "#ref9456", 5)
    // await manager.addProduct("buso", "tejido talla-M", 130, "sin imagen", "#ref4620", 3)
    // await manager.addProduct("Tenis", "deportivos blancos", 300, "sin imagen", "#ref8915", 6)

    // console.log(await manager.getProducts(), "Productos agregados")

    //4. Se llamar?? al m??todo ???getProductById???,se corroborar?? que devuelva el producto con el id especificado, en caso de no existir, debe arrojar un error

    // console.log(await manager.getProductById(0), "getProductById, con id 0",)
    // console.log(await manager.getProductById(6), "getProductById, con id 6",)

    //5. Se llamar?? al m??todo ???updateProduct??? y se intentar?? cambiar un campo de alg??n producto, se evaluar?? que no se elimine el id y que s?? se haya hecho la actualizaci??n.

    // await manager.updateProduct(0, "Sudaderas", "color azul", 200, "sin imagen", "ref#9815", 9 )
    // await manager.updateProduct(2, "buso tejido")

    // console.log(await manager.getProducts(), "productos actualizados")

    //6. Se llamar?? al m??todo ???deleteProduct???, se evaluar?? que realmente se elimine el producto o que arroje un error en caso de no existir.

    // await manager.deleteProduct(10)
    // await manager.deleteProduct(2)

    // console.log(await manager.getProducts(), "productos eliminados")
}

main();



export default ProductManager;
