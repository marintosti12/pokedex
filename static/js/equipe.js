
let app = new Vue({
    el: "#app",
    delimiters: ['[[', ']]'],
    data: {
        pokemons:[]
    },
    methods: {
        getPokemonImage: function (index)
        {
            let url = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"+index+".png";

            return url
        },
        deletePokemon: function (ev, index)
        {
            console.log(ev);
            ev.stopPropagation()
            this.pokemons.splice(index, 1)
            localStorage.setItem("pokemons", JSON.stringify(this.pokemons))
        }

    },
    mounted () {
        this.pokemons = JSON.parse(localStorage.getItem("pokemons"));
    }
});