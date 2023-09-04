<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { useCharactersStore } from '../stores/CharactersStore';

const search = ref('');
const status = ref('');
const characters = useCharactersStore()


onMounted(async () => {
  await characters.getCharacters();
  window.addEventListener("scroll", handleScroll);
});

const handleScroll = async (event) => {
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
  const clientHeight = document.documentElement.clientHeight;

  if (scrollHeight - (scrollTop + clientHeight) < 20) {
    await characters.loadNextPage();
  }
};

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

watch([search, status], async () => {
  characters.characters.value = [];

  await characters.getCharacters(1, search.value, status.value);
}, { immediate: true });

</script>

<template>
  <div>
    <input v-model="search" placeholder="Search by name" />
    <select v-model="status">
      <option value="">Any Status</option>
      <option value="alive">Alive</option>
      <option value="dead">Dead</option>
      <option value="unknown">Unknown</option>
    </select>
    <div class="list-wrapper"></div>
    <ul class="virtual-list-container" ref="container" @scroll="handleScroll">
      <li v-for="character in characters.characters" :key="character.id" class="virtual-list-item">
        <router-link v-if="character.id" :to="{ name: 'character', params: { id: character.id } }">
          <h2>{{ character.name }}</h2>
        </router-link>
        <p>{{ character.species }}</p>
        <img :src="character.image" :alt="character.name" />
        <ul>
          <li v-if="character.episode" v-for="episode in character.episode.slice(0, 5)" :key="episode">
            <router-link v-if="episode.match(/\d+/)"
              :to="{ name: 'episode', params: { id: episode.match(/\d+/).toString() } }">
              Episode {{ episode.match(/\d+/).toString() }}
            </router-link>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
