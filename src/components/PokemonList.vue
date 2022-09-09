<script setup>
const props = defineProps(['pokemonList', 'selectedPokemon', 'favoritePokemon']);
</script>

<template>
    <ul v-if="props.pokemonList" class="pokemon-list">
        <li v-for="pokemon in pokemonList">
            <button class="pokemon-list__button ${pokemon === selectedPokemon"
                :class="{'pokemon-list__button--selected': props.selectedPokemon === pokemon.name, 'pokemon-list__button--favorite': props.favoritePokemon === pokemon.name}"
                @click="$emit('selectPokemon', pokemon.name)">
                {{pokemon.name}}
            </button>
        </li>
    </ul>
</template>

<style scoped>
.pokemon-list {
    list-style: none;
    padding-bottom: 1rem;
    max-height: inherit;
    overflow: auto;

    display: flex;
}

@media screen and (min-width: 480px) {

    .pokemon-list {
        flex-direction: column;
    }
}

.pokemon-list__button {
    padding: 1rem;
    margin-bottom: .25rem;
    border: 1px solid black;
    background-color: white;

    width: 100%;
}

.pokemon-list__button:hover {
    background-color: orange;
    cursor: pointer;
}

.pokemon-list__button--selected {
    font-weight: bold;
}

.pokemon-list__button--favorite {
    background-color: yellow;
}
</style>
