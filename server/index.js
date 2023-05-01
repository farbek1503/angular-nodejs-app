const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const authRouter = require('./routes/authRouter');
const cardRouter = require('./routes/cardRouter');
const settingsRouter = require('./routes/settingsRouter');

dotenv.config();

const app = express();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({
        extended: true
    }));

app.use('/auth', authRouter)
app.use('/card', cardRouter)
app.use('/profile', settingsRouter)

const startApp = () => {
    try {
        mongoose.set("strictQuery", true);
        mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true
        }, () =>
            console.log("Mongo DB connected"));

        const port = process.env.PORT || 3000;
        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`)
        })
    } catch (err) {
        console.log('server connected error', err)
    }
}

startApp()
