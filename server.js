const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// turn on routes
app.use(routes);

// turn on connection to db & server; configuration param = force: false; 
// force: true would force table to re-create in the presence of change
sequelize.sync({ force: true }).then (() => {
    app.listen(PORT, () => console.log('Boop!  Now Listening'));
});