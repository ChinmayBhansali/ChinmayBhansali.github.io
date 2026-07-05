---
title: Bnuuy's Ship
summary: A top-down action game built in a team of five on a custom C++/OpenGL engine. Captain a modular ship, rescue bunnies, battle pirate chickens.
tag: CODE
year: 2025
date: 2025-04-15
meta: CODE · TEAM OF 5 · JAN–APR 2025
featured: 3
cover: ./BnnuysShip.png
heroAlt: Bnuuy's Ship key art
links:
  - label: "source code →"
    url: "https://github.com/ChinmayBhansali/BnuuySavers"
---
## The game

Bnuuy's village was attacked and the villagers were taken hostage. You captain a ship across a pixel-art ocean, rescue caged bunnies from pirate chickens, and ferry them home. The ship itself is the central mechanic, inspired by [Lovers in a Dangerous Spacetime](https://store.steampowered.com/app/252110/Lovers_in_a_Dangerous_Spacetime/) and [Ship of Fools](https://store.steampowered.com/app/1286580/Ship_of_Fools/): its deck is a grid of swappable station modules (cannons, lasers, healing stations, radar, a bubble shield), and you physically walk your bunny to a station to operate it. Rescued bunnies can be assigned to stations, where a decision-tree AI runs them for you.

<div class="fig-row fig-row--free">
  <figure>
    <img src="./gameplay.png" alt="Gameplay: the bunny captain standing at a cannon station on the ship deck">
    <figcaption>fig 1: manning a cannon station on deck</figcaption>
  </figure>
  <figure>
    <img src="./encyclopedia.png" alt="The in-game encyclopedia showing module types and descriptions">
    <figcaption>fig 2: the in-game encyclopedia of ship modules</figcaption>
  </figure>
</div>

## The engine

There is no Unity underneath this. Over four milestones we built the game on a custom C++/OpenGL engine with an [entity-component-system](https://en.wikipedia.org/wiki/Entity_component_system) architecture: Tiled maps parsed through Tileson, polygon-precise collision, A* pathfinding for enemies that route around islands, a particle system using instanced rendering, save/load, and cutscenes. My own contributions concentrated on how the world physically responds: collision detection and resolution between islands, ship, and player; the audio system and its feedback cues; new enemy types; the healing module; and window scaling so the game renders identically across machines.

## Engineering as interaction design

The reason this project sits on a research portfolio: collision resolution is not backend work, it is the feel of the game. Whether the ship slides along an island's edge or stops dead, whether a hit registers with a sound or silently, these are decisions about moment-to-moment experience that get made deep in engine code, long before anyone doing "design" touches the game. Building the layer where engineering choices become interaction, and being responsible for how it felt, is the same lesson I keep finding everywhere: the experience is decided wherever the system is decided, whether or not a designer is in the room.
