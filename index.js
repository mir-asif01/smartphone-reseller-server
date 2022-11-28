const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 5000
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
app.use(cors())
app.use(express.json())

/* 

database : mobileBazar
collections : products,users

dbUser : mobileBazar
pass : QphRrjAszKBZYINx
*/

app.get('/',(req,res)=>{
    res.send('server running');
})



const uri = "mongodb+srv://mobileBazar:QphRrjAszKBZYINx@cluster0.mtnbd39.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        const phonesCollection = client.db('mobileBazar').collection('products');
        const userCollection = client.db("mobileBazar").collection('users')

        app.get('/phones',async(req,res)=>{
            const query = {}
            const phones = await phonesCollection.find(query).toArray()
            res.send(phones)

        })
        app.get('/phones/:category',async(req,res)=>{
            const category = req.params.category
            const query = { category : category}
            const phone = await phonesCollection.find(query).toArray()
            res.send(phone)
        })
        app.get('/categories',async(req,res)=>{
            const query = {}
            const phones = await phonesCollection.find(query).toArray();
            const categories = []
            phones.forEach(phone=>{
                if(categories.includes(phone.category)){
                    return;
                }
                else{
                    categories.push(phone.category)
                }
            })
            res.send(categories)
        })

        // users
        app.post('/users',async(req,res)=>{
            const user = req.body;
            const result = await userCollection.insertOne(user)
            res.send(result)
        })

    }
    finally{

    }

}
run().catch(err=>console.log(err))


app.listen(port,()=>{
    console.log(`http://localhost:${port}`)
})