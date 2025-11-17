 function display_ui(elem){
    let docs = document.querySelectorAll(".ui")
    docs.forEach(doc=>{
        doc.style.display='none'
        if(elem==doc.id){
            doc.style.display='flex'
        }
    })
}
display_ui('select-mode')
let select_mode = 1
let select = new Audio()
select.src = 'select.wav'
characters.forEach(c=>{
    let btn = document.createElement('button')
    let img = document.createElement('img')
    img.src = c.idle 
    btn.appendChild(img)
    btn.onclick=()=>{
        select.play()
        if(select_mode==1){
            main_char=c;
            select_mode=2;
            document.getElementById('select-player-msg').textContent='player 2 select';
            if(mode=='single'){
                main_char2=characters[Math.floor(Math.random()*characters.length)];
                game=new Game();
                game.start()
            }
        }else{
            main_char2=c;
            game=new Game();
            game.start()
        }
    }
    document.getElementById('select-player').appendChild(btn)
})