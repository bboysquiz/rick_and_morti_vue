<template>
    <div>
        <h2>{{ episodeData.name }}</h2>
        <p>Premiere Date: {{ episodeData.air_date }}</p>
        <div>
            <div v-for="character in charactersInEpisode" :key="character.id">
                <router-link :to="{ name: 'character', params: { id: character.id } }">
                    <img :src="character.image" alt="character image">
                    {{ character.name }}
                </router-link>
            </div>
        </div>
        Episode
    </div>
</template>
  
<script setup>
import { computed, ref, onMounted } from 'vue';
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
  