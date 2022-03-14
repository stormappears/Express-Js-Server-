const express = require('express');
const fs = require('fs');
const morgan = require('morgan');
const app = express();
const port = 3000;

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

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// ROUTE HANDLERS

const getAllTours = (req, res) => {
    res.status(200).json({
        status: 'sucesss',
        requestedAt: req.requestTime,
        results: tours.lenght,
        data: {
            tours,
        },
    });
};

const getTours = (req, res) => {
    console.log(req.params);
    const id = req.params.id * 1;
    const tour = tours.find((el) => el.id === id);

    if (!tour) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID',
        });
    }

    res.status(200).json({
        status: 'sucesss',
        results: tours.lenght,
        data: {
            tour,
        },
    });
};

const createTour = (req, res) => {
    const newId = tours[ tours.length - 1 ].id + 1;
    const newTour = Object.assign(
        {
            id: newId,
        },
        req.body
    );
    tours.push(newTour);
    fs.writeFile(
        `${__dirname}/dev-data/data/tours-simple.json`,
        JSON.stringify(tours),
        (err) => {
            res.status(201).json({
                status: 'sucesss',
                data: {
                    tour: newTour,
                },
            });
        }
    );
};

const updateTour = (req, res) => {
    if (req.params.id * 1 > tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID',
        });
    }

    res.status(200).json({
        status: 'sucesss',
        data: {
            tour: '<Updated tour here>',
        },
    });
};

const deleteTour = (req, res) => {
    if (req.params.id * 1 > tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID',
        });
    }

    res.status(204).json({
        status: 'sucesss',
        data: null,
    });
};

// User Handlers
const getAllUsers = (req,res) =>{
    res.status(500).json({
        status: 'error',
        message: 'This rout is not yet defined',
    })

}

const createUser = (req,res) =>{
    res.status(500).json({
        status: 'error',
        message: 'This rout is not yet defined',
    })
}

const getUser = (req,res) =>{
    res.status(500).json({
        status: 'error',
        message: 'This rout is not yet defined',
    })
}

const updateUser = (req,res) =>{
    res.status(500).json({
        status: 'error',
        message: 'This rout is not yet defined',
    })
}

const deleteUser = (req,res) =>{
    res.status(500).json({
        status: 'error',
        message: 'This rout is not yet defined',
    })
}

// Endpoints

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Hello From Server Side ',
        app: 'Natuors',
    });
});

// app.get('/api/v1/tours', getAllTours);
// app.post('/api/v1/tours', createTour);
// app.get(`/api/v1/tours/:id`, getTours);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

// Route Model Mode

app.route('/api/v1/tours').get(getAllTours).post(createTour);

app
    .route(`/api/v1/tours/:id`)
    .get(getTours)
    .patch(updateTour)
    .delete(deleteTour);

app.route('/api/v1/users').get(getAllUsers).post(createUser);

app
    .route('/api/v1/users/:id')
    .get(getUser)
    .patch(updateUser)
    .delete(deleteUser);

// server listener
app.listen(port, () => {
    console.log(`listening on port : ${port}`);
});
