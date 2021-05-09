<template>
<div>
     <NavBar/>
     
         
 <div class="row">
    <div class="col s4 offset-s1">
      <div class="card white">
        <div class="card-content black-text">
          <span  class="card-title">Add lecturer </span>

             <form >
                 <div class="row col s12">
				<div class="input-field col s10">
                <i class="material-icons">perm_identity</i>
				<input id="email" type="text" placeholder="enter lecturer's name" class="validate" v-model="form.name" required>
			 
			   </div>

                 <div class="input-field col s10">
						<select class="browser-default" @change="fetchDept()" v-model="get.school" required>
							<option value=""  disabled selected> Choose School  </option>
							<option  v-for="sch in getschool" :key="sch.Id" v-bind:value="sch.Id"  > {{sch.school}} </option>
						</select> 
                        
                        	</div>

                  <div class="input-field col s10">
						<select class="browser-default" @change="getCourse()" v-model="get.dept" required>
							<option value=""  disabled selected> Choose Department  </option>
							<option  v-for="dept in getDept" :key="dept.Id" v-bind:value="dept.Id"  > {{dept.dept}} </option>
						</select> 
                        
                        	</div>

                            <div class="input-field col s10">
						<select class="browser-default" @change="getCourse()" v-model="get.level" required>
							<option value="" disabled selected> Choose level  </option>
							<option  v-for="lvl in getLevel" :key="lvl.Id" v-bind:value="lvl.Id"  > {{lvl.level}} </option>
						</select>
                        </div>

                        
                            
 


                            <div class="divider col s12"></div>
                            <em class="col s12"> Please select all courses for a particular level before submiting.</em>

                            


                            <div class="col s10">
                                <label v-for="course in courses" :key="course.cid ">
                                  <input type="checkbox" v-model="form.course" :value="course.cid" required/>
                                  <span><b> Course Code </b>:{{course.courseCode}} :: <b> Course Title </b> :{{course.course}} </span>
                                </label>
                            </div>
 
 
                         
                 </div>

                 
                    <div class='row '>
				   <div class="input-field col s6">
				  <button class="btn waves-effect blue waves-light" @click="submitCourse" > Add <i class="material-icons right">send</i> </button>
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
          <span  class="card-title"> View Lecturers </span>
          <span class="card-title"> <input type="text" placeholder="search lecturers" @keyup="fetchlecturer" v-model="search"/> </span>
		 
     <ul class="collection">
        <li class='collection-item' v-for="lecturer in getlecturer" :key="lecturer.lid"  >
                <b> Name of Lecturer </b>: {{lecturer.name}}   <b> Course Code </b>:  {{lecturer.courseCode}}  <b> Course Title </b>: {{lecturer.course}}
            
			<p>     <a class="waves-effect waves-light btn green modal-trigger" href="#modal1" @click="startEdit(lecturer)" > <i class="material-icons"> edit </i> </a> 
			      <button class="btn waves-effect red waves-light" ><i class="material-icons" @click="deleteLecturer(lecturer.lid)"> delete </i> </button>
			
			
			 </p> 
		 
            
         </li>
      </ul>   


              
          
        </div>
        
      </div>
    </div>
 </div>


       <div id="modal1" class="modal">
              <div class="modal-content">
              <h4>Edit Lecturers </h4>

    <div class="row">
        <form class="col s12">
              <div class="row">
                <div class="input-field col s6">
                  <input  id="company" type="text"  placeholder="lecturers name" v-model="edit.name" class="validate"  >
                </div>

                     <div class="input-field col s10">
						<select class="browser-default" @change="fetchDept()" v-model="get.school" required>
							<option value=""  disabled selected> Choose School  </option>
							<option  v-for="sch in getschool" :key="sch.Id" v-bind:value="sch.Id"  > {{sch.school}} </option>
						</select> 
                        
                        	</div>

                  <div class="input-field col s10">
						<select class="browser-default" @change="getCourse()" v-model="get.dept" required>
							<option value=""  disabled selected> Choose Department  </option>
							<option  v-for="dept in getDept" :key="dept.Id" v-bind:value="dept.Id"  > {{dept.dept}} </option>
						</select> 
                        
                        	</div>

                            <div class="input-field col s10">
						<select class="browser-default" @change="getCourse()" v-model="get.level" required>
							<option value="" disabled selected> Choose level  </option>
							<option  v-for="lvl in getLevel" :key="lvl.Id" v-bind:value="lvl.Id"  > {{lvl.level}} </option>
						</select>
                        </div>

                          
                            <div class="input-field col s10">
						<select class="browser-default"  v-model="edit" required>
							<option value="" disabled selected> Choose level  </option>
							<option  v-for="course in courses" :key="course.cid" v-bind:value="course.cid"  > {{course.course}} </option>
						</select>
                        </div>

                          
                            
 

                         <input  hidden disabled  v-model="edit.lecturerId"/>



				 <input  hidden disabled  v-model="edit.Id"/>
			  </div>
		</form>
	</div>

	       <div class="modal-footer">
             <button class="modal-close waves-effect waves-green btn-flat" @click="update" > <i class=" material-icons ">save</i> </button>
          </div>
	  </div>
	</div>

   
     



            
		 
            
     
