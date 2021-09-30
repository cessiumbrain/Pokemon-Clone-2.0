const ash = {
    pokemon: [
        {
            name: 'pikachu',
            currentHp: 10,
            maxHp: 100,
            imgSrc: 'images/pikachu.png',
            active: true,
            alive: true,
            moves: [
                {
                    name: 'spark',
                    power: 10

                }
            ]
            
        },
        {
            name:'haunter',
            currentHp: 100,
            maxHp: 100,
            imgSrc: 'images/haunter.png',
            alive: false,
            moves: [
                {
                    name:'haunt'
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

export {ash}