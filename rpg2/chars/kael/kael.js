
let kael = {
    name:'kael',
    images:['chars/kael/kael1.png','chars/kael/kael2.png','chars/kael/kael3.png','chars/kael/kael4.png'],
    friendly:0,
    emotion:0,
    source:"chars/kael/kael.js",
    battle_img:'chars/kael/kael1.png',
    pong_sprite:'game assets/player2.png',
    moveset:['Blast Cannon'],//'Shadow Strike','Poison Dart','Smoke Bomb','Assassinate','Stealth','Counter'
    desired_items:['obsidian dagger','nightshade','shadow cloak'],
    level:6
}
if(!sessionStorage.getItem('kael')){
    sessionStorage.setItem('kael',JSON.stringify(kael))
}
kael = JSON.parse(sessionStorage.getItem('kael'))
    
const kael_custom_interactions = [
    //loosing battle
    {text:'Your form is sloppy. Train more.',img:0,func:function(){increase_friendly(1,'kael')}},
    //winning battle
    {text:'Predictable. You need better tactics.',img:0,func:function(){increase_emotion(1,'kael')}},
    //loosing pong
    {text:'Hmph. Luck was on your side.',img:0,func:function(){increase_friendly(1,'kael')}},
    //winning pong
    {text:'Focus. Your mind wanders too much.',img:0,func:function(){return}},
    //desired item 1
    {text:'An obsidian dagger... flawless craftsmanship. Take this in return.',img:0,func:function(){increase_emotion(1,'kael');give_item('shadow essence',75)}},
    //desired item 2
    {text:'Nightshade? Rare. Useful for my... experiments.',img:0,func:function(){increase_emotion(1,'kael');give_item('antidote',60)}},
    //desired item 3
    {text:'A shadow cloak. You shouldn\'t have. This is... appreciated.',img:0,func:function(){increase_friendly(1,'kael');increase_emotion(1,'kael')}},
]
function get_img(){
    let num = Math.floor(Math.random() *kael.images.length)
    return num
}


