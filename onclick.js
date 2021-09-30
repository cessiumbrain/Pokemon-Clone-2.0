import {ash} from './ash.js'
import { opponent } from './opponent.js'

const allDead = () =>{
    $('.menu-text').text(`${ash.activePokemon().name} fainted`)
    setTimeout(()=>{
        $('.menu-text')
        .append('<p class="arrow">></p>')
        .on('click', ()=>{
            $('.menu-text')
                .off()
                .text('Ash is out of useable pokemon... ash fainted')
        })
    }, 3000)
}

const showMoves = () =>{
    console.log(ash.activePokemon())
    $('.menu-text').html(ash.activePokemon().moves.map(move=>{
        return `<p class="ash-move" id="${move.name}">${move.name}</p>`
    }))
    $('.ash-move').on('click', ashClickMove)    
}

function ashClickMove(){
    console.log()
    const move=ash.activePokemon().moves.find(move=>{
        return move.name === this.id
    })

    executeP1Move(move)
    $('.menu-text').text(`${ash.activePokemon().name} used ${move.name}`);

    setTimeout(()=>{
        $('.menu-text')
        .append('<p class="arrow">></p>')
        .on('click', clickAfterAshMove)
    }, 3000)
}


let oppMove = {}

const clickAfterAshMove = () =>{
    
    opponentMove()
    $('.menu-text')
        .off()
        .text(`charizard used ${oppMove.name}`)

    setTimeout(()=>{
        $('.menu-text')
            .append('<p>></p>')
            .on('click', ()=>{
                $('.menu-text').off()
                //if current pkmn is alive
                if(ash.activePokemon().alive===true){
                    showMoves()
                //if all pokemon are dead
                } else if (ash.pokemon.every(pokemon=> {return pokemon.alive === false})){
                    allDead()
                //if just active pkmn is dead
                } else {
                    ashsPokemonIsDead()
                }
            })
        
    }, 3000)  
}

const changePokemon = (nextPokemon) =>{

    nextPokemon.active = true
    ash.activePokemon().active = false;
    updateDisplay(1);
    updateImg(1)
    $('.pkmn').off();
    $('.menu-text').text(`${nextPokemon.name} go!`)
    setTimeout(()=>{
        $('.menu-text')
            .append('<p>></p>')
            .on('click', ()=>{
                $('.menu-text')
                    .html(`<span class="fight-btn">Fight</span>
                     <span class="pkmn-btn">Pkmn</span>`)
                     .off()

                $('.fight-btn').on('click', showMoves)
                $('.pkmn-btn').on('click', showPokemon)
            })
    }, 3000)

}

const showPokemon = () =>{
$('.menu-text').html(ash.pokemon.filter(pokemon=>{
    return pokemon.alive === true
}).map(pokemon=>{
    return `<p class="pokemon" id="${pokemon.name}">${pokemon.name}</p>`
}))
$('.pokemon').on('click', (e)=>{
    console.log(e.currentTarget.id)
    const nextPkmn = ash.pokemon.find(pokemon=>{
        return pokemon.name === e.currentTarget.id
    })

    changePokemon(nextPkmn)
})
}

const ashsPokemonIsDead = () =>{
    $('.menu-text').text(`${ash.activePokemon().name} fainted`);
    setTimeout(()=>{
        showPokemon()
    }, 3000)
    
}

const opponentMove = () => {
    const moveNum = Math.floor(Math.random()* opponent.activePokemon().moves.length)
    oppMove= opponent.activePokemon().moves[moveNum];
    ash.activePokemon().currentHp -= oppMove.power
    updateDisplay(1)
    if(ash.activePokemon().currentHp <= 0){
        ash.activePokemon().currentHp = 0;
        ash.activePokemon().alive = false;
    }


}

const executeP1Move= (moveObj) =>{
    opponent.activePokemon().currentHp -= moveObj.power;
    updateDisplay(2)

}

const updateImg = (playerNum) =>{
    //if player num is 1 create a variable for image path, set it using jquery
    if(playerNum ===  1){
        const imgSrc = ash.activePokemon().imgSrc
        $('.p1-img').attr('src', `${imgSrc}`)
    } else if (playerNum === 2){
        const imgSrc = opponent.activePokemon().imgSrc
        $('.p2-img').attr('src', `${imgSrc}`)
    }
}

const updateDisplay = (playerNum) =>{
    if(playerNum === 1){
        $('.p1-health').text(`${ash.activePokemon().currentHp}`)
        $('.p1-name').text(`${ash.activePokemon().name}`)
    } else if(playerNum === 2){
        $('.p2-health').text(`${opponent.activePokemon().currentHp}`)
        $('.p2-name').text(`${opponent.activePokemon().name}`)
    }
    
}


export {showMoves, ashClickMove, executeP1Move, showPokemon, 
    updateImg, updateDisplay}