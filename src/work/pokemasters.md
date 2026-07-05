---
title: PokeMasters
summary: A childhood notebook RPG from a school where electronics were banned, digitized years later as a Java Swing desktop game.
tag: CODE
year: 2023
date: 2023-04-16
meta: CODE · SOLO · 2022–2023
cover: ./pokemasters-text-based.jpg
heroAlt: The original notebook version of PokeMasters, hand-drawn on paper
links:
  - label: "source code →"
    url: "https://github.com/ChinmayBhansali/PokeMasters"
---
## From paper to program

The first version of this game had no code at all. I designed it in a school in Rajasthan where electronics were banned: hand-drawn maps, turn-based battles tracked in pencil, rules written in the margins of a notebook. My friends played it and got genuinely lost in it, and I spent more time watching them play than playing myself. That notebook is where everything on this site actually starts.

Years later at UBC, I rebuilt it as a desktop application in Java: first as a text-based game, then with a full Swing interface. The point was never to ship a Pokémon clone. It was to find out whether the system that lived on paper could survive the move to software with its feel intact.

<div class="fig-row">
  <figure>
    <img src="./pokemasters_gui.png" alt="The Java Swing graphical interface">
    <figcaption>fig 1: the Java Swing GUI</figcaption>
  </figure>
  <figure>
    <img src="./pokemaster-returns.png" alt="A later scene from the game">
    <figcaption>fig 2: PokeMaster returns</figcaption>
  </figure>
</div>

## Architecture

The build follows a [model-view-controller](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) structure: the game's rules, creatures, and battle logic live in a model that knows nothing about how it is displayed. That separation is what let the same game wear two interfaces, the terminal version and the Swing GUI, without rewriting what the game *is*. Which, in hindsight, was the notebook lesson restated in code: the game was never the paper, and it was never the pixels either.