const kael_conv =[
     [ // friendliness 0 - cold, analytical
        [ // emotion 0 - neutral
            { text: `State your business, ${data.name}. I don't have time for idle chatter.`, img: get_img(), custom: true,
              options: [
                { text: "I'm assessing potential allies.", func: function(){ say("Practical. I respect that. Don't waste my time."); increase_emotion(1,'kael') } },
                { text: "I challenge you to a duel.", func: function(){ say("Bold. Let's see if your skills match your confidence."); increase_friendly(1,'kael') } }
              ]
            },
            { text: "Your presence is noted. Speak or leave.", img: get_img(), custom: true,
              options: [
                { text: "I've seen you in the training grounds. Your technique is impressive.", func: function(){ say("Observation skills. Good. Few notice the details. We might work well together."); increase_friendly(1,'kael'); increase_emotion(1,'kael');add_contact('kael') } },
                { text: "Nevermind.", func: function(){ say("As expected."); } }
              ]
            }
        ],
        [ // emotion 1 - intrigued
            { text: `${data.name}, what's your opinion on subterfuge versus direct confrontation?`, img: get_img(), custom: true,
              options: [
                { text: "Stealth and strategy win wars.", func: function(){ say("A sensible answer. Perhaps you're not a complete fool."); increase_friendly(1,'kael') } },
                { text: "Direct force gets results faster.", func: function(){ say("Brute force has its place... but subtlety endures."); increase_emotion(1,'kael') } }
              ]
            },
            { text: "Your movements are inefficient. You waste energy with unnecessary motions.", img: get_img(), custom: true,
              options: [
                { text: "Can you show me a better form?", func: function(){ say("Observation is the first lesson. Watch closely."); increase_friendly(1,'kael'); increase_emotion(1,'kael'); } },
                { text: "I get the job done.", func: function(){ say("Mediocrity is a slow death."); } }
              ]
            },
            { text: "What drives you to pursue strength?", img: get_img(), custom: true,
              options: [
                { text: "To protect those who can't protect themselves.", func: function(){ say("Noble... but sentiment makes you vulnerable. Here, this might help you survive your idealism."); increase_friendly(1,'kael'); increase_emotion(-1,'kael');give_item('concealed blade',120) } },
                { text: "Power is its own reward.", func: function(){ say("At least you're honest about your ambitions."); increase_emotion(-1,'kael'); } },
              ]
            }
        ],
        [ // emotion 2 - respect
            { text: "I've been analyzing your combat data. Your reaction time is above average.", img: get_img(), custom: true,
              options: [
                { text: "Thank you. That means coming from you.", func: function(){ say("Don't let it go to your head. There's still much to improve."); increase_friendly(1,'kael');give_item('training manual',80) } },
                { text: "I know.", func: function(){ say("Arrogance will be your downfall."); } }
              ]
            },
            { text: "Why do you continue seeking me out?", img: get_img(), custom: true,
              options: [
                { text: "Your perspective is unique. I learn from our interactions.", func: function(){ say("Practical. I can respect that motivation."); increase_friendly(1,'kael'); increase_emotion(-1,'kael'); } },
                { text: "I enjoy the challenge of deciphering you.", func: function(){ say("I'm not a puzzle for your amusement."); increase_emotion(-1,'kael'); } },
              ]
            }
        ],
    ],

    [ // friendliness 1 - cautious ally
        [ // emotion 0
             { text: "Your last mission was sloppy. The third guard nearly spotted you.", img: get_img(), custom: true,
              options: [
                { text: "How did you know about that?", func: function(){ say("I make it my business to know. Your techniques need refinement."); increase_friendly(1,'kael') } },
                { text: "The objective was completed. That's what matters.", func: function(){ say("Survival matters more. Sloppiness gets people killed."); increase_emotion(1,'kael') } }
              ]
            },
            { text: "I've compiled data on your fighting style. There are... patterns.", img: get_img(), custom: true,
              options: [
                { text: "Can you show me where I'm predictable?", func: function(){ say("Finally, someone who values improvement over ego. Study these notes."); increase_friendly(1,'kael'); increase_emotion(1,'kael');give_moves('Counter','Feint','Precision Strike') } },
                { text: "I don't need your analysis.", func: function(){ say("Your loss."); } },
              ]
            },
        ],
        [ // emotion 1
            { text: "The night provides better cover for operations. Daylight makes everyone careless.", img: get_img(), custom: true,
              options: [
                { text: "I prefer working under moonlight too.", func: function(){ say("At least we agree on fundamentals."); increase_friendly(1,'kael') } },
                { text: "True predators hunt whenever opportunity arises.", func: function(){ say("An interesting perspective. Adaptability is indeed valuable."); increase_emotion(1,'kael') } }
              ]
            },
            { text: "That maneuver I showed you last time - have you practiced it?", img: get_img(), custom: true,
              options: [
                { text: "Until I could do it in my sleep.", func: function(){ say("Good. Discipline separates professionals from amateurs."); increase_friendly(1,'kael'); increase_emotion(1,'kael'); } },
                { text: "I've been busy with other things.", func: function(){ say("Then don't waste my time with requests for training."); } }
              ]
            },
            { text: "Trust is a calculated risk. What makes you think I should take that risk with you?", img: get_img(), custom: true,
              options: [
                { text: "My actions should speak for themselves.", func: function(){ say("They do. That's the only reason we're having this conversation."); increase_friendly(1,'kael'); increase_emotion(1,'kael'); } },
                { text: "You shouldn't. Trust no one.", func: function(){ say("Wise advice. I'm surprised you understand that."); increase_emotion(-1,'kael'); } },
              ]
            },
            { text: "I've been developing a new poison formula. The delivery method is... innovative.", img: get_img(), custom: true,
              options: [
                { text: "Fascinating! Tell me more about the chemical properties.", func: function(){ say("Your enthusiasm for toxins is... concerning, but useful."); increase_friendly(1,'kael'); increase_emotion(-1,'kael'); } },
                { text: "I prefer clean methods. No traces.", func: function(){ say("Sometimes the message is in the method."); increase_friendly(-1,'kael'); } },
                { text: "Your dedication to your craft is impressive.", func: function(){ say("It's not dedication. It's necessity."); increase_friendly(-1,'kael'); increase_emotion(1,'kael'); } }
              ]
            }
        ],
        [ // emotion 2
            { text: "There's a vulnerability in the castle's western guard rotation. Interested?", img: get_img(), custom: true,
              options: [
                { text: "What's the plan?", func: function(){ say("Finally, someone who thinks before acting. Here are the details."); increase_friendly(1,'kael');give_moves('Silent Step','Shadow Blend','Garrote') } },
                { text: "Too risky.", func: function(){ say("Then don't complain about missing opportunities."); } }
              ]
            },
            { text: "They're putting together a team for the northern expedition. Will you join?", img: get_img(), custom: true,
              options: [
                { text: "Only if you're leading it.", func: function(){ say("Sentiment has no place in tactical decisions."); increase_friendly(-1,'kael'); increase_emotion(-1,'kael'); } },
                { text: "I work better alone.", func: function(){ say("A solitary path is often the safest."); increase_emotion(-1,'kael'); } },
              ]
            },
            { text: "I've acquired something that might be useful to you. Consider it... professional courtesy.", img: get_img(), custom: true,
              options: [
                { text: "What do you want in return?", func: function(){ say("Always the right question. Let's discuss terms."); increase_friendly(1,'kael'); increase_emotion(-1,'kael');give_item('smoke pellets',45) } },
                { text: "I don't accept gifts.", func: function(){ say("It's not a gift. It's an investment."); increase_friendly(-1,'kael'); } },
              ]
            }
        ],
    ],
    [ // friendliness 2 - trusted partner
        [ // emotion 0
             { text: "The council is watching you closely. Your last operation drew attention.", img: get_img(), custom: true,
              options: [
                { text: "Let them watch. They'll see what I want them to see.", func: function(){ say("Overconfidence is a slow poison."); increase_friendly(-1,'kael') } },
                { text: "What's your assessment of the situation?", func: function(){ say("Calculated, but risky. I'll monitor their movements."); increase_emotion(1,'kael') } }
              ]
            },
            { text: "I've left something in your quarters. Don't ask how I got in.", img: get_img(), custom: true,
              options: [
                { text: "You broke into my room? That's crossing a line.", func: function(){ say("Lines are illusions. Security is reality."); increase_friendly(-1,'kael'); increase_emotion(1,'kael'); } },
                { text: "I'll check it out. Thanks for the... delivery.", func: function(){ say("Efficiency above protocol."); } },
              ]
            },
        ],
        [ // emotion 1
            { text: "Our methods complement each other. An efficient partnership.", img: get_img(), custom: true,
              options: [
                { text: "As long as you stop going through my things.", func: function(){ say("Privacy is a luxury we can't afford."); increase_friendly(-1,'kael'); increase_emotion(1,'kael'); } },
                { text: "We get results. That's what matters.", func: function(){ say("Finally, someone who understands priorities."); } },
                { text: "I've learned to trust your judgment.", func: function(){ say("A dangerous admission. But noted."); increase_emotion(1,'kael') } }
              ]
            },
            { text: "There are rumors about us working together. This could be problematic.", img: get_img(), custom: true,
              options: [
                { text: "Let them talk. I don't care about gossip.", func: function(){ say("Gossip gets people killed in our line of work."); increase_friendly(-1,'kael'); increase_emotion(-1,'kael'); } },
                { text: "We should maintain distance for a while.", func: function(){ say("A tactical retreat. Agreed."); increase_emotion(-1,'kael'); } },
              ]
            },
            { text: "The old clocktower provides the best vantage point of the city. Few know about the hidden access.", img: get_img(), custom: true,
              options: [
                { text: "Good to know you're still spying on everyone.", func: function(){ say("Information is survival. Don't pretend otherwise."); increase_friendly(-1,'kael'); } },
                { text: "We should meet there to discuss sensitive matters.", func: function(){ say("I was already using it for that purpose."); increase_friendly(-1,'kael'); increase_emotion(1,'kael'); } }
              ]
            }
        ],
        [ // emotion 2
            { text: "I'm pursuing a lead on the Shadow Guild. Interested in accompanying me?", img: get_img(), custom: true,
              options: [
                { text: "What's the split?", func: function(){ say("Always business with you. Fine. Sixty-forty."); increase_friendly(-1,'kael'); } },
                { text: "I've got your back.", func: function(){ say("...I know.");give_item('shadow amulet',350) } }
              ]
            },
            { text: "When this is all over, what then? What comes after the shadows?", img: get_img(), custom: true,
              options: [
                { text: "There is no 'after' for people like us.", func: function(){ say("The truth isn't always pleasant."); increase_friendly(-1,'kael'); increase_emotion(-1,'kael'); } },
                { text: "We disappear together, start fresh somewhere new.", func: function(){ say("Sentiment is a luxury we can't afford."); increase_emotion(-1,'kael'); } },
                { text: "We adapt. Find new shadows to inhabit.", func: function(){ say("The only sensible answer. Take this - it might help in whatever comes next."); give_item('phantom shard',1200); } },
              ]
            },
        ],
    ],
]
