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




