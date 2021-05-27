const express = require('express');
const app = express();
const db = require('./db');
const { syncAndSeed, connection, models: { Brand, Product }} = db;  


app.get('/', (req, res) => res.redirect('/brands'));

app.get('/brands', async(req, res, next) => {
    try {
        const brands = await Brand.findAll();
        res.send(`
        <html>
            <head>
                <title>Electronic Brands</title>
            </head>
            <body>
                <h1>Electronic Brands</h1>
                <ul>
                    ${
                        Object.entries(brands).map(entry => {
                            const key = entry[1].id;
                            const brandName = entry[1].brandName;
                            
                            return `
                            <li>
                                <a href='/brands/${key}'>${brandName}</a>
                            </li>
                            `
                        }).join('')
                    }
                </ul>
            </body>
        </html>
        `);
    }
    catch(error) {
        next(error);
    }
})

app.get('/brands/:id', async(req, res, next) => {
    const brands = await Brand.findByPk(req.params.id * 1);
    const brand = brands.dataValues;
    const products = await Product.findByPk(req.params.id *1);
    const product = products.dataValues;

    res.send(`
    <html>
        <head>
            ${brand.brandName}
        </head>
        <body>
            ${product.productName}
        </body>
    </html>
    `)
})







const init = async() => {
    try {
        await syncAndSeed();
        console.log('successfully synced & seeded');
        const PORT = 3000;
        app.listen(PORT, function() {
            console.log(`Listening on port ${PORT}`);
        })
    }
    catch(err) {
        console.log(err);
    }
}

init();