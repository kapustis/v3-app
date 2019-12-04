import firebase from 'firebase/app'


const actions = {
    async createTypeProduct({dispatch}, name) {
        try {
            const types = await firebase.database().ref(`typeProduct`).push({name});
            return {name, id: types.key}
        } catch (e) {
            dispatch('setError', e.message);
            throw e
        }
    },
    async fetchTypeProduct({commit}) {
        try {
            const types = (await firebase.database().ref(`typeProduct`).once('value')).val() || {};
            return Object.keys(types).map(key => ({...types[key], id: key}))
        } catch (e) {
            commit('setError', e);
            throw e
        }
    },
    async fetchTypeById({dispatch}, id) {
        try {
            const seasons = (await firebase.database().ref(`seasonProduct`).child(id).once('value')).val() || {}
            return {...seasons, id}
        } catch (e) {
            dispatch('setError', e);
            throw e
        }
    },
    async updateTypeProduct({dispatch}, {id, name}) {
        try {
            await firebase.database().ref(`seasonProduct`).child(id).update({name})
        } catch (e) {
            dispatch('setError', e.message);
            throw e
        }
    },

};

export default {
    // namespaced: true,
    // state,
    // getters,
    actions,
    // mutations
}




