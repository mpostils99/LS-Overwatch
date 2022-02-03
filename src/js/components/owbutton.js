//Component format pel botó de cerca i l'input.
Vue.component('ow-button', {
    props: {
        data: Object
    },
    template: `<div id="first-search">
                   <button id="search" v-on:click="loadOwData">SEARCH</button>
                   <input id="input" type="input" name="search" placeholder="Search your heroe...">
                </div>
                   `,

    methods: {
        //Fem la crida a la API.
        loadOwData() {
            let url = "http://localhost:3000/api/list?search=" + document.getElementById("input").value;

            fetch(url)
                .then(response => response.json())
                .then(data => this.$parent.heroes = data)
                .then(data => {
                    console.log('Success:', data)

                })
                .catch((error) => {
                    console.error('Error:', error)
                })

        }
    }
})
