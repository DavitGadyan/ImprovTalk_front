/**
 * Fifteen short-form video scripts — three per persona.
 *
 * Format cue taken from hook-structure accounts like @thepostprotocol: the hook
 * carries the first 1–2 seconds, each script names the structure it uses, and
 * retention is the thing being engineered rather than a happy accident. The
 * structures themselves are industry-standard; none of anyone's paid hook packs
 * are reproduced here.
 *
 * Three per persona, each on a different structure, so a feed of them does not
 * read as one template.
 *
 * Every script is checked against its persona's `never` list before rendering.
 * Those lists are not stylistic — get the frame wrong and the video is about
 * somebody else, and for Meeting people it is also an App Review risk.
 */
export const SETS = [
{
  n: '01', slug: 'shy', hue: '#ff2d55',
  person: 'Sam, 24', archetype: 'The one who freezes',
  landing: 'improvtalk.vip/', platform: 'TikTok primary · Reels repost',
  bestTime: '21:00–01:00. He is scrolling at the hour the feeling is live.',
  never: ['confidence','charisma','cure','transform','overcome','anxiety'],
  scripts: [
    {
      id: 'S1', utm: 'shy_1am', structure: 'Problem recognition', dur: '10s',
      hook: 'You will think of the perfect reply at 1am.',
      prompt: 'Cinematic close-up, 9:16 vertical. A man in his early twenties lies awake in a dark bedroom, the only light a phone screen face-down beside him throwing a faint glow across the ceiling. He stares upward, eyes open, replaying something. Very slow push-in. Muted blue-grey palette, shallow depth of field, 35mm, soft film grain. Still camera, no shake. Room tone only — no music, no speech.',
      onScreen: [['0.0s','(hold on the face — no text)'],['4.5s','You thought of the perfect reply.'],['7.0s','Four hours late.']],
      vo: 'None. The silence is the point — a voiceover would fill the gap the video is about.',
      end: 'Brand gradient · “Practice makes perfect.” · Get early access',
      why: 'He has had this exact night. Recognition beats persuasion for this persona, and the first frame is the moment rather than a claim about it.',
    },
    {
      id: 'S2', utm: 'shy_never_practised', structure: 'Contrarian', dur: '12s',
      hook: 'You are not bad at talking. You have never practised.',
      prompt: 'Cinematic 9:16 vertical. A house party kitchen, warm low light, four people mid-conversation and laughing. A man in his early twenties stands half a step outside the group holding a drink, following the conversation closely. He opens his mouth to speak, then closes it and looks down at the glass. Handheld with small natural movement, shallow focus — the group slightly soft, him sharp. 35mm, realistic. Party ambience, no intelligible dialogue.',
      onScreen: [['0.5s','You are not bad at this.'],['3.5s','You have just never practised it.'],['8.0s','Nobody does. That is the whole problem.']],
      vo: 'None. Text carries the reframe; the scene carries the feeling.',
      end: 'Brand gradient · “Practice makes perfect.” · Get early access',
      why: 'Denies the belief he holds about himself without telling him to feel differently, which is the instruction he cannot execute.',
    },
    {
      id: 'S3', utm: 'shy_two_jobs', structure: 'Open loop', dur: '12s',
      hook: 'There is a reason the words come back at 1am.',
      prompt: 'Cinematic 9:16 vertical, two shots. First: extreme close-up of a man in his early twenties mid-conversation, eyes flicking, the half-second of going blank, warm indoor light. Cut to: the same man alone later on a dark street walking home, mouth moving, saying the sentence perfectly to nobody. Handheld, shallow depth of field, 35mm, filmic grain. Ambient street tone on the second shot, no dialogue.',
      onScreen: [['1.0s','The words were never missing.'],['5.0s','Your attention was doing two jobs.'],['9.0s','One of them was watching you.']],
      vo: 'None.',
      end: 'Brand gradient · “Practice makes perfect.” · Get early access',
      why: 'Opens a question in the first second and answers it at second nine. He stays because the explanation is one he has never been given.',
    },
  ],
},
{
  n: '02', slug: 'language', hue: '#0a84ff',
  person: 'Andrés, 29', archetype: 'Fluent on paper',
  landing: 'improvtalk.vip/second-language/', platform: 'TikTok primary · Reels repost',
  bestTime: 'Evenings, and Sunday. Add YouTube Shorts here first when you expand.',
  never: ['learn','beginner','course','lesson','native speaker','basics'],
  scripts: [
    {
      id: 'L1', utm: 'lang_lunch_table', structure: 'Problem recognition', dur: '12s',
      hook: 'He had the answer. In his head. In time.',
      prompt: 'Cinematic 9:16 vertical. An office lunch table, five colleagues mid-conversation in warm daylight, easy overlapping laughter. A man in his late twenties sits fractionally back from the group, following every word closely, forming a sentence he never says. Handheld with small natural movement, shallow focus — the group slightly soft, him sharp. Documentary realism, 35mm. Ambient chatter and cutlery, no intelligible dialogue.',
      onScreen: [['1.0s','He understood every word.'],['5.0s','He had an answer.'],['8.5s','By the time it was ready, they had moved on.']],
      vo: 'None. Subtitles always — he may well be watching in his second language.',
      end: 'Brand gradient · “Keep calm and talk.” · Get early access',
      why: 'The lunch table is the specific exclusion he feels weekly, and it is not the meeting — work English is the part he can already do.',
    },
    {
      id: 'L2', utm: 'lang_c1_three_words', structure: 'Demonstration', dur: '13s',
      hook: 'C1 on paper. Three words out loud.',
      prompt: 'Cinematic 9:16 vertical, two shots. First: a man in his late twenties at a desk reading a dense English document, calm and fluent, natural window light, close on his eyes moving across the page. Cut to: the same man in an office lift, another person turns and asks him something, he answers in two or three words and looks at the floor. Cool even lighting, static tripod on the first shot, handheld on the second, 50mm. Ambient office tone.',
      onScreen: [['0.5s','Reading is recognition.'],['5.0s','Speaking is production.'],['9.5s','Different muscle. No one trains it.']],
      vo: 'None.',
      end: 'Brand gradient · “Keep calm and talk.” · Get early access',
      why: 'Respects his competence in the first shot before naming the gap in the second. Lead with the gap and he stops watching.',
    },
    {
      id: 'L3', utm: 'lang_400_days', structure: 'Contrarian', dur: '12s',
      hook: '400 days of vocabulary. Zero hours of talking.',
      prompt: 'Cinematic 9:16 vertical. Extreme close-up of a phone screen showing a long daily streak counter, thumb hovering. Pull back slowly to reveal a man in his late twenties alone at a café table, mouthing a sentence to himself, stopping halfway. Warm afternoon light through a window, shallow depth of field, 35mm, gentle grain. Café ambience, no dialogue.',
      onScreen: [['1.0s','400 days. Every day.'],['5.5s','And still three words in the lift.'],['9.0s','The streak was never the gap.']],
      vo: 'None.',
      end: 'Brand gradient · “Keep calm and talk.” · Get early access',
      why: 'Names the thing he is proud of and shows why it did not transfer, without once implying he is a learner.',
    },
  ],
},
{
  n: '03', slug: 'social', hue: '#ff9f0a',
  person: 'Tom, 26', archetype: 'One shot at the first line',
  landing: 'improvtalk.vip/meeting-people/', platform: 'TikTok primary · Reels repost',
  bestTime: 'Thursday and Friday, 19:00–22:00 — before he goes out, not after.',
  never: ['flirt','attract','seduce','rizz','pickup','pick up','get her','girlfriend','dating'],
  scripts: [
    {
      id: 'T1', utm: 'social_four_minutes', structure: 'Open loop', dur: '9s',
      hook: 'Four minutes after they walk away, you will know what to say.',
      prompt: 'Cinematic 9:16 vertical, golden hour at a busy beach bar. A man in his mid twenties stands at the edge of a group, drink in hand, watching a conversation he has not joined. He shifts his weight, begins to step forward, hesitates, and stops. Warm amber backlight, handheld with natural movement, shallow depth of field, 35mm, filmic grain. Crowd ambience and a low music bed. No dialogue.',
      onScreen: [['0.5s','The moment is about four seconds long.'],['5.0s','You will have the line in four minutes.']],
      vo: 'None. Music bed only.',
      end: 'Brand gradient · “Break the ice. Practise first.” · Get early access',
      why: 'The gap between the moment and the idea is his whole experience. Naming the timing is more specific than naming the feeling.',
    },
    {
      id: 'T2', utm: 'social_rewind', structure: 'Pattern interrupt', dur: '10s',
      hook: 'Opens on him walking over confidently — then reveals he never moved.',
      prompt: 'Cinematic 9:16 vertical, festival at dusk, string lights and a crowd. A man in his mid twenties walks with purpose toward a small group, relaxed and open. Mid-step the motion reverses smoothly and he returns to where he began, standing still at the edge holding a drink, exactly as before. One continuous take, handheld, warm practical lighting, 35mm, filmic grain. Crowd ambience and distant music.',
      onScreen: [['0.5s','The version in your head.'],['5.0s','The version that happened.'],['8.0s','The gap is practice, not nerve.']],
      vo: 'None.',
      end: 'Brand gradient · “Break the ice. Practise first.” · Get early access',
      why: 'The reverse is the pattern interrupt — the viewer has to re-read the first three seconds, which is what buys the rest.',
    },
    {
      id: 'T3', utm: 'social_one_go', structure: 'Problem recognition', dur: '10s',
      hook: 'You get one go. Nobody practises the one go.',
      prompt: 'Cinematic 9:16 vertical. A gym between sets, cool overhead light. A man in his mid twenties sits on a bench near someone else resting; there is a clear open moment where either could speak. He glances over, says nothing, puts his headphones back in and looks at his phone. Static tripod with a very slow push-in, 50mm, realistic. Gym ambience — plates, distant treadmill, no dialogue.',
      onScreen: [['1.0s','Twenty seconds, once.'],['5.0s','No second attempt. No feedback.'],['8.0s','Every other skill gets practice.']],
      vo: 'None.',
      end: 'Brand gradient · “Break the ice. Practise first.” · Get early access',
      why: 'The gym is the shortest window of the four venues and the easiest to feel. Nothing here is about who the other person is.',
    },
  ],
},
{
  n: '04', slug: 'speaking', hue: '#30d158',
  person: 'Arjun, 33', archetype: 'Loses the room',
  landing: 'improvtalk.vip/speaking-up/', platform: 'TikTok primary · Reels repost · LinkedIn later',
  bestTime: 'Weekday mornings and Sunday evening — before the week, not during it.',
  never: ['anxiety','shy','nervous','fear','confidence','stage fright'],
  scripts: [
    {
      id: 'A1', utm: 'speak_seven_ums', structure: 'Demonstration', dur: '15s',
      hook: 'Seven “um”s in three minutes. Now you know.',
      prompt: 'Cinematic 9:16 vertical. A glass-walled meeting room, six people around a pale table in cool daylight. A man in his early thirties presents at the head of the table, speaking quickly and gesturing more than he needs to. Static tripod with a very slow push-in. Clean corporate palette, realistic, 50mm. Muffled speech and room tone, no intelligible dialogue.',
      onScreen: [['1.0s','um'],['3.0s','um · um'],['6.0s','um · um · um · um'],['9.5s','Seven. In three minutes.'],['12.0s','Nobody was ever going to tell you.']],
      vo: 'None. The counter is the whole idea.',
      end: 'Brand gradient · “Say what you mean.” · Get early access',
      why: 'Only we can run this one honestly — filler density is measured from the recording, not guessed. The counter is the product in one shot.',
    },
    {
      id: 'A2', utm: 'speak_lost_the_room', structure: 'Contrarian', dur: '12s',
      hook: 'You did not lose the argument. You lost the room.',
      prompt: 'Cinematic 9:16 vertical. A meeting room in cool daylight. A man in his early thirties is making a point at the head of the table. Slow pan across the faces around him: a phone turned face up, a glance at a laptop, someone looking out of the window, a polite nod with no attention behind it. Static tripod, then a slow horizontal pan, 50mm, clean corporate palette. Muffled speech and room tone.',
      onScreen: [['1.0s','The idea was fine.'],['5.0s','You were 40 words a minute too fast.'],['9.0s','That is a fixable number.']],
      vo: 'None.',
      end: 'Brand gradient · “Say what you mean.” · Get early access',
      why: 'He does not think he has a people problem. This says the problem is mechanical and measurable, which is the only frame he accepts.',
    },
    {
      id: 'A3', utm: 'speak_nobody_tells_you', structure: 'Problem recognition', dur: '11s',
      hook: 'Nobody at work will ever tell you how you sound.',
      prompt: 'Cinematic 9:16 vertical. The end of a meeting — people gathering laptops and filing out of a glass-walled room. A man in his early thirties stays at the screen. A colleague pats him on the shoulder on the way past, says something brief and pleasant, and leaves. He is alone in the frame. Handheld, cool daylight, 35mm, realistic. Room tone and receding footsteps.',
      onScreen: [['1.5s','“Good job.”'],['5.0s','Too small to mention.'],['8.0s','Too awkward to raise. So nobody does.']],
      vo: 'None.',
      end: 'Brand gradient · “Say what you mean.” · Get early access',
      why: 'The polite non-feedback is the exact reason he has never improved. It is a system problem, not a personal failing, and that framing keeps him watching.',
    },
  ],
},
{
  n: '05', slug: 'rusty', hue: '#bf5af2',
  person: 'Claire, 38', archetype: 'It went quiet',
  landing: 'improvtalk.vip/out-of-practice/', platform: 'Instagram Reels primary · Facebook · TikTok repost',
  bestTime: 'Evenings, 20:00–22:30. Reels first for this persona, not TikTok.',
  never: ['beginner','learn','basics','teach','improve yourself','fix you'],
  scripts: [
    {
      id: 'C1', utm: 'rusty_room_got_quiet', structure: 'Pattern interrupt', dur: '12s',
      hook: 'Opens on a loud party. Cuts to a silent flat.',
      prompt: 'Cinematic 9:16 vertical, two shots. First: a warm crowded living-room party, people laughing, handheld, golden lamplight, energetic. Hard cut to: a woman in her late thirties alone in a quiet, warmly lit flat holding a mug, standing at a window at early evening. The room is comfortable and completely still. Static shot with an almost imperceptible push-in, 35mm, gentle grain. Party ambience cuts to near-silence — only distant traffic.',
      onScreen: [['0.5s','You used to be the one who talked to everyone.'],['6.5s','Then the room got quieter.'],['9.5s','Not all at once.']],
      vo: 'None. The audio cut does the work — do not score over it.',
      end: 'Brand gradient · “Like riding a bike.” · Get early access',
      why: 'The audio drop is the interrupt. It shows what changed without ever saying anything is wrong with her.',
    },
    {
      id: 'C2', utm: 'rusty_stopped_using_it', structure: 'Contrarian', dur: '15s',
      hook: 'You did not lose it. You just stopped using it.',
      prompt: 'Cinematic 4:5 or 9:16. A woman in her late thirties stands in a warm, comfortable, quiet flat holding a mug, looking out of a window at early evening light. The room is well kept and completely silent. She glances at her phone; there is nothing on it. She looks back out. Soft warm practical lighting, muted autumnal palette, static shot with an almost imperceptible push-in. Realistic, 35mm, gentle grain. Quiet room tone, distant traffic, no music, no dialogue.',
      onScreen: [['2.0s','It did not go anywhere.'],['6.0s','You just stopped using it.'],['11.0s','It comes back faster than you think.']],
      vo: 'None.',
      end: 'Brand gradient · “Like riding a bike.” · Get early access',
      why: 'Reassurance leads and the frame is circumstance, never deficiency. She closes anything that suggests she needs teaching.',
    },
    {
      id: 'C3', utm: 'rusty_fewer_chances', structure: 'Open loop', dur: '13s',
      hook: 'Nothing changed about you. Something else did.',
      prompt: 'Cinematic 9:16 vertical. A woman in her late thirties walks alone through a familiar street at dusk, passing lit shopfronts and people in conversation. She passes a café, glances in, and keeps walking. Handheld following shot from behind and slightly to the side, warm streetlight and shop glow, shallow depth of field, 35mm, filmic grain. Street ambience, no dialogue.',
      onScreen: [['1.0s','Nothing changed about you.'],['5.0s','A move. A break-up. Working from home.'],['9.5s','Just fewer chances to practise.']],
      vo: 'None.',
      end: 'Brand gradient · “Like riding a bike.” · Get early access',
      why: 'Attributes everything to circumstance and resolves the loop with a cause she can act on rather than a flaw she has to accept.',
    },
  ],
},
]
