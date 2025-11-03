function dialogue(text,func){
    document.getElementById('log').innerHTML=text
    if(func){
         func.forEach(f=>{
            let btn = document.createElement('button')
            btn.textContent=f.text
            btn.onclick = f.onchoose
            document.getElementById('log').appendChild(btn)
        })
    }
   
}
function start_game(){
    let player_char = {name:sessiondata.name,moveset:main_set,battle_img:sessiondata.pfp,level:sessiondata.level}
    
    player_list.forEach((player,index)=>{
        let char
        if(index===0){
            char = player_char
        }else if(index===1&&character){
            char=character
        }else if(curr_opponent){
            char=curr_opponent
        } else{
            char = opponents[Math.floor(Math.random() * opponents.length)]
        }
        reward_amount=50+char.level*10
        let health_cap = 600+char.level*100
        let move_cap 
        if(char.level<15){move_cap=6}
        if(char.level<10){move_cap=5}
        if(char.level<5){move_cap=4}
        player.ent.name = char.name
        player.ent.health = health_cap
        let moveset = char.moveset
        if(moveset.length>0){
            moveset.forEach((m,m_index) => {
                for(let i = 0; i<moves.length;i++){
                    if(m==moves[i].name&&m_index<move_cap){
                        player.ent.add_move(moves[i]);
                    }
                }
            });
        }else{
            for(let i=0;i<move_cap;i++){
                let availableMoves = moves.filter(m => !player.ent.moves.includes(m));
                let randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
                player.ent.add_move(randomMove);
            }
        }
        player.ent.add_move(attack)
        player.ent.add_move(defend)
        player.ent.elem = player.elem
        player.elem.innerHTML=''
        let grid = document.createElement('div')
        grid.className='onethird-grid'
        if(index%2==0){
            grid.className='onethird-grid2'
        }

        let frame = document.createElement('div')

        let name = document.createElement('h2')
        name.textContent=player.ent.name

        let pfp = document.createElement('img')
        pfp.src = char.battle_img

        let status = document.createElement('div')
        status.className='player-status'

        let health_bar = document.createElement('div')
        health_bar.className='player-health'

        let prompt = document.createElement('div')

        frame.append(name,status,health_bar,prompt)
        if(index%2==0){
            grid.append(pfp,frame)
        }else{
            grid.append(frame,pfp)
        }
       

        let normal_move_list = document.createElement('div')
        let move_list = document.createElement('div')
        
        if(player.ent.type=='player'){
            player.ent.moves.forEach(m=>{
                let move = document.createElement('button')
                move.className='move-btn'
                if(m.img&&typeof m.img === "string"){
                    let image = document.createElement('img')
                    image.src = `game assets/moves/${m.img}`
                    //move.appendChild(image)
                }
                move.innerHTML+=m.name
                move.onclick=()=>{
                    prompt.innerHTML=`${m.name}`
                    game.player_queue.forEach(p=>{
                        let btn =document.createElement('button')
                        if(p.id<3){
                            btn.style.backgroundColor='blue'
                        }
                        btn.textContent=p.name
                        btn.onclick=()=>{game.play(player.ent,p,m);prompt.innerHTML=``}
                        prompt.appendChild(btn)
                    })
                    
                }
                m.elem = move
                if(m.name=='Attack'||m.name=='Defend'){
                    normal_move_list.appendChild(move)
                }else{
                    move_list.appendChild(move)
                }
                
            })
        }else{
            let add_btn = document.createElement('button')
            add_btn.textContent='join'
            add_btn.onclick=()=>{
                player.ent.type='player'
                player.ent.moves.forEach(m=>{
                    let move = document.createElement('button')
                    if(m.img&&typeof m.img === "string"){
                        let image = document.createElement('img')
                        image.src = `game assets/moves/${m.img}`
                        //move.appendChild(image)
                    }
                    move.innerHTML+=m.name
                    move.onclick=()=>{
                        prompt.innerHTML=`${m.name}`
                        game.player_queue.forEach(p=>{
                            let btn =document.createElement('button')
                            if(p.id<3){
                                btn.style.backgroundColor='blue'
                            }
                            btn.textContent=p.name
                            btn.onclick=()=>{game.play(player.ent,p,m);prompt.innerHTML=``}
                            prompt.appendChild(btn)
                        })
                        
                    }
                    m.elem = move
                    move_list.appendChild(move)
                })

            }
            move_list.appendChild(add_btn)
        }
        
        player.elem.append(grid,normal_move_list,move_list)
    })

    cpu = true
    game.start()
    game.handle_cpu()
}


dialogue(
    'ready',
    [
        {
            text:'no',
            onchoose:function(){
                dialogue('cancelled')
            }
        },
        {
            text:'yes',
            onchoose:function(){
                dialogue('')
                start_game()
            }
        },
    ]
)

