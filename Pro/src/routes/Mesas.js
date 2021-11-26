const express = require('express');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');


////Lista el numero de mesas
router.get('/list',  async (req, res) => {
    const mesitas = await pool.query( 'SELECT * FROM mesas');
    console.log(mesitas);   
    res.render('Mesas/list', { mesitas });
});

////////cambia el estado de la mesa de ocupado a disponible
router.get('/Estado1/:id', async (req, res) => {
    const { id } = req.params;
    await pool.query('UPDATE mesas SET estado="Disponible" WHERE id = ?', [id]);
    req.flash('success', 'Modificado');
    res.redirect('/Mesas/list');
});
///// cambia el estado de la mesa de disponible a ocupado
router.get('/Estado2/:id', async (req, res) => {
    const { id } = req.params;
    await pool.query('UPDATE mesas SET estado="Ocupada" WHERE id = ?', [id]);
    req.flash('success', 'Modificado');
    res.redirect('/Mesas/list');
});


//////////Obtiene los items del inventario y los lista en la vista ordenes

router.get('/ordenes/:id', async (req, res) => {
    const { id } = req.params;
    const link = await pool.query('SELECT * FROM links');
    console.log(link);
    res.render('Mesas/ordenes', {link});
});




///inserta las ordenes en la base de datos 
router.post('/ordenes/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description, costo, cantidad, } = req.body; 
    const newOrden = {
        title,       
        description,
        costo,
        cantidad,       
    };
    await pool.query('INSERT INTO ordenes SET ?', [newOrden]);
    await pool.query('INSERT INTO ordenes SET mesas_id = ?', [id]);   
    req.flash('success', 'Orden agregada');
    res.redirect('/Mesas/list');
});

module.exports = router;