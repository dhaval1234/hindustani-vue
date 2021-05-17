<template>
  <div class="home">
    <Header />
    <List />
  </div>
</template>

<script>
import Header from '@/Layouts/Header.vue'
import List from '@/components/List.vue'

export default {
  name: 'Home',
  components: {
    Header,
    List
  }
}
</script>
