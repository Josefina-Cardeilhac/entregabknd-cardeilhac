const fs = require("fs").promises; 


class ProductManager {
    static ultId = 0; 

    constructor(path) {
        this.products = [];
        this.path = path;
    }

    async addProduct(title, description, price, img, code, stock) {

        if(!title || !description || !price || !img || !code || !stock) {
            console.log("Todos los campos son obligatorios"); 
            return;
        }

    
        if(this.products.some(item => item.code === code)) {
            console.log("El code debe ser unico");
            return; 
        }

      

        const nuevoProducto = {
            id: ++ProductManager.ultId,
            title, 
            description, 
            price,
            img,
            code,
            stock
        };

       
        this.products.push(nuevoProducto);
        
    
        await this.guardarArchivo(this.products);

    }

    
    async getProducts() {
        let arrayProductos = await this.leerArchivo(); 
        return arrayProductos; 
    }

    
    getProductById(id) {
        const producto = this.products.find(item => item.id === id);

        if (!producto) {
            console.error("Not Found");
        } else {
            console.log("El producto buscado:", producto);
        }
    }

   
    async guardarArchivo(arrayProductos) {
        try {
            await fs.writeFile(this.path, JSON.stringify(arrayProductos, null, 2));
        } catch (error) {
            console.log("Error al guardar el archivo: ", error);
        }
    }

    async leerArchivo() {
        try {
            const respuesta = await fs.readFile(this.path, "utf-8");
            const array = JSON.parse(respuesta);
            return array; 

        } catch (error) {
            console.log("Error al leer el archivo: ", error);
        }
    }
}





const manager = new ProductManager("./productos.json"); 




const agregarProducto = async () => {
    await manager.addProduct("Iphone 14 128gb", "camara 12+12mp", 2075400, "Sin imagen", "i14", 20);
    await manager.addProduct("Iphone 13 64gb", "camara 8+8mp", 560000, "Sin imagen", "i13", 15);
}



agregarProducto(); 

const retornarProductos = async () => {
    let respuesta = await manager.getProducts();
    console.log(respuesta);
}

retornarProductos(); 








