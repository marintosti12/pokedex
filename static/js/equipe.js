
let app = new Vue({
    el: "#app",
    delimiters: ['[[', ']]'],
    data: {
        teams:[]
    },
    methods: {
        createTeam: function ()
        {
            if (this.teams == null) {
                this.teams = [{id: 0, pokemons: []}];
            } else {
                let oldIndex = this.teams.length;
                this.teams.push( {id: oldIndex, pokemons: null})
            }
            localStorage.setItem("teams", JSON.stringify(this.teams))
        },
        getPokemonImage: function (index)
        {
            let url = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"+index+".png";

            return url
        },
        deletePokemon: function (ev, index, team_id)
        {
            if (this.teams == null)
                return
            this.teams[team_id].pokemons.splice(index, 1)
            localStorage.setItem("teams", JSON.stringify(this.teams))
        }

    },
    mounted () {
        this.teams = JSON.parse(localStorage.getItem("teams"));
    }
});