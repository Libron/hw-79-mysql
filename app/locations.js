const express = require('express');

const createRouter = connection => {
    const router = express.Router();

    router.get('/', (req, res) => {
        connection.query('SELECT * FROM `locations`', (error, results) => {
            if (error) {
                res.status(500).send({error: 'Database error'});
            }

            res.send(results);
        });
    });

    router.get('/:id', (req, res) => {
        connection.query('SELECT * FROM `locations` WHERE `id` = ?', req.params.id, (error, results) => {
            if (error) {
                res.status(500).send({error: 'Database error'});
            }

            if (results[0]) {
                res.send(results[0]);
            } else {
                res.status(404).send({error: 'Location not found'});
            }
        });
    });

    router.post('/', (req, res) => {

        const location = req.body;

        console.log(location);

        if (!location.name) {
            res.status(400).send('Missing required fields, please check');
        } else {
            connection.query('INSERT INTO `locations` (`name`, `description`) VALUES (?, ?)',
                [location.name, location.description],
                (error) => {
                    if (error) {
                        res.status(500).send({error: 'Database error'});
                    }
                    res.send({message: 'OK'});
                }
            );
        }
    });

    router.delete('/:id', (req, res) => {
        connection.query('DELETE FROM `locations` WHERE `id` = ?', req.params.id, (error) => {
            if (error) {
                res.status(500).send({error: 'Database error'});
            }

            res.send({message: 'OK'});
        });
    });

    return router;
};

module.exports = createRouter;