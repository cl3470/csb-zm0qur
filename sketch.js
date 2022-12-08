/* eslint-disable no-undef, no-unused-vars */

let stepNumber = 16;
let instrumentNumber = 4;
let steps = new Array(stepNumber);
let pitch0, pitch1, pitch2, pitch3;
let room0, room1, room2, room3;
let wetMix0, wetMix1, wetMix2, wetMix3;
let dist0, dist1, dist2, dist3;
let clapBox;
let sel;

for (let i = 0; i < steps.length; i++) {
  steps[i] = new Array(4);
}
const del0 = new Tone.FeedbackDelay(0.2, 0.2).toDestination();
const dis0 = new Tone.Distortion(1.0).connect(del0);
const rev0 = new Tone.JCReverb({ roomSize: 0.8, wet: 1.0 }).connect(dis0);
const pitchs0 = new Tone.PitchShift(2).connect(rev0);
const clap = new Tone.Player("sounds/clap").connect(pitchs0);

const del1 = new Tone.FeedbackDelay(0.5, 0.5).toDestination();
const dis1 = new Tone.Distortion(1.0).connect(del1);
const rev1 = new Tone.JCReverb({ roomSize: 0.8, wet: 1.0 }).connect(dis1);
const pitchs1 = new Tone.PitchShift(2).connect(rev1);
const hat = new Tone.Player("sounds/hat.wav").connect(pitchs1);

const del2 = new Tone.FeedbackDelay(0.5, 0.5).toDestination();
const dis2 = new Tone.Distortion(1.0).connect(del2);
const rev2 = new Tone.JCReverb({ roomSize: 0.8, wet: 1.0 }).connect(dis2);
const pitchs2 = new Tone.PitchShift(2).connect(rev2);
const snare = new Tone.Player("sounds/snare").connect(pitchs2);

const del3 = new Tone.FeedbackDelay(0.5, 0.5).toDestination();
const dis3 = new Tone.Distortion(1.0).connect(del3);
const rev3 = new Tone.JCReverb({ roomSize: 0.8, wet: 1.0 }).connect(dis3);
const pitchs3 = new Tone.PitchShift(2).connect(rev3);
const kick = new Tone.Player("sounds/kick").connect(pitchs3);

let bpmSlider;
let humanizeSlider;

Tone.Transport.bpm.value = 100;

let toggle;

let playheadX = 25;
let seq;

