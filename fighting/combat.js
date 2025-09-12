

function combat(atk,def){
    if(atk.knockdown_frames>0){
        atk.knockdown_frames--
        atk.dx = 0
        atk.dy = 0
    }else if (atk.hitstun >0){
        atk.hitstun--
        atk.dx = 0
        atk.dy = 0
    }else if(atk.attack_frames>0){
        atk.attack_frames--;
        if(atk.airborne == false){
            if(((atk.dx % 3) + 3) % 3==0){
                atk.dx = 0
                atk.dy = 0
            }
            
        }
        if(atk.hitbox.x+atk.hitbox.width>def.x&&atk.attack_frames<=atk.impact_frames&&atk.attack_frames>atk.recovery_frames&&
            atk.hitbox.x+atk.hitbox.width<def.x+def.width&&def.state!='knockdown'){
            if(def.state=='block'){
                if(atk.state=='throw'){
                    def.knockdown()
                    def.healthbar -= 5
                }
                def.x += 2*-def.direction
                atk.x += 2*-atk.direction
            }else{
                def.get_hit()
                def.healthbar -= 1
                def.attack_frames=0
                if(atk.state=='swing'){
                    def.knockdown()
                    def.healthbar -= 5
                }
                if(atk.state=='throw'){
                    def.knockdown()
                    def.healthbar -= 5
                }
            }
           

        }
    }else{
        atk.hitbox.width = 5
        atk.hitbox.height = 5
        if(atk.state == 'knockdown'||atk.state == 'hit'){
            atk.state = ''
        }
        
    }
}
function combo_attack(player){
   if(player.state != 'knockdown' && player.state != 'hit'){
    if(player.attack_frames<=0){
        player.jab();
    }
    if(player.attack_frames<=player.combo_window&&player.state=='jab'){
        player.hook()
    }
    if(player.attack_frames<=player.combo_window&&player.state=='hook'){
        player.swing()
    }
   }
}
function medium_attack(player){
    if(player.attack_frames<=0 && player.state != 'knockdown' && player.state != 'hit'){
        player.hook();
    }
}
function heavy_attack(player){
    if(player.attack_frames<=0 && player.state != 'knockdown' && player.state != 'hit'){
        player.swing();
    }
}