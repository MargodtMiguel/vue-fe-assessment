<script setup>
import { watch, ref } from 'vue';
import { useFetch } from '../composables/fetch';
import LoadingSpinner from './LoadingSpinner.vue';

const props = defineProps(['selectedPokemon', 'favoritePokemon']);
defineEmits(['favoritePokemon'])

const pokemon = ref(null)
const fetchError = ref(null)

watch(() => props.selectedPokemon, async () => {
    pokemon.value = null;
    fetchError.value = null;

    const { data, error } = useFetch(`https://pokeapi.co/api/v2/pokemon/${props.selectedPokemon}`);

    pokemon.value = data;
    fetchError.value = error
});
</script>

<template>
    <div class="pokemon-details-card" v-if="props.selectedPokemon">
        <div class="pokemon-details" v-if="pokemon && pokemon.value">
            <div class="pokemon-details__favorite">
                <button v-if="pokemon.value.name !== props.favoritePokemon" type="button"
                    class="pokemon-details__favorite__button" @click="$emit('favoritePokemon', pokemon.value.name)">
                    Mark as favorite
                </button>
                <p v-else>This is your favorite pokemon</p>
            </div>

            <div class="pokemon-details__info">
                <div class="pokemon-details__image">
                    <img :src="pokemon.value.sprites?.front_default" />
                </div>
                <p>
                    <strong>
                        {{pokemon.value.id}}: {{pokemon.value.name}}
                    </strong>
                </p>
                <p>Height: {{pokemon.value.height}}</p>
                <p>Weight: {{pokemon.value.weight}}</p>
            </div>
            <div class="pokemon-details__moves">
                <p class="pokemon-details__moves__title">
                    <strong>Moves:</strong>
                </p>
                <ul class="pokemon-details__moves__list" v-if="pokemon.value.moves">
                    <p v-for="move in pokemon.value.moves" class="pokemon-details__moves__list__item">
                        {{move.move.name}}
                    </p>
                </ul>
            </div>
        </div>

        <div v-if="pokemon.value === null && fetchError.value === null">
            <LoadingSpinner></LoadingSpinner>
        </div>
    </div>

    <div v-if="pokemon?.value === null && fetchError?.value !== null">
        <h2>Failed to fetch details for {{props.selectedPokemon}}</h2>
        <p>Please try again later</p>
    </div>
</template>

<style scoped>
.pokemon-details-card {
    width: 20rem;
    height: 35rem;
    padding: 1rem;

    justify-self: center;
    align-self: center;
    overflow: auto;

    box-shadow: 0px 4px 10px 2px rgb(41, 41, 41, 0.15);
    border-radius: 4px;
}

.pokemon-details {
    display: grid;
    grid-template-rows: 2rem max-content 1fr;

    max-height: 100%;
}

.pokemon-details__favorite {
    display: flex;
    justify-content: center;
    align-items: center;
}

.pokemon-details__favorite__button {
    background-color: #D7EDF0;
    border: none;
    border-radius: 4px;
    padding: .5rem 1rem;
    font-size: 1rem;

    transition: all .1s ease-in;
}

.pokemon-details__favorite__button:hover {
    cursor: pointer;
    background-color: #CAE2E5;

}

.pokemon-details__info {
    display: flex;
    flex-direction: column;
    align-items: center;

    border-bottom: 1px solid lightgray;
    padding-bottom: 1rem;
}

.pokemon-details__info>p {
    margin-bottom: 1rem;
}

.pokemon-details__image {
    width: 8rem;
    height: 8rem;

    position: relative
}

.pokemon-details__image__swap-button {
    position: absolute;
    bottom: .5rem;
    right: -.5rem;

    padding: 0;

    width: 1.5rem;
    height: 1.5rem;

    background: none;
    border: 1px solid lightgray;
    border-radius: 100%;
}

.pokemon-details__image__swap-button:hover {
    cursor: pointer;
}

.pokemon-details__image>img {
    width: 100%;
}

.pokemon-details__moves {
    padding-top: 1rem;
    max-height: 100%;
    overflow: hidden;

}

.pokemon-details__moves__title {
    text-align: center;
    margin-bottom: .5rem;
}

.pokemon-details__moves__list {
    max-height: 100%;
    overflow: auto;

    display: grid;
    grid-template-columns: 1fr 1fr;
}

.pokemon-details__moves__list__item {
    padding: .5rem;
}
</style>
