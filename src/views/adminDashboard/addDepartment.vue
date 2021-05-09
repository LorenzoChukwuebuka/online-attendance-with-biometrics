<template>
    <div>
        <NavBar/>

        
             <div class="row">
    <div class="col s4 offset-s1">
      <div class="card white">
        <div class="card-content black-text">
          <span  class="card-title">Add Department </span>

             <form >
                 <div class="row col s12">
				<div class="input-field col s10">
          <i class="material-icons">book</i>
				<input id="email" type="text" placeholder="department" class="validate" v-model="form.dept" required>
			   </div>

               <div class="input-field col s12">
				<i class="material-icons">people</i>
						<select class="browser-default" v-model="form.schId" required>
							<option value="" disabled selected> Choose School  </option>
							<option v-for="sch in school" :key="sch.Id" v-bind:value="sch.Id" >{{sch.school}} </option>
						</select>
							
						
					</div>
                 </div>

                  <div class='row '>
				   <div class="input-field col s6">
				  <button class="btn waves-effect blue waves-light" @click="createDept"> Add <i class="material-icons right">send</i> </button>
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
          <span  class="card-title"> View Department </span>

           <ul class="collection">
        <li class='collection-item' v-for="depts in fetchDept" :key="depts.Id">
                <!-- {{element}} -->
        <b>  Dept:</b> {{depts.dept}}   <b> School:</b> {{depts.school}}  

		 
		 
			<p>   <a class="waves-effect waves-light green btn modal-trigger" href="#modal1" @click="startEdit(depts)"> <i class="material-icons"> edit </i> </a> 
			      <button class="btn waves-effect red waves-light" @click="deleteDept( depts.Id)"><i class="material-icons"> delete </i> </button>
			
			
			 </p> 
		 
            
         </li>
      </ul>   
        </div>
        
      </div>
    </div>
  </div>


              <div id="modal1" class="modal">
              <div class="modal-content">
              <h4>Edit department </h4>

      <div class="row">
        <form class="col s12">
              <div class="row">
                <div class="input-field col s12">
                  <input  id="company" type="text" v-model="edit.dept"  class="validate"  >
                </div>
                  <div class="input-field col s12">
						<select class="browser-default" v-model="edit.schId" required>
							<option value="" disabled selected> Choose School  </option>
							<option v-for="sch in school" :key="sch.Id" v-bind:value="sch.Id" >{{sch.school}} </option>
						</select>
                        	</div>

                 
				
			  </div>

               <input hidden disabled v-model="edit.Id" />
		</form>
	</div>

	       <div class="modal-footer">
             <button class="modal-close waves-effect blue waves-green btn-flat" @click="updateDept"> <i class=" material-icons ">save</i> </button>
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
    name:'AddDept',
    components:{
        NavBar
    },
    data(){
      return{
          school:[],
          form:{
              dept:"",
              schId:""
          },
          fetchDept:[],
          editDept:null,
          edit:{
              dept:"",
              schId:"",
              Id:""
          }
      }
    },

    mounted(){
        M.AutoInit();
        this.fetchschool();
        this.readDept();
    },

    methods:{
        fetchschool(){
          axios.get('http://localhost/gabbyProject/Controllers/admincontroller/department.php?Dept=fetchschools')
          .then(res=>{
              //console.log(res.data)
              this.school = res.data
          })
          .catch(error=>{
              console.log(error)
          })
        },

        createDept(e){
            e.preventDefault();

           //console.log(this.form.schId)

            let formdata = new FormData()
            formdata.append('dept',this.form.dept)
            formdata.append('schId',this.form.schId)
            axios.post('http://localhost/gabbyProject/Controllers/admincontroller/department.php?Dept=create',formdata)
            .then(res=>{
                if(res.data == 200){
                    M.toast({html:"Department added"})
                    location.reload()
                }else if( res.data == 404){
                   M.toast({html:"Department already exists"})
                }
            }) 



        },

        readDept(){
            axios.get('http://localhost/gabbyProject/Controllers/admincontroller/department.php?Dept=read')
              .then(res=>{
                this.fetchDept = res.data
              })
              .catch(err=>{
                  console.log(err )
              })

        },
        startEdit(depts){
          this.editDept = depts 
          this.edit.Id =   this.editDept.Id 
          this.edit.schId = this.editDept.school_Id
          this.edit.dept = this.editDept.dept
        },

        updateDept(e){
            e.preventDefault();
           let data = new FormData();
           data.append('Id',this.edit.Id)
           data.append('schId',this.edit.schId)
           data.append('dept',this.edit.dept)
           axios.post('http://localhost/gabbyProject/Controllers/admincontroller/department.php?Dept=update',data)
           .then(res=>{
               if(res.data == 200){
                   M.toast({html:"updated successfully"})
               }
			    location.reload()
              
           })
           .catch(err=>{
               console.log(err)
           })
        },
        deleteDept(Id){
           let id = new FormData()
           id.append('Id',Id)
           axios.post('http://localhost/gabbyProject/Controllers/admincontroller/department.php?Dept=delete',id)
           .then(res=>{
               if(res.data == 200){
                   M.toast({html:"delete successful"})
               }
               location.reload()
           })
        }

    }


}
</script>