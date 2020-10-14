<template>
    <commom type="edit"></commom>
</template>
<script>
    import commom from './common';
    export default {
        components: {
            commom,
        },
        created(){
            console.log(this.api.file)
            this.api.file.getUploadURL();
        },
    }
</script>

