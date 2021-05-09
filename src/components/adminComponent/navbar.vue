<template>
		<div>

		
	<nav class="navbar-fixed">
		<div class="nav-wrapper blue darken-2">
			<a href="" class="brand-logo"> Admin's dashboard </a>
			<ul id="nav-mobile" class="right hide-on-med-and-down">
			 
				<li><a @click="Logout">  <i class="material-icons">exit_to_app</i></a></li>
			</ul>
		</div>
	</nav>
				


	
	<ul id="slide-out" class="sidenav blue darken-2">
			<li>
					<div class="user-view">
				<div class="background">
					<img src="">
				</div>

						 
							<a><span class="white-text name"></span></a>
							<a><span class="white-text name">{{username}}</span></a>
					</div>
			
			</li>
			    <li><div class="divider"></div></li>
				<li><a @click="addschool" ><i class="material-icons">add</i> Add School </a></li>
				<li><a @click="adddept"><i class="material-icons" >add</i> Add Department </a></li>
                <li><a @click="addcourse" ><i class="material-icons">add</i>Add Courses </a></li>
				<li><a @click="addLecturer"><i class="material-icons">add</i> Add lecturer </a></li>
                <li><a @click="addStudent"><i class="material-icons">add</i> Add Student </a></li>
				  <li><a @click="addbiometrics"><i class="material-icons">add</i> Add biometrics </a></li>
				
				<li><a ><i class="material-icons">visibility</i> view all </a></li>
				 
				 
	</ul>
     	<a href="" data-target="slide-out" class="sidenav-trigger"><i class="material-icons">menu</i></a>
				
		</div>
</template>
<script>
 import axios from 'axios';
axios.defaults.crossDomain = true;
import M from "materialize-css";
 
export default {
		name:'NavBar',

		 data(){
				 return{
				 id:localStorage.getItem('Id'),
				 username:""
				 
				 }

		 },

		mounted:function(){
			this.FetchUserDetails();
			M.AutoInit();
			 
		},

			methods:{

			 FetchUserDetails:function(){
				 let fetch = new FormData()
				 fetch.append('id', this.id)
				 axios.post('http://localhost/gabbyProject/Controllers/admincontroller/fetchUserDetail.php?getUser=getUser',fetch)

				  .then(res=>{
                    this.username =  res.data[0].username 
				  })
                    

				},

				addcourse:function(){
                   this.$router.push('/AddCourse')
				},
				addschool:function(){
                   this.$router.push('/AddSchool')
				},
				adddept:function(){
                  this.$router.push('/AddDept')
				},
				addLecturer:function(){
					this.$router.push('/addLecturer')
				},
				addStudent(){
                    this.$router.push('/student')
				},
				addbiometrics(){
                   
		        	axios.post('http://localhost/gabbyProject/Controllers/lecturerController/getUserDetail.php?lecturer=execute ')
				},
				 
			 

				Logout:function(){
					localStorage.removeItem('Id')
					this.$router.push('/')
				 
				},

				 

			}
		}
</script> 