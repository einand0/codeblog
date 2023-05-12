const express = require('express')
const app = express()
const cors = require('cors')

const PORT = 8000

//Solve CORS
app.use(cors())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


//Config JSON response
app.use(express.json())


//Routes
const UserRoutes = require('./routes/UserRoutes')
const PostRoutes = require('./routes/PostsRoutes')

app.use('/users', UserRoutes)
app.use('/posts', PostRoutes)

app.listen(PORT)