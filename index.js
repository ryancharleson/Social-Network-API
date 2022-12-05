const db = require('./config/connection');
const routes = require('./routes');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(routes);
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`Now Listening on Port ${PORT}`);
    });
});

