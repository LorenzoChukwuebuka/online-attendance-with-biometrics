<template>
<div>

    <NavBar/>
   <!-- **************************** -->

    <div class="row container">

          <div class="col s12">
      <div class="card white">
        <div class="card-content black-text">
          <span  class="card-title"> Welcome back Admin </span>

        </div>
      </div>
          </div>
    </div>
     
  
   
   

   

    </div>
    
</template>

<script>
import NavBar from "../../components/adminComponent/navbar.vue"
import M from "materialize-css"
export default {
    name:'dashboard',
    components:{
      NavBar
    },

    mounted(){
        M.AutoInit()
    }
     
}
</script>