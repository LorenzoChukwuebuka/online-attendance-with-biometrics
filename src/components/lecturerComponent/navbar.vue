<template>
<div>
  	<nav class="navbar-fixed">
		<div class="nav-wrapper blue darken-2">
			<a href="" class="brand-logo"> Lecturer's dashboard</a>
			<ul id="nav-mobile" class="right hide-on-med-and-down">
				<li><a> Welcome {{user}} </a></li>
				<li><a @click="logout"><i class="material-icons">exit_to_app</i><title> Logout </title></a></li>
			</ul>
		</div>
	</nav> 


              
	<ul id="slide-out" class="sidenav blue darken-2">
			<li>
					<div class="user-view">
				<div class="background">
					<img src="">
				</div>

						 
							<a><span class="white-text name"> {{user }}</span></a>
							<a><span class="white-text name"> </span></a>
					</div>
			
			</li>
			    <li><div class="divider"></div></li>
				<li><a @click="adddept"><i class="material-icons" >add</i>  Take Attendance </a></li>
                <li><a @click="course" ><i class="material-icons">add</i>Add more and View Courses </a></li>
				<li><a @click="addLecturer"><i class="material-icons">add</i> View Students  </a></li>
				 
	</ul>

    	<a href="" data-target="slide-out" class="sidenav-trigger"><i class="material-icons">menu</i></a>
      

</div>
</template>

<script>
import M from 'materialize-css';
import axios from 'axios';
axios.defaults.crossDomain = true;
export default {
 name:'bar',
 data(){
     return{
      user:""
     }
 },
 mounted(){
     M.AutoInit();
     this.getUser();
 },
 methods:{
     getUser(){
         let Id = localStorage.getItem('Id')
         let data = new FormData()
         data.append('id',Id)
        axios.post("http://localhost/gabbyProject/Controllers/lecturerController/getUserDetail.php?lecturer=getUser",data)
        .then(res=>{
            this.user = res.data[0].username
		 
        })
     },
     logout(){
         localStorage.removeItem('Id')
         this.$router.push('/')
     },
     course(){
         this.$router.push('/course')
     },
	 takeAttendance(){
		 axios.get("http://localhost/gabbyProject/Controllers/lecturerController/getUserDetail.php?lecturer=attendance")
	 }
 }
}

</script>
 

<style>

</style>