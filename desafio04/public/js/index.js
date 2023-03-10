const socket = io()

const container = document.getElementById("container")

socket.on("newProduct", (data)=>{
    container.innerHTML += `
                                    <li>
                                        <p><b>${data.title}</b></p>
                                        <p>${data.id}</p>
                                        <p>Precio: $ ${data.price}</p>
                                        <p>Code:${data.code}</p>
                                        <p>Descripción: ${data.description}</p>
                                        <p>Stock: ${data.stock}</p>
                                        <p>Categoría: ${data.category}</p>
                                    </li>
                                    `
})

socket.on("deleteProduct", (data)=>{
    container.innerHTML = ""
    data.forEach( product => {
        container.innerHTML += `
                                        <li>
                                            <p><b>${product.title}</b></p>
                                            <p>${product.id}</p>
                                            <p>Precio: $ ${product.price}</p>
                                            <p>Code:${product.code}</p>
                                            <p>Descripción: ${product.description}</p>
                                            <p>Stock: ${product.stock}</p>
                                            <p>Categoría: ${product.category}</p>
                                        </li>
                                        `
    }) 
})

socket.on("updateProduct", (data)=>{
    container.innerHTML = ""
    data.forEach( product => {
        container.innerHTML += `
                                        <li>
                                            <p><b>${product.title}</b></p>
                                            <p>${product.id}</p>
                                            <p>Precio: $ ${product.price}</p>
                                            <p>Code:${product.code}</p>
                                            <p>Descripción: ${product.description}</p>
                                            <p>Stock: ${product.stock}</p>
                                            <p>Categoría: ${product.category}</p>
                                        </li>
                                        `
    }) 
})