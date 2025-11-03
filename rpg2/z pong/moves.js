

const forcefield = {
    x:0,y:0,w:100,h:150,dx:0,dy:0,state:'inactive',lifespan:0,color:'orange',id:0,name:'Force Field',dp:1,
    onstart:function(user,target,game){
        if(user.num==1){
            this.x = user.x
            this.y = user.y-50
        }else{
            this.x = user.x-50
            this.y = user.y-50
        }
        this.id = user.num
        this.state='active'
        this.lifespan=250
        game.processes.push(this)
       
    },
    update:function(game){
        this.lifespan--
        let main = game.players.find(({ num }) => num == this.id);
        this.y=main.y-50
        if(game.get_collision(game.ball,{x:this.x,y:this.y,width:this.w,height:this.h})){
            game.ball.x+=(2*game.ball.dx)*-1
            game.ball.dx*=-1
        }
        if(this.lifespan==0){
            this.state='dead'
        }
    }
}

const mirrormatch = {
    x:0,y:0,w:30,h:150,dx:0,dy:0,state:'inactive',lifespan:0,name:'Mirror Match',dp:1,
    onstart:function(user,target,game){
        if( target.special_moves[0]!=this){
            target.special_moves[0].onstart(user,target,game)
        }else{
            target.special_moves[1].onstart(user,target,game)
        }
       
       
    },
    update:function(game){
        return
    }
}

const malevonentgoalpost = {
    x:0,y:0,w:70,h:70,dx:0,dy:0,state:'inactive',lifespan:0,id:0,color:'brown',name:'Malevonent Goal Post',dp:1,
    onstart:function(user,target,game){
        this.id = user.num
        this.state='active'
        this.lifespan=120
        game.processes.push(this)
       
       
    },
    update:function(game){
        this.lifespan--
        let main = game.players.find(({ num }) => num == this.id);
        if(this.id==1){
            if(game.ball.x<=0){
               game.players[1].health-=10
            }
           
        }
        if(this.id==2){
            if(game.ball.x>=720){
                game.players[0].health-=10
            }
        }
        this.x=main.x
        this.y = main.y-20
        if(this.lifespan==0){
            this.state='dead'
        }
    }
}

const strike = {
    x:0,y:0,w:50,h:50,dx:0,dy:0,state:'inactive',lifespan:0,id:0,color:'red',dp:5,name:'Strike',
    onstart:function(user,target,game){
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
        this.x = main.x
        this.y = main.y
        if(game.get_collision(game.ball,main)){
            game.state = 'freezeframe'
            game.freezetimer=20
            game.ball.state='power'
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

const all_moves = [strike,forcefield,malevonentgoalpost,mirrormatch]