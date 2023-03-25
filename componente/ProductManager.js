
const fs = require('fs');

class ProductManager {
  constructor() {
    this.products = [];
    this.patch = "productos.txt";
  }
  static id = 0


  addProduct = async (title, description, thumbnail, price, code, stock) => {

    ProductManager.id++

    let newProduct = {
        title,
        description,
        thumbnail,
        price,
        code,
        stock,
        id: ProductManager.id
    }

    this.products.push(newProduct)

    await fs.promises.writeFile(this.patch, JSON.stringify(this.products))
}

  readProducts = async () => {
     try {
        const productos = await fs.promises.readFile(this.patch, 'utf-8');
        return JSON.parse(productos);
    }catch(err){
        if(err.message.includes('no existe')) return [];
        console.log(`error: ${err.message}`);
    }
  }

  getProducts = async () => {
      let respuesta2 = await this.readProducts()
      return console.log(respuesta2)
  }

  getProductsById = async (id) => {
      let respuesta3 = await this.readProducts()
      if (!respuesta3.find(product => product.id === id)){
          console.log("Product not found")
      } else {
          console.log(respuesta3.find(product => product.id === id))
      }
  }

  deleteProductsById = async (id) => {
      let respuesta3 = await this.readProducts()
      let productFilter = respuesta3.filter(products => products.id != id)
      await fs.writeFile(this.patch, JSON.stringify(productFilter))
      console.log("Product deleted successfully")
  }

  updateProducts = async ({id, ...product}) => {
      await this.deleteProductsById(id);
      let productOld = await this.readProducts()
      let productsModified = [{...product, id}, ...productOld]
      await fs.writeFile(this.patch, JSON.stringify(productsModified))
  }
}


const products = new ProductManager

//products.addProduct("Revesderecho Linea Premium Wool ", "Equilibrio perfecto entre nobleza y calidez. No te arrepentirás!  100% Lana ahora es Wool, si decides comprarlo ahora, lo recibirás como Wool.  Al finalizar tu proyecto, te sugerimos bloquearlo para que la prenda quede pareja y se luzca mejor.  Lavado: a mano sin estrujar, agua fría y secado idealmente sobre una toalla en forma horizontal", "https://http2.mlstatic.com/D_NQ_NP_2X_827193-MLC46449211048_062021-F.webp", "$4.990", "0001", "100")
//products.addProduct("Product1", "Description1", "Image1", 2000, "0002", 50)
//products.addProduct("Product3", "Description1", "Image1", 2000, "0002", 50)
// products.getProducts()
//products.getProductsById(1)
//products.deleteProductsById(1)

module.exports = ProductManager;