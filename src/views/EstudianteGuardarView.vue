<template>
<div class="estudiante-container">
    <h2>Guardar Nuevo Estudiante</h2>
    
    <div class="form-section">
        <form @submit.prevent="guardar()">
            <div class="form-group">
                <label for="nombre">Nombre:</label>
                <input type="text" id="nombre" v-model="nuevoEstudiante.nombre" required>
            </div>
            <div class="form-group">
                <label for="apellido">Apellido:</label>
                <input type="text" id="apellido" v-model="nuevoEstudiante.apellido" required>
            </div>
            <div class="form-group">
                <label for="fechaNacimiento">Fecha de Nacimiento:</label>
                <input type="date" id="fechaNacimiento" v-model="nuevoEstudiante.fechaNacimiento" required>
            </div>
            <div class="form-group">
                <label for="genero">Género:</label>
                <select id="genero" v-model="nuevoEstudiante.genero" required>
                    <option value="">Seleccione...</option>
                    <option value="M">Masculino</option>
                    <option value="F">Femenino</option>
                </select>
            </div>
            <div class="button-group">
                <button type="submit">Guardar Estudiante</button>
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
import { guardarFachada } from "../clients/EstudianteClient.js";

export default {
    name: 'EstudianteGuardarView',
    data() {
        return {
            nuevoEstudiante: {
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
        async guardar() {
            try {
                const estudianteToBody = {
                    nombre: this.nuevoEstudiante.nombre,
                    apellido: this.nuevoEstudiante.apellido,
                    fechaNacimiento: this.nuevoEstudiante.fechaNacimiento + 'T00:00:00',
                    genero: this.nuevoEstudiante.genero
                };
                await guardarFachada(estudianteToBody);
                this.mostrarMensaje('Estudiante guardado exitosamente', 'success');
                this.limpiarFormulario();
            } catch (error) {
                this.mostrarMensaje('Error al guardar el estudiante: ' + error.message, 'error');
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
            this.nuevoEstudiante = {
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
