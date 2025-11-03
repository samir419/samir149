let ischarplaying = false

function challenge(){
    say('alright ready when you are')
    const option = document.createElement("button");
    option.textContent = 'play';
    option.onclick =  ()=>{if(tabbing==true){openTab(event, 'game')}}
    dialogue.appendChild(option);
    ischarplaying = true
}

function start_game(){
    if(game.state=='wait'){
        document.getElementById('menu').style.display='none'
        document.getElementById('game-canvas').style.display='block'
         document.getElementById('game-data').style.display='block'
        game.start();
    }
}