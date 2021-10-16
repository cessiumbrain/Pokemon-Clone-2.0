import {ash} from './ash.js';
import {opponent} from './opponent.js';
import {showMoves, ashClickMove, executeP1Move, showPokemon, updateDisplay,
    updateImg} from './onclick.js';



//click listeners
$('.fight-btn').on('click', showMoves)
$('.pkmn-btn').on('click', showPokemon)
updateDisplay(1)
updateDisplay(2)
updateImg(1)
updateImg(2)

setTimeout(()=>{
    $('.p1-img').removeClass('p1-slide-in');
    $('.p2-img').removeClass('p2-slide-in')
}, 3000)

