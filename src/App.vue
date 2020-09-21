<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
    export default {
        name: 'App',
        created() {

        }
    }
</script>
<style lang="scss">
    #app {
        background: #F0F2F5;
        min-height: calc(100vh);
    }

    .pagination_wrapper {
        padding: 20px 0;
    }
</style>
