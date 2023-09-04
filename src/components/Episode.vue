<template>
    <div class="main">
        <h2 class="title">{{ episodeData ? episodeData.name : 'Loading...' }}</h2>
        <p class="premiere">Premiere Date: {{ episodeData ? episodeData.air_date : 'Loading...' }}</p>
        <div>
            <div class="block" v-for="character in charactersInEpisode" :key="character.id">
                <router-link class="element" :to="{ name: 'character', params: { id: character.id } }">
                    <img class="img" :src="character.image" alt="character image">
                    {{ character.name }}
                </router-link>
            </div>
        </div>
        Episode
    </div>
</template>
  
<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router'
import { useCharactersStore } from '../stores/CharactersStore';
import axios from 'axios';

const { params } = useRoute();
const characters = useCharactersStore();
const episodeData = ref([])
const charactersInEpisode = ref([]);

onMounted(async () => {
    try {
        const episodeResponse = await axios.get(`https://rickandmortyapi.com/api/episode/${params.id}`);
        episodeData.value = episodeResponse.data;

        const charIds = episodeData.value.characters.map(url => url.match(/\d+/)[0]);

        // Загрузка персонажей по ID, если их нет в хранилище
        for (const id of charIds) {
            const char = characters.characters.find(c => c.id === Number(id));
            if (!char) {
                const response = await axios.get(`https://rickandmortyapi.com/api/character/${id}`);
                charactersInEpisode.value.push(response.data);
            } else {
                charactersInEpisode.value.push(char);
            }
        }

    } catch (error) {
        console.error(error);
    }
});
</script>

<style scoped>
.title {
    text-align: center;
    width: 100%;
}
.premiere{
    text-align: center;
    width: 100%;
}
.block {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin: 0 auto;
}
.img{
    width: 200px;
    height: 200px;
}
.element {
    width: 200px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    text-decoration: none;
    color: #000;
    margin-bottom: 30px;
}
</style>