const ash = {
    pokemon: [
        {
            name: 'pikachu',
            currentHp: 100,
            maxHp: 100,
            imgSrc: 'images/pikachu.png',
            active: true,
            alive: true,
            moves: [
                {
                    name: 'spark',
                    power: 10,
                    animation: 'vibrate',
                    audio: '/audio/punch.wav'
                },
                {
                    name: 'shock',
                    power: 15,
                    animation: 'heartbeat',
                    audio: '/audio/shock.wav'
                },
                {
                    name: 'punch',
                    power: 5,
                    animation: 'blink-1',
                    audio: '/audio/punch.wav'
                }
            ]
            
        },
        {
            name:'haunter',
            currentHp: 100,
            maxHp: 100,
            imgSrc: 'images/haunter.png',
            alive: true,
            moves: [
                {
                    name:'haunt',
                    power: 12,
                    audio: '/audio/haunt.wav'
                },
                {
                    name: 'shreik',
                    power: 12
                },
                {
                    name: 'slap',
                    power: 10
                }
            ]
        },
        {
            name: 'jigglypuff',
            currentHp: 100,
            maxHp: 100,
            imgSrc: '/images/jigglypuff.png',
            active: false,
            alive: true,
            moves: [
                {
                    name: 'sing',
                    power: 10
                },
                {
                    name: 'punch',
                    power: 15
                },
                {
                    name: 'slap',
                    power: 5
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