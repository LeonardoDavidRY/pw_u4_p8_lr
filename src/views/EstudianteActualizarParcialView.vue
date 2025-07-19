<template>
<div class="estudiante-container">
    <h2>Actualizar Parcialmente</h2>
    <p class="description">Complete solo los campos que desea actualizar. Los campos vacíos no serán modificados.</p>
    
    <div class="form-section">
        <form @submit.prevent="actualizarParcial()">
            <div class="form-group">
                <label for="parcialId">ID del Estudiante:</label>
                <input type="number" id="parcialId" v-model.number="parcialEstudiante.id" required>
            </div>
            <div class="form-group">
                <label for="parcialNombre">Nombre:</label>
                <input type="text" id="parcialNombre" v-model="parcialEstudiante.nombre" placeholder="Dejar vacío para no modificar">
            </div>
            <div class="form-group">
                <label for="parcialApellido">Apellido:</label>
                <input type="text" id="parcialApellido" v-model="parcialEstudiante.apellido" placeholder="Dejar vacío para no modificar">
            </div>
            <div class="form-group">
                <label for="parcialFechaNacimiento">Fecha de Nacimiento:</label>
                <input type="date" id="parcialFechaNacimiento" v-model="parcialEstudiante.fechaNacimiento" placeholder="Dejar vacío para no modificar">
            </div>
            <div class="form-group">
                <label for="parcialGenero">Género:</label>
                <select id="parcialGenero" v-model="parcialEstudiante.genero">
                    <option value="">No modificar</option>
                    <option value="M">Masculino</option>
                    <option value="F">Femenino</option>
                </select>
            </div>
            <div class="button-group">
                <button type="submit">Actualizar Campos Seleccionados</button>
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
import { actualizarParcialFachada } from "../clients/EstudianteClient.js";

export default {
    name: 'EstudianteActualizarParcialView',
    data() {
        return {
            parcialEstudiante: {
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
        async actualizarParcial() {
            try {
                // Crear objeto solo con los campos que tienen valor
                const estudianteToBody = {};
                
                if (this.parcialEstudiante.nombre && this.parcialEstudiante.nombre.trim() !== '') {
                    estudianteToBody.nombre = this.parcialEstudiante.nombre.trim();
                }
                
                if (this.parcialEstudiante.apellido && this.parcialEstudiante.apellido.trim() !== '') {
                    estudianteToBody.apellido = this.parcialEstudiante.apellido.trim();
                }
                
                if (this.parcialEstudiante.fechaNacimiento && this.parcialEstudiante.fechaNacimiento !== '') {
                    estudianteToBody.fechaNacimiento = this.parcialEstudiante.fechaNacimiento + 'T00:00:00';
                }
                
                if (this.parcialEstudiante.genero && this.parcialEstudiante.genero !== '') {
                    estudianteToBody.genero = this.parcialEstudiante.genero;
                }

                // Verificar que al menos un campo tenga valor
                if (Object.keys(estudianteToBody).length === 0) {
                    this.mostrarMensaje('Debe completar al menos un campo para actualizar', 'error');
                    return;
                }

                await actualizarParcialFachada(estudianteToBody, this.parcialEstudiante.id);
                
                const camposActualizados = Object.keys(estudianteToBody).join(', ');
                this.mostrarMensaje(`Campos actualizados exitosamente: ${camposActualizados}`, 'success');
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
            this.parcialEstudiante = {
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

.description {
    text-align: center;
    color: #666;
    font-style: italic;
    margin-bottom: 20px;
    padding: 10px;
    background-color: #f8f9fa;
    border-radius: 4px;
    border-left: 4px solid #007bff;
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
