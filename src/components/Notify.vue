<template>
    <div class="message">
        {{title.toString()}}
    </div>
</template>

<script>
export default {
    name: 'Notify',
    props: ['title']
}
</script>

<style scoped>
.message {
    position: fixed;
    top: 15px;
    float: right;
    text-align: right;
    right: 15px;
    background: #000;
    color: white;
    padding: 10px 15px;
}
</style>
