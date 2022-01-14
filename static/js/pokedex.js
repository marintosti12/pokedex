
let app = new Vue({
    el: "#app",
    delimiters: ['[[', ']]'],
    data: {
        current_id : 0,
        types: [],
        stats: [],
        teams: [],
        team_index: 0,
        current_data: null,
        img_src: "",
        loading: false
    },
    mounted() {
        this.teams = JSON.parse(localStorage.getItem("teams"))
        this.greet(1)
    },
    methods: {
        selectTeam: function (event, selectedIndex)
        {
            if (selectedIndex === 0)
                return;
            this.team_index = selectedIndex - 1
        },
        savePokemonInTeam: function ()
        {
            if (this.teams == null)
                return;

            let pokemons = this.teams[this.team_index].pokemons
            if (pokemons == null)
            {
                pokemons = [{"name": this.current_data["name"], "id": this.current_id}]
                this.teams[this.team_index].pokemons = pokemons
            } else {
                for (let i = 0; i < pokemons.length; i++) {
                    if (pokemons[i].name === this.current_data["name"])
                        return
                }
                pokemons.push({"name": this.current_data["name"], "id": this.current_id})
            }
            localStorage.setItem("teams", JSON.stringify(this.teams));
        },
        getStatColor: function (index)
        {
            let list = ["bg-red-600", "bg-orange-600", "bg-amber-600", "bg-cyan-600", "bg-green-600", "bg-pink-600"]

            for (let i = 0; i < list.length; i++) {
                if (i == index)
                    return list[i]
            }
            return "bg-gray-600";
        },
        getStatName: function (index)
        {
            let list = ["HP", "ATK", "DEF", "SpA", "SpD", "SPD"]

            for (let i = 0; i < list.length; i++) {
                if (i == index)
                    return list[i]
            }
            return "";
        },
        getTypeColor: function (type)
        {
            console.log(type)
            if (type == "fire")
                return "bg-red-700"
            if (type == "water")
                return "bg-cyan-700"
            if (type == "grass")
                return "bg-green-700"
            if (type == "poison")
                return "bg-violet-700"
            if (type == "flying")
                return "bg-violet-400"
            if (type == "bug")
                return "bg-green-400"
            if (type == "normal")
                return "bg-gray-400"
            return "bg-gray-400"
        },
        greet: function (id) {
            if (this.current_id == id)
                return
            else {
                const instance = this;
                this.loading = false
                this.current_id = id
                this.img_src = "https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/other/official-artwork/"+this.current_id+".png?raw=true"

                axios.get('pokemon/', {
                    params: {
                        id: this.current_id
                    }
                }).then(function (response) {
                    instance.types = []
                    instance.stats = []
                    instance.stats = response.data.data["stats"]
                    let types = response.data.data["types"]
                    for (let i = 0; i < types.length; i++)
                        instance.types.push(types[i].type.name)
                    instance.current_data = response.data.data
                    instance.loading = true
                }).catch(errors => console.log(errors))
            }
        }
    }
});