import {ash} from './ash.js'
import { opponent } from './opponent.js'

//add back button to showMoves() that runs mainMenu

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
    $('.menu-text').append(`<span class="back-btn">back</span>`)
    $('.back-btn').on('click', mainMenu)
    $('.ash-move').on('click', ashClickMove)    
}

function mainMenu(){
    $('.menu-text').html(
                `<span class="fight-btn">Fight</span>
                <span class="pkmn-btn">Pkmn</span>
                <span class="bag-btn">Bag</span>
                <span class="run-btn">Run</span>`
    )
    $('.fight-btn').on('click', showMoves)
    $('.pkmn-btn').on('click', showPokemon)
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
    //check opp dead status

    if(opponent.activePokemon().currentHp<=0){
        $('.menu-text').text(`${opponent.activePokemon().name} fainted`)
        console.log('opp dead')
    } else{
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
                    <span class="pkmn-btn">Pkmn</span>
                    <span class="bag-btn">Bag</span>
                    <span class="run-btn">Run</span>`)
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
    animate('.p2-img', moveObj.animation)
    //play sound
    playSound(moveObj.audio)
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
    console.log('update display')
    if(playerNum === 1){
        console.log('p1')
        $('.p1-img').animate({
            width: '200px'
        }, 2000)
        const healthNum = ash.activePokemon().currentHp;

        const healthPct = ash.activePokemon().currentHp / ash.activePokemon().maxHp * 100;
        $('.p1-hp-fill').css('width', `${healthPct}%`)
        $('.p1-name').text(`${ash.activePokemon().name}`)
    } else if(playerNum === 2){

        const healthNum = opponent.activePokemon().currentHp;
        const healthPct = opponent.activePokemon().currentHp / ash.activePokemon().maxHp * 100;
        $('.p2-hp-fill').css('width', `${healthPct}%`)
        $('.p2-name').text(`${opponent.activePokemon().name}`)
    }
    
}

const animate = (animationTarget, animation) =>{
    $(animationTarget).addClass(animation)

    setTimeout(()=>{
        $(animationTarget).removeClass(animation)
    }, 3000)
}

const playSound = (soundSrc) =>{
    //set src of class move-sound to current moveObj Sound
    $('.move-sound').attr('src', soundSrc)
    document.getElementById('move-sound').play()

}


export {showMoves, ashClickMove, executeP1Move, showPokemon, 
    updateImg, updateDisplay}