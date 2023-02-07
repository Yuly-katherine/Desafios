class ProductManager {
    products = [];
    #accumId = 0;

    addProduct (title, description, price, thumbnail, code, stock) {
        const product = this.products.find((element) => {
            return element.code === code
        })

        if (product) {
            console.error(`El code: ${code} se encuentra repetido`);
        } 

        const nuevoProducto = {
            id : this.#accumId,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
        }


        if( Object.values(nuevoProducto).includes(undefined) ) {
            console.error('No se han ingresado todos los datos');
        } else {
            this.products = [...this.products, nuevoProducto]
            this.#accumId +=1;
        }
    }

    getProducts () {
        return this.products;
    }
    
    getProductById( productId ) {
        const product = this.products.find((element) => {
            return element.id === productId
        })
        if (!product) {
            console.error(`El producto con el ID ${productId} no existe`);
        } else {
            console.log(product);
        }
    }
}

//1. Se creará una instancia de la clase “ProductManager”
const checkProducts = new ProductManager();

//2. Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío []
console.log(checkProducts.getProducts())

// 3. Se llamará al método “addProduct” con los campos: 
//("producto prueba", "Este es un producto prueba”, 200, "sin imagen", "abc123", 25)
checkProducts.addProduct("producto prueba", "este es un producto prueba", 200, "sin imagen", "abc123",25)

// 4. Se llamará el método “getProducts” nuevamente, esta vez debe aparecer el producto recién agregado
console.log(checkProducts.getProducts())

//5. Se llamará al método “addProduct” con los mismos campos de arriba, debe arrojar un error porque el código estará repetido.
checkProducts.addProduct("producto prueba", "este es un producto prueba", 200, "sin imagen", "abc123",25)

//6. Se evaluará que getProductById devuelva error si no encuentra el producto 
checkProducts.getProductById(2)

//7. getProductById devuelve el producto en caso de encontrarlo
checkProducts.getProductById(0)
