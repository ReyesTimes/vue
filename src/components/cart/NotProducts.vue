<template>
    <div class="notProducts">
        <p>Aún no has agregado productos al carrito.</p>
        <button @click="sendToHome" class="notProducts--link btn">Ir a Inicio</button>
    </div>
</template>

<script>
    export default {
        methods: {
            sendToHome() {
                this.$router.push({ name: 'home' });
            }
        }   
    }
</script>

<style lang="scss">
    .notProducts {
        text-align: center;
        padding: 1.5em;
    }
</style>