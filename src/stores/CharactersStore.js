import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios'

export const useCharactersStore = defineStore('characters', () => {
    const characters = ref('')
    const getCharacters = async () => {
        await axios
            .get(`https://rickandmortyapi.com/api/character`)
            .then((response) => {
                characters.value = response.data.results
            })
            .catch((error) => {
                console.log(error)
            });
    }
    return {characters, getCharacters}
})