const opponent = {
    pokemon: [
        {
            name: 'charmander',
            active: true,
            currentHp: 100,
            maxHp: 100,
            imgSrc: 'images/charmander.png',
            moves: [
                {
                    name:'burn',
                    power: 90
                },
                {
                    name: 'punch',
                    power: 15
                },
                {
                    name: 'ember',
                    power: 10
                }
            ]
        }
    ],
    activePokemon(){
        return this.pokemon.find(pokemon=>{
            return pokemon.active === true
        })
    }
}



export {opponent}