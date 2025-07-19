<template>
<div class="estudiante-container">
    <h2>Gestión de Estudiantes</h2>
    
    <!-- Formulario para Guardar Estudiante -->
    <div class="form-section">
        <h3>Guardar Nuevo Estudiante</h3>
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
            <button type="submit">Guardar Estudiante</button>
        </form>
    </div>

    <!-- Formulario para Actualizar Estudiante -->
    <div class="form-section">
        <h3>Actualizar Estudiante</h3>
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
            <button type="submit">Actualizar Estudiante</button>
        </form>
    </div>

    <!-- Formulario para Actualización Parcial -->
    <div class="form-section">
        <h3>Actualizar Parcialmente</h3>
        <p class="description">Complete solo los campos que desea actualizar. Los campos vacíos no serán modificados.</p>
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
            <button type="submit">Actualizar Campos Seleccionados</button>
        </form>
    </div>

    <!-- Formulario para Borrar Estudiante -->
    <div class="form-section">
        <h3>Borrar Estudiante</h3>
        <form @submit.prevent="borrar()">
            <div class="form-group">
                <label for="borrarId">ID del Estudiante a Borrar:</label>
                <input type="number" id="borrarId" v-model.number="borrarEstudiante.id" required>
            </div>
            <button type="submit" class="btn-danger">Borrar Estudiante</button>
        </form>
    </div>

    <!-- Mensajes de estado -->
    <div v-if="mensaje" class="mensaje" :class="tipoMensaje">
        {{ mensaje }}
    </div>
</div>
</template>

<script>
import {guardarFachada, actualizarFachada, actualizarParcialFachada,borrarFachadaPorId } from "../clients/EstudianteClient.js";
export default {
    data() {
        return {
            nuevoEstudiante: {
                nombre: '',
                apellido: '',
                fechaNacimiento: '',
                genero: ''
            },
            actualizarEstudiante: {
                id: null,
                nombre: '',
                apellido: '',
                fechaNacimiento: '',
                genero: ''
            },
            parcialEstudiante: {
                id: null,
                nombre: '',
                apellido: '',
                fechaNacimiento: '',
                genero: ''
            },
            borrarEstudiante: {
                id: null
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
                this.limpiarFormularioGuardar();
            } catch (error) {
                this.mostrarMensaje('Error al guardar el estudiante: ' + error.message, 'error');
            }
        },
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
                this.limpiarFormularioActualizar();
            } catch (error) {
                this.mostrarMensaje('Error al actualizar el estudiante: ' + error.message, 'error');
            }
        },
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
                this.limpiarFormularioParcial();
            } catch (error) {
                this.mostrarMensaje('Error al actualizar el estudiante: ' + error.message, 'error');
            }
        },
        async borrar() {
            try {
                if (confirm('¿Está seguro que desea borrar este estudiante?')) {
                    await borrarFachadaPorId(this.borrarEstudiante.id);
                    this.mostrarMensaje('Estudiante borrado exitosamente', 'success');
                    this.limpiarFormularioBorrar();
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
        limpiarFormularioGuardar() {
            this.nuevoEstudiante = {
                nombre: '',
                apellido: '',
                fechaNacimiento: '',
                genero: ''
            };
        },
        limpiarFormularioActualizar() {
            this.actualizarEstudiante = {
                id: null,
                nombre: '',
                apellido: '',
                fechaNacimiento: '',
                genero: ''
            };
        },
        limpiarFormularioParcial() {
            this.parcialEstudiante = {
                id: null,
                nombre: '',
                apellido: '',
                fechaNacimiento: '',
                genero: ''
            };
        },
        limpiarFormularioBorrar() {
            this.borrarEstudiante = {
                id: null
            };
        }
    }
}
</script>

<style scoped>
.estudiante-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    font-family: Arial, sans-serif;
}

.description {
    color: #666;
    font-style: italic;
    margin-bottom: 15px;
    padding: 8px;
    background-color: #f8f9fa;
    border-radius: 4px;
    border-left: 3px solid #007bff;
    font-size: 14px;
}

.form-section {
    margin-bottom: 30px;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #f9f9f9;
}

.form-section h3 {
    margin-top: 0;
    color: #333;
    border-bottom: 2px solid #007bff;
    padding-bottom: 10px;
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

.btn-danger {
    background-color: #dc3545;
}

.btn-danger:hover {
    background-color: #c82333;
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

@media (max-width: 600px) {
    .estudiante-container {
        padding: 10px;
    }
    
    .form-section {
        padding: 15px;
    }
}
</style>