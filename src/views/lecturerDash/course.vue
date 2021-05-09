<template>
<div> 
    <bar/> 

             
 <div class="row">
    <div class="col s4 offset-s1">
      <div class="card white">
        <div class="card-content black-text">
          <span  class="card-title">Add More Courses </span>

             <form >
                 <div class="row col s12">
				 

                 <div class="input-field col s10">
						<select class="browser-default" @change="fetchDept()" v-model="form.schId" required>
							<option value=""  disabled selected> Choose School  </option>
							<option  v-for="sch in school" :key="sch.Id" v-bind:value="sch.Id"  > {{sch.school}} </option>
						</select> 
                        
                        	</div>

                  <div class="input-field col s10">
						<select class="browser-default" @change="getCourse()" v-model="form.deptId" required>
							<option value=""  disabled selected> Choose Department  </option>
							<option  v-for="dept in dept" :key="dept.Id" v-bind:value="dept.Id"  > {{dept.dept}} </option>
						</select> 
                        
                        	</div>

                            <div class="input-field col s10">
						<select class="browser-default" @change="getCourse()" v-model="form.lvlId"  required>
							<option value="" disabled selected> Choose level  </option>
							<option  v-for="lvl in level" :key="lvl.Id" v-bind:value="lvl.Id"  > {{lvl.level}} </option>
						</select>
                        </div>

                        
                            
 


                            <div class="divider col s12"></div>
                            <em class="col s12"> Please select all courses for a particular level before submiting.</em>

                            


                            <div class="col s10">
                                <label v-for="course in courses" :key="course.cid ">
                                  <input type="checkbox" v-model="post.course" :value="course.cid" required/>
                                  <span><b> Course Code </b>:{{course.courseCode}} :: <b> Course Title </b> :{{course.course}} </span>
                                </label>
                            </div>
 

                         
                 </div>

                 
                    <div class='row '>
				   <div class="input-field col s6">
				  <button class="btn waves-effect blue waves-light" @click="send"> Add <i class="material-icons right">send</i> </button>
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
          <span  class="card-title"> View courses </span>
		 
     <ul class="collection">
        <li class='collection-item' v-for="lecturer in lecturerCourse" :key="lecturer.cid"  >
                  <b> Course Code </b>:  {{lecturer.courseCode}}  <b> Course Title </b>: {{lecturer.course}} <b> Level </b> : {{lecturer.level}}
          
		 
            
         </li>
      </ul>   


              
          
        </div>
        
      </div>
    </div>





 </div>

     

</div>

  
</template>

<script>
import bar from "../../components/lecturerComponent/navbar.vue";
 import axios from 'axios';
axios.defaults.crossDomain = true;
import M from "materialize-css";
 
 
export default {
    name:'course',
components:{
    bar
},
 data(){
     return{
       UserId:localStorage.getItem('Id'),
       school:[],
       dept:[], 
       courses:[],
       level:[],
       lecturerCourse:[],
       search:"",
       form:{
           schId:"",
           lecturerId:"",
           deptId:"",
           lvlId:""
       },
       post:{
           Id:localStorage.getItem('Id'),
           course:[]
       }

     }
 },
 mounted(){
       M.AutoInit()
       this.fetchSchool()
       this.fetchDept()
       this.fetchlevel()
       this.getCourse()
       this.fetch()
 },
 methods:{
   fetchSchool(){
       axios.get("http://localhost/gabbyProject/Controllers/lecturerController/getUserDetail.php?lecturer=fetchSchool")
       .then(res=>{
           this.school = res.data
       })
       .catch(err=>{
           console.log(err)
       })
   },
   fetchDept(){
       let data = new FormData()
       data.append('Id',this.form.schId)
       axios.post("http://localhost/gabbyProject/Controllers/lecturerController/getUserDetail.php?lecturer=fetchDept",data)
       .then(res=>{
           this.dept = res.data
       })

   },
   fetchlevel(){
      axios.get("http://localhost/gabbyProject/Controllers/lecturerController/getUserDetail.php?lecturer=getlevel")
      .then(res=>{
          this.level = res.data
      })
   },
   getCourse(){
       let data = new FormData()
       data.append('lvlId',this.form.lvlId)
       data.append('deptId',this.form.deptId)
       axios.post("http://localhost/gabbyProject/Controllers/lecturerController/getUserDetail.php?lecturer=getCourse",data)
       .then(res=>{
           this.courses = res.data
         
       })
       .catch(err=>{
           console.log(err)
       })
   },
   send(e){
       e.preventDefault()
      axios.post("http://localhost/gabbyProject/Controllers/lecturerController/getUserDetail.php?lecturer=post",this.post)
      .then(res=>{
          console.log(res.data)
      })
   },
    fetch(){
   
        
        let data = new FormData()
        data.append('Id',this.UserId)
        axios.post("http://localhost/gabbyProject/Controllers/lecturerController/getUserDetail.php?lecturer=fetch",data)
        .then(res=>{
            this.lecturerCourse = res.data
        })
    }
 }
}
</script>

<style>

</style>