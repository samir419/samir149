 function display_ui(elem){
    let docs = document.querySelectorAll(".ui")
    docs.forEach(doc=>{
        doc.style.display='none'
        if(elem==doc.id){
            doc.style.display='flex'
        }
    })
}
let turn_select=0
function start_custom_creation(main){
    turn_select++
    select.play()
    if(!main){
        main=main_char
    }
    document.getElementById('custom-select').innerHTML=''
    characters.forEach(c=>{
        let btn = document.createElement('button')
        let img = document.createElement('img')
        img.src = c.idle 
        btn.appendChild(img)
        btn.onclick=()=>{
            select.play()
            main=c;
            document.getElementById('custom-select').innerHTML=''
            moves.forEach(move=>{
                let mbtn = document.createElement('button')
                mbtn.textContent=move.name
                mbtn.onclick=()=>{
                    select.play()
                    main.specials[0]=move
                    document.getElementById('custom-select').innerHTML=''
                    moves.forEach(move2=>{
                        if(main.specials[0]!=move2){
                            let mbtn2 = document.createElement('button')
                            mbtn2.textContent=move2.name
                            mbtn2.onclick=()=>{
                                select.play()
                                console.log(main)
                                main.specials[1]=move2
                                if(mode=='single'){
                                    main_char=main
                                    main_char2=characters[Math.floor(Math.random()*characters.length)];
                                    game=new Game();
                                    game.start()
                                }else{
                                    if(turn_select==1){
                                        main_char=main
                                        start_custom_creation(main_char2)
                                        return
                                    }
                                    if(turn_select==2){
                                        main_char2=main
                                        game=new Game();
                                        game.start()
                                    }
                                }
                            }
                            document.getElementById('custom-select').appendChild(mbtn2)
                        }
                        
                    })
                }
                document.getElementById('custom-select').appendChild(mbtn)
            })
        }
        document.getElementById('custom-select').appendChild(btn)
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
    document.getElementById('player-list').appendChild(btn)
})