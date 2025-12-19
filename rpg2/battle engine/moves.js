class move {
    constructor(name, type, damage=0, healing=0,turns, durability=1, weight=1, effects,img,onhit,onupdate){
        this.name = name;
        this.type = type;
        this.damage = damage;
        this.healing = healing;
        this.turns = turns; // number of turns the move lasts
        this.turn_count = 0;
        this.durability = durability;
        this.durability_ref = durability;
        this.weight = weight;
        this.effects = effects; // e.g., ['stun', 'poison']
        this.img = img? img:'move.png';
        this.onhit = onhit;
        this.onupdate = onupdate;
        this.isactive = false;
        this.isenabled = true;
        this.user = null;
        this.target = null;
        this.target_moves = [];
        this.elem = null;
    }
    use(user,target,game_instance){
        if(!this.isenabled){
            log('move is disabled')
            return
        }
        if(this.durability<=0){
            log(`${this.name} has no durability left!`);
            return;
        }
        this.durability-=1;
        this.isactive = true;
        this.turn_count = this.turns;
        this.user = user;
        this.target = target;
        this.target_moves = [...user.moves, ...target.moves];
        log(`${user.name} used ${this.name}`);
        let dmg = this.calc_damage(user,target);
        target.health -= dmg
        target.lastDamageReceived = dmg
        user.health += this.healing;
        if(this.damage>0){
            log(`${target.name} took ${dmg} damage`);
        }
        if(this.healing>0){
            log(`${user.name} healed ${this.healing} health`);
        }
        if(this.elem){
            this.elem.textContent = `${this.name} (${this.durability})`
        }
        this.onhit(user,target,game_instance);
    }
    calc_damage(user,target){
        let damage = this.damage;
        if(target.status_effects.includes('invulnerable')){
            return damage = 0;
        }
        if(user.status_effects.includes('attack_buff')){
           damage = Math.floor(this.damage+100);
        }
         if(user.status_effects.includes('attack_buff2')){
           damage = Math.floor(this.damage+200);
        }
        if(target.status_effects.includes('guard')){
            damage = Math.floor(this.damage/2);
        }
        if(target.status_effects.includes('thorns')){
            user.health-=damage;
            log(`${user.name} received ${damage} thorn damage`)
        }
        return damage;
    }
    update(){
        if(this.isactive && this.turn_count>0){
            this.turn_count -= 1;
            if(this.onupdate){
                this.onupdate(this,this.user,this.target,this.target_moves)
            }
           
            if(this.turn_count==0){
                this.isactive = false;
                log(`${this.name} has ended`);
            }
        }
        if(this.durability==0){
            if(this.elem){
                this.elem.style.backgroundColor = 'red';
            }
            this.isenabled = false;
        }
        if(this.elem){
            this.elem.title = `durability:${this.durability} \n turns left: ${this.turns} \n power ${this.damage}`
        }
       
    }
}

