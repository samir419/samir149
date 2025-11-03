let blanche = {
    name:'blanche',
    images:['chars/blanche/naomi cat.png'],
    friendly:0,
    emotion:0,
    source:'chars/blanche/blanche.js',
    battle_img:'chars/blanche/naomi cat.png',
    moveset:['Replenish','Repair','Strike','Angel Guard','fusion xyz','Force Field'],
    desired_items:['cupcake','balloon']
}
if(!sessionStorage.getItem('blanche')){
    sessionStorage.setItem('blanche',JSON.stringify(blanche))
}
blanche = JSON.parse(sessionStorage.getItem('blanche'))

const ex_interactions = [
    //loosing battle
    {text:'response',img:0,func:function(){increase_friendly(-1,'echar')}},
    //winning battle
    {text:'response',img:0,func:function(){increase_friendly(1,'echar')}},
    //loosing pong
    {text:'response',img:0,func:function(){increase_emotion(-1,'echar')}},
    //winning pong
    {text:'response',img:0,func:function(){increase_emotion(1,'echar')}},
    //desired item 1
    {text:'response',img:0,func:function(){increase_friendly(1,'echar');give_item()}},
    //desired item 2
    {text:'response',img:0,func:function(){increase_emotion(1,'echar');give_item()}},
    //desired item 3
    {text:'response',img:0,func:function(){increase_friendly(1,'echar');increase_emotion(1,'echar');give_item()}},
]
function get_img(){
    let num = Math.floor(Math.random() *blanche.images.length)
    return num
}

