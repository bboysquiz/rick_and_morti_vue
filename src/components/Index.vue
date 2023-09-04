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
  <div class="main">
    <div class="filter-wrapper">
      <input class="input-search" v-model="search" placeholder="Search by name" />
      <select class="select-status" v-model="status">
        <option value="">Any Status</option>
        <option value="alive">Alive</option>
        <option value="dead">Dead</option>
        <option value="unknown">Unknown</option>
      </select>
    </div>
      <ul class="list-wrapper" @scroll="handleScroll">
        <li v-for="character in characters.characters" :key="character.id" class="list-item">
          <router-link class="item-title" v-if="character.id" :to="{ name: 'character', params: { id: character.id } }">
            <h2>{{ character.name }}</h2>
          </router-link>
          <p class="item-species">Разновидность: {{ character.species }}</p>
          <img class="item-img" :src="character.image" :alt="character.name" />
          <ul class="list-wrapper">
            <li class="list-item" v-if="character.episode" v-for="episode in character.episode.slice(0, 5)" :key="episode">
              <router-link class="item-title" v-if="episode.match(/\d+/)"
                :to="{ name: 'episode', params: { id: episode.match(/\d+/).toString() } }">
                Episode {{ episode.match(/\d+/).toString() }}
              </router-link>
            </li>
          </ul>
        </li>
      </ul>
  </div>
</template>

<style scoped>
.main {
  margin: 0 auto;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.input-search {
  width: 300px;
  height: 30px;
  border: 0;
  padding: 0 0 0 10px;
  outline: 1px solid black;
  margin-top: 1px;
  border-radius: 10px;
}

.select-status {
  width: 300px;
  height: 32px;
  border-radius: 10px;
}

.filter-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
}

.list-wrapper {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.list-item {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding-bottom: 20px;
}
.item-title {
  text-decoration: none;
  width: 100%;
  text-align: center;
  color: #000;
  cursor: pointer;
}
.item-species {
  width: 100%;
  text-align: center;
  color: #000;
}
h2 {
  margin: 0;
}
.item-img {
  width: 250px;
  height: 300px;
}
</style>
