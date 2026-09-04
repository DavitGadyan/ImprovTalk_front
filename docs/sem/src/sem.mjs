/**
 * One SEM campaign brief per persona.
 *
 * Content is the campaign half of docs/SEM-KEYWORDS.md, restructured so a single
 * page is everything you need to build one campaign: the SMART goals, the
 * keywords, the negatives, the full RSA, and the voice rules that decide whether
 * the ad is about this person or somebody else.
 *
 * Targets are deliberately split. Month one has no performance goal because the
 * account has zero conversion history — a CPA target invented before a baseline
 * exists is a number pretending to be a plan. Month one buys the baseline;
 * month two spends against it.
 */
export const CAMPAIGNS = [
{
  n: '01', slug: 'shy', hue: '#ff2d55',
  campaign: 'IT · Shy', adGroup: 'Freezing',
  person: 'Sam, 24', archetype: 'The one who freezes',
  landing: 'improvtalk.vip/', budget: '20%',
  intent: 'Broadest audience of the five, and the weakest commercial intent. He is not shopping — he is looking for an explanation.',
  smart1: {
    goal: 'Build this campaign’s negative list from real search terms.',
    measure: '≥100 clicks and every search term reviewed; negatives added weekly.',
    why: 'Every later target is guesswork until the wasted queries are known.',
  },
  smart2: {
    goal: 'Establish a cost per testflight_click, then cut it.',
    measure: '20% below the month-one baseline by day 90.',
    why: 'This is the volume campaign; if its CPA does not fall, it does not scale.',
  },
  loyalty: 'Week-4 retention. He stays while the number moves and leaves the moment it feels like homework.',
  phrase: ['"conversation practice app"','"practice talking to people"','"how to not freeze in conversation"','"what to say when your mind goes blank"','"social skills practice app"','"practice conversations with ai"'],
  exact: ['[conversation practice app]','[how to stop freezing in conversations]','[app to practice talking to people]'],
  negatives: 'anxiety medication, social anxiety disorder, panic attacks, support group, quiz, test, am i shy',
  negWhy: 'He is self-conscious, not unwell. Clinical modifiers are the wrong audience and the wrong place to be advertising.',
  headlines: ['Practise talking, in private','Nobody hears you practise','Say it out loud first','Conversation practice app','Practice makes perfect','Try the same line 20 times','Free to start, no card','An AI that talks back','Three minutes a night','Find out what went wrong','Your phone, your room','Practise before it counts','Rehearse the hard bit','Not advice. Reps.','Talk to an AI, not a person'],
  descriptions: ['Talk to an AI on your phone. Nobody hears you. Try as often as you like.','Hold a button and speak. It answers back, then shows you what actually landed.','Free to start, no card. Three minutes is enough to feel the difference.','Practise the conversation before you have it, as many times as you need.'],
  never: 'confidence · charisma · cure · transform · overcome',
},
{
  n: '02', slug: 'language', hue: '#0a84ff',
  campaign: 'IT · Second language', adGroup: 'Speaking practice',
  person: 'Andrés, 29', archetype: 'Fluent on paper',
  landing: 'improvtalk.vip/second-language/', budget: '25%',
  intent: 'Large, well-defined query space, and the one differentiator no competitor matches — three conversation languages.',
  smart1: {
    goal: 'Absorb the beginner and exam-prep queries into negatives.',
    measure: 'Beginner-intent terms below 10% of spend by day 30.',
    why: 'They are the single largest source of waste in this ad group.',
  },
  smart2: {
    goal: 'Prove the language angle converts better than the generic one.',
    measure: 'testflight_click rate above the Shy campaign by day 90.',
    why: 'If it does not, the persona split is not earning its complexity.',
  },
  loyalty: '30-day retention. Falling pause length week on week is the proof he comes back for.',
  phrase: ['"practice speaking english out loud"','"english speaking practice app"','"how to stop translating in my head"','"speaking practice partner"','"practice speaking spanish out loud"','"ai to practice speaking english"'],
  exact: ['[english speaking practice app]','[practice speaking english out loud]','[app to practice speaking a language]'],
  negatives: 'beginner, for beginners, basics, a1, a2, alphabet, grammar test, ielts, toefl, cambridge, exam, certificate, translate, translation, dictionary, kids, children, free course',
  negWhy: 'He is C1 with a 400-day vocabulary streak. Every beginner or exam term is someone at a different stage who will bounce.',
  headlines: ['Practise speaking out loud','English, Spanish or Russian','She won’t switch to English','Speak, don’t translate','Speaking practice, any time','Your grammar is fine','The gap is speaking','Practise with no one around','An AI that waits for you','Free to start, no card','Say it wrong 20 times','Keep calm and talk','Stop rehearsing in your head','Fluent on paper, stuck aloud','Get your speed back'],
  descriptions: ['Reading is the easy part. Practise speaking out loud, as often as you like.','An AI that stays in your language even when you stall. That is the point.','English, Spanish or Russian. Your pace and pauses measured from the recording.','Free to start, no card. The app menus are English; the conversation is not.'],
  never: 'learn · beginner · course · lesson · native speaker',
},
{
  n: '03', slug: 'social', hue: '#ff9f0a',
  campaign: 'IT · Meeting people', adGroup: 'First line',
  person: 'Tom, 26', archetype: 'One shot at the first line',
  landing: 'improvtalk.vip/meeting-people/', budget: '15%',
  intent: 'Cheapest clicks of the five and the youngest audience — and the strictest negative list in the account.',
  smart1: {
    goal: 'Keep the dating and pickup vocabulary out of the campaign entirely.',
    measure: 'Zero spend on flirt, pickup, rizz or dating-app terms, checked weekly.',
    why: 'That traffic churns, and this site is linked from the app App Review reads.',
  },
  smart2: {
    goal: 'Find whether cheap clicks convert or just look cheap.',
    measure: 'Cost per testflight_click within 1.5× the Speaking up campaign by day 90.',
    why: 'A low CPC with no installs is buying the wrong intent.',
  },
  loyalty: 'Weekly actives before weekends. He returns before going out, not daily — time notifications to Friday.',
  phrase: ['"how to start a conversation with a stranger"','"how to break the ice"','"what to say to someone you just met"','"how to talk to new people"','"conversation starters with strangers"'],
  exact: ['[how to start a conversation with a stranger]','[how to break the ice with someone]'],
  negatives: 'flirt, flirting, pickup, pick up line, pickup lines, rizz, game, dating, tinder, hinge, bumble, date, girlfriend, boyfriend, attract, seduce, texting, dm, opener for girls',
  negWhy: 'Two reasons pointing the same way: the partner declines coercion so this traffic converts badly, and ad copy promising seduction contradicts the product App Review is looking at.',
  headlines: ['Practise the first line','Break the ice, in private','Say it before it counts','The first 30 seconds','Try an opener 20 times','Warm up before you go out','An AI that answers back','She can say no','Free to start, no card','Practise with strangers','Not a script. Reps.','Two goes before you leave','Read the room better','Openers you can rehearse','Nobody hears you practise'],
  descriptions: ['Try the first minute on your phone, twenty times if you want, before it counts.','She answers back, and sometimes she is not interested. Noticing that is the skill.','Free to start, no card. Two goes before you head out is enough to feel it.','Practise the opener, the exit, and everything awkward in between.'],
  never: 'flirt · attract · seduce · rizz · game · get her number',
},
{
  n: '04', slug: 'speaking', hue: '#30d158',
  campaign: 'IT · Speaking up', adGroup: 'Fillers and pace',
  person: 'Arjun, 33', archetype: 'Loses the room',
  landing: 'improvtalk.vip/speaking-up/', budget: '30%',
  intent: 'The largest share, because he is the only persona who can expense the outcome. Commercial intent is real here.',
  smart1: {
    goal: 'Establish that professional intent converts at a viable cost.',
    measure: 'A cost per testflight_click you would pay again, recorded by day 30.',
    why: 'If the best persona cannot clear the bar, none of the others will.',
  },
  smart2: {
    goal: 'Turn installs into revenue, not just installs.',
    measure: 'First paid conversion attributable to this campaign by day 90.',
    why: 'He is the most likely of the five to pay. That is the whole reason for the budget share.',
  },
  loyalty: 'Paid renewal. He comes back before each presentation — notify on that rhythm, not a daily streak.',
  phrase: ['"how to stop saying um"','"how to speak more clearly"','"filler words when speaking"','"how to stop talking too fast"','"practice for a presentation"','"how to be more articulate"'],
  exact: ['[how to stop saying um]','[how to stop saying like]','[how to speak more clearly at work]'],
  negatives: 'shy, social anxiety, glossophobia, fear of public speaking, stage fright, toastmasters, speech therapy, stutter, elocution, accent',
  negWhy: 'He does not believe he has a problem with people. He believes he has a problem being heard, and anxiety framing makes the ad about somebody else.',
  headlines: ['Seven ums in three minutes','Stop saying um','Hear how you actually sound','Practise the hard meeting','Your pace, measured','Not a rating. A number.','Practise before the meeting','Filler words, counted','Nobody at work will tell you','Say what you mean','Words per minute, measured','Rehearse difficult feedback','Free to start, no card','Fix it before Monday','Measured, not guessed'],
  descriptions: ['Your speed, your pauses and your filler count, measured from the recording.','Practise the hard conversation on your phone first, and hear how you sound.','Not a mark out of ten. Real numbers, with the working shown for each one.','Free to start, no card. Three minutes the night before the meeting.'],
  never: 'anxiety · shy · nervous · fear · confidence',
},
{
  n: '05', slug: 'rusty', hue: '#bf5af2',
  campaign: 'IT · Out of practice', adGroup: 'Getting it back',
  person: 'Claire, 38', archetype: 'It went quiet',
  landing: 'improvtalk.vip/out-of-practice/', budget: '5%',
  intent: 'Smallest query volume of the five. Run it as a test once you know your real CPC, not before.',
  smart1: {
    goal: 'Find out whether the query volume exists at all.',
    measure: 'Impression volume sufficient to judge by day 30, or pause the campaign.',
    why: 'A campaign with no impressions is a hypothesis, not a channel.',
  },
  smart2: {
    goal: 'Prove she stays longer than the others.',
    measure: '7- and 30-day retention above the account average by day 90.',
    why: 'She commits slowly. If it works for her it works for weeks, and that is the signal worth paying for.',
  },
  loyalty: 'Week six against week one. The trend chart is the retention mechanic — it is the proof she asked for.',
  phrase: ['"out of practice talking to people"','"how to be social again"','"getting back into socialising"','"lost my social skills"','"how to make conversation again"'],
  exact: ['[how to be social again]','[out of practice talking to people]'],
  negatives: 'beginner, for beginners, learn to talk, basics, 101, teach me, kids, teenager, student',
  negWhy: 'She is not a beginner and will close anything that treats her as one. Beginner-framed queries are a different person entirely.',
  headlines: ['It comes back quickly','You did not lose it','Get back in practice','Like riding a bike','Three minutes a day','You used to be fine at this','Warm up before you go out','Nothing changed about you','An AI that talks back','Free to start, no card','Week six against week one','Practise in private','You have done this before','Say yes to things again','Your circle got smaller'],
  descriptions: ['You used to be fine at this. A few short goes and most of it comes back.','Nothing changed about you. Only how often you get to practise. Start there.','Three minutes a day, in private. Watch week six against week one.','Free to start, no card. This is practice, not tuition.'],
  never: 'learn · beginner · basics · teach · improve yourself',
},
]
