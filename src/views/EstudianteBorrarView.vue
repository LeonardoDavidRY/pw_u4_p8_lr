<template>
<div class="estudiante-container">
    <h2>Borrar Estudiante</h2>
    
    <div class="form-section">
        <div class="warning-message">
            <strong>⚠️ Atención:</strong> Esta acción eliminará permanentemente el estudiante de la base de datos.
        </div>
        
        <form @submit.prevent="borrar()">
            <div class="form-group">
                <label for="borrarId">ID del Estudiante a Borrar:</label>
                <input type="number" id="borrarId" v-model.number="borrarEstudiante.id" required>
            </div>
            <div class="button-group">
                <button type="submit" class="btn-danger">Borrar Estudiante</button>
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
import { borrarFachadaPorId } from "../clients/EstudianteClient.js";

export default {
    name: 'EstudianteBorrarView',
    data() {
        return {
            borrarEstudiante: {
                id: null
            },
            mensaje: '',
            tipoMensaje: ''
        }
    },
    methods: {
        async borrar() {
            try {
                if (confirm('¿Está seguro que desea borrar este estudiante? Esta acción no se puede deshacer.')) {
                    await borrarFachadaPorId(this.borrarEstudiante.id);
                    this.mostrarMensaje('Estudiante borrado exitosamente', 'success');
                    this.limpiarFormulario();
                }
            } catch (error) {
                this.mostrarMensaje('Error al borrar el estudiante: ' + error.message, 'error');
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
            this.borrarEstudiante = {
                id: null
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

.warning-message {
    background-color: #fff3cd;
    color: #856404;
    padding: 15px;
    border-radius: 4px;
    border: 1px solid #ffeaa7;
    margin-bottom: 20px;
    text-align: center;
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

.form-group input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
    box-sizing: border-box;
}

.form-group input:focus {
    outline: none;
    border-color: #dc3545;
    box-shadow: 0 0 5px rgba(220, 53, 69, 0.3);
}

.button-group {
    display: flex;
    gap: 10px;
    margin-top: 20px;
}

button {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s;
}

.btn-danger {
    background-color: #dc3545;
    color: white;
}

.btn-danger:hover {
    background-color: #c82333;
}

.btn-secondary {
    background-color: #6c757d;
    color: white;
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
