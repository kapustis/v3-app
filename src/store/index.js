import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
// import the auto exporter
import modules from './modules';


Vue.use(Vuex);
const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
	modules,
	state: {
		drawer: false,
	},
	getters:{},
	mutations: {
		SET_DRAWER: (state, payload) => (state.drawer = payload),
		toggleDrawer: state => (state.drawer = !state.drawer)
	},
	strict: debug,
	plugins: debug ? [createLogger()] : [],
})
