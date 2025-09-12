class Test_character {
    constructor(x,y,direction){
        this.x = x
        this.y = y
        this.direction = direction
        this.height = 64
        this.width = 64
        this.dx = 0
        this.dy = 0
        this.airborne = false

        this.hitbox = {x:this.x,y:this.y,width:5,height:5,dx:0,dy:0}
        this.attack_frames = 0
        this.impact_frames = 0
        this.recovery_frames = 0
        this.combo_window = 0

        this.dash_frames = 0

        this.state = ''

        this.healthbar = 100

       this.animation_frame=0
       this.animation_state=0

       this.knockdown_frames = 0

       this.hitstun = 0
        
        this.idle_right = new Image();
        this.idle_right.src = 'assets/chara1/idle-right.png';
    
        this.move_right = [new Image(),new Image(),new Image()]
        this.move_right[0].src = 'assets/chara1/move-right-1.png';
        this.move_right[1].src = 'assets/chara1/move-right-2.png';
        this.move_right[2].src = 'assets/chara1/move-right-3.png';
    
        this.jump_right = new Image();
        this.jump_right.src = 'assets/chara1/jump-right.png';

        this.dash_right = new Image();
        this.dash_right.src = 'assets/chara1/run-right.png'

        this.jab_right = new Image();
        this.jab_right.src = 'assets/chara1/jab-right.png'

        this.hook_right = new Image()
        this.hook_right.src = 'assets/chara1/hook-right.png'

        this.swing_right = new Image()
        this.swing_right.src = 'assets/chara1/swing-right.png'

        this.block_right = new Image()
        this.block_right.src = 'assets/chara1/block-right.png'


        this.idle_left = new Image();
        this.idle_left.src = 'assets/chara1/idle-left.png';
    
        this.move_left = [new Image(),new Image(),new Image()];
        this.move_left[0].src = 'assets/chara1/move-left-1.png';
        this.move_left[1].src = 'assets/chara1/move-left-2.png';
        this.move_left[2].src = 'assets/chara1/move-left-3.png';
    
        this.jump_left = new Image();
        this.jump_left.src = 'assets/chara1/jump-left.png';

        this.dash_left = new Image();
        this.dash_left.src = 'assets/chara1/run-left.png'

        this.jab_left = new Image();
        this.jab_left.src = 'assets/chara1/jab-left.png'

        this.hook_left = new Image()
        this.hook_left.src = 'assets/chara1/hook-left.png'

        this.swing_left = new Image()
        this.swing_left.src = 'assets/chara1/swing-left.png'

        this.block_left = new Image()
        this.block_left.src = 'assets/chara1/block-left.png'

        this.knock_down = new Image()
        this.knock_down.src = 'assets/chara1/knockdown.png'

        this.hit = new Image()
        this.hit.src = 'assets/chara1/hit.png'
    }
    update(){
        if(this.dash_frames==1&&this.dy==0){
            this.dx = 0
        }
        if(this.dash_frames>0){
            this.dash_frames--
        }

        this.x += this.dx
        this.y += this.dy

       if(this.direction <0){
        this.hitbox.x = this.x+this.width
       }else{
        this.hitbox.x = this.x
       }
        this.hitbox.y = this.y

       

       
    }
    
    idle(){
        this.dx = 0;
        this.dy = 0;
    }
    move(movement_direction){
        if(this.state!='knockdown'&&this.state!='hit'){
             this.dx = 3*movement_direction
        }
       
    }
    dash(movement_direction){
        if(this.state!='knockdown'&&this.state!='hit'){
             this.dash_frames = 18
            this.dx = 7*movement_direction
        }
       
    
    }
    jump(){
        if(this.state!='knockdown'&&this.state!='hit'){
             if(this.y+this.height>cvs.height-30){
                this.dy = -16
               }
        }
      
    }
    jab(){
        if(this.state!='knockdown'&&this.state!='hit'){
              this.attack_frames = 15
            this.impact_frames = 10
            this.recovery_frames = 5
            this.combo_window = 12
            this.hitbox.y+=10
            this.hitbox.width = 95*this.direction
            this.state = 'jab'
        }
      
    }
    hook(){
        if(this.state!='knockdown'&&this.state!='hit'){
             this.attack_frames = 20
            this.impact_frames = 13
            this.recovery_frames = 8
            this.combo_window = 12
            this.hitbox.width = 105*this.direction
            this.hitbox.height = 30
            this.state = 'hook'
        }
       
    }
    swing(){
        if(this.state!='knockdown'&&this.state!='hit'){
             this.attack_frames = 30
            this.impact_frames = 20
            this.recovery_frames = 15
            this.combo_window = 0
            this.hitbox.width = 90*this.direction
            this.hitbox.height = 70
            this.state = 'swing'
        }
       
    }
    throw(){
        if(this.state!='knockdown'&&this.state!='hit'){
             this.attack_frames = 30
            this.impact_frames = 20
            this.recovery_frames = 15
            this.combo_window = 0
            this.hitbox.width = 90*this.direction
            this.hitbox.height = 70
            this.state = 'throw'
        }
       
    }
    sweep(){}
    special1(){}
    special2(){}
    block(){
        if(this.state!='knockdown'&&this.attack_frames<=0){
            this.dx = 0;
            this.dy = 0;
            this.state = 'block'
        }
    }
    get_hit(){
        this.hitstun += 5
        this.idle()
        this.x+=1*-this.direction
        if(this.x+this.width>cvs.width||this.x<0){
            this.x+=4*this.direction
        }
        this.state = 'hit'
    }
    knockdown(){
        this.knockdown_frames = 50;
        this.dx = 0;
        this.dy = 0;
        this.state = 'knockdown'
    }
    getimage(){
       
        if(this.direction>0){
            if(this.attack_frames>0){
                if(this.state=='jab'){
                    return this.jab_right
                }else if(this.state=='hook'){
                    return this.hook_right
                }else if(this.state=='swing'){
                    return this.swing_right
                }
            }else{
                if(this.airborne == false){
                    if(this.dx>0){
                        if(this.dx>=7){
                            return this.dash_right
                        }else{
                            if(this.animation_frame<30){
                                this.animation_frame++
                                if(this.animation_frame<=10){
                                    this.animation_state=0
                                }
                                if(this.animation_frame<20&&this.animation_frame>10){
                                    this.animation_state=1
                                }
                                if(this.animation_frame<30&&this.animation_frame>30){
                                    this.animation_state=2
                                }
                            }else{
                                this.animation_frame=0
                            }
                            return this.move_right[this.animation_state]
                        }
                        
                    }else if(this.dx<0){
                        if(this.dx<=-7){
                            return this.dash_left
                        }else{
                            if(this.animation_frame<30){
                                this.animation_frame++
                                if(this.animation_frame<=10){
                                    this.animation_state=0
                                }
                                if(this.animation_frame<=20&&this.animation_frame>10){
                                    this.animation_state=1
                                }
                                if(this.animation_frame<30&&this.animation_frame>20){
                                    this.animation_state=2
                                }
                            }else{
                                this.animation_frame=0
                            }
                            return this.move_right[this.animation_state]
                           
                        }
                        
                    }else{
                        if(this.state == 'block'){
                            return this.block_right
                        }else if(this.state == 'knockdown'){
                            return this.knock_down
                        }else if(this.state == 'hit'){
                            return this.hit
                        } else{
                            return this.idle_right
                        }
                        
                    }
                }else{
                    return this.jump_right
                }
            }
           

        }else if(this.direction<0){
            if(this.attack_frames>0){
                if(this.state=='jab'){
                    return this.jab_left
                }else if(this.state=='hook'){
                    return this.hook_left
                }else if(this.state=='swing'){
                    return this.swing_left
                }
            }else{
                if(this.airborne == false){
                    if(this.dx>0){
                        if(this.dx>=7){
                            return this.dash_right
                        }else{
                            if(this.animation_frame<30){
                                this.animation_frame++
                                if(this.animation_frame<=10){
                                    this.animation_state=0
                                }
                                if(this.animation_frame<=20&&this.animation_frame>10){
                                    this.animation_state=1
                                }
                                if(this.animation_frame<30&&this.animation_frame>20){
                                    this.animation_state=2
                                }
                            }else{
                                this.animation_frame=0
                            }
                            return this.move_left[this.animation_state]
                        }
                        
                    }else if(this.dx<0){
                        if(this.dx<=-7){
                            return this.dash_left
                        }else{
                            if(this.animation_frame<30){
                                this.animation_frame++
                                if(this.animation_frame<=10){
                                    this.animation_state=0
                                }
                                if(this.animation_frame<=20&&this.animation_frame>10){
                                    this.animation_state=1
                                }
                                if(this.animation_frame<30&&this.animation_frame>20){
                                    this.animation_state=2
                                }
                            }else{
                                this.animation_frame=0
                            }
                            return this.move_left[this.animation_state]
                        }
                        
                    }else{
                        if(this.state == 'block'){
                            return this.block_left
                        }else if(this.state == 'knockdown'){
                            return this.knock_down
                        }else if(this.state == 'hit'){
                            return this.hit
                        } else{
                            return this.idle_left
                        }
                    }
                }else{
                    return this.jump_left
                }
            }
            
        }
       
    }
    
}