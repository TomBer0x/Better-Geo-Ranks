<div align="center">
  <h1>Better GeoGuessr Ranking System</h1>
</div>
<div align="center">
<h3>Transform the generic Champion rank into a new progression system with sleek, modern visuals!</h3>
  <br>
</div>

<img width="2184" height="803" alt="Champion" src="https://github.com/user-attachments/assets/bf8dc00c-15e9-4c9f-8c16-30879ff6bdad" />

<div align="center">The duels menu showcasing the Champion rank (2200+ elo)</div>

___
### 📝 About This Project
The current GeoGuessr ranking system leaves the best players in what I call a "dead zone". With the Champion rank being the final step in the ranking ladder, spanning a massive gap from **1350 to 2500+ elo**, the sense of progression often stalls.

This script introduces **4 new tiers (9 ranks total)** to replace the broad Champion rank. It provides meaningful milestones for high-skilled players and replaces the "boring" menu colours with the ones matching the skill group.

### 👨‍💼 My Motivation
The recent GeoGuessr rank update made me hopeful that something would change regarding the Champion rank, but unfortunately, I was wrong. The changes affected mainly the gold and master ranks, while Champion remained the broadest in terms of rating range.

Additionally, I wanted to - let's say - pay my respects to people reaching certain milestones, such as 2000 elo. I wanted these ranks to accurately classify people based on their skill. For example, as of now, we have around 100 grandmasters - that's basically a pro player level. I wanted this rank to work in the same way a grandmaster works in chess, since reaching 2000 is a significant milestone. The champion rank is a bit of an extra. With a 2200+ threshold, there's barely anyone who will reside there, but I thought it would be a nice addition. If necessary, I will be adjusting the ranking system, as well as adding new ranks in the future.

<img width="1336" height="392" alt="Champion-Card" src="https://github.com/user-attachments/assets/1d6cd3a0-2677-4168-8241-8b173eb352fa" />

<br>

I'm aware that this script won't be a great fit for most of the users, considering that only around 1500 players on average reside in the Champion rank. However, the main idea here is to help higher-rated players to climb the ladder with more "rank" motivation, even if it's this superficial.

The script updates dynamically and changes rank immediately when needed. The changes affect duels and profiles - both the user and other people.

While similar solutions exist in the GeoGuessr space already, I didn't find any of them aesthetically pleasing. Tweaking the colours and elements of the UI took me a while, so I hope the design choices made were indeed correct.

<br>

### 📸 Profile Previews
___

<div align="center"><img width="622" height="232" alt="Grandmaster-Profile" src="https://github.com/user-attachments/assets/fb4abcc1-22f0-4d50-b42a-915a9f5375b8" /></div>
<div align="center"><img width="622" height="232" alt="Emerald-Profile" src="https://github.com/user-attachments/assets/71e592c8-7da8-46a0-a6cf-a42a98cf3454" /></div>
<div align="center"><img width="622" height="232" alt="Platinum-Profile" src="https://github.com/user-attachments/assets/7950d43f-4bf2-4f15-9267-916f17b9a5e4" /></div>

<br>

### 📸 Duel Menu Previews
___

<img width="2183" height="804" alt="Platinum" src="https://github.com/user-attachments/assets/f279655c-50d5-422d-87f9-8fb928bd6b86" />
<img width="2185" height="804" alt="Emerald" src="https://github.com/user-attachments/assets/1c0aac66-489a-4c65-b0f9-ab93afafe025" />
<img width="2180" height="805" alt="Grandmaster" src="https://github.com/user-attachments/assets/3da6647c-a4b2-48ea-b8c8-46bcf312309c" />

<br />

### ⛏ Key Changes
Full list of features:
1. Created and implemented a new ranking system, completely replacing the Champion rank with 4 new tiers, and 9 ranks in total
2. Added visuals such as a rank card and background matching the current rank tier in the duels menu and the user's profile.
3. Implemented a glass design in the duels menu
4. The new ranking system affects both the user's profile and other people as well.

Since everything happens on the client's side, there's no risk of a ban at all. Additionally, the script shouldn't **generally** affect the performance. If such a case occurs, please report it immediately, and I will investigate it.

<br>

### 📈 New Ranking System
Ranking system and elo thresholds:
| Tier | ELO Threshold |
| :--- | :--- |
| 💜 **Champion** 💜 | `2200+` |
| 🧡 **Grandmaster** 🧡 | `2000 – 2199` |
| 💚 **Emerald I** 💚 | `1900 – 1999` |
| 💚 **Emerald II** 💚 | `1800 – 1899` |
| 💚 **Emerald III** 💚 | `1700 – 1799` |
| 🤍 **Platinum I** 🤍 | `1600 – 1699` |
| 🤍 **Platinum II** 🤍 | `1500 – 1599` |
| 🤍 **Platinum III** 🤍 | `1400 – 1499` |
| 🤍 **Platinum IV** 🤍 | `(Old) Champion rank and under 1400` |

<br>

<img width="2192" height="380" alt="Champion-Profile" src="https://github.com/user-attachments/assets/76570b1b-d2d8-43b9-99b3-66c1f2f4c62e" />

<br />

### 💡 Inspiration
Custom ranking system by Brainy: [Geoguessr High Level Ranks](https://greasyfork.org/en/scripts/547364-geoguessr-high-level-ranks)

### 🧾 Afterword
This project was created because the current "league" system doesn't seem to accurately reflect players' true performance. By switching to an **elo-based ranking system**, I hope to bring back the "rank motivation" that makes competitive climbing fun. 

If GeoGuessr ever moves toward a similar system (which I wouldn't be mad about), this script will have served its purpose!

If you liked this modification, I strongly encourage you to leave feedback, as well as report any bugs or problems that need to be solved. 

Thank you!
