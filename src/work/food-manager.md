---
title: Reducing household food waste
summary: A mobile app uniting grocery list, pantry, and recipes, designed from field work through two conceptual models to usability testing with 11 participants. People's Choice Award at the CPSC 344 showcase.
tag: HCI
year: 2025
date: 2025-12-05
meta: HCI · TEAM OF 5 · SEP–DEC 2025
featured: 2
cover: ./conveyor-model.png
heroAlt: Hand-drawn sketch of the Conveyor conceptual model, with grocery items riding a belt toward their expiry date
links:
  - label: "requirement report (pdf)"
    url: "/work/food-manager/requirement-report.pdf"
  - label: "outcome report (pdf)"
    url: "/work/food-manager/outcome-report.pdf"
---
## The problem

The need statement we started from could not have been plainer: "I want to reduce my household food waste." I led six of our eleven semi-structured need-finding interviews, then ran the thematic analysis and affinity diagramming. The finding that shaped everything after was behavioural, not technical: food stored out of sight was food forgotten. Six of eleven participants reported forgetting groceries entirely; five struggled to use items before their expiry date. People did not need more willpower, they needed their pantry to be visible. That gave us three design goals: visibility, efficiency, and integration into a daily routine, and it made mobile the obvious platform, because the phone is the only tool people already carry into the kitchen.

## Conveyor to Factory

Our first conceptual model was a conveyor belt: every grocery item rides a belt toward its expiry date, and using an item lifts it off the belt. The hand-drawn sketch above is that model. It explained time beautifully. Then a [cognitive walkthrough](https://www.interaction-design.org/literature/topics/cognitive-walkthrough) on the low-fidelity prototype showed it working against the very insight our research had surfaced: the model had no way to connect to recipes, the feature meant to answer "how do I use this before it expires?"

So the conveyor grew into a factory. The grocery list became the bulletin board, telling the factory what to order. The pantry became the loading zone, where items enter the belt and get tracked. The recipe finder became the factory floor, where items get used up. Just as importantly, the interface shrank: our first prototype had five screens that internal evaluation found cluttered and repetitive, and the factory model let us collapse them into two tabs.

<figure>
  <img src="./lofi-prototype.png" alt="Low-fidelity paper prototype of the app">
  <figcaption>fig 1: the low-fidelity prototype the cognitive walkthrough was run on</figcaption>
</figure>

## Testing with 11 people

I designed and executed the mixed-methods summative evaluation: in-person think-aloud sessions with 11 participants, followed by a questionnaire combining Likert items with open-ended questions. Moderators logged clicks and behaviour on coding sheets while participants narrated. Piloting reshaped the study itself before it ran: we split one research question into two, merged our two surveys into one, and swapped a planned interview for the questionnaire.

Much of it worked. Logging food items landed within three clicks of ideal, all eleven participants noticed the expiry reminder, and eight said the design would genuinely remind them.

## The contradiction

The finding I still think about is the one where our two data sources disagreed. Participants rated recipe search as efficient, and the sticky notes said things like "search is pretty efficient." The coding sheets said otherwise: at roughly 8.9 clicks against an ideal of 3, recipe search was by far the least efficient flow in the app.

<div class="fig-row fig-row--free">
  <figure>
    <img src="./clicks-recipe-search.png" alt="Bar chart of clicks per participant for the recipe search task, averaging 8.9">
    <figcaption>fig 2: what people did (8.9 clicks on average)</figcaption>
  </figure>
  <figure>
    <img src="./efficiency-notes.png" alt="Affinity diagram of questionnaire responses describing the design as efficient">
    <figcaption>fig 3: what people said</figcaption>
  </figure>
</div>

That gap is not a design bug, it is a research finding. Felt experience and actual behaviour diverge, and if we had collected only one of the two we would have walked away confident and wrong. Our own critique of the process suggested part of the explanation: by withholding a tutorial to avoid biasing participants, we inadvertently measured learnability rather than efficiency, with a [novelty effect](https://en.wikipedia.org/wiki/Novelty_effect) layered on top. Triangulation is what caught it.

## What I learned

The project received the People's Choice Award at the showcase, but what I keep is quieter. A conceptual model can quietly contradict your own research, and only a structured walkthrough will tell you. Chunking usability tasks "like chapters in a game" makes sessions tidy and behaviour unnatural. And a single data source lies to you politely: it was the disagreement between click counts and questionnaires that taught me the most, which is roughly when I stopped thinking of myself as someone who designs interfaces and started thinking of myself as someone who studies the gap between what systems assume and what people do.
