<template>
  <div class="estudiante-menu-container">
    <h1>Gestión de Estudiantes</h1>
    <p class="description">Seleccione la operación que desea realizar:</p>
    
    <div class="menu-grid">
      <div class="menu-card" @click="irAGuardar()">
        <div class="menu-icon">➕</div>
        <h3>Guardar Estudiante</h3>
        <p>Registrar un nuevo estudiante en el sistema</p>
      </div>
      
      <div class="menu-card" @click="irAActualizar()">
        <div class="menu-icon">✏️</div>
        <h3>Actualizar Estudiante</h3>
        <p>Modificar información completa de un estudiante existente</p>
      </div>
      
      <div class="menu-card" @click="irAActualizarParcial()">
        <div class="menu-icon">📝</div>
        <h3>Actualizar Parcialmente</h3>
        <p>Modificar solo los campos específicos que necesites actualizar</p>
      </div>
      
      <div class="menu-card" @click="irABorrar()">
        <div class="menu-icon">🗑️</div>
        <h3>Borrar Estudiante</h3>
        <p>Eliminar un estudiante del sistema</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EstudianteView',
  methods: {
    irAGuardar() {
      this.$router.push('/estudiante/guardar');
    },
    irAActualizar() {
      this.$router.push('/estudiante/actualizar');
    },
    irAActualizarParcial() {
      this.$router.push('/estudiante/actualizar-parcial');
    },
    irABorrar() {
      this.$router.push('/estudiante/borrar');
    }
  }
}
</script>

<style scoped>
.estudiante-menu-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.estudiante-menu-container h1 {
  text-align: center;
  color: #333;
  margin-bottom: 10px;
}

.description {
  text-align: center;
  color: #666;
  font-size: 16px;
  margin-bottom: 30px;
}

.menu-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 30px;
}

.menu-card {
  background: white;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  padding: 30px 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.menu-card:hover {
  border-color: #007bff;
  transform: translateY(-5px);
  box-shadow: 0 4px 16px rgba(0, 123, 255, 0.2);
}

.menu-icon {
  font-size: 48px;
  margin-bottom: 15px;
}

.menu-card h3 {
  color: #333;
  margin: 15px 0 10px 0;
  font-size: 20px;
}

.menu-card p {
  color: #666;
  font-size: 14px;
  line-height: 1.4;
  margin: 0;
}

@media (max-width: 768px) {
  .menu-grid {
    grid-template-columns: 1fr;
  }
  
  .estudiante-menu-container {
    padding: 15px;
  }
}
</style>