import firebase from 'firebase/app'


const actions = {
    async createSizeProduct({dispatch}, name) {
        try {
            const sizeProduct = await firebase.database().ref(`sizeProduct`).push({name});
            return {name, id: sizeProduct.key}
        } catch (e) {
            dispatch('setError', e.message);
            throw e
        }
    },
    async fetchSizeProduct({commit}) {
        try {
            const sizeProduct = (await firebase.database().ref(`sizeProduct`).once('value')).val() || {};
            return Object.keys(sizeProduct).map(key => ({...sizeProduct[key], id: key}))
        } catch (e) {
            commit('setError', e);
            throw e
        }
    },
    async fetchSizeById({dispatch}, id) {
        try {
            const size = (await firebase.database().ref(`sizeProduct`).child(id).once('value')).val() || {};
            return {...size, id}
        } catch (e) {
            dispatch('setError', e);
            throw e
        }
    },
    async updateSizeProduct({dispatch}, {id, name}) {
        try {
            await firebase.database().ref(`sizeProduct`).child(id).update({name})
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




