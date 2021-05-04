const express = require('express')

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
  }

const app = express()
const PORT = process.env.APP_PORT || 3000

app.get('/', (req,res)=>{
    res.send({greeting:'Hello World'})
})

app.listen(PORT, ()=> {
    console.log(`Server is listening on port ${PORT} ...`)
})