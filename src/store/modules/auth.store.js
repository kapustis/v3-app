import firebase from 'firebase/app'

class User {
	constructor(id) {
		this.id = id;
	}
}


const state = {
	user: false
};
const getters = {
	user(state) {
		return state.user
	},
	inSignUser(state) {
		return state.user !== false
	}
};
const mutations = {
	SET_USER(state, payload) {
		state.user = payload
	}
};
const actions = {
	async login({dispatch, commit}, {email, password}) {
		dispatch('clearError');
		dispatch('setLoading', true);
		try {
			const user = await firebase.auth().signInWithEmailAndPassword(email, password);
			commit('SET_USER', new User(user.user.uid));
			dispatch('setLoading', false)
		} catch (e) {
			dispatch('setLoading', false);
			dispatch('setError', e.message);
			throw e
		}
	},
	async register({dispatch, commit}, payload) {
		try {
			await firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password);
			const uid = await dispatch('getUid');
			await firebase.database().ref(`/users/${uid}/info`).set(payload)
		} catch (e) {
			commit('setError', e);
			throw e
		}
	},
	getUid() {
		const user = firebase.auth().currentUser;
		return user ? user.uid : null
	},
	async logout() {
		await firebase.auth().signOut();
		window.location.href = '/';
	},
	autoLoginUser({commit}, payload) {
		commit('SET_USER', new User(payload.uid))
	},
};

export default {
	// namespaced: true,
	state,
	getters,
	actions,
	mutations
}
