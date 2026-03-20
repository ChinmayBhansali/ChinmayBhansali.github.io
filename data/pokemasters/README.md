# PokéMasters

## The Unreal World of Pokémon

For this project, I plan on building a small version of the game I intend to fully develop after this term.
I made the original (physical) version of this game in grade 9 when I was in a boarding school and electronic devices were prohibited in the hostel.
That is when this idea of notebook based Pokémon game struck into my mind.
I played this game with my dorm mates a lot.
I have the full version of this game at home but in a notebook.
I plan on converting that physical game into a computer game and this project can help me initiate it.
It is originally a multiplayer  (hence the name PokéMaster***s***) offline game. But, for this project, I am only making a single-player game.

This is a role playing game (RPG for short) especially for Pokémon fans (and also for anyone who is interested in games), where you thrive to become the **PokéMaster**, by exploring the Pokémon universe, and bonding with Pokémon.
The more you spend time with your Pokémon and the more you fight alongside them, the more they bond with you and the faster they (and *you* too) grow.
You can walk on the map, find new Pokémon, fight with them, catch them, visit the *PokéCenter*, etc.
Although you can only take 6 Pokémon in a battle with you, you can have as many Pokémon in storage as you want.
Also, you will be able to save and reload your gameplay, or create new ones.

We hope you enjoy this game!

In this game:
- as a player, when I start the game, I want to be given the option to load my previous game from file or start a new one
- as a player, I want to be able to choose my starter Pokémon
- as a player, I want to be able to battle other Pokémon with my own
- as a player in a battle, I want to be able to attack with my active Pokémon
- as a player in a battle, I want to be able to switch my active Pokémon with one of my benched Pokémon
- as a player in a battle, I want to be able to escape from the battle
- as a player in a battle, I want to be able to use my bag (in this version, only Pokéballs) to try and catch wild Pokémon
- as a player if I defeat a Pokémon, I want to be able to earn PokéDollars depending on the Pokémon's level
- as a player, I want my Pokémon to gain experience from battles, level up and learn new attacks accordingly
- as a player, I want to be able to heal my Pokémon at PokéCenter
- as a player, I want to buy items (in this version, only PokéBalls) at PokéCenter
- as a player, I want to be able to look at the current statistics of my Pokémon
- as a player, I want to be able to remove any Pokémon from my Pokémon
- as a player, I want to be able to quit my game
- as a player, when I select the quit option, I want to be given the option to save my game or not

## Instructions for Grader

- You can generate the first required action of adding multiple Pokémon to player's Pokémon by using a PokéBall from the bag during battle on the wild Pokémon when its HP is less than 20% 
- You can generate the second required action of displaying all the already added Pokémon of the player by clicking on 'Your Pokémon' button on the main screen
- You can locate my visual components when you choose your starter Pokémon in a New Game, on the main screen of the game and whenever you encounter a wild Pokémon when you Move
- You can save the game by quitting the game and choosing 'Yes' for saving the game 
- You can reload the state of my application by loading previous game on the first screen that appears

## Phase 4: Task 2

Tue Apr 11 15:18:17 PDT 2023
created new player: model.Player@1ee807c6


Tue Apr 11 15:18:21 PDT 2023
Added model.pokemon.starters.SquirtleStarter@4fe51452 to model.Player@1ee807c6's pokémon


Tue Apr 11 15:18:21 PDT 2023
Added 5 Pokéballs to model.Player@1ee807c6's Pokéballs


Tue Apr 11 15:18:21 PDT 2023
Added 500 PokéDollars to model.Player@1ee807c6's PokéDollars


Tue Apr 11 15:18:24 PDT 2023
model.Player@1ee807c6 started a new battle against a wild model.pokemon.Diglett@65f27ffc


Tue Apr 11 15:18:28 PDT 2023
Reduced model.pokemon.Diglett@65f27ffc's HP by 40 points


Tue Apr 11 15:18:28 PDT 2023
Reduced model.pokemon.starters.SquirtleStarter@4fe51452's HP by 20 points


Tue Apr 11 15:18:28 PDT 2023
Increased model.pokemon.starters.SquirtleStarter@4fe51452's HP by 40 points


Tue Apr 11 15:18:29 PDT 2023
Reduced model.pokemon.Diglett@65f27ffc's HP by 40 points


Tue Apr 11 15:18:29 PDT 2023
Reduced model.pokemon.starters.SquirtleStarter@4fe51452's HP by 20 points


Tue Apr 11 15:18:29 PDT 2023
Increased model.pokemon.starters.SquirtleStarter@4fe51452's HP by 40 points


Tue Apr 11 15:18:30 PDT 2023
Reduced model.pokemon.Diglett@65f27ffc's HP by 40 points


Tue Apr 11 15:18:30 PDT 2023
Reduced model.pokemon.starters.SquirtleStarter@4fe51452's HP by 20 points


Tue Apr 11 15:18:30 PDT 2023
Increased model.pokemon.starters.SquirtleStarter@4fe51452's HP by 40 points


Tue Apr 11 15:18:33 PDT 2023
model.Player@1ee807c6 used a Pokéball


Tue Apr 11 15:18:33 PDT 2023
Added model.pokemon.Diglett@65f27ffc to model.Player@1ee807c6's pokémon


## Phase 4: Task 3
Since I do not modify any of the attack objects, I would make them static. My current project has way too many classes. 
All the pokémon classes could be reduced to only a single class. My GameGraphics class has bad cohesion; it does way too 
many things for the game, I would split it into two, or maybe even more, classes. There are some methods in different 
classes that do multiple tasks, I would split every class to do one and only one task. My current code does not allow 
much flexibility for any future advancements in it; I would create hash sets for database of all the pokemon and attacks 
which would allow me to enter new data without worrying about the order. Currently, I am referring every picture by the 
pokémon's name, I would like to introduce a new field (Pokédex Number) which will make it easy to distinguish between 
all the pokémon.