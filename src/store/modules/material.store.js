import firebase from 'firebase/app'


const actions = {
    async fetchMaterialProduct({commit}) {
        try {
            const materials = (await firebase.database().ref(`materialProduct`).once('value')).val() || {};
            return Object.keys(materials).map(key => ({...materials[key], id: key}))
        } catch (e) {
            commit('setError', e);
            throw e
        }
    },
    async fetchMaterialById({dispatch}, id) {
        try {
            const category = (await firebase.database().ref(`materialProduct`).child(id).once('value')).val() || {}
            return {...category, id}
        } catch (e) {
            dispatch('setError', e);
            throw e
        }
    },
    async updateMaterialProduct({dispatch}, {id, name}) {
        try {
            await firebase.database().ref(`$materialProduct`).child(id).update({name})
        } catch (e) {
            dispatch('setError', e.message);
            throw e
        }
    },
    async createMaterialProduct({dispatch}, name) {
        try {
            const typeProduct = await firebase.database().ref(`materialProduct`).push({name});
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




