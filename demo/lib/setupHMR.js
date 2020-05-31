// Load modules, triggers callback on Hot Module Reloads
//var getReq = () => require.context("../song", true, /\.js$/);
//const getReq = window.getReq;
/*
export function setupHMR(callback) {
  var cached = {};
  var req = window.getReq; //getReq;
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
*/
