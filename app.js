const express = require('express');
const morgan = require('morgan');
const app = express();
const port = 3000;
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

// Middlewares

app.use(morgan('dev'));

app.use(express.json());

app.use((req, res, next) => {
    console.log('Hello From middlewares 👋');
    next();
});

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});




// Endpoints

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Hello From Server Side Home End Point ',
        app: 'Natuors',
    });
});

// app.get('/api/v1/tours', getAllTours);
// app.post('/api/v1/tours', createTour);
// app.get(`/api/v1/tours/:id`, getTours);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

// Route Model Mode


app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/users', userRouter)



// server listener
app.listen(port, () => {
    console.log(`listening on port : ${port}`);
});
