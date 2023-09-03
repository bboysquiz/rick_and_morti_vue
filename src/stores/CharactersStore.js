import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios'

export const useCharactersStore = defineStore('characters', () => {
    const characters = ref([])
    const currentPage = ref(1)
    const itemsPerPage = 20;
    const isLoading = ref(false);

    // const getCharacters = async () => {
    //     await axios
    //         .get(`https://rickandmortyapi.com/api/character`)
    //         .then((response) => {
    //             characters.value = response.data.results
    //         })
    //         .catch((error) => {
    //             console.log(error)
    //         });
    // }
    const getCharacters = async (page = 1) => {
        try {
            if (isLoading.value) return;
            isLoading.value = true;
            const response = await axios.get(`https://rickandmortyapi.com/api/character?page=${page}`);
            characters.value = [...characters.value, ...response.data.results];
            isLoading.value = false;
            
        } catch (error) {
            console.error(error);
            isLoading.value = false
        }
    };
    const loadNextPage = async () => {
        console.log('loadnext')
        const nextPage = currentPage.value + 1;
        await getCharacters(nextPage);
        
        if (characters.value.length > 0) {
            currentPage.value = nextPage;
        }
    };

    return { characters, currentPage, getCharacters, loadNextPage }
})