import firebase from 'firebase/app'

const state = {
		info: {}
	};
const	getters = {
		info: s => s.info
	};
const	mutations = {
		setInfo(state, info) {
			state.info = info
		},
		clearInfo(state) {
			state.info = {}
		}
	};
const	actions = {
		async fetchInfo({dispatch, commit}) {
			try {
				const uid = await dispatch('auth/getUid', null, {root: true});
				const info = (await firebase.database().ref(`/users/${uid}/info`).once('value')).val();
				commit('setInfo', info)
			} catch (e) {
				commit('setError', e);
				throw e
			}
		}
	};

export default {
	// namespaced: true,
	state,
	getters,
	actions,
	mutations
}



