<template>
  <canvas id="viz"/>
</template>
<script>
//import Manager from "../demo/lib/manager";
import Viz from "webaudio-viz";
export default {
  name: "VizPlayer",
  props: {
    engine: any
  },
  data() {
    return {
      vizMode: 0,
      canvas: document.querySelector(".viz"),
      viz: new Viz(engine.context, canvas, engine.output, 20, 0),
      paused: true,
      clearColor: "#FFF"
    };
  },
  methods: {
    cycleViz() {
      vizMode = (vizMode + 1) % vm.meter; // engine.meter;
      viz.mode = vizMode - 1;
      viz.paused = vizMode === 0;
      if (vizMode === 0) viz.clear("#FFF");
      vm.vizLabel = vizMode === 0 ? "(click to toggle visualizer)" : "";
    }
  }
};
</script>