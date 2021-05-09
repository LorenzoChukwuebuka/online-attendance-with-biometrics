<template>

 <div>
     <bar/>

     <div class=" container row">
 
          <div class="col s11">
      <div class="card white">
        <div class="card-content black-text">
          <span  class="card-title"> Welcome back {{user}}  </span>

        </div>
      </div>
          </div>
    </div>
     
  
      
     
 </div>
  
</template>

<script>
 import axios from 'axios';
axios.defaults.crossDomain = true;
import M from "materialize-css";
 import bar from '../../components/lecturerComponent/navbar.vue'
export default {
name:'lecturerDash',
components:{
    bar
},
data(){
    return{
        id: localStorage.getItem('Id'),
        user: ""
    }
},
mounted(){
  this.fetchUser()
},

methods:{
    fetchUser(){
       let data = new FormData()
         data.append('id',this.id)
        axios.post("http://localhost/gabbyProject/Controllers/lecturerController/getUserDetail.php?lecturer=getUser",data)
        .then(res=>{
          this.user = res.data[0].username

          console.log(res.data)
        })

        console.log(this.id)
    }
}
}
</script>

<style>

</style>