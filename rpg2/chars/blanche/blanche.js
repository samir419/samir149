let blanche = {
    name:'blanche',
    images:['chars/blanche/1.png','chars/blanche/2.png','chars/blanche/3.png'],
    friendly:0,
    emotion:0,
    source:'chars/blanche/blanche.js',
    battle_img:'chars/blanche/naomi cat.png',
    pong_sprite:'chars/blanche/blanche128.png',
    moveset:['Replenish','Repair','Strike','Angel Guard','fusion xyz','Force Field'],
    desired_items:['loli pop','white cake','gundam figure'],
    level:3
}
if(!sessionStorage.getItem('blanche')){
    sessionStorage.setItem('blanche',JSON.stringify(blanche))
}
blanche = JSON.parse(sessionStorage.getItem('blanche'))
const player = JSON.parse(sessionStorage.getItem('rpg data'))
const blanche_custom_interactions = [
    //loosing battle
    {text:'I lost? What a bummer... I need to train more.',img:0,func:function(){increase_friendly(-1,'blanche')}},
    //winning battle
    {text:'Haha! I beat you! My strategies are unbeatable!',img:0,func:function(){increase_emotion(-1,'blanche')}},
    //loosing pong
    {text:'That was such a great match, lets do it again sometime!',img:0,func:function(){increase_friendly(1,'blanche')}},
    //winning pong
    {text:'Woohoo! I told you I was the best at this!',img:0,func:function(){return}},
    //desired item 1
    {text:'oooh thanks. heres a lil somethin for you too',img:0,func:function(){increase_friendly(1,'blanche');give_item('kitchen knife',10)}},
    //desired item 2
    {text:'Wow! white cake! you really know my sweet tooth. heres some compensation',img:0,func:function(){increase_emotion(1,'blanche');give_item('soda',5)}},
    //desired item 3
    {text:'A gundam figure? Is it my birthday today? You really know how to make me smile!',img:0,func:function(){increase_friendly(1,'blanche');increase_emotion(1,'blanche')}},
]


function get_img(){
    let num = Math.floor(Math.random() *blanche.images.length)
    return num
}

