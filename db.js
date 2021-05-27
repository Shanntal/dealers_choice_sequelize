const Sequelize = require('sequelize');
const connection = new Sequelize('postgres://localhost/electronic_brands_db');




//define data array that you're going to use to complete the assignment
const data = {
    brands: ['apple', 'samsung', 'bose'],
    products: ['iPad', 'MacBook Pro', 'iphone', 'AirPods', 'iMac', 'Galaxy Note',  'Samsung Neo QLED4K', 'Chromebook', 'Galaxy Tablet', 'Bose Headphones', 'Bose Speakers', 'Bose Earbuds']
}


//define models(tables) according to data
const Brand = connection.define('brands', {
    brandName: {
        type: Sequelize.DataTypes.STRING
    }
})


const Product = connection.define('product', {
    productName: {
        type: Sequelize.DataTypes.STRING
    }
});


//create the relationships between models and within models
Product.belongsTo(Brand);
Brand.hasMany(Product);




const syncAndSeed = async() => {
    await connection.sync({ force: true });
    //here is where your tables are create based on the defintions(templates above) you gave them:
    
    const brands = await Promise.all(data.brands.map(function(brandName) {
        return Brand.create( {brandName})
    }))
    
    const products = await Promise.all(data.products.map(function(productName){
        return Product.create({ productName })
    }))
    
};




module.exports = {
    syncAndSeed,
    connection,
    models: {
        Brand,
        Product
    }
};