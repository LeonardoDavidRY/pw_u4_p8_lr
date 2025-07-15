<template>
<div>
    <button v-on:click="guardar()">Guardar Estudiante</button>
    <button v-on:click="actualizar()">Actualizar Estudiante</button>
    <button v-on:click="actualizarParcial()">Actualizar parcial</button>
    <button v-on:click="borrar()">Borrar Estudiante</button>

</div>
</template>

<script>
import {guardarFachada, actualizarFachada, actualizarParcialFachada,borrarFachadaPorId } from "../clients/EstudianteClient.js";
export default {
    methods: {
        async guardar() {
            let fecha = '2000-10-08';
            const estudianteToBody = {
                nombre: 'Luis',
                apellido: 'Montenegro',
                fechaNacimiento: fecha + 'T00:00:00',
                genero: 'M'
                
            };
            await guardarFachada(estudianteToBody);
        },
        async actualizar() {
            let fecha = '2000-07-08';
            const estudianteToBody = {
                nombre: 'Pepito',
                apellido: 'Ramirez',
                fechaNacimiento: fecha + 'T00:00:00',
                genero: 'M'
                
            };
            await actualizarFachada(estudianteToBody, 1);

        },
        async actualizarParcial() {
            const estudianteToBody = {
                apellido: 'Suarez',
            };
            await actualizarParcialFachada(estudianteToBody, 1);
        },
        async borrar() {
            await borrarFachadaPorId(10);
        }


    }

}
</script>

<style>

</style>