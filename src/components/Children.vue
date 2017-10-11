<template>
    <div class="demo">
        <div class="title">子组件</div>
        <div class="text" @click="changeProps">{{msgs }}</div>
    </div>
</template>

<script>
export default {
    name: 'Children',
    props: {
        msgs: String
    },
    data() {
        return {

        }
    },
    methods:{
        changeProps: function(){
            console.log('change props');
            this.$emit('changeMsgs', '新增的数据');
        }
    }
}
</script>