const moves = [
    new move(
        'Strike',        // move_name
        'attack',      // type
        300,             // damage
        0,               // healing
        0,                // turns
        5,              // durability
        3,               // weight
        [],              // effects
        'strike.png',    //image
        function(user, target) {  // onhit
            return;
        },
        function(self, user, target, moves) {  // update
            return;
        }
    ),
     new move(
        'Replenish',        // move_name
        'spell',      // type
        0,             // damage
        500,               // healing
        0,                // turns
        1,              // durability
        5,               // weight
        [],              // effects
        'spell.png',    //image
        function(user, target) {  // onhit
            return;
        },
        function(self, user, target, moves) {  // update
            return;
        }
    ),
     new move(
        'Blast Cannon',        // move_name
        'attack',      // type
        500,             // damage
        0,               // healing
        0,                // turns
        1,              // durability
        5,               // weight
        [],              // effects
        'move.png',    //image
        function(user, target,game_instance) {  // onhit
            return;
        },
        function(self, user, target, moves) {  // update
            return;
        }
    ),
    new move(
        'Heal',        // move_name
        'spell',       // type
        0,              // damage
        350,          // healing
        0,              // turns
        2,             // durability
        3,                // weight
        [],             // effects
         'spell.png',    //image
        function(user, target) {   // onhit
            return;
        },
        function(self, user, target, moves) {  // update
           return;
        }
    ),
    new move(
        'Force Field',        // move_name
        'spell',       // type
        0,              // damage
        0,              // healing
        2,              // turns
        1,             // durability
        4,                // weight
        ['guard'],             // effects
         'move.png',    //image
        function(user, target,game_instance) {   // onhit
            user.status_effects.push('guard');
        },
        function(self, user, target, moves) {  // update
                if(self.turn_count==0){
                    let index = user.status_effects.indexOf('guard');
                    if (index > -1) {
                    user.status_effects.splice(index, 1);
                    log(`${user.name} is no longer guarded`);
                    }
                }
            }
    ),
    new move(
        'Holy Blade',        // move_name
        'attack',       // type
        300,              // damage
        300,              // healing
        0,              // turns
        1,             // durability
        3,                // weight
        [],             // effects
         'move.png',    //image
        function(user, target,game_instance) {   // onhit
            return;
        },
        function(self, user, target, moves) {  // update
           return;
        }
    ),
     new move(
        'Demon Charge',        // move_name
        'attack',       // type
        500,              // damage
        0,              // healing
        0,              // turns
        2,             // durability
        3,                // weight
        [],             // effects
         'move.png',    //image
        function(user, target,game_instance) {   // onhit
            user.health-=300
            log('300 knockback damage')
        },
        function(self, user, target, moves) {  // update
           return;
        }
    ),
    new move(
        'Shield Strike',        // move_name
        'attack',       // type
        300,              // damage
        0,              // healing
        1,              // turns
        1,             // durability
        3,                // weight
        [],             // effects
         'move.png',    //image
         function(user, target,game_instance) {   // onhit
            user.status_effects.push('guard');
        },
        function(self, user, target, moves) {  // update
                if(self.turn_count==0){
                    let index = user.status_effects.indexOf('guard');
                    if (index > -1) {
                    user.status_effects.splice(index, 1);
                    log(`${user.name} is no longer guarded`);
                    }
            }
        }
    ),
     new move(
        'Covenant of Carnage',        // move_name
        'spell',      // type
        0,             // damage
        0,               // healing
        3,                // turns
        2,              // durability
        4,               // weight
        [],              // effects
         'move.png',    //image
        function(user, target,game_instance) {  // onhit
            return;
        },
        function(self, user, target, moves) {  // update
            if(self.turn_count<=0){
                self.damage = 400;
                user.health -= self.calc_damage(user,user);
                target.health -= self.calc_damage(user,target);
                log(`${user.name} took ${self.calc_damage(user,user)} damage from ${self.name}`);
                log(`${target.name} took ${self.calc_damage(user,target)} damage from ${self.name}`);
                self.damage = 0;
            }else{
                if(self.turn_count%1==0){
                    log(`${self.turn_count} turns of ${self.name} remaining`);
                }
               
            }
        }
    ),
    new move(
        'Mirror Match',        // move_name
        'spell',      // type
        0,             // damage
        0,               // healing
        0,                // turns
        1,              // durability
        1,               // weight
        [],              // effects
         'move.png',    //image
        function(user, target,game_instance) {  // onhit
            if(target.lastmoveused && target.lastmoveused.name !== 'Mirror Match'){
                let move_to_copy = target.lastmoveused;
                let copied_move = new move(
                    move_to_copy.name,
                    move_to_copy.type,
                    move_to_copy.damage,
                    move_to_copy.healing,
                    move_to_copy.turns,
                    move_to_copy.durability_ref,
                    move_to_copy.weight,
                    move_to_copy.effects,
                    null,
                    move_to_copy.onhit,
                    move_to_copy.onupdate
                );
                copied_move.use(user, target);
            }else{
                log(`No move to copy or last move was Mirror Match!`);
            }
        },
        function(self, user, target, moves) {  // update
            return;
        }
    ),
     new move(
        'Power Up',        // move_name
        'spell',      // type
        0,             // damage
        0,               // healing
        5,                // turns
        5,              // durability
        1,               // weight
        [],              // effects
         'move.png',    //image
        function(user, target,game_instance) {  // onhit
            user.status_effects.push('attack_buff');
        },
        function(self, user, target, moves) {  // update
            if(self.turn_count==0){
                let index = user.status_effects.indexOf('attack_buff');
                if (index > -1) {
                    user.status_effects.splice(index, 1);
                    log(`${user.name} is no longer empowered`);
                }
            }
        }
    ),
     new move(
        'Baneful Binding',        // move_name
        'spell',      // type
        0,             // damage
        0,               // healing
        2,                // turns
        3,              // durability
        2,               // weight
        [],              // effects
         'move.png',    //image
        function(user, target,game_instance) {  // onhit
            (async () => {
                let state_ref = game_instance.state
                game_instance.state = 'wait'
                let options = []
                target.moves.forEach(move => {options.push(move.name)})
                let num = await get_prompt('select move:',options);
                target.moves[num].isenabled = false;
                if(target.moves[num].elem){
                     target.moves[num].elem.style.backgroundColor='grey'
                }
                target.status_effects.push('move_disabled');
                log(`${target.name}'s move ${target.moves[num].name} is now disabled`);
                game_instance.state='running'
            })();
        },
        function(self, user, target, moves) {  // update
            if(self.turn_count==0){
                target.moves.forEach(m => {
                    m.isenabled = true;
                    if(m&&m.elem){
                        m.elem.style.backgroundColor=null
                    }
                    
                });
                target.status_effects = target.status_effects.filter(se => se !== 'move_disabled');
                log(`${target.name}'s moves are now enabled`);
            }
        }
    ),
    /**  new move(
        'Energy Ball',        // move_name
        'attack',      // type
        0,             // damage
        0,               // healing
        1,                // turns
        1,              // durability
        4,               // weight
        [],              // effects
         'move.png',    //image
        function(user, target,game_instance) {  // onhit
            user.status_effects.push('invulnerable');
            log(`${user.name} is now invulnerable for 1 turn`);
        },
        function(self, user, target, moves) {  // update
           
            if(self.turn_count==0){
                self.damage = 400
                target.health -= self.calc_damage(user,target);
                log(`${target.name} took ${self.calc_damage(user,target)} damage from ${self.name}`);
                self.damage = 0;
                let index = user.status_effects.indexOf('invulnerable');
                if (index > -1) {
                user.status_effects.splice(index, 1);
                log(`${user.name} is no longer invulnerable`);
                }
                //skip player turn
                if(game.state=='1'){
                    game.state='2'
                }else{
                    game.state='1'
                }
            }
        }
    ),*/
     new move(
        'Repair',        // move_name
        'spell',      // type
        0,             // damage
        0,               // healing
        0,                // turns
        3,              // durability
        3,               // weight
        [],              // effects
         'spell.png',    //image
        function(user, target,game_instance) {  // onhit
            (async () => {
                let state_ref = game_instance.state
                game_instance.state = 'wait'
                 let options = []
                user.moves.forEach(move => {options.push(move.name)})
                let num = await get_prompt('select move:',options);
                user.moves[num].durability =  user.moves[num].durability_ref
                user.moves[num].isenabled = true
                if( user.moves[num].elem){
                     user.moves[num].elem.style.backgroundColor = null
                }
               
                log(`${user.name}'s move ${user.moves[num].name} is restored`);
                game_instance.state='running'
                
            })();
        },
        function(self, user, target, moves) {  // update
            return;
        }
    ),
     new move(
        'Attack Up',        // move_name
        'spell',      // type
        0,             // damage
        0,               // healing
        0,                // turns
        3,              // durability
        2,               // weight
        [],              // effects
         'move.png',    //image
        function(user, target,game_instance) {  // onhit
            (async () => {
                let state_ref = game_instance.state
                game_instance.state = 'wait'
                 let options = []
                user.moves.forEach(move => {options.push(move.name)})
                let num = await get_prompt('select move:',options);
                user.moves[num].damage+=200
                if( user.moves[num].elem){
                     user.moves[num].elem.style.backgroundColor = 'orange'
                }
               
                log(`${user.name}'s move ${user.moves[num].name} damage increased`);
                game_instance.state='running'
                
            })();
        },
        function(self, user, target, moves) {  // update
            return;
        }
    ),
     new move(
        'fusion xyz',        // move_name
        'spell',      // type
        0,             // damage
        0,               // healing
        0,                // turns
        1,              // durability
        1,               // weight
        [],              // effects
         'move.png',    //image
        async function(user, target,game_instance) {  // onhit
            
            let state_ref = game_instance.state
            game_instance.state = 'wait'
                let options = []
            user.moves.forEach(move => {options.push(move.name)})
            let num = 0
            let num2 = 0
            if(user.type=='player'){
                num = await get_prompt('select move:',options);
                num2 = await get_prompt('select second move:',options);
            }else{
                num = Math.floor(Math.random() * 6)
                num2 = Math.floor(Math.random() * 6)
            }
           
            user.moves[num].use(user,target,game_instance)
            if(num2!=num){
                user.moves[num2].use(user,target,game_instance)
            }
            game_instance.state='running'
                
           
        },
        function(self, user, target, moves) {  // update
            return;
        }
    ),
    new move(
        'Beast Mode',        // move_name
        'spell',      // type
        0,             // damage
        0,               // healing
        3,                // turns
        2,              // durability
        2,               // weight
        [],              // effects
         'move.png',    //image
        function(user, target,game_instance) {  // onhit
            user.status_effects.push('attack_buff2');
        },
        function(self, user, target, moves) {  // update
            if(self.turn_count==0){
                let index = user.status_effects.indexOf('attack_buff2');
                if (index > -1) {
                user.status_effects.splice(index, 1);
                log(`${user.name}'s power boost has ended`);
                }
            }
        }
    ),
      new move(
        'Malevonent Armor',        // move_name
        'spell',      // type
        0,             // damage
        0,               // healing
        2,                // turns
        2,              // durability
        2,               // weight
        ['thorns'],              // effects
         'move.png',    //image
        function(user, target,game_instance) {  // onhit
            user.status_effects.push('thorns');
        },
        function(self, user, target, moves) {  // update
            if(self.turn_count==0){
                let index = user.status_effects.indexOf('thorns');
                if (index > -1) {
                user.status_effects.splice(index, 1);
                log(`${user.name} is no longer thorn`);
                }
            }
        }
    ),
     new move(
        'Angel Guard',        // move_name
        'spell',       // type
        0,              // damage
        300,              // healing
        1,              // turns
        1,             // durability
        3,                // weight
        ['guard'],             // effects
         'move.png',    //image
        function(user, target,game_instance) {   // onhit
            user.status_effects.push('guard');
        },
        function(self, user, target, moves) {  // update
                if(self.turn_count==0){
                    let index = user.status_effects.indexOf('guard');
                    if (index > -1) {
                    user.status_effects.splice(index, 1);
                    log(`${user.name} is no longer guard`);
                    }
                }
            }
    ),
]