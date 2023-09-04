<template>
    <div class="main">
      <h2>{{ character ? character.name : 'Loading...' }}</h2>
      <p>{{ character ? character.species : 'Loading...' }}</p>
      <img :src="character ? character.image : ''" :alt="character ? character.name : 'Loading...'" />
      <p>Location: {{ character && character.location ? character.location.name : 'Loading...' }}</p>
    </div>
  </template>
  
  
<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router'
import axios from 'axios';

const { params } = useRoute();

const character = ref({});

onMounted(async () => {
    const response = await axios.get(`https://rickandmortyapi.com/api/character/${params.id}`)
    console.log(response.data)
    character.value = response.data;
});
</script>

<style scoped>

.main {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin: 0 auto;
}
h2 {
    text-align: center;
    width: 100%;
}
p {
    text-align: center;
    width: 100%;
}

</style>