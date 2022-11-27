const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 5000
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
app.use(cors())

/* 

database : mobileBazar
collections : products

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
    }
    finally{

    }

}
run().catch(err=>console.log(err))


app.listen(port,()=>{
    console.log(`http://localhost:${port}`)
})