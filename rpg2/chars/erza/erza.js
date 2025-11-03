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
function add_contact(char){
  let data = JSON.parse(sessionStorage.getItem('rpg_data'))
  if(!data.contacts.some(user => user.name == char)){
      data.contacts.push({name:char,messages:[]})
      sessionStorage.setItem('rpg_data',JSON.stringify(data))
  };
}
function give_moves(arr){
    let data = JSON.parse(sessionStorage.getItem('rpg_data'));
    arr.array.forEach(element => {
       data.availablemoves.push(element);
    });
    sessionStorage.setItem('rpg_data',JSON.stringify(data));
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
            { text: "I almost called you by my former partner's name today. Sorry if that's weird.", img: get_img(), custom: true,
              options: [
                { text: "I'm not here to replace anyone.", func: function(){ say("I know. That's what makes this different."); increase_friendly(-1,'erza'); increase_emotion(-1,'erza'); } },
                { text: "The past has a way of echoing in the present.", func: function(){ say("You understand better than most."); increase_emotion(-1,'erza'); } },
              ]
            },
            { text: "You know, you're the first person I've wanted to celebrate my birthday with in years.", img: get_img(), custom: true,
              options: [
                { text: "I'm honored. We should do something special!", func: function(){ say("Don't make a big deal out of it."); increase_friendly(1,'erza'); increase_emotion(-1,'erza'); } },
                { text: "Don't get too sentimental.", func: function(){ say("Right. Back to business."); increase_friendly(-1,'erza'); } },
              ]
            }
        ],
    ],
    [ // friendliness 2 - close friends
        [ // emotion 0
             { text: "You're late for training. I was starting to worry... not that I was waiting or anything.", img: get_img(), custom: true,
              options: [
                { text: "Sorry, I got distracted. It won't happen again.", func: function(){ say("See that it doesn't. I hate waiting."); increase_friendly(-1,'erza') } },
                { text: "Were you actually concerned about me?", func: function(){ say("Don't let it go to your head. I just value punctuality."); increase_emotion(1,'erza') } }
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
            { text: "I had an idea for a new combo move! It uses both our special abilities! What do you think?", img: get_img(), custom: true,
              options: [
                { text: "Let's test it right now! I trust your judgment completely.", func: function(){ say("That much trust could be dangerous... but let's try!"); increase_friendly(-1,'erza'); increase_emotion(1,'erza'); } },
                { text: "We should run simulations first.", func: function(){ say("Always the cautious one. Fine, let's be smart about this."); } },
                { text: "Your tactical mind never ceases to amaze me.", func: function(){ say("Stop that. You'll make me blush."); increase_emotion(1,'erza') } }
              ]
            },
            { text: "Sometimes I wonder what would have happened if we'd met before... everything.", img: get_img(), custom: true,
              options: [
                { text: "The past can't be changed, only learned from.", func: function(){ say("You're right. What matters is now."); increase_friendly(-1,'erza'); increase_emotion(-1,'erza'); } },
                { text: "Some questions don't have answers.", func: function(){ say("I suppose you're right about that."); increase_emotion(-1,'erza'); } },
              ]
            },
            { text: "I want to show you my favorite spot in the city. Few people know about it.", img: get_img(), custom: true,
              options: [
                { text: "I'd feel privileged to see it.", func: function(){ say("Don't make it weird. It's just a place."); increase_friendly(-1,'erza'); } },
                { text: "Are you sure? I know you value your privacy.", func: function(){ say("I wouldn't offer if I wasn't sure."); increase_friendly(-1,'erza'); increase_emotion(1,'erza'); } }
              ]
            }
        ],
        [ // emotion 2
            { text: "I had that nightmare again... the one where I lose everyone. Would you... stay with me for a while?", img: get_img(), custom: true,
              options: [
                { text: "Of course. You don't have to face things alone.", func: function(){ say("Thank you. I... appreciate this."); increase_friendly(-1,'erza'); } },
                { text: "I'm here, but you're stronger than your fears.", func: function(){ say("Sometimes strength isn't enough."); } }
              ]
            },
            { text: "I never thought I'd care about someone again after what happened. You've... changed things for me.", img: get_img(), custom: true,
              options: [
                { text: "People change, and that's okay.", func: function(){ say("You make it sound so simple."); increase_friendly(-1,'erza'); increase_emotion(-1,'erza'); } },
                { text: "I'm glad I could be here for you.", func: function(){ say("Me too. More than you know."); increase_emotion(-1,'erza'); } },
              ]
            },
        ],
    ],
]



