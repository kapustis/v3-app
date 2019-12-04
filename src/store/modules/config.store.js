import firebase from 'firebase/app'


const actions = {
	// async fetchTypeProduct({commit}, {nameConfig}) {
	// 	try {
	// 		const typeProduct = (await firebase.database().ref(`${nameConfig}`).once('value')).val() || {};
	// 		return Object.keys(typeProduct).map(key => ({...typeProduct[key], id: key}))
	// 	} catch (e) {
	// 		commit('setError', e);
	// 		throw e
	// 	}
	// },
	async fetchCategoryById({dispatch}, id) {
		try {
			const category = (await firebase.database().ref(`categories`).child(id).once('value')).val() || {}
			return {...category, id}
		} catch (e) {
			dispatch('setError', e);
			throw e
		}
	},
	async updateConfigProduct({dispatch}, {id, name, nameConfig}) {
		try {
			await firebase.database().ref(`${nameConfig}`).child(id).update({name})
		} catch (e) {
			dispatch('setError', e.message);
			throw e
		}
	},
	async createConfigProduct({dispatch}, {name, nameConfig}) {
		try {
			const typeProduct = await firebase.database().ref(`${nameConfig}`).push({name});
			return {name, id: typeProduct.key}
		} catch (e) {
			dispatch('setError', e.message);
			throw e
		}
	}
};

export default {
	// namespaced: true,
	// state,
	// getters,
	actions,
	// mutations
}




