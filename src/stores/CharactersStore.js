import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios'

export const useCharactersStore = defineStore('characters', () => {
    const characters = ref([])
    const currentPage = ref(1)
    const isLoading = ref(false);
    const currentSearch = ref('');
    const currentStatus = ref('');

    const getCharacters = async (page = 1, search = '', status = '') => {

        try {
            if (isLoading.value) return;
            isLoading.value = true;

            if (currentSearch.value !== search || currentStatus.value !== status) {
                characters.value = [];
                currentSearch.value = search;
                currentStatus.value = status;
            }

            let url = `https://rickandmortyapi.com/api/character?page=${page}`;
            if (search) url += `&name=${search}`;
            if (status) url += `&status=${status}`;

            const response = await axios.get(url);
            characters.value = [...characters.value, ...response.data.results];
            isLoading.value = false;

        } catch (error) {
            console.error(error);
            isLoading.value = false
        }
    };
    const loadNextPage = async () => {
        const nextPage = currentPage.value + 1;
        await getCharacters(nextPage, currentSearch.value, currentStatus.value);

        if (characters.value.length > 0) {
            currentPage.value = nextPage;
        }
    };

    return { characters, currentPage, getCharacters, loadNextPage }
})