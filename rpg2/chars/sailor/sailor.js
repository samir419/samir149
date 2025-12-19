let sailor = {
    name:'sailor',
    images:['chars/sailor/idle.png','chars/sailor/smug.png','chars/sailor/laugh.png','chars/sailor/scared.png','chars/sailor/suprise.png','chars/sailor/angry.png','chars/sailor/smile.png'],
    friendly:0,
    emotion:0,
    source:'chars/sailor/sailor.png',
    battle_img:'chars/sailor/smile.png',
    pong_sprite:'game assets/player2.png',
    moveset:['Replenish','Repair','Strike','Angel Guard','fusion xyz','Force Field'],
    desired_items:['soda','cheese cake','cassette album',],
    level:4
}
if(!sessionStorage.getItem('sailor')){
    sessionStorage.setItem('sailor',JSON.stringify(sailor))
}
sailor = JSON.parse(sessionStorage.getItem('sailor'))

const sailor_custom_interactions = [
    //loosing battle
    {text:'i lost? what a bummer',img:0,func:function(){increase_friendly(-1,'sailor')}},
    //winning battle
    {text:'haha i beat you',img:0,func:function(){increase_emotion(1,'sailor')}},
    //loosing pong
    {text:'that was such a great match, lets do it again',img:0,func:function(){increase_friendly(1,'sailor')}},
    //winning pong
    {text:'woohoo im the best',img:0,func:function(){return}},
    //desired item 2
    {text:'i was infact thirsty, how could you tell?',img:0,func:function(){increase_friendly(1,'sailor')}},
     //desired item 1
    {text:'oh my god i love cheese cake',img:0,func:function(){increase_emotion(1,'sailor')}},
]
function get_img(){
    let num = Math.floor(Math.random() *sailor.images.length)
    return num
}
const sailor_conv = [
    [ // friendliness 0 - formal, distant
        [ // emotion 0 - neutral
            { text: "Oh, it's you. Do you need something?", img: get_img(), custom: true,
              options: [
                { text: "Just wanted to talk.", func: function(){ increase_friendly(1,'sailor'); say("Alright... I guess I can spare a minute."); } },
                { text: "Nevermind.", func: function(){ say("Okay, suit yourself."); } }
              ]
            },
            { text: "I like to keep busy. Idling wastes time, don’t you think?", img: get_img(), custom: true,
              options: [
                { text: "You’re right, staying busy helps.", func: function(){ increase_friendly(1,'sailor'); say("Good, at least you get it."); } },
                { text: "Sometimes rest is important.", func: function(){ increase_emotion(1,'sailor'); say("Hmm, maybe I should learn that."); } }
              ]
            }
        ],
        [ // emotion 1 - curious
            { text: "You seem different today. Did something happen?", img: get_img(), custom: true,
              options: [
                { text: "Not really.", func: function(){ say("Then maybe it’s just me."); } },
                { text: "Maybe I was thinking about you.", func: function(){ increase_emotion(1,'sailor'); say("...Don’t tease me like that."); } }
              ]
            }
        ],
        [ // emotion 2 - friendly interest
            { text: "You know... you’re starting to grow on me.", img: get_img(), custom: true,
              options: [
                { text: "Finally!", func: function(){ increase_friendly(1,'sailor'); say("Haha, don’t get too confident."); } },
                { text: "Want a cassette album?", func: function(){ increase_emotion(1,'sailor'); say("Oh wow, thanks! I love cheese cake. ive got you a little something of my own");give_item('white cake',40); } }
              ]
            }
        ],
        [ // emotion 3 - attached
            { text: "I actually look forward to seeing you now.", img: get_img(), custom: true,
              options: [
                { text: "I feel the same.", func: function(){ increase_emotion(1,'sailor'); say("Then it’s mutual."); } },
                { text: "You’re starting to like me, huh?", func: function(){ increase_friendly(1,'sailor'); say("Maybe. Don’t push it."); } }
              ]
            }
        ],
        [ // emotion 4 - emotional bond
            { text: "When we talk... I forget about everything else.", img: get_img(), custom: true,
              options: [
                { text: "That’s sweet of you.", func: function(){ increase_emotion(1,'sailor'); say("You make it easy to say things like that."); } },
                { text: "You’re kind of intense.", func: function(){ increase_friendly(-1,'sailor'); say("Sorry. I get carried away."); } }
              ]
            }
        ],
    ],

    [ // friendliness 1 - mild warmth
        [ // emotion 0
            { text: "Hey again. You come around a lot lately.", img: get_img(), custom: true,
              options: [
                { text: "You make good company.", func: function(){ increase_emotion(1,'sailor'); say("Flattery works on me. let me give you a lil something");give_item('white cake',40); } },
                { text: "Don’t get used to it.", func: function(){ say("Heh, no promises."); } }
              ]
            }
        ],
        [ // emotion 1
            { text: "I was thinking about that match we had. You were good.", img: get_img(), custom: true,
              options: [
                { text: "Thanks, I trained hard.", func: function(){ increase_friendly(1,'sailor'); say("It shows."); } },
                { text: "You went easy on me.", func: function(){ increase_emotion(1,'sailor'); say("Maybe a little. I like seeing you win."); } }
              ]
            }
        ],
        [ // emotion 2
            { text: "You always bring something interesting to the table.", img: get_img(), custom: true,
              options: [
                { text: "Like what?", func: function(){ increase_friendly(1,'sailor'); say("That’s for me to know."); } },
                { text: "Maybe this cassette album counts?", func: function(){ increase_emotion(1,'sailor'); say("cassette album!? You’re speaking my love language."); } }
              ]
            }
        ],
        [ // emotion 3
            { text: "I kinda missed talking to you.", img: 2, custom: true,
              options: [
                { text: "Same here.", func: function(){ increase_emotion(1,'sailor'); say("Then we should hang out more."); } },
                { text: "That’s unexpected from you.", func: function(){ increase_friendly(1,'sailor'); say("I surprise myself sometimes."); } }
              ]
            }
        ],
        [ // emotion 4
            { text: "You’ve got this calming energy about you.", img: 3, custom: true,
              options: [
                { text: "Glad you feel that way.", func: function(){ increase_emotion(1,'sailor'); say("It’s nice, really."); } },
                { text: "You’re pretty chill yourself.", func: function(){ increase_friendly(1,'sailor'); say("Takes one to know one."); } }
              ]
            }
        ],
    ],

    [ // friendliness 2 - casual & playful
        [ // emotion 0
            { text: "You again! Either fate’s being funny or you just like me.", img: 1, custom: true,
              options: [
                { text: "Bit of both.", func: function(){ increase_emotion(1,'sailor'); say("Oh really?"); } },
                { text: "It’s just coincidence.", func: function(){ say("Uh-huh, sure."); } }
              ]
            }
        ],
        [ // emotion 1
            { text: "If I win next time, you owe me a drink.", img: 2, custom: true,
              options: [
                { text: "Deal.", func: function(){ increase_emotion(1,'sailor'); say("Hehe, can’t wait."); } },
                { text: "I never lose.", func: function(){ increase_friendly(1,'sailor'); say("Cocky. I like that."); } }
              ]
            }
        ],
        [ // emotion 2
            { text: "You know, I don’t mind you hanging around.", img: 3, custom: true,
              options: [
                { text: "That’s practically a compliment!", func: function(){ increase_friendly(1,'sailor'); say("Don’t push your luck."); } },
                { text: "Maybe I’ll earn a real one soon.", func: function(){ increase_emotion(1,'sailor'); say("Keep trying, it’s working."); } }
              ]
            }
        ],
        [ // emotion 3
            { text: "I was waiting to see you today.", img: 2, custom: true,
              options: [
                { text: "Aw, that’s sweet.", func: function(){ increase_emotion(1,'sailor'); say("You bring out that side of me."); } },
                { text: "You must be bored.", func: function(){ increase_friendly(1,'sailor'); say("Only until now."); } }
              ]
            }
        ],
        [ // emotion 4
            { text: "If I said I liked you, what would you do?", img: 3, custom: true,
              options: [
                { text: "Say it again.", func: function(){ increase_emotion(1,'sailor'); say("You’re impossible."); } },
                { text: "I’d probably blush.", func: function(){ increase_friendly(1,'sailor'); say("Ha, cute."); } }
              ]
            }
        ],
    ],

    [ // friendliness 3 - open, teasing
        [ // emotion 0
            { text: "You’re a tough one to read sometimes.", img: 1, custom: true,
              options: [
                { text: "Maybe I like mystery.", func: function(){ increase_friendly(1,'sailor'); say("You and me both."); } },
                { text: "Want me to be clearer?", func: function(){ increase_emotion(1,'sailor'); say("Now that’s tempting."); } }
              ]
            }
        ],
        [ // emotion 1
            { text: "I made something for you… but don’t laugh.", img: 2, custom: true,
              options: [
                { text: "Is that a cassette album?", func: function(){ increase_emotion(1,'sailor'); say("Okay fine, I tried baking. Don’t make it weird."); } },
                { text: "I’d never laugh.", func: function(){ increase_friendly(1,'sailor'); say("You better not."); } }
              ]
            }
        ],
        [ // emotion 2
            { text: "I talk about you sometimes. Good things, I promise.", img: 3, custom: true,
              options: [
                { text: "You do?", func: function(){ increase_emotion(1,'sailor'); say("I said good things, didn’t I?"); } },
                { text: "Wow, I’m flattered.", func: function(){ increase_friendly(1,'sailor'); say("You should be."); } }
              ]
            }
        ],
        [ // emotion 3
            { text: "I like this vibe between us… easy, comfortable.", img: 3, custom: true,
              options: [
                { text: "It’s nice.", func: function(){ increase_emotion(1,'sailor'); say("Yeah, it really is."); } },
                { text: "Don’t jinx it.", func: function(){ say("Haha, noted."); } }
              ]
            }
        ],
        [ // emotion 4
            { text: "You always make my day brighter.", img: 3, custom: true,
              options: [
                { text: "You too, sailor.", func: function(){ increase_emotion(1,'sailor'); say("You’re going to make me blush."); } },
                { text: "Keep talking like that and I might believe you.", func: function(){ increase_friendly(1,'sailor'); say("I’ll make sure you do."); } }
              ]
            }
        ],
    ],

    [ // friendliness 4 - intimate, romantic
        [ // emotion 0
            { text: "You know me better than most people now.", img: 2, custom: true,
              options: [
                { text: "Guess I earned your trust.", func: function(){ increase_emotion(1,'sailor'); say("Yeah… you really did."); } },
                { text: "That’s kinda nice.", func: function(){ increase_friendly(1,'sailor'); say("Don’t ruin the moment."); } }
              ]
            }
        ],
        [ // emotion 1
            { text: "Sometimes I wonder what we really are.", img: 3, custom: true,
              options: [
                { text: "We’re something special.", func: function(){ increase_emotion(2); say("Then I don’t need to wonder anymore."); } },
                { text: "Why not just friends?", func: function(){ increase_emotion(-1); say("If that’s what you want..."); } }
              ]
            }
        ],
        [ // emotion 2
            { text: "You look good today. Like, really good.", img: 3, custom: true,
              options: [
                { text: "Are you flirting?", func: function(){ increase_emotion(1,'sailor'); say("If I am, is it working?"); } },
                { text: "Stop, I’ll start blushing.", func: function(){ increase_friendly(1,'sailor'); say("Mission accomplished."); } }
              ]
            }
        ],
        [ // emotion 3
            { text: "It’s strange… I feel safe around you.", img: 2, custom: true,
              options: [
                { text: "I’d never hurt you.", func: function(){ increase_emotion(2); say("I know. That’s why it’s easy to care."); } },
                { text: "You’re soft today.", func: function(){ increase_friendly(1,'sailor'); say("Don’t get used to it."); } }
              ]
            }
        ],
        [ // emotion 4
            { text: "If I said I love you… would you believe me?", img: 4, custom: true,
              options: [
                { text: "I already do.", func: function(){ increase_emotion(2); say("Then maybe this isn’t just a game anymore."); } },
                { text: "You’re serious?", func: function(){ increase_friendly(1,'sailor'); say("Dead serious."); } }
              ]
            }
        ],
    ]
];
