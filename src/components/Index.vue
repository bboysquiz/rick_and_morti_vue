<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useCharactersStore } from '../stores/CharactersStore';

const search = ref('');
const status = ref('');
const characters = useCharactersStore()


onMounted(async () => {
  await characters.getCharacters();
  await characters.loadNextPage();
  window.addEventListener("scroll", handleScroll);
});

const handleScroll = async (event) => {
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
  const clientHeight = document.documentElement.clientHeight;

  if (scrollHeight - (scrollTop + clientHeight) < 20) {
    console.log('Loading next page...');  // сообщение для отладки
    await characters.loadNextPage();
  }
};

const filteredCharacters = computed(() => {
  let filteredChars = characters.characters;
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

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

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
      <li v-for="character in filteredCharacters" :key="character.id" class="virtual-list-item">
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