const blanche_conv =[
     [ // friendliness 0 - formal, distant
        [ // emotion 0 - neutral
            { text: "I don't usually talk to strangers, but since we're teammates... What do you want?", img: get_img(), custom: true,
              options: [
                { text: "I just wanted to get to know you better.", func: function(){ say("That's... unexpected. Most people don't bother."); increase_friendly(1,'blanche') } },
                { text: "Your battle skills are impressive.", func: function(){ say("Flattery won't get you anywhere, but... thanks."); increase_emotion(1,'blanche') } }
              ]
            },
            { text: "We should focus on our mission. Personal connections can be... distracting.", img: get_img(), custom: true,
              options: [
                { text: "Even warriors need friends sometimes.", func: function(){ say("You're naive to think that way."); increase_friendly(1,'blanche'); increase_emotion(1,'blanche'); } },
                { text: "You're right, let's stay professional.", func: function(){ say("Good. We understand each other."); } }
              ]
            }
        ],
        [ // emotion 1 - curious
            { text: "You fight differently than I expected. What's your background?", img: get_img(), custom: true,
              options: [
                { text: "I've had some unusual training. Want to hear about it?", func: function(){ say("I'm listening... but make it quick."); increase_friendly(1,'blanche') } },
                { text: "I could ask you the same question.", func: function(){ say("Touché. Maybe another time."); increase_emotion(1,'blanche') } }
              ]
            },
            { text: "I notice you use Angel Guard too. Did someone teach you, or did you learn on your own?", img: get_img(), custom: true,
              options: [
                { text: "I had a good teacher, like you might someday.", func: function(){ say("I don't need a teacher. I work better alone."); increase_friendly(1,'blanche'); increase_emotion(1,'blanche'); } },
                { text: "That's personal. Let's change the subject.", func: function(){ say("Fine. Keep your secrets."); } }
              ]
            },
            { text: "Sometimes I wonder why we're really fighting. Do you ever question our missions?", img: get_img(), custom: true,
              options: [
                { text: "I trust our cause completely.", func: function(){ say("Blind faith can be dangerous."); increase_friendly(1,'blanche'); increase_emotion(-1,'blanche'); } },
                { text: "Those thoughts are dangerous. Don't dwell on them.", func: function(){ say("You sound like my old commander."); increase_emotion(-1,'blanche'); } },
              ]
            }
        ],
        [ // emotion 2 - emotional bond
            { text: "I had a nightmare last night... about losing someone important. Sorry, I shouldn't burden you.", img: get_img(), custom: true,
              options: [
                { text: "You can talk to me about anything.", func: function(){ say("That's... kind of you. Maybe another time."); increase_friendly(1,'blanche') } },
                { text: "We all have bad dreams. Let's focus on training.", func: function(){ say("Right. Training is simpler than feelings."); } }
              ]
            },
            { text: "I used to have a partner who loved gundam figures... before everything happened.", img: get_img(), custom: true,
              options: [
                { text: "The past should stay in the past.", func: function(){ say("Easy to say when your past isn't haunting you."); increase_friendly(1,'blanche'); increase_emotion(-1,'blanche'); } },
                { text: "Some memories are too painful to share.", func: function(){ say("You understand more than I thought."); increase_emotion(-1,'blanche'); } },
              ]
            }
        ],
    ],

    [ // friendliness 1 - mild warmth
        [ // emotion 0
             { text: "You're not as annoying as I first thought. Still, don't get in my way during battles.", img: get_img(), custom: true,
              options: [
                { text: "I've got your back, don't worry.", func: function(){ say("Just don't make me regret trusting you."); increase_friendly(1,'blanche') } },
                { text: "Your Fusion XYZ move is incredible to watch.", func: function(){ say("It took years to master. Glad someone appreciates it."); increase_emotion(1,'blanche') } }
              ]
            },
            { text: "I saw you sharing your rations with that stray cat. Why would you do that?", img: get_img(), custom: true,
              options: [
                { text: "Everyone deserves kindness, even small creatures.", func: function(){ say("That's... a nice way to see the world."); increase_friendly(1,'blanche'); increase_emotion(1,'blanche'); } },
                { text: "It was nothing special.", func: function(){ say("Modest too. Interesting."); } },
                { text: "Unlike some people, cats don't judge you.", func: function(){ say("Ouch. Was that directed at me?"); increase_friendly(-1,'blanche'); increase_emotion(1,'blanche'); } },
              ]
            },
        ],
        [ // emotion 1
            { text: "I've been practicing a new technique. Want to see it after training?", img: get_img(), custom: true,
              options: [
                { text: "I'd love to! You're an amazing fighter.", func: function(){ say("Don't flatter me. Just watch and learn."); increase_friendly(1,'blanche') } },
                { text: "Only if you show me how you channel your energy.", func: function(){ say("Always looking for an advantage, huh? Fine."); increase_emotion(1,'blanche') } }
              ]
            },
            { text: "Remember that white cake you gave me? It reminded me of home. My sister used to bake...", img: get_img(), custom: true,
              options: [
                { text: "Tell me more about your family.", func: function(){ say("Not today. Some memories are still too fresh."); increase_friendly(1,'blanche'); increase_emotion(1,'blanche'); } },
                { text: "We should focus on the present.", func: function(){ say("Right. The past is gone anyway."); } }
              ]
            },
            { text: "Sometimes I feel like you're hiding something from me. Am I wrong to trust you?", img: get_img(), custom: true,
              options: [
                { text: "You should question everyone, including me.", func: function(){ say("At least you're honest about being dishonest."); increase_friendly(-1,'blanche'); increase_emotion(-1,'blanche'); } },
                { text: "Trust is earned, not given.", func: function(){ say("You sound like me when I first started."); increase_emotion(-1,'blanche'); } },
              ]
            },
            { text: "I had a thought... what if we combined our Force Fields? The synergy could be incredible!", img: get_img(), custom: true,
              options: [
                { text: "That's a brilliant idea! Let's try it!", func: function(){ say("Your enthusiasm is... refreshing."); increase_friendly(1,'blanche'); increase_emotion(-1,'blanche'); } },
                { text: "Mixing energies is too dangerous.", func: function(){ say("You're right. I got carried away."); increase_friendly(-1,'blanche'); } },
                { text: "Your creativity in battle is inspiring.", func: function(){ say("Coming from you, that means something."); increase_friendly(-1,'blanche'); increase_emotion(1,'blanche'); } }
              ]
            }
        ],
        [ // emotion 2
            { text: "I had a flashback during meditation today. The good kind, for once.", img: get_img(), custom: true,
              options: [
                { text: "I'm glad you're having happier memories.", func: function(){ say("Me too. It's been a long time."); increase_friendly(1,'blanche') } },
                { text: "Meditation can bring up unexpected things.", func: function(){ say("Tell me about it. My mind is full of surprises."); } }
              ]
            },
            { text: "I almost called you by my former partner's name today. Sorry if that's weird.", img: get_img(), custom: true,
              options: [
                { text: "I'm not here to replace anyone.", func: function(){ say("I know. That's what makes this different."); increase_friendly(-1,'blanche'); increase_emotion(-1,'blanche'); } },
                { text: "The past has a way of echoing in the present.", func: function(){ say("You understand better than most."); increase_emotion(-1,'blanche'); } },
              ]
            },
            { text: "You know, you're the first person I've wanted to celebrate my birthday with in years.", img: get_img(), custom: true,
              options: [
                { text: "I'm honored. We should do something special!", func: function(){ say("Don't make a big deal out of it."); increase_friendly(1,'blanche'); increase_emotion(-1,'blanche'); } },
                { text: "Don't get too sentimental.", func: function(){ say("Right. Back to business."); increase_friendly(-1,'blanche'); } },
              ]
            }
        ],
    ],
    [ // friendliness 2 - close friends
        [ // emotion 0
             { text: "You're late for training. I was starting to worry... not that I was waiting or anything.", img: get_img(), custom: true,
              options: [
                { text: "Sorry, I got distracted. It won't happen again.", func: function(){ say("See that it doesn't. I hate waiting."); increase_friendly(-1,'blanche') } },
                { text: "Were you actually concerned about me?", func: function(){ say("Don't let it go to your head. I just value punctuality."); increase_emotion(1,'blanche') } }
              ]
            },
            { text: "I made too much food. Do you... want some? It's not like I made it for you specifically.", img: get_img(), custom: true,
              options: [
                { text: "Thanks! You're a better cook than I expected.", func: function(){ say("What's that supposed to mean?"); increase_friendly(-1,'blanche'); increase_emotion(1,'blanche'); } },
                { text: "I already ate, but thanks for offering.", func: function(){ say("Fine. More for me then."); } },
              ]
            },
        ],
        [ // emotion 1
            { text: "I had an idea for a new combo move! It uses both our special abilities! What do you think?", img: get_img(), custom: true,
              options: [
                { text: "Let's test it right now! I trust your judgment completely.", func: function(){ say("That much trust could be dangerous... but let's try!"); increase_friendly(-1,'blanche'); increase_emotion(1,'blanche'); } },
                { text: "We should run simulations first.", func: function(){ say("Always the cautious one. Fine, let's be smart about this."); } },
                { text: "Your tactical mind never ceases to amaze me.", func: function(){ say("Stop that. You'll make me blush."); increase_emotion(1,'blanche') } }
              ]
            },
            { text: "Sometimes I wonder what would have happened if we'd met before... everything.", img: get_img(), custom: true,
              options: [
                { text: "The past can't be changed, only learned from.", func: function(){ say("You're right. What matters is now."); increase_friendly(-1,'blanche'); increase_emotion(-1,'blanche'); } },
                { text: "Some questions don't have answers.", func: function(){ say("I suppose you're right about that."); increase_emotion(-1,'blanche'); } },
              ]
            },
            { text: "I want to show you my favorite spot in the city. Few people know about it.", img: get_img(), custom: true,
              options: [
                { text: "I'd feel privileged to see it.", func: function(){ say("Don't make it weird. It's just a place."); increase_friendly(-1,'blanche'); } },
                { text: "Are you sure? I know you value your privacy.", func: function(){ say("I wouldn't offer if I wasn't sure."); increase_friendly(-1,'blanche'); increase_emotion(1,'blanche'); } }
              ]
            }
        ],
        [ // emotion 2
            { text: "I had that nightmare again... the one where I lose everyone. Would you... stay with me for a while?", img: get_img(), custom: true,
              options: [
                { text: "Of course. You don't have to face things alone.", func: function(){ say("Thank you. I... appreciate this."); increase_friendly(-1,'blanche'); } },
                { text: "I'm here, but you're stronger than your fears.", func: function(){ say("Sometimes strength isn't enough."); } }
              ]
            },
            { text: "I never thought I'd care about someone again after what happened. You've... changed things for me.", img: get_img(), custom: true,
              options: [
                { text: "People change, and that's okay.", func: function(){ say("You make it sound so simple."); increase_friendly(-1,'blanche'); increase_emotion(-1,'blanche'); } },
                { text: "I'm glad I could be here for you.", func: function(){ say("Me too. More than you know."); increase_emotion(-1,'blanche'); } },
              ]
            },
        ],
    ],
]
