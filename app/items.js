const express = require('express');
const multer = require('multer');
const nanoid = require('nanoid');

const path = require('path');
const config = require('../config');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});

const upload = multer({storage});

const createRouter = connection => {
    const router = express.Router();

    router.get('/', (req, res) => {
        connection.query('SELECT * FROM `items`', (error, results) => {
            if (error) {
                res.status(500).send({error: 'Database error'});
            }

            res.send(results);
        });
    });

    router.get('/:id', (req, res) => {
        connection.query('SELECT * FROM `items` WHERE `id` = ?', req.params.id, (error, results) => {
            if (error) {
                res.status(500).send({error: 'Database error'});
            }

            if (results[0]) {
                res.send(results[0]);
            } else {
                res.status(404).send({error: 'Item not found'});
            }
        });
    });

    router.put('/:id', upload.single('image'), (req, res) => {
        const item = req.body;

        let query = 'UPDATE `items` SET category_id = ?, location_id = ?, name = ?, description = ? WHERE id = ' + req.params.id;
        const updatedItem = [item.category_id, item.location_id, item.name, item.description];

        if (req.file) {
            item.image = req.file.filename;
            query = 'UPDATE `items` SET category_id = ?, location_id = ?, name = ?, description = ?, image = ? WHERE id = ' + req.params.id;
            updatedItem.push(item.image);
        }
        connection.query(query, updatedItem, (error) => {
            if (error) {
                res.status(500).send({error: 'Database error'});
            }
            res.send({message: 'OK'});
        });
    });

    router.post('/', upload.single('image'), (req, res) => {
        const item = req.body;

        if (!item.name || !item['category_id'] || !item['location_id']) {
            res.status(400).send('Missing required fields, please check');
        } else {

            if (req.file) {
                item.image = req.file.filename;
            }
            connection.query('INSERT INTO `items` (`category_id`, `location_id`, `name`, `description`, `image`) VALUES (?, ?, ?, ?, ?)',
                [item.category_id, item.location_id, item.name, item.description, item.image],
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
        connection.query('DELETE FROM `items` WHERE `id` = ?', req.params.id, (error) => {
            if (error) {
                res.status(500).send({error: 'Database error'});
            }

            res.send({message: 'OK'});
        });
    });

    return router;
};

module.exports = createRouter;