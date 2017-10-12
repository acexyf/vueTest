<template>
    <div class="detailWrap">
        详情页
        <img class="bg" src="../../assets/detail/bg1.jpg" alt="">
        <div class="temps"></div>
    </div>
</template>

<script>
export default {
    name: 'Detail',
    data(){
        return {

        }
    },
    mounted(){
        console.log(this.$route);
        console.log(window.location.href);
    }
}

</script>

<style>

.bg{
    display: black;
    width: 300px;
}
.temps{
    width: 300px;
    height: 148px;
    background: url(../../assets/detail/bg1.jpg);
    background-size: 100% 100%;
}



</style>

