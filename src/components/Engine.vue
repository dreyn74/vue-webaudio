<template>
  <div id="ui">
    <button class="play item-inline" @click="play">{{ playMsg }}</button>
    
    <label class="log-holder item-inline">
      &nbsp;
      <span class="log">{{ log }}</span>
    </label>
    
    <label id="volumeKnob" class="item">
      <span class="desc">volume</span>
      <input
        class="vol"
        type="range"
        value="1"
        min="0.01"
        max="1"
        step="0.01"
        v-model="volume"
        @change="setVolume"
      >
      <span class="vol">{{ volume }}</span>
      <knob-control v-model="volume" :min="0" :max="10"/>
    </label>
    
    <label class="item">
      <span class="desc">bpm</span>
      <input
        class="bpm"
        type="range"
        value="60"
        min="20"
        max="300"
        step="5"
        v-model="bpm"
        @change="setBPM"
      >
      <span class="bpm">{{ bpm }}</span>
    </label>
    
    <label class="item">
      <span class="desc">swing</span>
      <input
        class="swing"
        type="range"
        value="0"
        min="-1"
        max="1"
        step="0.01"
        v-model="swing"
        @change="setSwing"
      >
      <span class="swing">{{ swing }}</span>
    </label>

    <!--canvas class="item viz" @click="cycleViz"></canvas>
    <label class="vizLabel">{{ vizLabel }}</label-->
  </div>
</template>

<script>
import Engine from "../index.js";
import KnobControl from "../components/KnobControl";

// Core setup
var engine = new Engine();
//var manager = new Manager(engine);
window.engine = engine;

engine.volume = 0.75;
engine.swing = 0;
engine.bpm = 100;

export default {
  name: "Engine",
  components: {
    "knob-control": KnobControl
  },
  props: {
    msg: String
  },
  data() {
    return {
      playMsg: "Start",
      volume: engine.volume || 0,
      swing: engine.swing || 0,
      bpm: engine.bpm || 60,
      meter: 4,
      log: "",
      vizLabel: "(click to toggle visualizer)"
    };
  },
  methods: {
    //setVolume: ev => {
    setVolume: ev => {
      engine.volume = this.volume;
    },
    setSwing: ev => {
      engine.swing = this.swing;
    },
    setBPM: ev => {
      engine.bpm = this.bpm;
    },
    setMeter: ev => {
      this.meter = ev || 4;
    },
    //play: () => this.togglePlaying(),
    cycleViz: () => cycleViz(),
    play() {
      if (engine.context.state === "suspended") engine.context.resume();
      engine.playing = !engine.playing;
      this.playMsg = engine.playing ? "Stop" : "Start";
      this.log = engine.playing ? "(playing)" : "";
    }
  }
};

// play on spacebar
window.onkeydown = ev => {
  if (ev.key === " ") {
    ev.preventDefault();
    //togglePlaying();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
