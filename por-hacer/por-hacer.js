const { rejects } = require('assert');
const fs = require('fs');
const { resolve } = require('path');

let listadoPorHacer = [];

const crear = (descripcion) => {
    cargarDB();
    let porHacer = {
        descripcion,
        completado: false
    };

    listadoPorHacer.push(porHacer);
    guardarDB();
    return porHacer;
}

const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile(`db/data.json`, data, (err) => {
        if (err) {
            throw new Error('No se pudo guardar', err);
        }
    });
}

const cargarDB = () => {
    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }

}

const getListado = () => {
    cargarDB();
    return listadoPorHacer;
}

const actualizar = (descripcion, estado = true) => {
    cargarDB();
    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);

    if (index >= 0) {
        listadoPorHacer[index].completado = estado;
        guardarDB();
        return true;
    } else {
        false;
    }
}

const eliminar = (descripcion) => {
    cargarDB();

    let listadoPorHacerFilter = listadoPorHacer.filter(tarea => tarea.descripcion != descripcion);

    if (listadoPorHacer.length != listadoPorHacerFilter.length) {
        listadoPorHacer = listadoPorHacerFilter;
        guardarDB();
        return true;
    } else {
        return false;
    }
}

module.exports = {
    crear,
    getListado,
    actualizar,
    eliminar
}