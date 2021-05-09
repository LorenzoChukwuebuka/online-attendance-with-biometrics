<template>
    <div>
        <NavBar/>

        
             <div class="row">
    <div class="col s4 offset-s1">
      <div class="card white">
        <div class="card-content black-text">
          <span  class="card-title">Add Course </span>

             <form >
                 <div class="row col s12">
				<div class="input-field col s10">
                <i class="material-icons">add</i>
				<input id="email" type="text" placeholder="Enter course code" class="validate" v-model="form.course_code" required>
			 
			   </div>
                 </div>

                    <div class="row col ">
				<div class="input-field col s10">
             <i class="material-icons">book</i>
				<input id="email" type="text" placeholder="Enter course title" class="validate" v-model="form.course" required>
			       </div>

			   				<div class="input-field col s10">
						<select class="browser-default" v-model="form.level" required>
							<option value="" disabled selected> Choose level  </option>
							<option  v-for="lvl in level" :key="lvl.Id" v-bind:value="lvl.Id"  > {{lvl.level}} </option>
						</select>
                        	</div>

							<div class="input-field col s10">
						<select class="browser-default" v-model="form.dept" required>
							<option value="" disabled selected> Choose department </option>
							<option  v-for="de in dept" :key="de.Id" v-bind:value="de.Id"> {{de.dept}} </option>
						</select>
                        	</div>
                        </div>

                  <div class='row '>
				   <div class="input-field col s6">
				  <button class="btn waves-effect blue waves-light" @click="create" > Add <i class="material-icons right">send</i> </button>
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
          <span  class="card-title"> <i class="material-icons right">visibility</i> Courses</span>
		     <span class="card-title"> <input type="text" placeholder="search lecturers" @keyup="read" v-model="search"/> </span>

		  
           <ul class="collection">
        <li class='collection-item' v-for="cr in data" :key="cr.Id">
                <!-- {{element}} -->
        <b>  Course:</b> {{cr.course}}  <b> Course Code:</b> {{cr.course_code}}
		<b> Level: </b> {{cr.level}}  <b> Department: </b> {{cr.dept}}

		 
		 
			<p>   <a class="waves-effect waves-light  green btn modal-trigger" href="#modal1" @click="edit_course(cr)"> <i class="material-icons"> edit </i> </a> 
			      <button class="btn waves-effect red waves-light" @click="deleteCourse( cr.Id)"><i class="material-icons"> delete </i> </button>
			
			
			 </p> 
		 
            
         </li>
      </ul>   

              
              
          
        </div>
        
      </div>
    </div>
  </div>

         <div id="modal1" class="modal">
              <div class="modal-content">
              <h4>Edit course  </h4>

             <div class="row">
				      <form >
                 <div class="row col s12">
				<div class="input-field col s10">
                <i class="material-icons">add</i>
				<input id="email" type="text" placeholder="Enter course code" class="validate" v-model="form.course_code" required>
			 
			   </div>
                 </div>

                    <div class="row col ">
				<div class="input-field col s10">
             <i class="material-icons">book</i>
				<input id="email" type="text" placeholder="Enter course title" class="validate" v-model="edited.course" required>
			       </div>

			   				<div class="input-field col s10">
						<select class="browser-default" v-model="edited.level" required>
							<option value="" disabled selected> Choose level  </option>
							<option  v-for="lvl in level" :key="lvl.Id" v-bind:value="lvl.Id"  > {{lvl.level}} </option>
						</select>
                        	</div>

							<div class="input-field col s10">
						<select class="browser-default" v-model="edited.dept" required>
							<option value="" disabled selected> Choose department </option>
							<option  v-for="de in dept" :key="de.Id" v-bind:value="de.Id"> {{de.dept}} </option>
						</select>
                        	</div>
							 <input v-model="edited.id" hidden disabled />
                        </div>

                  <div class='row '>
				   <div class="input-field col s6">
				  <button class="btn waves-effect blue waves-light" @click="edit" > Add <i class="material-icons right">save</i> </button>
				   </div>
                       
				  </div>

             </form>
              

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
    name:'AddCourse',
    components:{
        NavBar
    },
	data(){
       return{
          level:[],
		  dept:[],
		  data:[],
		  editCourse:null,
		  form:{
			  course:"",
			  course_code:"",
			  dept:"",
			  level:""
		  },
		  edited:{
			  course:"",
			  course_code:"",
			  dept:"",
			  level:"",
			  id:""
		  },
		  search:""

	   }
	},

    mounted(){
        M.AutoInit();
		this.getlevel();
		this.getDept();
		this.read();
	 
    },

    methods:{
      getlevel(){
		  axios.get("http://localhost/gabbyProject/Controllers/admincontroller/courses.php?course=getLevel")
		  .then(res=>{
			  this.level = res.data
		  }).catch(err=>{
			  console.log(err)
		  })
	  },
	  getDept(){
        axios.get("http://localhost/gabbyProject/Controllers/admincontroller/courses.php?course=getDept")
		.then(res=>{
			this.dept = res.data
			console.log(res.data)
		}).catch(err=>{
			console.log(err)
		})
		
		},
		create(e){
			e.preventDefault()
           let form = new FormData()
		   form.append('courseCode',this.form.course_code)
		   form.append('course',this.form.course)
		   form.append('level',this.form.level)
		   form.append('dept',this.form.dept)
		    axios.post('http://localhost/gabbyProject/Controllers/admincontroller/courses.php?course=create',form)
			.then(res=>{
				if(res.data == 200){
					M.toast({html:"Done successfully"})
				}else if(res.data == 404){
					M.toast({html:"Course already exists"})
				}
				location.reload()
			})
		},
		read(){
			axios.get('http://localhost/gabbyProject/Controllers/admincontroller/courses.php?course=read')
			 .then(res=>{
				 if(this.search){
                     return this.data = res.data.filter((courses)=>{
                   return courses.course.includes(this.search)  
            })
				 }else{
                     this.data = res.data
				 }
				
			 })
			 .catch(err=>{
				 console.log(err)
			 })
		},
		edit_course(cr){
           this.editCourse = cr
		   this.edited.id =    this.editCourse.Id
		   this.edited.course =  this.editCourse.course 
		   this.edited.course_code =  this.editCourse.course_code 
		   this.edited.level = this.editCourse.level
	       this.edited.dept = 	this.editCourse.dept
		  
		},

		edit(e){
			e.preventDefault()
			let editData = new FormData();
			editData.append('Id', this.edited.id)
			editData.append('course',this.edited.course)
			editData.append('course_code',this.edited.course_code)
			editData.append('level',this.edited.level)
			editData.append('dept',this.edited.dept)

			axios.post('http://localhost/gabbyProject/Controllers/admincontroller/courses.php?course=update',editData)
			.then(res=>{
				if(res.data == 200){
                   	M.toast({html:"updated successfully"})
				}
				location.reload()
			
			})
		},
		deleteCourse(Id){
			let del = new FormData()
			del.append('Id',Id)
			axios.post('http://localhost/gabbyProject/Controllers/admincontroller/courses.php?course=delete',del)
			.then(res=>{
				if(res.data ==  200){
					M.toast({html:"Deleted successfully"})
				}
				location.reload();
			})
		}
		
    }


}
</script>
 