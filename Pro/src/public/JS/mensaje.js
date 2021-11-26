import Swal from 'sweetalert2'
const express = require('express');
const router = express.Router();

const pool = require('../database');

const Swal = require('sweetalert2')

function alert1() {

    Swal(
        'Registro Almacenado',
        'El registro se ha realizado satisfactoriamente ${idLinks}',
        'success'
    );
}

module.exports = router;