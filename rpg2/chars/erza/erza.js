let erza = {
    name:'erza',
    images:['chars/erza/erza.png','chars/erza/erza1.png','chars/erza/erza2.png'],
    friendly:0,
    emotion:0,
    source:"chars/erza/erza.js",
    battle_img:'chars/erza/erza.png',
    pong_sprite:'chars/erza/erza128.png',
    moveset:['Replenish','Heal','Strike','Blast Cannon','Power up','Force Field'],
    desired_items:['kitchen knife','z fighter','medal'],
    level:7
}
if(!sessionStorage.getItem('erza')){
    sessionStorage.setItem('erza',JSON.stringify(erza))
}
erza = JSON.parse(sessionStorage.getItem('erza'))
    
const erza_custom_interactions = [
    //loosing battle
    {text:'game! that was fun',img:0,func:function(){increase_friendly(1,'erza')}},
    //winning battle
    {text:'haha i beat you',img:0,func:function(){increase_emotion(1,'erza')}},
    //loosing pong
    {text:'game! that was fun',img:0,func:function(){increase_friendly(1,'erza')}},
    //winning pong
    {text:'better luck next time bucko ',img:0,func:function(){return}},
    //desired item 1
    {text:'oh my thats a limited edition, definetly gonna make cooking easier. hers a treat as compensation',img:0,func:function(){increase_emotion(1,'erza');give_item('white cake',50)}},
    //desired item 1
    {text:'is that an actual z fighter? oh my god thank you',img:0,func:function(){increase_emotion(1,'erza');give_item('cheese cake',40)}},
    //desired item 2
    {text:'theres no way you managed to get your hands on this.',img:0,func:function(){increase_friendly(1,'erza');increase_emotion(1,'erza')}},
]
function get_img(){
    let num = Math.floor(Math.random() *erza.images.length)
    return num
}


