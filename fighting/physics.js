const gravity = 7

function barrier_collision(player,player2,object){
    if(player.y+80 > object.height){
        player.y -= player.dy+gravity
        player.airborne = false
    } else {
        player.airborne = true
    }
    if(player.x < 0){
        player.x -= player.dx
        if(player.dx ==0){
            player.x += 5
        }
       if(bgx<0&&player2.dx<0){
            bgx+=3
            player2.x-=player2.dx
       }

       
    }
    if(player.x+player.width>object.width){
        player.x -= player.dx
        if(player.dx ==0){
            player.x -= 5
        }
        if(bgx+560>object.width&&player2.dx>0){
            bgx-=3
            player2.x-=player2.dx
        }
    }
}

function player_collision(player,player2){
    if(player.x+player.width>player2.x&&player.x<player2.x+player2.width&&player2.x+player2.width<cvs.width&&player2.x>0
        &&player.y>=player2.y-5&&player.y<=player2.y+5
    ){
        player2.x+=player.dx
        if(player.dx == 0 || player2.dx == 0){
            player2.x+= 5*-player2.direction
            player.x+= 5*-player.direction
        }
        if(player2.x+player2.width>cvs.width-10){
            player.x+= 1*-player.direction
        }
        if(player2.x<10){
            player.x+= 1*-player.direction
        }
    }
}

function scrolling(){
  
    if(players[0].x < 0){
        bgx+=1
    }
    if(players[0].x+players[0].width>cvs.width){
        if(bgx+560>cvs.width){
            bgx-=1
        }
    }
   
}

function physics(player,player2){
    
    player.y += gravity
    
    if(player.dy < 0){
        player.dy += 0.5
    }
   barrier_collision(player,player2,cvs)
   player_collision(player,player2)
  
   
   
}