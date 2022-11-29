const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 5000
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
app.use(cors())
app.use(express.json())

/* 

database : mobileBazar
collections : products,users,orders,advertisements

dbUser : mobileBazar
pass : QphRrjAszKBZYINx
*/

app.get('/', (req, res) => {
    res.send('server running');
})



const uri = "mongodb+srv://mobileBazar:QphRrjAszKBZYINx@cluster0.mtnbd39.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const phonesCollection = client.db('mobileBazar').collection('products');
        const userCollection = client.db("mobileBazar").collection('users')
        const orderCollection = client.db("mobileBazar").collection('orders')
        const adCollection = client.db("mobileBazar").collection('advertisements')

        app.get('/phones', async (req, res) => {
            const query = {}
            const phones = await phonesCollection.find(query).toArray()
            res.send(phones)

        })
        app.get('/phones/:category', async (req, res) => {
            const category = req.params.category
            const query = { category: category }
            const phone = await phonesCollection.find(query).toArray()
            res.send(phone)
        })
        app.get('/categories', async (req, res) => {
            const query = {}
            const phones = await phonesCollection.find(query).toArray();
            const categories = []
            phones.forEach(phone => {
                if (categories.includes(phone.category)) {
                    return;
                }
                else {
                    categories.push(phone.category)
                }
            })
            res.send(categories)
        })

        // users
        app.post('/users', async (req, res) => {
            const user = req.body;
            const result = await userCollection.insertOne(user)
            res.send(result)
        })

        app.get('/users', async (req, res) => {
            const query = {}
            if (req.query.email) {
                const email = req.query.email;
                const query = { email: email }
                const user = await userCollection.findOne(query)
                res.send(user)
            }
            else {
                const result = await userCollection.find(query).toArray()
                res.send(result)
            }
        })

        app.delete('/users/:id',async(req,res)=>{
            const id = req.params.id;
            const query = {_id : ObjectId(id)}
            const result = await userCollection.deleteOne(query)
            res.send(result)
        })

        //orders
        app.post('/orders', async (req, res) => {
            const order = req.body;
            const result = await orderCollection.insertOne(order)
            res.send(result)
        })
        app.get('/orders', async (req, res) => {
            const email = req.query.email;
            const query = { email: email }
            const orders = await orderCollection.find(query).toArray()
            res.send(orders)
        })

        //my products
        app.get('/products', async (req, res) => {
            const email = req.query.email;
            const query = { seller_email: email }
            const products = await phonesCollection.find(query).toArray()
            res.send(products)
        })

        app.post('/products', async (req, res) => {
            const product = req.body;
            const result = await phonesCollection.insertOne(product)
            res.send(result)
        })

        app.delete('/products/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = phonesCollection.deleteOne(query)
            res.send(result)
        })

        // advertisement

        app.post('/advertisements', async (req, res) => {
            const advertisement = req.body;
            const result = await adCollection.insertOne(advertisement)
            res.send(result)
        })
        app.get('/advertisements', async (req, res) => {
            const query = {}
            const ads = await adCollection.find(query).sort({ time: -1 }).toArray();
            res.send(ads);
        })
    }
    finally {

    }

}
run().catch(err => console.log(err))


app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})