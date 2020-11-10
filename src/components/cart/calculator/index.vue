<!--  -->
/* eslint-disable */
<template>
    <div class='calculator'>
        <el-button icon="el-icon-minus" @click="setCartItem(id,shopId,price,'MINUS')" circle ></el-button>
        <span class='mount'>{{totalMount}}</span>
        <el-button icon="el-icon-plus" @click="setCartItem(id,shopId,price,'PLUS')" circle ></el-button>
    </div>
</template>

<script>
export default {
    name:'Calculator',
    props:{
        id:Number,
        shopId:Number,
        totalMount:Number,
        price:Number
    },

    methods:{
        setCartItem(id,shopId,price,type){
            // this.$store.dispatch('setTotal',{
            //     type,
            //     price
            // });
            this.$store.dispatch('setCart',{
                id,
                shopId,
                price,
                type
            })
        }
    }
}
</script>
<style lang='scss' scoped>
    .button{
        
    }
</style>