</div>
     

  
</template>

<script>
 import axios from 'axios' 
axios.defaults.crossDomain = true
import M from "materialize-css"
import NavBar from '../../components/adminComponent/navbar.vue'
export default {
name:'addLecturer',
components:{
    NavBar
},
  data(){
      return{

        getDept:[],
        getLevel:[],
        getschool:[],
        courses:[],
        getlecturer:[],
        get:{
            school:"",
            level:"",
            dept:""
        },
        search:"",
        form:{
            name:"",
            course:[],

        },
        editlecturer:null,
        edit:{
            name:"",
            course:[],
            Id:"",
            lecturerId:"",
        }
      }
    
  },
    
    mounted(){
        M.AutoInit();
        this.fetchDept();
        this.fetchLevel();
        this.fetchschool();
        this.fetchlecturer();
    },
  
          
    methods:{
        
        fetchschool(){
            axios.get("http://localhost/gabbyProject/Controllers/admincontroller/lecturers.php?lecturer=getSchool")
            .then(res=>{

                this.getschool = res.data 
                
            })
        },
        fetchDept(){
            let form = new FormData()
             form.append('Id',this.get.school)
            axios.post("http://localhost/gabbyProject/Controllers/admincontroller/lecturers.php?lecturer=getDept",form)
            .then(res=>{
                this.getDept = res.data
                
            })
        },
        fetchLevel(){
            axios.get("http://localhost/gabbyProject/Controllers/admincontroller/lecturers.php?lecturer=getLevel")
            .then(res=>{
                this.getLevel = res.data
            })

        },

           getCourse(){
          let form = new FormData()
        /*  form.append('level',this.get.level)
          form.append('dept',this.get.dept) */
          axios.post("http://localhost/gabbyProject/Controllers/admincontroller/lecturers.php?lecturer=getCourse",this.get)
          .then(
              res=>{
                 // console.log(res.data)
                  this.courses = res.data
              })
        },

        submitCourse(e){
            e.preventDefault()
 
           axios.post("http://localhost/gabbyProject/Controllers/admincontroller/lecturers.php?lecturer=create",this.form)
           .then(res=>{
               if(res.data == 500){
                   M.toast({html:"user already exits"})
               }else{
                  alert(`lecturer added successfully. Password is ${res.data}`)
               }
               location.reload()
             
           }) 
         },

         fetchlecturer(){
             axios.get("http://localhost/gabbyProject/Controllers/admincontroller/lecturers.php?lecturer=fetchLecturer")
             
             .then(res=>{
            if(this.search){ 
                   return this.getlecturer = res.data.filter((lecturers)=>{
                   return lecturers.name.includes(this.search)  
            })
            }else{
              this.getlecturer = res.data
            } 
                 
             })
             .catch(err=>{
                 console.log(err)
             })
         },
         
         deleteLecturer(lid){
          let id = new FormData()
           id.append('Id',lid)
           axios.post("http://localhost/gabbyProject/Controllers/admincontroller/lecturers.php?lecturer=delete",id)
           .then(res=>{ 
               if(res.data == 200){
                    M.toast({html:"Deleted!"})
               }
               location.reload()
              

           })
         },

         startEdit(lecturer){
            this.editlecturer = lecturer
            this.edit.Id = this.editlecturer.lid
            this.edit.name = this.editlecturer.name
            this.edit.course = this.editlecturer.course
            this.edit.lecturerId = this.editlecturer.lecturerId

           

            
         },

         update(e){
             e.preventDefault()
             let form = new FormData()
             form.append('Id',this.edit.Id)
             form.append('name',this.edit.name)
             form.append('course',this.edit.course)
             form.append('lecturerId',this.edit.lecturerId)

             axios.post("http://localhost/gabbyProject/Controllers/admincontroller/lecturers.php?lecturer=update",form)
             .then(res=>{
                          if(res.data == 200 && res.data == 201){
                             M.toast("Update was successful")
                          }
             })
         }


       
    }
    
}
</script>

<style scoped>
 

</style>