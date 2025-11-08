const projectile = {
    x:0,y:0,w:30,h:30,dx:0,dy:0,state:'inactive',lifespan:0,color:'blue',
    onstart:function(user,target,game){
        if(user.meter>30){
            user.meter-=30
        }else{
            console.log('not enough meter')
            return
        }
        this.x=user.x
        this.y=user.y
        if(user.num==1){
            this.dx=10
        }else{
            this.dx=-10
        }
        
        this.state='active'
        this.lifespan=120
        game.processes.push(this)
    },
    update:function(game){
        this.x+=this.dx
        this.lifespan--
        if(game.get_collision(game.ball,{x:this.x,y:this.y,width:this.w,height:this.h})){
            game.ball.dx*=-1
            this.state='dead'
        }
        if(this.lifespan==0){
            this.state='dead'
        }
    }
}

const reflector = {
    x:0,y:0,w:30,h:150,dx:0,dy:0,state:'inactive',lifespan:0,color:'orange',
    onstart:function(user,target,game){
        if(user.meter>30){
            user.meter-=30
        }else{
            console.log('not enough meter')
            return
        }
        if(user.num==1){
            this.x = user.x+50
            this.y = user.y-50
        }else{
            this.x = user.x-50
            this.y = user.y-50
        }
        
        this.state='active'
        this.lifespan=250
        game.processes.push(this)
       
    },
    update:function(game){
        this.lifespan--
        if(game.get_collision(game.ball,{x:this.x,y:this.y,width:this.w,height:this.h})){
            game.ball.dx*=-1
        }
        if(this.lifespan==0){
            this.state='dead'
        }
    }
}

const teleport = {
    x:0,y:0,w:30,h:150,dx:0,dy:0,state:'inactive',lifespan:0,
    onstart:function(user,target,game){
        if(user.meter>30){
            user.meter-=30
        }else{
            console.log('not enough meter')
            return
        }
        user.y=game.ball.y
       
    },
    update:function(game){
        return
    }
}

const feint = {
    x:0,y:0,w:25,h:25,dx:0,dy:0,state:'inactive',lifespan:0,id:0,color:'white',
    onstart:function(user,target,game){
        if(user.meter>30){
            user.meter-=30
        }else{
            console.log('not enough meter')
            return
        }
        if(user.num==1){
            this.id=1
            
        }else{
            this.id = 2
            
        }
        this.state='active'
        this.lifespan=250
        game.processes.push(this)
       
    },
    update:function(game){
        this.lifespan--
        let main
        if(this.id==1){
           main = game.players[0]
        }else{
            main = game.players[1]
        }
        if(game.get_collision(game.ball,main)){
            this.x = game.ball.x
            this.y = game.ball.y
            this.dx = game.ball.dx*-1
            this.dy = game.ball.dy*-1

        }
        this.x+=this.dx
        this.y+=this.dy
        if(this.y>480||this.y<0){
            this.dy*=-1
        }
        if(this.lifespan==0){
            this.state='dead'
        }
    }
}

const direct_shot = {
    x:0,y:0,w:25,h:25,dx:0,dy:0,state:'inactive',lifespan:0,id:0,color:'white',
    onstart:function(user,target,game){
        if(user.meter>30){
            user.meter-=30
        }else{
            console.log('not enough meter')
            return
        }
        if(user.num==1){
            this.id=1
            
        }else{
            this.id = 2
            
        }
        this.state='active'
        this.lifespan=250
        game.processes.push(this)
       
    },
    update:function(game){
        this.lifespan--
        let main
        if(this.id==1){
           main = game.players[0]
        }else{
            main = game.players[1]
        }
        if(game.get_collision(game.ball,main)){
            game.state = 'freezeframe'
            game.freezetimer=20
            if(this.id==1){
                game.ball.dx = 20
                game.ball.dy = 10*main.direction
                game.ball.x+=15
            }else{
                game.ball.dx = -20
                game.ball.dy = 10*main.direction
                game.ball.x-= 15
            }
            this.state='dead'

        }
        
        if(this.lifespan==0){
            this.state='dead'
        }
    }
}

const shadowclones = {
    onstart:function(user,target,game){
        if(user.meter>30){
            user.meter-=30
        }else{
            console.log('not enough meter')
            return
        }
        const clone1 = {x:0,y:0,w:50,h:50,player:user,color:'white',lifespan:250,state:'active',
            update:function(game){
                let main
                if(game.players[0]==this.player){
                    main = game.players[0]
                }else{
                    main = game.players[1]
                }
                this.x = main.x
                this.y = main.y-150
                if(game.get_collision(game.ball,{x:this.x,y:this.y,width:this.w,height:this.h})){
                    game.ball.dx*=-1
                }
                this.lifespan--
                if(this.lifespan==0){
                    this.state='dead'
                }
            }
        }
        const clone2 = {x:0,y:0,w:50,h:50,player:user,color:'white',lifespan:250,state:'active',
            update:function(game){
                let main
                if(game.players[0]==this.player){
                   main = game.players[0]
                }else{
                   main = game.players[1]
                }
                this.x = main.x
                this.y = main.y+150
                if(game.get_collision(game.ball,{x:this.x,y:this.y,width:this.w,height:this.h})){
                    game.ball.dx*=-1
                }
                this.lifespan--
                if(this.lifespan==0){
                    this.state='dead'
                }
            }
        }
        game.processes.push(clone1)
        game.processes.push(clone2)
    }
    
}
//ultimate moves

const super_shot = {
    onstart:function(user,opponent,game){
        if(user.isultimate==false){
            if(user.meter==90){
                user.meter-=90
            }else{
                console.log('not enough meter')
                return
            }
            user.isultimate=true
            return
        }
        game.ball.state = 'super'
        game.ball.width = 100
        game.ball.height = 100
        if(user.num == 1){
            game.ball.dx = 20
        }else{
            game.ball.dx = -20
        }
        game.ball.dy=0
        user.isultimate=false
        game.state = 'freezeframe'
        game.freezetimer=20
        
        
    },
    update:function(){

    }
}