import Vue from "vue";
import App from "./App.vue";

import SoundPlayer from "../demo/lib/soundPlayer";
import Part from "../demo/lib/part";
var engine = window.engine;

Vue.config.productionTip = false;

var vm = new Vue({
  render: h => h(App)
}).$mount("#app");

// Load and manages song modules
function Manager(engine) {
  var ctx = engine.context;
  var dest = engine.input;

  // sound player class instance
  var player = new SoundPlayer(engine);
  var meter = 3; //4;

  // abstracted part creation
  var parts = {};
  var createPart = (moduleName, params, callback) => {
    var p = params || {};
    var part = new Part(ctx, dest, player, p.gain, p.pan, p.comp, p.meter);
    parts[moduleName] = parts[moduleName] || [];
    parts[moduleName].push(part);
    callback(part);
    return part;
  };

  // logic for initializing a song module
  var sharedState = {};
  var initSongModule = (name, Mod) => {
    var partMaker = (params, cb) => createPart(name, params, cb);
    var mod = new Mod(sharedState, partMaker);
    return mod;
  };

  // song module loading, storage, disposal
  var modules = {};
  setupHMR((name, mod) => {
    if (parts[name]) {
      while (parts[name].length) parts[name].pop().dispose();
    }
    modules[name] = initSongModule(name, mod.default || mod);
  });

  // Internal beat loop
  var beatCount = 0;

  engine.onBeat = t => {
    player.timeUntilNextBeat = t;
    var bar = Math.floor(beatCount / meter); // 4);
    var beat = beatCount % meter; // 4;
    Object.keys(parts).forEach(key => {
      parts[key].forEach(p => p.beforeBeat(bar, beat));
    });
    Object.keys(parts).forEach(key => {
      parts[key].forEach(p => p.onBeat(bar, beat));
    });
    beatCount++;
  };
}

// Load modules, triggers callback on HMR reloads
var getReq = () => require.context("../song", true, /\.js$/);

function setupHMR(callback) {
  var cached = {};
  var req = getReq();

  var getModule = key => {
    var id = req.resolve(key);
    var mod = req(key);
    if (mod === cached[id]) return;
    callback(id, mod, cached[id] || null);
    cached[id] = mod;
  };

  // initial require
  req.keys().forEach(key => getModule(key));

  // HMR events
  if (module.hot)
    module.hot.accept(req.id, () => {
      req = getReq();
      req.keys().forEach(key => {
        // try block prevents webpack from reloading page on module error
        try {
          getModule(key);
        } catch (err) {}
      });
    });
}

var manager = new Manager(engine);
window.viz = viz;
window.manager = manager;
