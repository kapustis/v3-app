import firebase from 'firebase/app'


const actions = {
    async fetchSeasonProduct({commit}) {
        try {
            const seasons = (await firebase.database().ref(`seasonProduct`).once('value')).val() || {};
            return Object.keys(seasons).map(key => ({...seasons[key], id: key}))
        } catch (e) {
            commit('setError', e);
            throw e
        }
    },
    async fetchSeasonById({dispatch}, id) {
        try {
            const seasons = (await firebase.database().ref(`seasonProduct`).child(id).once('value')).val() || {}
            return {...seasons, id}
        } catch (e) {
            dispatch('setError', e);
            throw e
        }
    },
    async updateSeasonProduct({dispatch}, {id, name}) {
        try {
            await firebase.database().ref(`seasonProduct`).child(id).update({name})
        } catch (e) {
            dispatch('setError', e.message);
            throw e
        }
    },
    async createSeasonProduct({dispatch}, name) {
        try {
            const typeProduct = await firebase.database().ref(`seasonProduct`).push({name});
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