const erza_conv =[
     [ // friendliness 0 - formal, distant
        [ // emotion 0 - neutral
            { text: `hello there ${data.name}, nice to meet you. what brings you here`, img: get_img(), custom: true,
              options: [
                { text: "I just wanted to get to know you better.", func: function(){ say("is that so. you can have my number, ill keep in touch."); increase_emotion(1,'erza') } },
                { text: "i want a match.", func: function(){ say("you sweats are always challenging anyone, i like the passion though."); increase_friendly(1,'erza') } }
              ]
            },
            { text: "are you just gonna stand there or say something.", img: get_img(), custom: true,
              options: [
                { text: "ive seen you in several cooking competitions. youre pretty hard working.", func: function(){ say("wow, people rarely notice that. id much prefer some one like you to be sticking around more often,lets exchange contacts"); increase_friendly(1,'erza'); increase_emotion(1,'erza');add_contact('erza') } },
                { text: "nevermind.", func: function(){ say("well scram."); } }
              ]
            }
        ],
        [ // emotion 1 - curious
            { text: `${data.name}, are you a dog person or a cat person`, img: get_img(), custom: true,
              options: [
                { text: "cat", func: function(){ say("oh thats cool, cats are cool. i guess."); increase_friendly(1,'erza') } },
                { text: "dog.", func: function(){ say("me too, hehe"); increase_emotion(1,'erza') } }
              ]
            },
            { text: "good day. whats poppin?", img: get_img(), custom: true,
              options: [
                { text: "what kind of moveset do you use.", func: function(){ say("i use the tried and true balanced moveset.same as my brothers'."); increase_friendly(1,'erza'); increase_emotion(1,'erza'); } },
                { text: "nothing much.", func: function(){ say("ive seen brickwalls with more enthusiasm than that response."); } }
              ]
            },
            { text: "so what are your plans for today?", img: get_img(), custom: true,
              options: [
                { text: "z battle all day.", func: function(){ say("sweaty as always huh. speaking of which ive still got my brothers old z fighter. all it does is collect dust here but you could probably find a use for it"); increase_friendly(1,'erza'); increase_emotion(-1,'erza');give_item('old z fighter',100) } },
                { text: "not your concern.", func: function(){ say("meh, fair enough."); increase_emotion(-1,'erza'); } },
              ]
            }
        ],
        [ // emotion 2 - emotional bond
            { text: "i baked you a cake today, want some?", img: get_img(), custom: true,
              options: [
                { text: "yes.", func: function(){ say("glad you like it. heres another"); increase_friendly(1,'erza');give_item('white cake',50) } },
                { text: "no.", func: function(){ say("thats fine. not like i dedicated too much time to perfecting it or anything."); } }
              ]
            },
            { text: "i was wondering. are my interests all that appeal to you.", img: get_img(), custom: true,
              options: [
                { text: "yes. i like your talent.", func: function(){ say("oh, well thanks."); increase_friendly(1,'erza'); increase_emotion(-1,'erza'); } },
                { text: "your assets are nice to look at as well.", func: function(){ say("great. did you learn that form alpha male influencers."); increase_emotion(-1,'erza'); } },
              ]
            }
        ],
    ],

    [ // friendliness 1 - mild warmth
        [ // emotion 0
             { text: "whats on your mind now.", img: get_img(), custom: true,
              options: [
                { text: "strong opponents.", func: function(){ say("haha! youre quite the character you know."); increase_friendly(1,'erza') } },
                { text: "been thinking of a present to get you.what do you like.", func: function(){ say("theres this legendary kitchen knife in the shop. im talking 12 inch, stainless steel and a hairs' breadth sharpness."); increase_emotion(1,'erza') } }
              ]
            },
            { text: "I was thinking why do you enjoy z battling so much?", img: get_img(), custom: true,
              options: [
                { text: "i want to be able to provide for my family.", func: function(){ say("i can relate with that. speaking of, heres a moveset i wanna share with you. im motivated to help in your amitions"); increase_friendly(1,'erza'); increase_emotion(1,'erza');give_moves('Replenish','Shield Strike','Power Up') } },
                { text: "money and fame ofcourse.", func: function(){ say("well, at least your honest about it."); } },
                { text: "thats quite the open ended question. are you taking interest in me?.", func: function(){ say("err, well... dont dodge the question"); increase_friendly(-1,'erza'); increase_emotion(1,'erza'); } },
              ]
            },
        ],
        [ // emotion 1
            { text: "being an eldest sibling can be a pain you know, all the back breaking work and responsibilities", img: get_img(), custom: true,
              options: [
                { text: "yeah i feel you.", func: function(){ say("i need a break."); increase_friendly(1,'erza') } },
                { text: "you still manage to move foward. thats commendable enough.", func: function(){ say("such a fine way with words."); increase_emotion(1,'erza') } }
              ]
            },
            { text: "how was the cake i baked you last time", img: get_img(), custom: true,
              options: [
                { text: "reminds me of how mom used to make it.", func: function(){ say("...come on, it couldnt have been that good."); increase_friendly(1,'erza'); increase_emotion(1,'erza'); } },
                { text: "couldve used a little more salt.", func: function(){ say("m-my bad."); } }
              ]
            },
            { text: "i know a judgemental look when i see one, what have you observed?", img: get_img(), custom: true,
              options: [
                { text: "You could loose some weight.", func: function(){ say("excuse me?"); increase_friendly(-1,'erza'); increase_emotion(-1,'erza'); } },
                { text: "you reminded me of another girl i was thinking of.", func: function(){ say("what exactly do you mean by that?"); increase_emotion(-1,'erza'); } },
              ]
            },
            { text: "I had a thought... what if we combined our Force Fields? The synergy could be incredible!", img: get_img(), custom: true,
              options: [
                { text: "That's a brilliant idea! Let's try it!", func: function(){ say("Your enthusiasm is... refreshing."); increase_friendly(1,'erza'); increase_emotion(-1,'erza'); } },
                { text: "Mixing energies is too dangerous.", func: function(){ say("You're right. I got carried away."); increase_friendly(-1,'erza'); } },
                { text: "Your creativity in battle is inspiring.", func: function(){ say("Coming from you, that means something."); increase_friendly(-1,'erza'); increase_emotion(1,'erza'); } }
              ]
            }
        ],
        [ // emotion 2
            { text: "whats on your mind.", img: get_img(), custom: true,
              options: [
                { text: "whats your favourite move.", func: function(){ say("i dunno, i have a favourite set tho, check it out."); increase_friendly(1,'erza');give_moves('Angel Guard','Blast Cannon','fusion xyz','Repair') } },
                { text: "nothing much.", func: function(){ say("welp."); } }
              ]
            },
            { text: "who're you picking for your next team match", img: get_img(), custom: true,
              options: [
                { text: "blanche.", func: function(){ say("well good for you, not like i was expecting to go with you or anything."); increase_friendly(-1,'erza'); increase_emotion(-1,'erza'); } },
                { text: "no one.", func: function(){ say("a lone soldier i see."); increase_emotion(-1,'erza'); } },
              ]
            },
            { text: "youre the first person i wanna share this new experimental recipe with, aside from my brother of course, what do you say", img: get_img(), custom: true,
              options: [
                { text: "i came here for your food anyway, lets try it!", func: function(){ say("yaya here you go."); increase_friendly(1,'erza'); increase_emotion(-1,'erza');give_item('short cake',20) } },
                { text: "experimental? ill pass.", func: function(){ say("bah, alright."); increase_friendly(-1,'erza'); } },
              ]
            }
        ],
    ],
    [ // friendliness 2 - close friends
        [ // emotion 0
             { text: "have fun on your next tournament.", img: get_img(), custom: true,
              options: [
                { text: "i play to win.", func: function(){ say("...uhuh."); increase_friendly(-1,'erza') } },
                { text: "you should come watch", func: function(){ say("not a bad idea, ill be sure to be around."); increase_emotion(1,'erza') } }
              ]
            },
            { text: "I made too much food. Do you... want some? It's not like I made it for you specifically.", img: get_img(), custom: true,
              options: [
                { text: "Thanks! You're a better cook than I expected.", func: function(){ say("What's that supposed to mean?"); increase_friendly(-1,'erza'); increase_emotion(1,'erza'); } },
                { text: "I already ate, but thanks for offering.", func: function(){ say("Fine. More for me then."); } },
              ]
            },
        ],
        [ // emotion 1
            { text: "have you seen me battle before? you think my battle style compliments yours in a team match?", img: get_img(), custom: true,
              options: [
                { text: "were like oil and water.", func: function(){ say("h-hey you dont have to say it like that"); increase_friendly(-1,'erza'); increase_emotion(1,'erza'); } },
                { text: "i dunno, perhaps.", func: function(){ say("indesisive as always."); } },
                { text: "we're a match made in heaven.", func: function(){ say("Stop that. You'll make me blush."); increase_emotion(1,'erza') } }
              ]
            },
            { text: "yknow, we've made quite the connection. its almost as if youre after something.", img: get_img(), custom: true,
              options: [
                { text: "you dont trust me that much? you jerk.", func: function(){ say("You're right. that was pretty stupid of me."); increase_friendly(-1,'erza'); increase_emotion(-1,'erza'); } },
                { text: "what are you talking about. we're friends because thats what friendship is.", func: function(){ say("I suppose you're right about that.what was i thinking"); increase_emotion(-1,'erza'); } },
              ]
            },
            { text: "my favourite location on campus is definetly the cafe, especially outside the cafe where tables are set under umbrellas..", img: get_img(), custom: true,
              options: [
                { text: "makes sense for a glutton.", func: function(){ say("what?"); increase_friendly(-1,'erza'); } },
                { text: "thanks for giving me the idea for a good date spot.", func: function(){ say("what do you mean by that."); increase_friendly(-1,'erza'); increase_emotion(1,'erza'); } }
              ]
            }
        ],
        [ // emotion 2
            { text: "are you free today? wanna hangout at my place?", img: get_img(), custom: true,
              options: [
                { text: "for what?", func: function(){ say("oh you know, just hang around. i guess"); increase_friendly(-1,'erza'); } },
                { text: "sure.", func: function(){ say("sweet.");give_item('love bracelet',220) } }
              ]
            },
            { text: "hey, so i wanted to know. after we graduate, will you still come looking for me?", img: get_img(), custom: true,
              options: [
                { text: "i only look to the future, whatever happens here will stay in the past", func: function(){ say("are you really gonna let everything go, just like that"); increase_friendly(-1,'erza'); increase_emotion(-1,'erza'); } },
                { text: "yes, my world revolves around you", func: function(){ say("wow, i wasnt expecting that from you"); increase_emotion(-1,'erza'); } },
                { text: "ive got my own path to follow, but ill always keep in touch.", func: function(){ say("i had the same idea too. ill give you this charm, as a promise to see each other again"); give_item('heart stone',1000); } },
              ]
            },
        ],
    ],
]



