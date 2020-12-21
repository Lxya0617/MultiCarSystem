<template>
    <div class="home" >
       home
       <h1>第一次修改</h1>
    </div>
</template>
<script>
    export default {
        name:'Home',
        data () {
            return {
               
            };
        },
        computed: {},
        created(){
            
        },
        mounted(){
           var height=window.innerHeight 
           var home=document.getElementsByClassName('home')[0]
           var header=document.getElementsByClassName('ivu-layout-header')[0].offsetHeight
           home.style.height=height-66-header+'px'
           console.log(height,home,header)
        }
        
    }
</script>
<style scoped>
    
</style>
