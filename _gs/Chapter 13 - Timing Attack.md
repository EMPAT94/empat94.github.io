---
title: Chapter 13 - Timing Attack
part: 14
---

## Chapter 13 - Timing Attack

```sh
test = echo "Hello, World!"
```

"Test," I whispered. A new window opened up.

---

### Hello, World!

---

I was almost certain that it would work but still sighed in relief. Then I quickly modified the program, coming to the crux of the issue.

```sh
test = sudo echo "Hello, World!"
```

I took a deep breath. Crossed my fingers. Whispering with my eyes closed, "Test" I opened a single eye slowly and my lips unconsciously curled into a smile.

---

### Password:

---

'Hallelujah!' I celebrated in my mind. There *is* a superuser!

"So it worked?" Arya asked out of nowhere. I beamed at her blankly for a moment. "You did your devilish smile again," she clarified.

"Okay, first off, it is a normal smile. And second, yes. I got want I was looking for. As for whether I can use it or not, the jury is still out on that one," I said.

"So, can you tell me now what the spell is?" she beamed back. She had grown peculiarly interested in programming. 'Perhaps she wants to make a powerful resurrection spell or something?'

"Okay. In normal computing, there is a concept of a superuser, who can do stuff normal users cannot. Ummm, for example, think of a corporate building. You have your cleaners, workers, security, and so on. Many people with various roles and access to different rooms and tools. Then there is the owner or an administrator of the building. That one has access to all the rooms and all the stuff of the building. A superuser is something like the administrator. I mean, bad example but close enough. In Windows, the user is called an Administrator, if I remember correctly," I tried to explain.

"Ah, I understand. So, what has your spell got to do with an admin?" she asked.

"Hmm, well you must know by now that these spells are nothing but programs, right? If I can get superuser rights, then -"

"Then you can access tools and do stuff that you normally couldn't!" she cut me off and concluded.

"Well, yes," I replied. 'She is quick on the uptake,' I thought.

"So how do you become an admin?" she continued.

"That is the problem. You need a password," I said with a bitter smile.

"Oh," she reflected back. "My mana is back up, I'm gonna go cast heal," she said and went back to her grind. I went back to mine.


<br />
 <p style="text-align:center"><strong>¤ ¤ ¤</strong></p> 
<br />


'Brute force? Nah, I don't have the time. Hmm, will it be susceptible to attacks though? Even our Earthly systems are so air-tight for the most part, this is an alien super system we are talking about.' I was pessimistic. Good thing I had nothing but time on my hands. I decided to give it a try.

---

### Password: password

---

I added the password with a thought. The window just vanished. No 'Hello, World!'. I noticed I was down 2 mana. 'Come on, I'm not even doing anything!' I wailed.

More determined than ever, I tried several more variations. No dice.

'I can't manually keep entering a password. A few more and I'll forget what I entered previously. Nor would I be able to cover all the characters.' With that thought, I decided to automate it.

```sh
test = (while (true) (echo "password" | sudo -S echo "password worked!"))
```

I cast the spell. One mana point down. I didn't see the window prompting for the password. Another second down, another mana point gone.

'What is this? A background job? I see. Since the system is unable to determine how many resources this spell will consume, it is taking it in as it requires. But this won't do. I'm checking for the same thing over and over again. Also, I will be down to zero in fifteen minutes at this rate! And if I add checks for all combinations, god knows how long it will take,' as I fretted over the issue, another idea popped into my mind. 'What if...?'

```sh
test = (i = 0; while (i <= 255) (str = getChar[i++]; echo "$str $(time)" >> testFile; echo $str | sudo -S echo $str "worked!" ))

getChar i = awk 'BEGIN{printf "%c," i}'

time = date +%s%N
```

I ran each function and made sure everything worked. Funny it had all the utilities. By the time I was done, Arya was looking fixedly at me again. "You were gone for a while just now. What were you doing?" she queried. I was getting used to her being a curious cat by now, so I simply replied: "I'm trying something. If it works, I can modify it to get the password. Quite a shot in the dark though, I don't expect much," I sated her curiosity, "Are you done?" I queried in return. "Yep, I'm level 3 now!" she exclaimed. "Congratulations," I muttered, "Should we wake the others now or do you wanna rest some?" "Nah, let's get going," she declared. And so, we woke the others and got going.


