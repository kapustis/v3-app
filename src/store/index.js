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
	getters:{
		// createdAt(){
		// 	let dt = new Date();
		// 	return `${
		// 		(dt.getMonth() + 1).toString().padStart(2, '0')}/${
		// 		dt.getDate().toString().padStart(2, '0')}/${
		// 		dt.getFullYear().toString().padStart(4, '0')} ${
		// 		dt.getHours().toString().padStart(2, '0')}:${
		// 		dt.getMinutes().toString().padStart(2, '0')}:${
		// 		dt.getSeconds().toString().padStart(2, '0')}`;
		// }
	},
	mutations: {
		SET_DRAWER: (state, payload) => (state.drawer = payload),
		toggleDrawer: state => (state.drawer = !state.drawer)
	},
	strict: debug,
	plugins: debug ? [createLogger()] : [],
})
