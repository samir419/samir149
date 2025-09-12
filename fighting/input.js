
let dash_timer = 0
let dash_timer2 = 0
let touch_timer = 0
let touched = false
 const touchArea = document.getElementById('touchArea');

 touchArea.ontouchstart = (event) => {
    event.preventDefault();
     const touch = event.touches[0];
     start_x = touch.clientX;
     start_y = touch.clientY;
     touched = true
     
     if(touch_timer>30){
        alert('long touch');
       
     }
     };
    

     // Capture ending coordinates and compare
     touchArea.ontouchend = (event) => {
     touched = false
     const touch = event.changedTouches[0];
     end_x = touch.clientX;
     end_y = touch.clientY;

     const diffX = end_x - start_x;
     const diffY = end_y - start_y;

     if (isInsideButton(start_x, start_y)) {
       alert('button pressed')
      }

     switch(getinput()) {
     case 'up':
        if(players[0].airborne == false){
            players[0].jump();
        }
         break;

     case 'down':
        heavy_attack(players[0])
         break;

     case 'left':
        if(end_x-start_x<-190){
            if(colliding(players[0],players[1])){
                players[0].throw()
                console.log('throw')
            }else{
                players[0].dash(-1)
            }
        }else{
            players[0].move(-1)
        }
         
         break;

     case 'right':
        if(end_x-start_x>190){
            if(colliding(players[0],players[1])){
                players[0].throw()
                console.log('throw')
            }else{
                players[0].dash(1)
            }
        }else{
            players[0].move(1)
        }
         break;

     case 'up left':
        if(end_x-start_x<-190){
            if(colliding(players[0],players[1])){
                players[0].throw()
                console.log('throw')
            }else{
                players[0].dash(-1)
            }
        }else{
            players[0].move(-1)
        }
      players[0].jump();
       
         break;

     case 'up right':
        if(end_x-start_x>190){
            if(colliding(players[0],players[1])){
                players[0].throw()
                console.log('throw')
            }else{
                players[0].dash(1)
            }
        }else{
            players[0].move(1)
        }
      players[0].jump();
       
         break;

     case 'down right':
        if(end_x-start_x>190){
            if(colliding(players[0],players[1])){
                players[0].throw()
                console.log('throw')
            }else{
                players[0].dash(1)
            }
        }else{
            players[0].move(1)
        }
         break;

     case 'down left':
        if(end_x-start_x<-190){
            if(colliding(players[0],players[1])){
                players[0].throw()
                console.log('throw')
            }else{
                players[0].dash(-1)
            }
        }else{
            players[0].move(-1)
        }
         break;

     case 'same':
        combo_attack(players[0])
         break;

     }

    

    
 }

 function getinput(){
     if(start_y>end_y && end_x>start_x-50 && end_x<start_x+50){
         return 'up'
     }
     if(start_y>end_y && end_x<start_x-50 && end_y<start_y-50){
         return 'up left'
     }
     if(start_y>end_y && end_x>start_x+50 && end_y<start_y-50){
         return 'up right'
     }

     if(start_y<end_y && end_x>start_x-50 && end_x<start_x+50){
         return 'down'
     }
     if(start_y<end_y && end_x<start_x-50 && end_y>start_y-50){
         return 'down left'
     }
     if(start_y<end_y && end_x>start_x+50 && end_y>start_y-50){
         return 'down right'
     }

     if(start_x > end_x && end_y>start_y-50 && end_y<start_y+50){
         return 'left'
     }

     if(start_x < end_x && end_y>start_y-50 && end_y<start_y+50){
         return 'right'
     }
     if (start_x == end_x && start_y == end_y){
         return 'same'
     }
 }


    function input_timer(){
        touchArea.ontouchmove = (e) =>{
            e.preventDefault();
            }
        if(touched == true){
        touch_timer++
        console.log(touch_timer)
        }else{
        touch_timer=0
        }
        if(touch_timer>15){
        players[0].block()
        }

        if(dash_timer>0){
            dash_timer--
        }
        if(dash_timer2>0){
            dash_timer2--
        }
    }

    function colliding(p1,p2){
        if (p1.direction == 1){
            return p1.x+p1.width>=p2.x-10&&p1.x+p1.width<p2.x+p2.width
        }
        if (p1.direction == -1){
            return p1.x<=p2.x+p2.width+10&&p1.x>p2.x
        }
        
    }