<template>
<div>

    <NavBar/>
 
 <div class="row">
    <div class="col s4 offset-s1">
      <div class="card white">
        <div class="card-content black-text">
          <span  class="card-title">Add School </span>

             <form >
                 <div class="row col s12">
				<div class="input-field col s10">
               <i class="material-icons">store</i>
				<input id="email" type="text" placeholder="Enter your School" class="validate" v-model="school" required>
			 
			   </div>
                 </div>

                  <div class='row '>
				   <div class="input-field col s6">
				  <button class="btn waves-effect blue waves-light" @click="addschool"> Add <i class="material-icons right">send</i> </button>
				   </div>
                       
				 
           
                  </div>

             </form>
              
          
        </div>
        
      </div>
    </div>

           <!-- **************************** -->
             <div class="col s5 offset-s1">
      <div class="card white">
        <div class="card-content black-text">
          <span  class="card-title"> View Schools </span>
		 
     <ul class="collection">
        <li class='collection-item' v-for="schools in fetchsch" :key="schools.Id">
                <!-- {{element}} -->
             {{schools.school}} 

			<p>     <a class="waves-effect waves-light btn green modal-trigger" href="#modal1" @click="startEdit(schools)"> <i class="material-icons"> edit </i> </a> 
			      <button class="btn waves-effect red waves-light" @click="deleteschool(schools.Id)"><i class="material-icons"> delete </i> </button>
			
			
			 </p> 
		 
            
         </li>
      </ul>   


              
          
        </div>
        
      </div>
    </div>
  </div>

    <div id="modal1" class="modal">
              <div class="modal-content">
              <h4>Edit schools </h4>

    <div class="row">
        <form class="col s12">
              <div class="row">
                <div class="input-field col s6">
                  <input  id="company" type="text" v-model="form.school"  class="validate"  >
                </div>
				 <input v-model="form.id" hidden disabled />
			  </div>
		</form>
	</div>

	       <div class="modal-footer">
             <button class="modal-close waves-effect waves-green btn-flat" @click="Editschoool"> <i class=" material-icons ">save</i> </button>
          </div>
	  </div>
	</div>

   
   

   

    </div>
    
</template>

<script>
 import axios from 'axios';
axios.defaults.crossDomain = true;
import NavBar from "../../components/adminComponent/navbar.vue"
import M from "materialize-css"
export default {
    name:'AddSchool',
    components:{
      NavBar
    },

    data(){
        return{
         school:"",
         fetchsch:[],
		 editedSch:null,
		 form:{
			 id:"",
			 school:""
		 }

        }

    },

    mounted(){
        M.AutoInit();
        this.fetchschool()
    },

    computed:{
        	disablebtn:function(){
			if(this.school >= 4){
				return false
			}else{
				return true
			}
		}
    },

    methods:{
        addschool:function(e){
            e.preventDefault();

            let add = new FormData();
            add.append('school',this.school)

            axios.post('http://localhost/gabbyProject/Controllers/admincontroller/addschool.php?add=add',add)
            .then(res=>{
               if(res.data == 200){
                   M.toast({html:"School added successfully"})
               }else if( res.data == 501 ){
                   M.toast({html:"failed to add school"})
               }else if(res.data == 404){
                 M.toast({html:"school already exists"})
               }
                      location.reload();  
          
            })
            .catch(error=>{
              console.log(error)
            })

        },

        fetchschool:function(){
            axios.get('http://localhost/gabbyProject/Controllers/admincontroller/fetchschool.php?fetchschools=fetchschools')
            .then(res=>{
                this.fetchsch = res.data
                
            })
            .catch(error=>{
              console.log(error)
            })
        },

		deleteschool:function(Id){
            
		   let deletesch = new FormData ();
		   deletesch.append('Id',Id);
		   axios.post('http://localhost/gabbyProject/Controllers/admincontroller/deleteschool.php?deleteschool=deleteschool',deletesch)
		   .then(res=>{
			   if(res.data == 200){
				   M.toast({html:"Deleted successfully"});
				   location.reload()
			   }
		   })
		},
		startEdit:function(schools){
          console.log(schools)
		  this.editedSch = schools
		  this.form.id = this.editedSch.Id
		  this.form.school = this.editedSch.school
	 
		   },

		Editschoool:function(){
		let  schedit = new FormData()
		schedit.append('Id', this.form.id)
		schedit.append('school',this.form.school)

		axios.post('http://localhost/gabbyProject/Controllers/admincontroller/deleteschool.php?deleteschool=updateSchool',schedit)
		.then(res=>{
			if(res.data == 200){
				M.toast({html:"Update successful"})
				location.reload()
			}else{
				M.toast({html:"Update failed"})
			}
		})
		}
	 
    }
     
}
</script>

<style scoped>
body{
	text-align:center;
}
</style>