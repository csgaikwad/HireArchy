const mongoose = require('mongoose')

const databaseConnection = () => {
    mongoose.connect(process.env.DB,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then((data)=>{
        console.log(`database connected successfully`)
    })
}

module.exports = databaseConnection