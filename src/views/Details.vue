<template>
    <Header />
    <div class="flex flex-col mt-8">
        <div class=" px-10 flex justify-end">
            <router-link to="/" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Back </router-link>
        </div>
    </div>
    <div class=" flex mt-10 justify-center px-4">
    
    <div class="max-w-12xl  bg-gray-100 w-full rounded-lg shadow-xl" v-if="user">
        <div class="p-4 border-b">
            <h2 class="text-2xl ">
                {{user.firstname}} {{user.lastname}}
            </h2>
            <p class="text-sm text-gray-500">
                Personal details. 
            </p>
        </div>
        <div>
            <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                <p class="text-gray-600">
                    Adhar No.
                </p>
                <p>
                    {{user.adhar_card}}
                </p>
            </div>
            <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                <p class="text-gray-600">
                    Date of birth
                </p>
                <p>
                    {{user.dob}}
                </p>
            </div>
            <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                <p class="text-gray-600">
                    Father
                </p>
                <p>
                    <span v-if="user.father_id">
                        <router-link class="no-underline text-blue-500 text-lg" :to="{ name: 'details', params: { id: user['father_id'].id  } }">
                            {{user['father_id'].firstname}} {{user['father_id'].lastname}}
                        </router-link>
                    </span>
                    <span v-else>
                        -
                    </span>
                </p>
            </div>
            <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                <p class="text-gray-600">
                    Mother
                </p>
                <p>
                    <span v-if="user.mother_id">
                        <router-link class="no-underline text-blue-500 text-lg" :to="{ name: 'details', params: { id: user['mother_id'].id  } }">
                        {{user['mother_id'].firstname}} {{user['mother_id'].lastname}}
                        </router-link>
                    </span>
                    <span v-else>
                        -
                    </span>
                </p>
            </div>
            <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                <p class="text-gray-600">
                    Child Details
                </p>
                <p>
                    <span v-if="user.children">
                        <p v-for="child in user.children" :key="child.id">
                        <router-link class="no-underline text-blue-500 text-lg" :to="{ name: 'details', params: { id: child.id  } }">
                        {{child.firstname}} {{child.lastname}}
                        </router-link>
                        </p>
                    </span>
                    <span v-else>
                        -
                    </span>
                </p>
            </div>
        </div>
    </div>
    <div class="max-w-12xl  bg-gray-100 w-full rounded-lg shadow-xl" v-else>
        <div class="p-4 border-b">
            <h1 class="text-2xl text-red-500">User not found</h1>
        </div>
    </div>
</div>
</template>

<script>
import Header from '@/Layouts/Header.vue';
export default {
    name: 'Home',
    components: {
        Header
    },
    data() {
        return {
            id: 0,
            user: ""
        }
    },
    created() {
        this.dataLoad();
    },
    methods: {
        dataLoad(){
            this.id = this.$route.params.id;
            this.axios.get('/user/'+ this.id).then((response) => {
                if(response.data.success == true){                    
                    this.user = response.data.data;
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
        }
    }
}
</script>