<template>
<div>
      <NavBar/>

       
 <div class="row">
    <div class="col s4 offset-s1">
      <div class="card white">
        <div class="card-content black-text">
          <span  class="card-title">Add student </span>

             <form >
                 <div class="row col s12">
				<div class="input-field col s10">
                <i class="material-icons">perm_identity</i>
				<input  type="text" placeholder="enter Student's name" class="validate" v-model="form.name" required>
			 
			   </div>
               	<div class="input-field col s10">
                <i class="material-icons">perm_identity</i>
				<input  type="number" placeholder="please enter reg number" class="validate" v-model="form.regNum"  required>
			 
			   </div>
                    
                 <div class="input-field col s10">
						<select class="browser-default" @change="fetchDept()" v-model="form.school" required>
							<option value=""  disabled selected> Choose School  </option>
						     	<option  v-for="sch in getschool" :key="sch.Id" v-bind:value="sch.Id"  > {{sch.school}} </option>
						</select> 
                        
                        	</div>

                  <div class="input-field col s10">
						<select class="browser-default" @change="getCourse()" v-model="form.dept" required>
							<option value=""  disabled selected> Choose Department  </option>
				             <option  v-for="dept in getdept" :key="dept.Id" v-bind:value="dept.Id" > {{dept.dept}} </option>
						</select> 
                        
                        	</div>

                            <div class="input-field col s10">
						<select class="browser-default" @change="getCourse()" v-model="form.level" required>
							<option value="" disabled selected> Choose level  </option>
						    <option  v-for="lvl in getlevel" :key="lvl.Id" v-bind:value="lvl.Id"  > {{lvl.level}} </option>
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
				  <button class="btn waves-effect blue waves-light" @click="submit"> Add <i class="material-icons right">send</i> </button>
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
          <span  class="card-title"> View Student </span>
          <span class="card-title"> <input type="text" v-model="search" @keyup="fetchStudents" placeholder="search student" /> </span>
		 
     <ul class="collection">
        <li class='collection-item' v-for="student in students" :key="student.id" :value="student.id">
		
			<b> Name </b>:{{student.name}} <b> reg Number </b>:{{student.regNum}} 
			<b> level </b>:{{student.level}} <b> Department </b>: {{student.dept}} 
		 
            
         </li>
      </ul>   


              
          
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
import NavBar from '../../components/adminComponent/navbar.vue'
export default {
name:"student",
components:{
 NavBar,
 },
 data(){
     return{
        getschool:[],
        getdept:[],
        courses:[],
        getlevel:[],
		students:[],
        
         form:{
             regNum:"",
             name:"",
             course:[],
			 dept:"",
			 school:"",
			 level:""
         },
         search:""
     }
 },
 created(){
    this.fetchSchools()
    this.fetchDept()
    this.fetchLevel()
	this.fetchStudents()
 },
   methods:{
       fetchSchools(){
            axios.get("http://localhost/gabbyProject/Controllers/admincontroller/lecturers.php?lecturer=getSchool")
            .then(res=>{

      this.getschool = res.data
                
            })
       },
       fetchDept(){
          let form = new FormData()
             form.append('Id',this.form.school)
            axios.post("http://localhost/gabbyProject/Controllers/admincontroller/lecturers.php?lecturer=getDept",form)
            .then(res=>{
               this.getdept = res.data
                
            })
       },

         fetchLevel(){
            axios.get("http://localhost/gabbyProject/Controllers/admincontroller/lecturers.php?lecturer=getLevel")
            .then(res=>{
                this.getlevel = res.data
            }) 
            
        },
        getCourse(){
		let	data = new FormData()
			data.append('lvl',this.form.level)
			data.append('dept',this.form.dept)
              axios.post("http://localhost/gabbyProject/Controllers/lecturerController/getUserDetail.php?lecturer=getcourse",data)
          .then(
              res=>{
                  
                 this.courses = res.data
              })
        },
		submit(e){
			e.preventDefault()
		 
			axios.post("http://localhost/gabbyProject/Controllers/lecturerController/getUserDetail.php?lecturer=submit",this.form)
			.then(res=>{
				if(res.data == 200){
                    M.toast({html:"Student registered successfully proceed to add biometrics"})
                }else if(res.data == 401){
                   M.toast({html:"Student already exists "})
                }
			})
            console.log(this.form)
		},

		fetchStudents(){
			axios.get("http://localhost/gabbyProject/Controllers/lecturerController/getUserDetail.php?lecturer=getStudent ")
			.then(res=>{
			   if(this.search){ 
                   return this.students = res.data.filter((student)=>{
                   return student.name.includes(this.search)  
            })
			}else{
                this.students = res.data
            }
 			})
             .catch(err=>{
                 console.log(err)
             })
		}
       
   }

}
</script>

<style>

</style>