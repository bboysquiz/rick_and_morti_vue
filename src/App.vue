<script setup>
import { ref, computed } from 'vue';

const search = ref('');
const status = ref('');
const characters = ref([
  {
    id: 1,
    name: "Rick Sanchez",
    "status": "Unknown",
  },
  {
    id: 2,
    name: "Morty Smith",
    "status": "Dead",
  },
  {
    id: 3,
    name: "Summer Smith",
    "status": "Alive",
  }
]);
const filteredCharacters = computed(() => {
  let filteredChars = characters.value;

  if (search.value) {
    filteredChars = filteredChars.filter(character =>
      character.name.toLowerCase().includes(search.value.toLowerCase())
    );
  }
  if (status.value) {
    filteredChars = filteredChars.filter(character =>
      character.status.toLowerCase() === status.value.toLowerCase()
    );
  }

  return filteredChars;
});
</script>

<template>
  <div>
    <input v-model="search" @input="filtered" placeholder="Search by name" />
    <select v-model="status" @change="filtered">
      <option value="">Any Status</option>
      <option value="alive">Alive</option>
      <option value="dead">Dead</option>
      <option value="unknown">Unknown</option>
    </select>
    <ul>
      <li v-for="character in filteredCharacters" :key="character.id">
        <router-link :to="{ name: 'character', params: { id: character.id } }">
          <h2>{{ character.name }}</h2>
        </router-link>
        <p>{{ character.species }}</p>
        <img :src="character.image" :alt="character.name" />
        <ul>
          <li v-for="episode in character.episodes" :key="episode">
            <router-link :to="{ name: 'episode', params: { id: episode } }">
              Episode {{ episode }}
            </router-link>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
