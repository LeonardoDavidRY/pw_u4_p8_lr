<template>
  <div class="login-container">
    <div class="login-caja">
        <h2>Iniciar Sesión</h2>
        <input type="text" placeholder="Usuario" v-model="username">
        <input type="password" placeholder="Contraseña" v-model="password">
        <button @click="login">Ingresar</button>

    </div>

  </div>
</template>

<script>
export default {

    data() {
        return {
            username: '',
            password: ''
        };
    },
    methods: {
        login() {
            if(this.username==="admin" && this.password==="123") {
                localStorage.setItem('Usuario', 'admin');
                localStorage.setItem('auth', 'true'); //Bandera de autenticación
                this.$router.push("/home");
            } else {
                console.log('Credenciales inválidas');
            }
        }
    }

}
</script>

<style>

.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f4f6f8;
    height: 100vh;
    width: 100vw;
}

.login-caja {
    background-color: white;
    padding: 30px;
    border-radius: 10px;
    text-align: center;
}
input {
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
}
button {
    width: 100%;
    padding: 10px;
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
}
</style>