const express = require('express');
const fs = require('fs');
const router = express.Router();

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

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

router
    .route('/')
    .get(getAllTours)
    .post(createTour);

router
    .route(`/:id`)
    .get(getTours)
    .patch(updateTour)
    .delete(deleteTour);


module.exports = router;