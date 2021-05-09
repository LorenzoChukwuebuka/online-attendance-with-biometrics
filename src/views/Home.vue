<template>
  <div>

	    <nav>
		   <div class="nav-wrapper blue darken-1">
			   <a class="brand-logo"> Sign In </a>
			   </div>
		 </nav>
      
        
        <div class="row">
    <div class="col s6 offset-s3">
      <div class="card blue darken-1">
        <div class="card-content white-text">
          <span  class="card-title">Login</span>

             <form >
                 <div class="row col s12">
				<div class="input-field col s10">
          <i class="material-icons">perm_identity</i>
				<input id="email" type="text" placeholder="Enter your Username" class="validate" v-model="form.Username" required>
			 
			   </div>
                 </div>

                   <div class="row col s12">
				<div class="input-field col s10 ">
					<i class="material-icons">lock</i>
				<input id="password" type="Password" class="validate" placeholder="enter your password" v-model="form.password"  required>
				 
			   </div>
                 </div>

                  <div class='row '>
				   <div class="input-field col s6">
				  <button class="btn waves-effect  waves-light" v-bind:disabled="disablebtn"  @click="login"> Login <i class="material-icons right">send</i> </button>
				   </div>
                       
				 
           
                  </div>

             </form>
              
          
        </div>
        
      </div>
    </div>
  </div>
  </div>
</template>

<script>
 import axios from 'axios';
axios.defaults.crossDomain = true;
import M from 'materialize-css';
 

export default {
  name: 'Home',

  data(){
	  return{
		  form:{
			  Username:"",
			  password:""
		  },
		  type:0
		  
	  }
  },

  computed:{
	  	disablebtn:function(){
			if(this.form.Username.length >= 5 && this.form.password.length >=4){
				return false
			}else{
				return true
			}
		}
  },

   methods:{
	   login:function(e){

		     e.preventDefault()
             
			  let log = new FormData();
			  log.append('username', this.form.Username)
			  log.append('password',this.form.password)

			  axios.post('http://localhost/gabbyProject/login/login.php?logUser=login',log)
			  .then(res=>{
				 if(res.data == 500){
					 M.toast({html:"Incorrect login details"})
				 }else if(res.data[0].type == 0){
			      this.$router.push('/dashboard')

				   localStorage.setItem('Id', res.data[0].Id)

				}  else if(res.data[0].type == 1){
					this.$router.push('/lecturerDash')

				    localStorage.setItem('Id', res.data[0].Id)
				}
			  })
			  .catch(error=>{
				  console.log(error)
			  })
	   }
   }
  
  
}
</script>
<style  scoped>
body{
   text-align: center;
}

 

</style>
