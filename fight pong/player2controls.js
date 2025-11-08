document.addEventListener("keydown", event => {
    event.preventDefault()
    if(game.players[1].state=='idle'){
        if (event.key === "ArrowUp"){game.players[1].direction=-1;game.players[1].dy=-5;}
        if (event.key === "ArrowDown"){ game.players[1].direction=1;game.players[1].dy=5;}
    }
   handle_p2input(event)
});
document.addEventListener("keyup", event => {
    if(game.players[1].state=='idle'){
        if (event.key === "ArrowUp")game.players[1].dy=0;
        if (event.key === "ArrowDown")game.players[1].dy=0;
    }
});

function handle_p2input(key){
    if(game.input_buffer2>0){
        return
    }
  
    if(key.key=='ArrowLeft'){
        game.players[1].direction=0
        game.players[1].parry()
    }
    if(key.code=='Numpad4'){
        game.players[1].dash(-1)
    }
    if(key=='Numpad5'){
        game.players[1].dash(1)
    }
    if(key=='Numpad1'){
        let move = game.players[1].special_moves[0] 
        move.onstart(game.players[1],game.players[0],game)
    }
    if(key=='Numpad2'){
        let move = game.players[1].special_moves[1] 
        move.onstart(game.players[1],game.players[0],game)
    }
        if(key=='Numpad3'){
        let move = game.players[1].ultimatemove
        move.onstart(game.players[1],game.players[0],game)
    }
    game.input_buffer2=10
}