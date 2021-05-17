<template>
    <Header />
    <div class="flex flex-col py-5 px-12">
        <div class=" px-10 flex justify-end">
            <router-link to="/" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Back </router-link>
        </div>
    </div>
   <div class="mt-10 bg-gray-100 mx-auto  bg-white mt-2 lg:px-24">
    <form @submit.prevent="submitForm">
      <div class="flex flex-col bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 ">
        <div class="-mx-3 md:flex mb-6">
          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="uppercase tracking-wide text-black text-xs font-bold mb-2" for="company">
              First Name*
            </label>
            <input v-model="user.firstname" class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3" id="company" type="text" placeholder="First Name">
          </div>
          <div class="md:w-1/2 px-3">
            <label class="uppercase tracking-wide text-black text-xs font-bold mb-2" for="title">
              Last Name*
            </label>
            <input v-model="user.lastname" class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3" id="title" type="text" placeholder="Last Name">
          </div>
          <div class="md:w-1/2 px-3">
            <label class="uppercase tracking-wide text-black text-xs font-bold mb-2" for="title">
              Adhar No*
            </label>
            <input v-model="user.adhar_card" class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3" id="title" type="text" placeholder="Adhar Number">
          </div>
          <div class="md:w-1/2 px-3">
            <label class="uppercase tracking-wide text-black text-xs font-bold mb-2" for="title">
              Date of birth*
            </label>
            <input v-model="user.dob" class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3" id="title" type="date" placeholder="Adhar Number">
          </div>
        </div>
        
        <div class="-mx-3 md:flex mb-2">
          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="uppercase tracking-wide text-black text-xs font-bold mb-2" for="location">
              Gender*
            </label>
            <div>
              <div class="inline-flex">
                <input class="hidden" v-model="user.gender" type="radio" id="male" value="male" name="gender" checked/>
                <label class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 cursor-pointer rounded-l" for="male">Male</label>
                <input class="hidden" type="radio" v-model="user.gender" id="female" value="female" name="gender" />
                <label class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 cursor-pointer" for="female">Female</label>
              </div>
            </div>
          </div>
          <div class="md:w-1/2 px-3">
            <label class="uppercase tracking-wide text-black text-xs font-bold mb-2" for="job-type">
              Select Father
            </label>
            <div>
              <select v-model="user.father_id" class="w-full bg-gray-200 border border-gray-200 text-black text-xs py-3 px-4 pr-8 mb-3 rounded" id="job-type">
                <option class="text-lg"></option>
                <option class="text-lg" v-for="father in fathers" :key="father.id">{{ father.firstname }} {{ father.lastname }}</option>
              </select>
            </div>
          </div>
          <div class="md:w-1/2 px-3">
            <label class="uppercase tracking-wide text-black text-xs font-bold mb-2" for="department">
              Select Mother
            </label>
            <div>
              <select v-model="user.mother_id" class="w-full bg-gray-200 border border-gray-200 text-black text-xs py-3 px-4 pr-8 mb-3 rounded" id="department">
                <option class="text-lg"></option>
                <option class="text-lg" v-for="mother in mothers" :key="mother.id">{{ mother.firstname }} {{ mother.lastname }}</option>
              </select>
            </div>
          </div>
          <div class="md:w-1/2 px-3 mt-5">
            <button type="submit" class=" bg-gray-900 text-white font-bold py-2 px-4 border-b-4 hover:border-b-2 border-gray-500 hover:border-gray-100 rounded-full">
              Submit
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import Header from '@/Layouts/Header.vue';
export default {
  name: 'Home',
  components: {
    Header
  },
  data() {
    return {
      user: {
        firstname: '',
        lastname: '',
        adhar_card: '',
        dob: '',
        gender: 'male',
        father_id:'',
        mother_id: '',
      },
      fathers:[],
      mothers:[],
      currentPage: 1,
      perPage: 10,
      total: 0,
      title: ''
    }
  },
  created() {
    this.dataLoad();
  },
  methods: {
    dataLoad(){
      axios.get('/user/parentDetails').then((response) => {
        if(response.data.success == true){                    
          this.fathers = response.data.data.father;
          this.mothers = response.data.data.mother;
        }
        else{
          this.$notify({
            title: (response.data.success == true) ? "Success" : "Error",
            text: response.data.message,
            type: (response.data.success == true) ? "success" : "error",
          });
        } 
      }).catch(function () {
        this.$notify({
          title: "Error",
          text: "Something went to be wrong. please try again later.",
          type: 'error',
        });
      });
    },
    submitForm(){
      axios.post('/user/store', this.user)
      .then((response) => { 
        if(response.data.status == 422){
          let errors = response.data.message;
          for (let field of Object.keys(errors)) {
            this.$notify({
              title: "Error",
              text: errors[field][0],
              type: 'error',
            });
            
          }
        }else {
          this.$notify({
            title: (response.data.success == true) ? "Success" : "Error",
            text: response.data.message,
            type: (response.data.success == true) ? "success" : "error",
          });
        }
      })
      .catch(function () {
        this.$notify({
          title: "Error",
          text: "Something went to be wrong. please try again later.",
          type: 'error',
        });
      });
    }
  }
}
</script>

<style scoped>
  input:checked + label {
    background-color: LightSeaGreen;
  }
</style>