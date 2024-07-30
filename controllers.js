import { check, validationResult } from 'express-validator';
import connection from './db.js';

// Validation middlewares
const validateProduct = [
    check('id').isInt().withMessage('ID must be an integer'),
    check('productId').isString().withMessage('Product ID must be a string'),
    check('productName').isString().withMessage('Product Name must be a string'),
    check('CategoryName').isString().withMessage('Category Name must be a string'),
    check('CategoryId').isString().withMessage('Category ID must be a string'),
];

const showfunction = async (req, res) => {
    try {
        const ans = await connection.query('SELECT * FROM product_info');
        res.send(ans[0]);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
};

const addfunction = [
    ...validateProduct,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { id, productId, productName, CategoryName, CategoryId } = req.body;

        try {
            await connection.query(
                'INSERT INTO product_info (id, productId, productName, CategoryName, CategoryId) VALUES (?, ?, ?, ?, ?)',
                [id, productId, productName, CategoryName, CategoryId]
            );
            res.send('Success');
        } catch (err) {
            console.log(err);
            res.status(500).send('Server Error');
        }
    },
];

const showbyid = async (req, res) => {
    try {
        const ans = await connection.query(
            'SELECT id, productId, productName, CategoryName, CategoryId FROM product_info WHERE id=?',
            [req.params.id]
        );
        res.send(ans[0]);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
};

const deletefunction = async (req, res) => {
    const id = req.params.id;
    try {
        await connection.query('DELETE FROM product_info WHERE id=?', [id]);
        res.send(`Product with ID ${id} deleted successfully`);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
};

const updatefunction = [
    ...validateProduct,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { productId, productName, CategoryName, CategoryId } = req.body;

        try {
            await connection.query(
                'UPDATE product_info SET productId = ?, productName = ?, CategoryName = ?, CategoryId = ? WHERE id = ?',
                [productId, productName, CategoryName, CategoryId, req.params.id]
            );
            res.send('Update successful');
        } catch (err) {
            console.log(err);
            res.status(500).send('Server Error');
        }
    },
];

export { showfunction, addfunction, deletefunction, showbyid, updatefunction };