const blanche_conv =[
     [ // friendliness 0 - formal, distant
        [ // emotion 0 - neutral
            { text: "dialogue place holder", img: get_img(), custom: true,
              options: [
                { text: "choice.", func: function(){ increase_friendly(1) } },//10 01 11 00 -10 0-1 -1-1 1-1 -11 
                { text: "choice.", func: function(){ increase_emotion(1) } }
              ]
            },
            { text: "dialogue place holder", img: get_img(), custom: true,
              options: [
                { text: "choice", func: function(){ increase_friendly(1); increase_emotion(1); } },
                { text: "choice", func: function(){return;} }
              ]
            }
        ],
        [ // emotion 1 - curious
            { text: "dialogue place holder", img: get_img(), custom: true,
              options: [
                { text: "choice.", func: function(){ increase_friendly(1) } },//10 01 11 00 -10 0-1 -1-1 1-1 -11 
                { text: "choice.", func: function(){ increase_emotion(1) } }
              ]
            },
            { text: "dialogue place holder", img: get_img(), custom: true,
              options: [
                { text: "choice", func: function(){ increase_friendly(1); increase_emotion(1); } },
                { text: "choice", func: function(){return;} }
              ]
            },
            { text: "dialogue place holder", img: get_img(), custom: true,
              options: [
                { text: "choice", func: function(){ increase_friendly(1); increase_emotion(-1); } },
                { text: "choice", func: function(){ increase_emotion(-1); } },
              ]
            }
        ],
        [ // emotion 2 - emotional bond
            { text: "dialogue place holder", img: get_img(), custom: true,
              options: [
                { text: "choice.", func: function(){ increase_friendly(1) } },
                { text: "choice", func: function(){return;} }
              ]
            },
            { text: "dialogue place holder", img: get_img(), custom: true,
              options: [
                { text: "choice", func: function(){ increase_friendly(1); increase_emotion(-1); } },
                { text: "choice", func: function(){ increase_emotion(-1); } },
              ]
            }
        ],
    ],

    [ // friendliness 1 - mild warmth
        [ // emotion 0
             { text: "dialogue place holder", img: get_img(), custom: true,
              options: [
                { text: "choice.", func: function(){ increase_friendly(1) } },
                { text: "choice.", func: function(){ increase_emotion(1) } }
              ]
            },
            { text: "dialogue place holder", img: get_img(), custom: true,
              options: [
                { text: "choice", func: function(){ increase_friendly(1); increase_emotion(1); } },
                { text: "choice", func: function(){return;} },
                { text: "choice", func: function(){ increase_friendly(-1); increase_emotion(1); } },
              ]
            },
        ],
        [ // emotion 1
            { text: "dialogue place holder", img: get_img(), custom: true,
              options: [
                { text: "choice.", func: function(){ increase_friendly(1) } },
                { text: "choice.", func: function(){ increase_emotion(1) } }
              ]
            },
            { text: "dialogue place holder", img: get_img(), custom: true,
              options: [
                { text: "choice", func: function(){ increase_friendly(1); increase_emotion(1); } },
                { text: "choice", func: function(){return;} }
              ]
            },
            { text: "dialogue place holder", img: get_img(), custom: true,
              options: [
                { text: "choice", func: function(){ increase_friendly(-1); increase_emotion(-1); } },
                { text: "choice", func: function(){ increase_emotion(-1); } },
              ]
            },
            { text: "dialogue place holder", img: get_img(), custom: true,
              options: [
                { text: "choice", func: function(){ increase_friendly(1); increase_emotion(-1); } },
                { text: "choice", func: function(){ increase_friendly(-1); } },
                { text: "choice", func: function(){ increase_friendly(-1); increase_emotion(1); } }
              ]
            }
        ],
        [ // emotion 2
            { text: "dialogue place holder", img: get_img(), custom: true,
              options: [
                { text: "choice.", func: function(){ increase_friendly(1) } },
                { text: "choice", func: function(){return;} }
              ]
            },
            { text: "dialogue place holder", img: get_img(), custom: true,
              options: [
                { text: "choice", func: function(){ increase_friendly(-1); increase_emotion(-1); } },
                { text: "choice", func: function(){ increase_emotion(-1); } },
              ]
            },
            { text: "dialogue place holder", img: get_img(), custom: true,
              options: [
                { text: "choice", func: function(){ increase_friendly(1); increase_emotion(-1); } },
                { text: "choice", func: function(){ increase_friendly(-1); } },
              ]
            }
        ],
    ],
    [ // friendliness 2 - mild warmth
        [ // emotion 0
             { text: "dialogue place holder", img: get_img(), custom: true,
              options: [
                { text: "choice.", func: function(){ increase_friendly(-1) } },
                { text: "choice.", func: function(){ increase_emotion(1) } }
              ]
            },
            { text: "dialogue place holder", img: get_img(), custom: true,
              options: [
                { text: "choice", func: function(){ increase_friendly(-1); increase_emotion(1); } },
                { text: "choice", func: function(){return;} },
              ]
            },
        ],
        [ // emotion 1
            { text: "dialogue place holder", img: get_img(), custom: true,
              options: [
                { text: "choice", func: function(){ increase_friendly(-1); increase_emotion(1); } },
                { text: "choice", func: function(){return;} },
                { text: "choice.", func: function(){ increase_emotion(1) } }
              ]
            },
            { text: "dialogue place holder", img: get_img(), custom: true,
              options: [
                { text: "choice", func: function(){ increase_friendly(-1); increase_emotion(-1); } },
                { text: "choice", func: function(){ increase_emotion(-1); } },
              ]
            },
            { text: "dialogue place holder", img: get_img(), custom: true,
              options: [
                { text: "choice", func: function(){ increase_friendly(-1); } },
                { text: "choice", func: function(){ increase_friendly(-1); increase_emotion(1); } }
              ]
            }
        ],
        [ // emotion 2
            { text: "dialogue place holder", img: get_img(), custom: true,
              options: [
                { text: "choice", func: function(){ increase_friendly(-1); } },
                { text: "choice", func: function(){return;} }
              ]
            },
            { text: "dialogue place holder", img: get_img(), custom: true,
              options: [
                { text: "choice", func: function(){ increase_friendly(-1); increase_emotion(-1); } },
                { text: "choice", func: function(){ increase_emotion(-1); } },
              ]
            },
        ],
    ],
]

