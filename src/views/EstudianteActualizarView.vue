<template>
<div class="estudiante-container">
    <h2>Actualizar Estudiante</h2>
    
    <div class="form-section">
        <form @submit.prevent="actualizar()">
            <div class="form-group">
                <label for="actualizarId">ID del Estudiante:</label>
                <input type="number" id="actualizarId" v-model.number="actualizarEstudiante.id" required>
            </div>
            <div class="form-group">
                <label for="actualizarNombre">Nombre:</label>
                <input type="text" id="actualizarNombre" v-model="actualizarEstudiante.nombre" required>
            </div>
            <div class="form-group">
                <label for="actualizarApellido">Apellido:</label>
                <input type="text" id="actualizarApellido" v-model="actualizarEstudiante.apellido" required>
            </div>
            <div class="form-group">
                <label for="actualizarFechaNacimiento">Fecha de Nacimiento:</label>
                <input type="date" id="actualizarFechaNacimiento" v-model="actualizarEstudiante.fechaNacimiento" required>
            </div>
            <div class="form-group">
                <label for="actualizarGenero">Género:</label>
                <select id="actualizarGenero" v-model="actualizarEstudiante.genero" required>
                    <option value="">Seleccione...</option>
                    <option value="M">Masculino</option>
                    <option value="F">Femenino</option>
                </select>
            </div>
            <div class="button-group">
                <button type="submit">Actualizar Estudiante</button>
                <button type="button" @click="volver()" class="btn-secondary">Volver</button>
            </div>
        </form>
    </div>

    <!-- Mensajes de estado -->
    <div v-if="mensaje" class="mensaje" :class="tipoMensaje">
        {{ mensaje }}
    </div>
</div>
</template>

<script>
import { actualizarFachada } from "../clients/EstudianteClient.js";

export default {
    name: 'EstudianteActualizarView',
    data() {
        return {
            actualizarEstudiante: {
                id: null,
                nombre: '',
                apellido: '',
                fechaNacimiento: '',
                genero: ''
            },
            mensaje: '',
            tipoMensaje: ''
        }
    },
    methods: {
        async actualizar() {
            try {
                const estudianteToBody = {
                    nombre: this.actualizarEstudiante.nombre,
                    apellido: this.actualizarEstudiante.apellido,
                    fechaNacimiento: this.actualizarEstudiante.fechaNacimiento + 'T00:00:00',
                    genero: this.actualizarEstudiante.genero
                };
                await actualizarFachada(estudianteToBody, this.actualizarEstudiante.id);
                this.mostrarMensaje('Estudiante actualizado exitosamente', 'success');
                this.limpiarFormulario();
            } catch (error) {
                this.mostrarMensaje('Error al actualizar el estudiante: ' + error.message, 'error');
            }
        },
        mostrarMensaje(texto, tipo) {
            this.mensaje = texto;
            this.tipoMensaje = tipo;
            setTimeout(() => {
                this.mensaje = '';
                this.tipoMensaje = '';
            }, 5000);
        },
        limpiarFormulario() {
            this.actualizarEstudiante = {
                id: null,
                nombre: '',
                apellido: '',
                fechaNacimiento: '',
                genero: ''
            };
        },
        volver() {
            this.$router.push('/estudiante');
        }
    }
}
</script>

<style scoped>
.estudiante-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    font-family: Arial, sans-serif;
}

.form-section {
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #f9f9f9;
}

.form-group {
    margin-bottom: 15px;
}

.form-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
    color: #555;
}

.form-group input,
.form-group select {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
    box-sizing: border-box;
}

.form-group input:focus,
.form-group select:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.3);
}

.button-group {
    display: flex;
    gap: 10px;
    margin-top: 20px;
}

button {
    background-color: #007bff;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s;
}

button:hover {
    background-color: #0056b3;
}

.btn-secondary {
    background-color: #6c757d;
}

.btn-secondary:hover {
    background-color: #545b62;
}

.mensaje {
    margin-top: 20px;
    padding: 15px;
    border-radius: 4px;
    font-weight: bold;
    text-align: center;
}

.mensaje.success {
    background-color: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
}

.mensaje.error {
    background-color: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
}
</style>
