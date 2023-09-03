<template>
    <div>
        <h2>{{ character.name }}</h2>
        <p>{{ character.species }}</p>
        <img :src="character.image" :alt="character.name" />
        <p>Location: {{ character.location.name }}</p>
    </div>
</template>
  
<script setup>
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router'
import { useCharactersStore } from '../stores/CharactersStore';

const { params } = useRoute();
const charactersStore = useCharactersStore();

onMounted(async () => {
  console.log(charactersStore.characters.find(char => char.id === parseInt(params.id)) || {})
});

const character = computed(() => {
    return charactersStore.characters.find(char => char.id === parseInt(params.id)) || {};
});
</script>