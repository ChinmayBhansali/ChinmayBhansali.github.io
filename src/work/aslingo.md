---
title: ASLingo
summary: A real-time American Sign Language learning platform built in 36 hours, giving webcam feedback as you sign.
tag: CODE
year: 2023
date: 2023-11-15
meta: CODE · HACKATHON · NOV 2023
cover: ./translator.png
heroAlt: The ASLingo translator page classifying a sign from the webcam in real time
links:
  - label: "devpost →"
    url: "https://devpost.com/software/aslingo-3yi1vd"
---
## Built in 36 hours

At a hackathon in late 2023, our team of three built a tool for practising American Sign Language with a webcam and immediate feedback. Structured lessons teach the fundamentals, and a translator page closes the loop: [MediaPipe](https://developers.google.com/mediapipe) extracts hand landmarks from the video stream, a TensorFlow/Keras classifier decides which sign you made, and a Flask server pushes the verdict back to a Bootstrap front end while you are still holding the sign. You practise, the system responds, you adjust. That loop, not the model, is the product.

<figure>
  <img src="./lessons.png" alt="The ASLingo lessons page with three lesson cards: greetings, objects, letters">
  <figcaption>fig 1: the lessons page</figcaption>
</figure>

## Latency is a design variable

The thing I actually took from this project happened while tuning the classifier. A delay of a few hundred milliseconds changed what the feedback *was*: fast enough and it read as a response, slow enough and it read as a failure, with nothing in between. The latency was not a UX decision anyone made. It was an engineering constraint that became the interaction. A practitioner without a framework for looking across that boundary would never see a pipeline delay as a design variable at all, and that invisible boundary between the engineering layer and the experience layer is precisely the territory my research lives in.
