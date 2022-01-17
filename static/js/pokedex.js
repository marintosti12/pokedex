
let app = new Vue({
    el: "#app",
    delimiters: ['[[', ']]'],
    data: {
        current_id : 0,
        types: [],
        stats: [],
        teams: [],
        search:[],
        pokemons:[],
        team_index: 0,
        current_data: null,
        current_name: "",
        img_src: "",
        searchinput: '',
        pagination: 0,
        next: 0,
        state: "",
        loading: false,
        loading_pokemon: false
    },
    mounted() {
        this.teams = JSON.parse(localStorage.getItem("teams"))
        this.greet(1)
        this.loadPokemons()
    },
    watch: {
        searchinput: function(val) {
            for (let i = 0; i < this.pokemons.length ; i++) {
                let eval = this.pokemons[i]["fields"]["name"].toLowerCase()
                if (!eval.includes(val.toLowerCase()))
                    this.pokemons[i].show = false
                else
                    this.pokemons[i].show = true
            }
        }
    },
    methods: {
        nextPage: function ()
        {
            this.state = "add"
            this.loadPokemons()
        },
        previousPage: function ()
        {
            this.state = "remv"
            this.loadPokemons()
        },
        getPokemonImage: function (id)
        {
            return "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"+id+".png"
        },
        loadPokemons: function ()
        {
            let instance = this
            instance.pokemons = []
            instance.loading_pokemon = false
            axios.get('pokemons/', {
                    params: {
                        pagination: instance.pagination,
                        state : instance.state
                    },
                }).then(function (response) {
                    parsing = JSON.parse(response.data.pokemons)
                    instance.pokemons = parsing
                    instance.pagination = response.data.pagination
                    instance.next = response.data.next

                    for (let i = 0; i < instance.pokemons.length; i++)
                        instance.pokemons[i].show = true

                    instance.loading_pokemon = true
                }).catch(errors => console.log(errors))
        },
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
                if (pokemons.length >= 5)
                    return;
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
            let list = ["fire", "water", "grass", "poison", "flying", "bug", "normal"]
            let colors = ["bg-red-700", "bg-cyan-700", "bg-green-700", "bg-violet-700", "bg-violet-400", "bg-green-400", "bg-gray-400"]

            for (let i = 0; i < list.length; i++) {
                if (type == list[i])
                    return colors[i]
            }
            return "bg-gray-400"
        },
        setNamePokemon: function (name) {
            console.log(name)
            this.current_name = name

        },
        greet: function (id) {
            id = id.toString()
            if (this.current_id == id)
                return
            else {
                const instance = this
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