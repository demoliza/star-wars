const express = require("express");
const cors = require("cors");
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.set("view engine","ejs");
app.set("views","src/views/pages");
app.use('/static',express.static(`${__dirname}/public`));

const movieRoutes = require('./routes/movies');
app.use(movieRoutes);
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`app started on port ${PORT}`)
});