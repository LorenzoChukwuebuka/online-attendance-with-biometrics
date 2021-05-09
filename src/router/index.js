import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import dashboard from '../views/adminDashboard/dashboard.vue'
import AddCourse from '../views/adminDashboard/addCourse.vue'
import AddSchool from '../views/adminDashboard/AddSchool.vue'
import AddDept from '../views/adminDashboard/addDepartment.vue'
import addLecturer from '../views/adminDashboard/addLecturer.vue'
import lecturerDash from '../views/lecturerDash/home.vue'
import course from '../views/lecturerDash/course.vue'
import student from '../views/adminDashboard/addStudents.vue'
 

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: dashboard,
    beforeEnter:(to, from, next) => {
      const isAuthenticated = localStorage.getItem('Id') ? true: false;
      if (to.name !== 'Home' && !isAuthenticated) next({ name: 'Home' })
      else next();
      } 
  },
  {
    path: '/AddSchool',
    name: 'AddSchool',
    component: AddSchool,
    beforeEnter:(to, from, next) => {
      const isAuthenticated = localStorage.getItem('Id') ? true: false;
      if (to.name !== 'Home' && !isAuthenticated) next({ name: 'Home' })
      else next();
      } 
  },
  {
    path: '/AddDept',
    name: 'AddDept',
    component: AddDept,
    beforeEnter:(to, from, next) => {
      const isAuthenticated = localStorage.getItem('Id') ? true: false;
      if (to.name !== 'Home' && !isAuthenticated) next({ name: 'Home' })
      else next();
      } 

  },
  {
    path: '/AddCourse',
    name: 'AddCourse',
    component: AddCourse,
    beforeEnter:(to, from, next) => {
      const isAuthenticated = localStorage.getItem('Id') ? true: false;
      if (to.name !== 'Home' && !isAuthenticated) next({ name: 'Home' })
      else next();
      } 
  },
  {
    path: '/addLecturer',
    name: 'addLecturer',
    component: addLecturer,
    beforeEnter:(to, from, next) => {
      const isAuthenticated = localStorage.getItem('Id') ? true: false;
      if (to.name !== 'Home' && !isAuthenticated) next({ name: 'Home' })
      else next();
      } 
  },
  {
    path: '/lecturerDash',
    name: 'lecturerDash',
    component: lecturerDash,
    beforeEnter:(to, from, next) => {
      const isAuthenticated = localStorage.getItem('Id') ? true: false;
      if (to.name !== 'Home' && !isAuthenticated) next({ name: 'Home' })
      else next();
      } 
  },
  {
    path: '/student',
    name: 'student',
    component: student,
    beforeEnter:(to, from, next) => {
      const isAuthenticated = localStorage.getItem('Id') ? true: false;
      if (to.name !== 'Home' && !isAuthenticated) next({ name: 'Home' })
      else next();
      } 
  },
  {
    path: '/course',
    name: 'course',
    component: course,
    beforeEnter:(to, from, next) => {
      const isAuthenticated = localStorage.getItem('Id') ? true: false;
      if (to.name !== 'Home' && !isAuthenticated) next({ name: 'Home' })
      else next();
      } 
  },
  
   
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
