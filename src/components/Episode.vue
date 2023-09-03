<template>
    <div>
        <h2>{{ episodeData.name }}</h2>
        <p>Premiere Date: {{ episodeData.air_date }}</p>
        <div>
            <div v-for="character in charactersInEpisode" :key="character.id">
                {{ character.id }}
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
const idsCharInEpisode = ref([])

onMounted(async () => {
    await axios
        .get(`https://rickandmortyapi.com/api/episode/${params.id}`)
        .then((response) => {
            episodeData.value = response.data
            idsCharInEpisode.value = episodeData.value.characters.map(link => link.match(/\d+/).toString())
            // console.log(`${episodeData.value} - episodeData.value`)
            // console.log(`${idsCharInEpisode.value} - idsCharInEpisode.value`)
            // console.log(`${characters.characters} - characters.characters`)

        })
        .catch((error) => {
            console.log(error)
        });
});

const charactersInEpisode = computed(() => {
    idsCharInEpisode.value = idsCharInEpisode.value.map(el => {
        return Number.parseInt(el)
    })
    // console.log(characters.characters.filter(character => idsCharInEpisode.value.includes(Number.parseInt(JSON.stringify(character.id)))))
    // return characters.characters.filter(character => idsCharInEpisode.value.includes(Number.parseInt(JSON.stringify(character.id))))
    characters.characters.forEach(el => {
        console.log(el)
        idsCharInEpisode.value.forEach(id => {
            // console.log(`${el.id} - el.id и ${id} - id ${el.id === id ? 'true' : 'false'} `)
            if((JSON.stringify(el.id)) == Number.parseInt(JSON.stringify(id))){
                
                // console.log(``)
                // console.log(`${JSON.stringify(el.id)} - element`)
            }
        })
    })
});


const goToCharacter = (characterId) => {
    // Навигация на страницу персонажа
};
</script>
  