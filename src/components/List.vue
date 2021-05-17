<template>
    <div class="flex flex-col mt-8">
        <div class=" px-10 flex justify-end">
            <router-link to="new" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Add New </router-link>
        </div>
    </div>
    <div class="flex flex-col mt-5">
        <div class="-my-2 overflow-x-auto">
            <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                            <tr>
                                <th scope="col" class="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Name
                                </th>
                                <th scope="col" class="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Adhar No.
                                </th>
                                <th scope="col" class="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Gender
                                </th>
                                <th scope="col" class="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    DOB
                                </th>
                                <th scope="col" class="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Father
                                </th>
                                <th scope="col" class="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Mother
                                </th>
                                <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200" v-if="users.length > 0">
                            <tr v-for="user in users" :key="user.id">
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <router-link class="no-underline text-blue-500 text-lg" :to="{ name: 'details', params: { id: user.id  } }">
                                        {{ user.firstname }} {{ user.lastname }}
                                    </router-link>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    {{ user.adhar_card }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    {{ user.gender == 0 ? "Female" : "Male"  }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    {{ user.dob }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div v-if="user.father_id">
                                        <router-link class="no-underline text-blue-500 text-lg" :to="{ name: 'details', params: { id: user['father_id'].id  } }">
                                            {{user['father_id'].firstname}} {{user['father_id'].lastname}}
                                        </router-link>
                                    </div>
                                    <div v-else>
                                        -
                                    </div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div v-if="user.mother_id">
                                        <router-link class="no-underline text-blue-500 text-lg" :to="{ name: 'details', params: { id: user['mother_id'].id  } }">
                                        {{user['mother_id'].firstname}} {{user['mother_id'].lastname}}
                                        </router-link>
                                    </div>
                                    <div v-else>
                                        -
                                    </div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <router-link class="no-underline text-blue-500 text-lg" :to="{ name: 'details', params: { id: user.id  } }">
                                        Details
                                    </router-link>
                                </td>
                            </tr>
                        </tbody>
                        <tbody v-else>
                            <tr>
                                <td colspan="6" class="px-6 py-4 whitespace-nowrap text-lg text-red-500">
                                    No record found
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div v-if="total > 10">
                        <VueTailwindPagination
                        :current="currentPage"
                        :total="total"
                        :per-page="perPage"
                        @page-changed="dataLoad($event)"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import "@ocrv/vue-tailwind-pagination/dist/style.css";
import VueTailwindPagination from "@ocrv/vue-tailwind-pagination";
export default {
    name: 'List',
    components: {
        VueTailwindPagination
    },
    data() {
        return {
            users: {},
            currentPage: 1,
            perPage: 10,
            total: 0,
        }
    },
    mounted() {
        this.dataLoad();
    },
    methods: {
        dataLoad(page = 1){
            this.axios.get('/users?page='+ page).then((response) => {
                if(response.data.success == true){                    
                    this.users = response.data.data.data;
                    this.total = response.data.data.total;
                    this.currentPage = response.data.data.current_page;
                }
                else{
                    this.$notify({
                        title: "Error",
                        text: response.data.message,
                        type: "error",
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
        onPageClick(event){
            this.currentPage = event;
        }
    }
}
</script>
<style scoped>
</style>
