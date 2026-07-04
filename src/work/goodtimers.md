---
title: GoodTimers
summary: A mobile app that plans between-lecture walks at UBC. A full research pipeline from field study to controlled experiment (N = 12), and the only team to win two CPSC 444 showcase awards.
tag: HCI
year: 2026
date: 2026-04-15
meta: HCI · TEAM OF 5 · JAN–APR 2026
featured: 1
cover: ./prototype-triptych.png
heroAlt: The three GoodTimers prototypes side by side, showing the drag, survey, and swipe interfaces
related:
  - the-trail-nobody-asked-for
links:
  - label: "project site →"
    url: "https://blogs.ubc.ca/goodtimers/"
  - label: "try the drag prototype →"
    url: "https://goodtimers.github.io/"
  - label: "try the survey prototype →"
    url: "https://goodtimers.github.io/select.html"
  - label: "try the swipe prototype →"
    url: "https://goodtimers.github.io/swipe.html"
  - label: "experiment report (pdf)"
    url: "/work/goodtimers/experiment-report.pdf"
---
## The problem

University students get scraps of unstructured time between classes and mostly let them evaporate. Our field study pointed at a reason I did not expect: students were not short on things to do, they were short on the will to plan. The dissatisfaction came from planning overhead, not from a lack of options. UBC's campus is large and walkable, so the opportunity was literally outside the window. After evaluating four design alternatives, we converged on GoodTimers: a mobile app that generates a walking route around campus from a handful of decision factors, like how much time you have, how much energy, and how social you feel.

## Three ways to ask five questions

The design question underneath the app was narrower and more interesting: what is the best way to collect five quick, fuzzy self-reports from someone standing in a hallway? We built the same input screen three ways. A [survey](https://goodtimers.github.io/select.html) of sliders, the familiar option. A [swipe](https://goodtimers.github.io/swipe.html) interface that turns each factor into a card. And a [drag](https://goodtimers.github.io/) interaction, our novel one, where a single continuous gesture runs through every question in one motion. All three prototypes are still live; the hero image above shows them side by side, and the sidebar links let you try each one.

## The drag trail

Figma could not fake the drag interaction convincingly, so I built the medium-fidelity prototypes in code, with AI assistance to save time. The AI delivered everything we asked for, and it also quietly added something nobody asked for: the drag left a faint trail behind the finger. Five HCI-trained people reviewed that prototype and none of us caught it. Our TA did, during the pilot. A design decision had been made by a tool and reviewed by no one, and it reached users anyway. That small artifact changed what I want to study; I wrote about it in [the trail nobody asked for](/garden/the-trail-nobody-asked-for/).

The pilot reshaped the study in more ordinary ways too: we added a brief demonstration before the drag condition, cut a redundant subtask, and expanded the single open-ended question into a full semi-structured interview.

## The experiment

We ran a 2 × 3 mixed factorial study (N = 12). Every participant planned a walk twice, once with Google Maps as the baseline and once with GoodTimers, while the input interface (drag, survey, swipe) varied between participants, with task order counterbalanced. We measured self-rated cognitive load, map satisfaction, map read time, and planning time, and closed every session with an interview.

The headline: planning with GoodTimers carried significantly less cognitive load than planning with Google Maps ([ART ANOVA](https://dl.acm.org/doi/10.1145/1978942.1978963), F(1, 6) = 13.47, p = .010, partial eta squared = 0.69, a large effect), and the benefit held across all three input interfaces. That second part matters: the null interaction told us the route-generation concept, not any single interface, was doing the work.

The humbling part: our custom map took 2.4 seconds longer to read than Google Maps (p = .007, Hedge's g = -1.04, also a large effect). We had predicted the opposite. Participants have spent years reading Google Maps, and familiarity turned out to be a design material we forgot to account for.

<div class="fig-row">
  <figure>
    <img src="./cognitive-load-by-planning-approach.png" alt="Boxplot: self-rated cognitive load, Google Maps baseline vs GoodTimers">
    <figcaption>fig 1: self-rated cognitive load, baseline vs GoodTimers (p = .010)</figcaption>
  </figure>
  <figure>
    <img src="./planning-time-by-dca.png" alt="Boxplot: planning time across drag, survey, and swipe">
    <figcaption>fig 2: planning time by input interface; note the drag condition's variance (p = .926)</figcaption>
  </figure>
</div>

## What I learned

Three things I keep from this project. First, null results can be the useful ones: no single interface drove the cognitive load benefit, which is exactly what you want to know before investing in any of them. Second, transfer effects run the show at this fidelity. Participants kept trying to use our drag gesture as a set of sliders because it looked like the sliders they had just seen, and they read Google Maps faster because they had read it for years. One is negative transfer, the other positive, and we anticipated neither. Third, with twelve participants the statistics alone are weak; the interviews are what turned numbers into explanations. No Likert scale would have told us that the swipe cards reminded people of dating apps.

The course showcase gave our team two awards, Best at Catching "Sneaky Factors" and Most Comprehensive Construction, the only team that term to receive two. I think both were for the same habit: refusing to let a result stand without asking where it came from.