function increase_friendly(num){
    let data = JSON.parse(sessionStorage.getItem('blanche'));
    data.friendly+=1*num;
    sessionStorage.setItem('blanche',JSON.stringify(data));
    update_char(data);
}
function increase_emotion(num){
    let data = JSON.parse(sessionStorage.getItem('blanche'));
    data.emotion+=1*num;
    sessionStorage.setItem('blanche',JSON.stringify(data));
    update_char(data);
}
function give_item(item,price){
    let data = JSON.parse(sessionStorage.getItem('rpg_data'));
    data.items.push({name:item,price:price});
    sessionStorage.setItem('rpg_data',JSON.stringify(data));
    display_inventory()
}
const erza_conv = [
    [ // friendliness 0 - formal, distant
        [ // emotion 0 - neutral
            { text: "dialogue place holder", img: get_img(), custom: true,
              options: [
                { text: "choice.", func: function(){ increase_friendly(1,'erza') } },//10 01 11 00 -10 0-1 -1-1 1-1 -11 
                { text: "choice.", func: function(){ increase_emotion(1,'erza') } }
              ]
            },
            { text: "dialogue place holder", img: get_img(), custom: true,
              options: [
                { text: "choice", func: function(){ increase_friendly(1,'erza'); increase_emotion(1,'erza'); } },
                { text: "choice", func: function(){return;} }
              ]
            }
        ],
        [ // emotion 1 - curious
            { text: "dialogue place holder", img: get_img(), custom: true,
              options: [
                { text: "choice.", func: function(){ increase_friendly(1,'erza') } },//10 01 11 00 -10 0-1 -1-1 1-1 -11 
                { text: "choice.", func: function(){ increase_emotion(1,'erza') } }
              ]
            },
            { text: "dialogue place holder", img: get_img(), custom: true,
              options: [
                { text: "choice", func: function(){ increase_friendly(1,'erza'); increase_emotion(1,'erza'); } },
                { text: "choice", func: function(){return;} }
              ]
            },
            { text: "dialogue place holder", img: get_img(), custom: true,
              options: [
                { text: "choice", func: function(){ increase_friendly(1,'erza'); increase_emotion(-1,'erza'); } },
                { text: "choice", func: function(){ increase_emotion(-1,'erza'); } },
              ]
            }
        ],
        [ // emotion 2 - friendly interest
            { text: "dialogue place holder", img: get_img(), custom: true,
              options: [
                { text: "choice.", func: function(){ increase_friendly(1,'erza') } },
                { text: "choice.", func: function(){ increase_emotion(1,'erza') } }
              ]
            },
            { text: "dialogue place holder", img: get_img(), custom: true,
              options: [
                { text: "choice", func: function(){ increase_friendly(1,'erza'); increase_emotion(1,'erza'); } },
                { text: "choice", func: function(){return;} }
              ]
            },
            { text: "dialogue place holder", img: get_img(), custom: true,
              options: [
                { text: "choice", func: function(){ increase_friendly(1,'erza'); increase_emotion(-1,'erza'); } },
                { text: "choice", func: function(){ increase_emotion(-1,'erza'); } },
              ]
            }
        ],
        [ // emotion 3 - attached
            { text: "dialogue place holder", img: get_img(), custom: true,
              options: [
                { text: "choice.", func: function(){ increase_friendly(1,'erza') } },
                { text: "choice.", func: function(){ increase_emotion(1,'erza') } }
              ]
            },
            { text: "dialogue place holder", img: get_img(), custom: true,
              options: [
                { text: "choice", func: function(){ increase_friendly(1,'erza'); increase_emotion(1,'erza'); } },
                { text: "choice", func: function(){return;} }
              ]
            },
            { text: "dialogue place holder", img: get_img(), custom: true,
              options: [
                { text: "choice", func: function(){ increase_friendly(1,'erza'); increase_emotion(-1,'erza'); } },
                { text: "choice", func: function(){ increase_emotion(-1,'erza'); } },
              ]
            }
        ],
        [ // emotion 4 - emotional bond
            { text: "dialogue place holder", img: get_img(), custom: true,
              options: [
                { text: "choice.", func: function(){ increase_friendly(1,'erza') } },
                { text: "choice", func: function(){return;} }
              ]
            },
            { text: "dialogue place holder", img: get_img(), custom: true,
              options: [
                { text: "choice", func: function(){ increase_friendly(1,'erza'); increase_emotion(-1,'erza'); } },
                { text: "choice", func: function(){ increase_emotion(-1,'erza'); } },
              ]
            }
        ],
    ],

    [ // friendliness 1 - mild warmth
        [ // emotion 0
             { text: "dialogue place holder", img: get_img(), custom: true,
              options: [
                { text: "choice.", func: function(){ increase_friendly(1,'erza') } },
                { text: "choice.", func: function(){ increase_emotion(1,'erza') } }
              ]
            },
            { text: "dialogue place holder", img: get_img(), custom: true,
              options: [
                { text: "choice", func: function(){ increase_friendly(1,'erza'); increase_emotion(1,'erza'); } },
                { text: "choice", func: function(){return;} },
                { text: "choice", func: function(){ increase_friendly(-1,'erza'); increase_emotion(1,'erza'); } },
              ]
            },
        ],
        [ // emotion 1
            { text: "dialogue place holder", img: get_img(), custom: true,
              options: [
                { text: "choice.", func: function(){ increase_friendly(1,'erza') } },
                { text: "choice.", func: function(){ increase_emotion(1,'erza') } }
              ]
            },
            { text: "dialogue place holder", img: get_img(), custom: true,
              options: [
                { text: "choice", func: function(){ increase_friendly(1,'erza'); increase_emotion(1,'erza'); } },
                { text: "choice", func: function(){return;} }
              ]
            },
            { text: "dialogue place holder", img: get_img(), custom: true,
              options: [
                { text: "choice", func: function(){ increase_friendly(-1,'erza'); increase_emotion(-1,'erza'); } },
                { text: "choice", func: function(){ increase_emotion(-1,'erza'); } },
              ]
            },
            { text: "dialogue place holder", img: get_img(), custom: true,
              options: [
                { text: "choice", func: function(){ increase_friendly(1,'erza'); increase_emotion(-1,'erza'); } },
                { text: "choice", func: function(){ increase_friendly(-1,'erza'); } },
                { text: "choice", func: function(){ increase_friendly(-1,'erza'); increase_emotion(1,'erza'); } }
              ]
            }
        ],
        [ // emotion 2
            { text: "dialogue place holder", img: get_img(), custom: true,
              options: [
                { text: "choice.", func: function(){ increase_friendly(1,'erza') } },
                { text: "choice.", func: function(){ increase_emotion(1,'erza') } }
              ]
            },
            { text: "dialogue place holder", img: get_img(), custom: true,
              options: [
                { text: "choice", func: function(){ increase_friendly(1,'erza'); increase_emotion(1,'erza'); } },
                { text: "choice", func: function(){return;} }
              ]
            },
            { text: "dialogue place holder", img: get_img(), custom: true,
              options: [
                { text: "choice", func: function(){ increase_friendly(-1,'erza'); increase_emotion(-1,'erza'); } },
                { text: "choice", func: function(){ increase_emotion(-1,'erza'); } },
              ]
            },
            { text: "dialogue place holder", img: get_img(), custom: true,
              options: [
                { text: "choice", func: function(){ increase_friendly(1,'erza'); increase_emotion(-1,'erza'); } },
                { text: "choice", func: function(){ increase_friendly(-1,'erza'); } },
                { text: "choice", func: function(){ increase_friendly(-1,'erza'); increase_emotion(1,'erza'); } }
              ]
            }
        ],
        [ // emotion 3
             { text: "dialogue place holder", img: get_img(), custom: true,
              options: [
                { text: "choice.", func: function(){ increase_friendly(1,'erza') } },
                { text: "choice.", func: function(){ increase_emotion(1,'erza') } }
              ]
            },
            { text: "dialogue place holder", img: get_img(), custom: true,
              options: [
                { text: "choice", func: function(){ increase_friendly(1,'erza'); increase_emotion(1,'erza'); } },
                { text: "choice", func: function(){return;} }
              ]
            },
            { text: "dialogue place holder", img: get_img(), custom: true,
              options: [
                { text: "choice", func: function(){ increase_friendly(-1,'erza'); increase_emotion(-1,'erza'); } },
                { text: "choice", func: function(){ increase_emotion(-1,'erza'); } },
              ]
            },
            { text: "dialogue place holder", img: get_img(), custom: true,
              options: [
                { text: "choice", func: function(){ increase_friendly(1,'erza'); increase_emotion(-1,'erza'); } },
                { text: "choice", func: function(){ increase_friendly(-1,'erza'); } },
                { text: "choice", func: function(){ increase_friendly(-1,'erza'); increase_emotion(1,'erza'); } }
              ]
            }
        ],
        [ // emotion 4
            { text: "dialogue place holder", img: get_img(), custom: true,
              options: [
                { text: "choice.", func: function(){ increase_friendly(1,'erza') } },
                { text: "choice", func: function(){return;} }
              ]
            },
            { text: "dialogue place holder", img: get_img(), custom: true,
              options: [
                { text: "choice", func: function(){ increase_friendly(-1,'erza'); increase_emotion(-1,'erza'); } },
                { text: "choice", func: function(){ increase_emotion(-1,'erza'); } },
              ]
            },
            { text: "dialogue place holder", img: get_img(), custom: true,
              options: [
                { text: "choice", func: function(){ increase_friendly(1,'erza'); increase_emotion(-1,'erza'); } },
                { text: "choice", func: function(){ increase_friendly(-1,'erza'); } },
              ]
            }
        ],
    ],

    [ // friendliness 2 - casual & playful
        [ // emotion 0
            { text: "You again! Either fate’s being funny or you just like me.", img: 1, custom: true,
              options: [
                { text: "Bit of both.", func: function(){ increase_emotion(1,'erza'); say("Oh really?"); } },
                { text: "It’s just coincidence.", func: function(){ say("Uh-huh, sure."); } }
              ]
            }
        ],
        [ // emotion 1
            { text: "If I win next time, you owe me a drink.", img: 2, custom: true,
              options: [
                { text: "Deal.", func: function(){ increase_emotion(1,'erza'); say("Hehe, can’t wait."); } },
                { text: "I never lose.", func: function(){ increase_friendly(1,'erza'); say("Cocky. I like that."); } }
              ]
            }
        ],
        [ // emotion 2
            { text: "You know, I don’t mind you hanging around.", img: 3, custom: true,
              options: [
                { text: "That’s practically a compliment!", func: function(){ increase_friendly(1,'erza'); say("Don’t push your luck."); } },
                { text: "Maybe I’ll earn a real one soon.", func: function(){ increase_emotion(1,'erza'); say("Keep trying, it’s working."); } }
              ]
            }
        ],
        [ // emotion 3
            { text: "I was waiting to see you today.", img: 2, custom: true,
              options: [
                { text: "Aw, that’s sweet.", func: function(){ increase_emotion(1,'erza'); say("You bring out that side of me."); } },
                { text: "You must be bored.", func: function(){ increase_friendly(1,'erza'); say("Only until now."); } }
              ]
            }
        ],
        [ // emotion 4
            { text: "If I said I liked you, what would you do?", img: 3, custom: true,
              options: [
                { text: "Say it again.", func: function(){ increase_emotion(1,'erza'); say("You’re impossible."); } },
                { text: "I’d probably blush.", func: function(){ increase_friendly(1,'erza'); say("Ha, cute."); } }
              ]
            }
        ],
    ],

    [ // friendliness 3 - open, teasing
        [ // emotion 0
            { text: "You’re a tough one to read sometimes.", img: 1, custom: true,
              options: [
                { text: "Maybe I like mystery.", func: function(){ increase_friendly(1,'erza'); say("You and me both."); } },
                { text: "Want me to be clearer?", func: function(){ increase_emotion(1,'erza'); say("Now that’s tempting."); } }
              ]
            }
        ],
        [ // emotion 1
            { text: "I made something for you… but don’t laugh.", img: 2, custom: true,
              options: [
                { text: "Is that a cupcake?", func: function(){ increase_emotion(1,'erza'); say("Okay fine, I tried baking. Don’t make it weird."); } },
                { text: "I’d never laugh.", func: function(){ increase_friendly(1,'erza'); say("You better not."); } }
              ]
            }
        ],
        [ // emotion 2
            { text: "I talk about you sometimes. Good things, I promise.", img: 3, custom: true,
              options: [
                { text: "You do?", func: function(){ increase_emotion(1,'erza'); say("I said good things, didn’t I?"); } },
                { text: "Wow, I’m flattered.", func: function(){ increase_friendly(1,'erza'); say("You should be."); } }
              ]
            }
        ],
        [ // emotion 3
            { text: "I like this vibe between us… easy, comfortable.", img: 3, custom: true,
              options: [
                { text: "It’s nice.", func: function(){ increase_emotion(1,'erza'); say("Yeah, it really is."); } },
                { text: "Don’t jinx it.", func: function(){ say("Haha, noted."); } }
              ]
            }
        ],
        [ // emotion 4
            { text: "You always make my day brighter.", img: 3, custom: true,
              options: [
                { text: "You too, erza.", func: function(){ increase_emotion(1,'erza'); say("You’re going to make me blush."); } },
                { text: "Keep talking like that and I might believe you.", func: function(){ increase_friendly(1,'erza'); say("I’ll make sure you do."); } }
              ]
            }
        ],
    ],

    [ // friendliness 4 - intimate, romantic
        [ // emotion 0
            { text: "You know me better than most people now.", img: 2, custom: true,
              options: [
                { text: "Guess I earned your trust.", func: function(){ increase_emotion(1,'erza'); say("Yeah… you really did."); } },
                { text: "That’s kinda nice.", func: function(){ increase_friendly(1,'erza'); say("Don’t ruin the moment."); } }
              ]
            }
        ],
        [ // emotion 1
            { text: "Sometimes I wonder what we really are.", img: 3, custom: true,
              options: [
                { text: "We’re something special.", func: function(){ increase_emotion(2); say("Then I don’t need to wonder anymore."); } },
                { text: "Why not just friends?", func: function(){ increase_emotion(-1,'erza'); say("If that’s what you want..."); } }
              ]
            }
        ],
        [ // emotion 2
            { text: "You look good today. Like, really good.", img: 3, custom: true,
              options: [
                { text: "Are you flirting?", func: function(){ increase_emotion(1,'erza'); say("If I am, is it working?"); } },
                { text: "Stop, I’ll start blushing.", func: function(){ increase_friendly(1,'erza'); say("Mission accomplished."); } }
              ]
            }
        ],
        [ // emotion 3
            { text: "It’s strange… I feel safe around you.", img: 2, custom: true,
              options: [
                { text: "I’d never hurt you.", func: function(){ increase_emotion(2); say("I know. That’s why it’s easy to care."); } },
                { text: "You’re soft today.", func: function(){ increase_friendly(1,'erza'); say("Don’t get used to it."); } }
              ]
            }
        ],
        [ // emotion 4
            { text: "If I said I love you… would you believe me?", img: 4, custom: true,
              options: [
                { text: "I already do.", func: function(){ increase_emotion(2); say("Then maybe this isn’t just a game anymore."); } },
                { text: "You’re serious?", func: function(){ increase_friendly(1,'erza'); say("Dead serious."); } }
              ]
            }
        ],
    ]
];