let step = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);

  toggle = createRadio();
  toggle.option("start");
  toggle.option("stop");
  toggle.position(10, 100);
  toggle.selected("stop");
  toggle.changed(() => {
    if (toggle.value() === "start") {
      Tone.Transport.start();
    } else if (toggle.value() === "stop") {
      Tone.Transport.stop();
    }
  });

  bpmSlider = createSlider(60, 300, 120, 1);
  bpmSlider.position(450, 20);

  dist0 = createSlider(0, 1, 0, 0);
  dist0.position(10, 240);

  dist1 = createSlider(0, 1, 0, 0);
  dist1.position(165, 240);

  dist2 = createSlider(0, 1, 0, 0);
  dist2.position(320, 240);

  dist3 = createSlider(0, 1, 0, 0);
  dist3.position(475, 240);

  wetMix0 = createSlider(0, 1, 0, 0);
  wetMix0.position(10, 270);

  wetMix1 = createSlider(0, 1, 0, 0);
  wetMix1.position(165, 270);

  wetMix2 = createSlider(0, 1, 0, 0);
  wetMix2.position(320, 270);

  wetMix3 = createSlider(0, 1, 0, 0);
  wetMix3.position(475, 270);

  room0 = createSlider(0, 1, 0, 0);
  room0.position(10, 210);

  room1 = createSlider(0, 1, 0, 0);
  room1.position(165, 210);

  room2 = createSlider(0, 1, 0, 0);
  room2.position(320, 210);

  room3 = createSlider(0, 1, 0, 0);
  room3.position(475, 210);

  pitch0 = createSlider(-12, 12, 2, 1);
  pitch0.position(10, 180);

  pitch1 = createSlider(-12, 12, 2, 1);
  pitch1.position(165, 180);

  pitch2 = createSlider(-12, 12, 2, 1);
  pitch2.position(320, 180);

  pitch3 = createSlider(-12, 12, 2, 1);
  pitch3.position(475, 180);

  humanizeSlider = createSlider(0, 1, 0, 0);
  humanizeSlider.position(450, 50);

  for (let i = 0; i < stepNumber; i++) {
    for (let j = 0; j < instrumentNumber; j++) {
      steps[i][j] = createCheckbox(" ", false);
      steps[i][j].position(i * 25, j * 25);
    }
  }
  text("Clap", 400, 15);
  text("Hi-Hat", 400, 40);
  text("Snare", 400, 65);
  text("Kick", 400, 90);
  text("BPM", 500, 20);
  text("Humanizer", 490, 50);
  seq = new Tone.Loop(() => {
    background("green");
    step++;
    text("Clap", 400, 15);
    text("Hi-Hat", 400, 40);
    text("Snare", 400, 65);
    text("Kick", 400, 90);
    text("BPM", 500, 20);
    text("Humanizer", 490, 50);
    if (step > steps.length - 1) {
      step = 0;
    }

    fill(255);
    rect(step * 25, 0, 25, 100);

    if (steps[step][0].checked()) {
      clap.start();
    }

    if (steps[step][1].checked()) {
      hat.start();
    }

    if (steps[step][2].checked()) {
      snare.start();
    }

    if (steps[step][3].checked()) {
      kick.start();
    }

    Tone.Transport.bpm.value = bpmSlider.value();
    seq.humanize = humanizeSlider.value();

    pitchs0.pitch = pitch0.value();
    pitchs1.pitch = pitch1.value();
    pitchs2.pitch = pitch2.value();
    pitchs3.pitch = pitch3.value();

    rev0.roomSize.value = room0.value();
    rev1.roomSize.value = room1.value();
    rev2.roomSize.value = room2.value();
    rev3.roomSize.value = room3.value();

    del0.wet.value = wetMix0.value();
    del1.wet.value = wetMix1.value();
    del2.wet.value = wetMix2.value();
    del3.wet.value = wetMix3.value();

    dis0.distortion = dist0.value();
    dis1.distortion = dist1.value();
    dis2.distortion = dist2.value();
    dis3.distortion = dist3.value();
  }, "8n").start();
}
function draw() {
  clapBox = 125;
  fill("Purple");
  rect(10, 10 + clapBox, 150, 165);
  fill("white");
  rect(10, 10 + clapBox, 150, 30);
  fill(0);
  text("Clap", 65, 30 + clapBox);

  let hatBox = 155;
  fill("teal");
  rect(10 + hatBox, 10 + clapBox, 150, 165);
  fill("white");
  rect(10 + hatBox, 10 + clapBox, 150, 30);
  fill(0);
  text("Hi-Hat", 65 + hatBox, 30 + clapBox);

  let kickBox = 465;
  fill("red");
  rect(10 + kickBox, 10 + clapBox, 150, 165);
  fill("white");
  rect(10 + kickBox, 10 + clapBox, 150, 30);
  fill(0);
  text("Kick", 65 + kickBox, 30 + clapBox);

  let snareBox = 310;
  fill("orange");
  rect(10 + snareBox, 10 + clapBox, 150, 165);
  fill("white");
  rect(10 + snareBox, 10 + clapBox, 150, 30);
  fill(0);
  text("Snare", 65 + snareBox, 30 + clapBox);

  text("Distortion", 55, 240);
  text("Distortion", 210, 240);
  text("Distortion", 365, 240);
  text("Distortion", 520, 240);
  text("Delay", 55, 270);
  text("Delay", 210, 270);
  text("Delay", 365, 270);
  text("Delay", 520, 270);
  text("Reverb", 55, 210);
  text("Reverb", 210, 210);
  text("Reverb", 365, 210);
  text("Reverb", 520, 210);
  text("Pitch", 55, 180);
  text("Pitch", 210, 180);
  text("Pitch", 365, 180);
  text("Pitch", 520, 180);
}
