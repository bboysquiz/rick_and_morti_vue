<template>
    <div>
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