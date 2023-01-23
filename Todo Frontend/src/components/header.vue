<template>
<nav class="navbar bg-dark text-light">
    <a>Navbar </a>
    <a @click="remove"> Logout </a>
</nav>
    
</template>
<script>
export default {
    methods:{
        remove(){
            sessionStorage.removeItem('user');
            this.$session.destroy();
            this.$router.replace({path: '/'});
        }
    }
}
</script>

<style scoped>

</style>