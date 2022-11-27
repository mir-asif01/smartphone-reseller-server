const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 5000
app.use(cors())

const phones = require('./phones.json')

app.get('/',(req,res)=>{
    res.send(phones);
})

app.listen(port,()=>{
    console.log(`http://localhost:${port}`)
})