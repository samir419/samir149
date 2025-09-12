document.addEventListener('keydown', move);
document.addEventListener('keyup', stop);
function colliding(p1,p2){
    if (p1.direction == 1){
        return p1.x+p1.width>=p2.x-10&&p1.x+p1.width<p2.x+p2.width
    }
    if (p1.direction == -1){
        return p1.x<=p2.x+p2.width+10&&p1.x>p2.x
    }
    
}

     function move(e) {
         switch(e.key){
             case 'w':
                if(players[0].airborne == false){
                    players[0].jump();
                }
                 break;
             case 's':
                
                 break;
             case 'a':
                if(players[0].attack_frames<=0){
                    if(dash_timer>0&&players[0].dx==0){
                        if(colliding(players[0],players[1])){
                            players[0].throw()
                            console.log('throw')
                        }else{
                            players[0].dash(-1)
                        }
                       
                    }else{
                        players[0].move(-1);
                    }
                    if(dash_timer==0){
                        dash_timer=10
                    }
                }
                 break;
             case 'd':
               if(players[0].attack_frames<=0){
                if(dash_timer>0&&players[0].dx==0){
                    if(colliding(players[0],players[1])){
                        players[0].throw()
                        console.log('throw')
                    }else{
                        players[0].dash(1)
                    }
                }else{
                    players[0].move(1);
                }
                if(dash_timer==0){
                    dash_timer=10
                }
               }
                 break;
              case 'j':
               combo_attack(players[0])
                break;
            case 'k':
               medium_attack(players[0])
                break;
            case 'l':
                heavy_attack(players[0])
                break;
            case 'i':
                players[0].block()
                break;
            case 'p':
                if(gamestate=='pause'){
                    gamestate = 'active'
                } else if(gamestate=='active'){
                    gamestate = 'pause'
                }
                break;
            case 'h':
                players[0].throw();
                break;




            case 'ArrowUp':
                if(players[1].airborne == false){
                    players[1].jump();
                }
                 break;
             case 'ArrowDown':
                
                 break;
             case 'ArrowLeft':
                if(players[1].attack_frames<=0){
                    if(dash_timer2>0&&players[1].dx==0 ){
                        players[1].dash(-1)
                    }else{
                        players[1].move(-1);
                    }
                    if(dash_timer2==0){
                        dash_timer2=10
                    }
                }
                 break;
             case 'ArrowRight':
               if(players[1].attack_frames<=0){
                if(dash_timer2>0&&players[1].dx==0){
                    players[1].dash(1)
                }else{
                    players[1].move(1);
                }
                if(dash_timer==0){
                    dash_timer2=10
                }
               }
                 break;
              case '1':
               combo_attack(players[1])
                break;
            case '2':
               medium_attack(players[1])
                break;
            case '3':
                heavy_attack(players[1])
                break;
            case '4':
                if(players[1].state == 'block'){
                    players[1].idle();
                    players[1].state='';
                }else{
                    players[1].block();
                }
                
                break;
        }
        
    }
    function stop(e) {
          switch(e.key){
             case 'w'://player1.idle.action(player1); 
              break;
                
             case 'a':players[0].idle();
              break;
                
                
             case 'd': players[0].idle(); 
            break;

            case 'i': players[0].idle(); players[0].state = '';
            break;

            case 'ArrowLeft':players[1].idle();
            break;
              
              
           case 'ArrowRight': players[1].idle(); 
          break;
          }
    }
