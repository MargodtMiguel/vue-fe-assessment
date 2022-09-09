<script setup>
import PokemonList from '../components/PokemonList.vue';
import PokemonDetail from '../components/PokemonDetail.vue';
import { useFetch } from '../composables/fetch';
import { ref, watch } from 'vue';
import LoadingSpinner from '../components/LoadingSpinner.vue';

const { data, error } = useFetch('https://pokeapi.co/api/v2/pokemon');

const selectedPokemon = ref(null);
const favoritePokemon = ref(window.localStorage.getItem('favorite-pokemon'))

watch(favoritePokemon, () => {
    window.localStorage.setItem('favorite-pokemon', favoritePokemon.value);
});

</script>

<template>
    <div v-if="data" class="pokemon-container">
        <PokemonList :pokemon-list="data.results" :selected-pokemon="selectedPokemon"
            :favorite-pokemon="favoritePokemon" @select-pokemon="pokemon  => selectedPokemon = pokemon"></PokemonList>
        <PokemonDetail :selected-pokemon="selectedPokemon" :favorite-pokemon="favoritePokemon"
            @favorite-pokemon="pokemon => favoritePokemon = pokemon"></PokemonDetail>
    </div>
    <LoadingSpinner v-else></LoadingSpinner>
</template>

<style scoped>
.pokemon-container {
    display: grid;

    grid-template-rows: 4rem auto;
    grid-row-gap: 1rem;

    padding: 1rem;

    max-height: calc(100vh - 2rem);
    overflow: hidden;
}

@media screen and (min-width: 480px) {
    .pokemon-container {
        grid-template-columns: 10rem auto;
        grid-column-gap: 1rem;

        grid-template-rows: none;
    }
}
</style>
