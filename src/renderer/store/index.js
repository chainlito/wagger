import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('./modules', true, /\.js$/);

// You do not need `import app from './modules/app'` it will auto require all
// Vuex module from modules file.
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
  const value = modulesFiles(modulePath);
  modules[moduleName] = value.default;
  return modules;
}, {});

export default new Vuex.Store({
  modules,
  // In strict mode, whenever Vuex state is mutated outside of mutation
  // handlers, an error will be thrown. Do not enable strict mode when
  // deploying for production to avoid the performance cost!
  strict: process.env.NODE_ENV !== 'production'
});
