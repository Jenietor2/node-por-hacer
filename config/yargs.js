const descripcion = {
    demand: true,
    alias: 'd'
};

const completado = {
    alias: 'c',
    default: true
}

const argv = require('yargs').command('crear', 'crear un elemento por hacer', {
    descripcion
}).command('actualizar', 'Actualiza el estado completado de una tarea', {
    descripcion,
    completado
}).command('eliminar', 'Elimina una tarea por hacer', {
    descripcion
}).help().argv;

module.exports = {
    argv
}