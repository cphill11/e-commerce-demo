const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');

const hbs = exphbs.create({});
const routes = require('./controllers');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

// connects to handlebar template; handlebar template lives in view/layouts/main.handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// turn on routes (controllers)
app.use(routes);

// turn on connection to db & server; configuration param = force: false; 
// force: true would force table to re-create in the presence of change
sequelize.sync({ force: false }).then (() => {
    app.listen(PORT, () => console.log('Boop!  Now Listening'));
});