const express = require('express');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');
//ovtiene los datos de los archivos .hbs y renderiza la vista
router.get('/add', (req, res) => {
    res.render('links/add');
});
//Obtiene los datos del formulario, los inserta en la base de datos 
router.post('/add', async (req, res) => {
    const { title, url, description, costo, cantidad } = req.body;
    const newLink = {
        title,
        url,
        description,
        costo,
        cantidad,
        user_id: req.user.id
    };
    await pool.query('INSERT INTO links set ?', [newLink]);
    req.flash('success', 'Item guardadp');
    res.redirect('/links');
});
//Obtiene los datos del inventario y los lista
router.get('/', isLoggedIn, async (req, res) => {
    const links = await pool.query('SELECT * FROM links WHERE user_id = ?', [req.user.id]);
    res.render('links/list', { links });
});
//Elimina los datos del inventario
router.get('/delete/:id', async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM links WHERE ID = ?', [id]);
    req.flash('success', 'item removido');
    res.redirect('/links');
});
//Obtiene las datos del inventario y los agrega a el formulario 
router.get('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const links = await pool.query('SELECT * FROM links WHERE id = ?', [id]);
    console.log(links);
    res.render('links/edit', {link: links[0]});
});
// Obtiene los datos del formulario y actualiza el inventario
router.post('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const { title, url, description, costo, cantidad } = req.body; 
    const newLink = {
        title,
        url,
        description,
        costo,
        cantidad
    };
    await pool.query('UPDATE links set ? WHERE id = ?', [newLink, id]);
    req.flash('success', 'Item actualizado');
    res.redirect('/links');
});

module.exports = router;