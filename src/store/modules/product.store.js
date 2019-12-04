import firebase from 'firebase/app'

require('firebase/storage');
const uuidv1 = require('uuid/v1');

class Product {
    constructor(bought = 0, purchaseReturns = 0, profit,
                title, description, price, inventory,
                idSeason, idType, idMaterial, idSize,
                imageSrc = [], id = '') {
        this.bought = bought;
        this.description = description;
        this.idMaterial = idMaterial;
        this.idSeason = idSeason;
        this.idSize = idSize;
        this.idType = idType;
        this.id = id;
        this.imageSrc = imageSrc;
        this.inventory = inventory;
        this.price = price;
        this.profit = profit;
        this.purchaseReturns = purchaseReturns;
        this.title = title;
    }
}

const state = {
    products: []
};
const getters = {
    products(state) {
        return state.products
    },
    productByID(state) {
        return adId => {
            return state.products.find(ad => ad.id === adId)
        }
    }
};
const mutations = {
    createProduct(state, payload) {
        state.products.push(payload)
    },
    loadProduct(state, payload) {
        state.products = payload
    },
    updateProduct(state, product) {
        let prod = state.products.find(a => {
            return a.id === product.id
        });
        prod.bought = product.bought;
        prod.description = product.description;
        prod.inventory = product.inventory;
        prod.price = product.price;
        prod.profit = product.profit;
        prod.purchaseReturns = product.purchaseReturns;
        prod.title = product.title;
    },
    decrementProductInventory(state, {id}) {
        const product = state.products.find(product => product.id === id);
        product.inventory--;
    },
    incrementProductInventory(state, {id}) {
        const product = state.products.find(product => product.id === id);
        product.inventory++;
    },
    decrementImage(state, {id, index}) {
        const product = state.products.find(product => product.id === id);
        product.imageSrc.splice(index, 1);
    },
    incrementImage(state, {id, imageSrc}) {
        const product = state.products.find(product => product.id === id);
        if (!product.imageSrc) product.imageSrc = [];
        product.imageSrc.push(imageSrc);
    }
};
const actions = {
    async createProduct({commit, dispatch}, payload) {
        const image = payload.image;
        let downloadURL = [];
        dispatch('clearError');
        dispatch('setLoading', true);
        const newProduct = new Product(
            0, 0, 0,
            payload.title, payload.description,
            payload.price, payload.inventory,
            payload.idSeason, payload.idType,
            payload.idMaterial, payload.idSize,
            null, null,);
        try {
            const product = await firebase.database().ref('product').push(newProduct);
            let keys = Object.keys(image);
            for (let i = 0; i < keys.length; i++) {
                const imageExt = image[i].name.slice(image[i].name.lastIndexOf('.'));
                let fileData = await firebase.storage().ref(`product/${uuidv1()}${imageExt}`).put(image[i]);
                downloadURL.push(await firebase.storage().ref().child(fileData.ref.fullPath).getDownloadURL());
            }
            await firebase.database().ref('product').child(product.key).update({imageSrc: downloadURL});
            commit('createProduct', {...newProduct, id: product.key, imageSrc: downloadURL});
            dispatch('setLoading', false);
        } catch (e) {
            dispatch('setLoading', false);
            dispatch('setError', e.message);
            throw e
        }
    },
    async selectProduct({commit, dispatch}) {
        const resProduct = [];
        dispatch('clearError');
        dispatch('setLoading', true);
        try {
            const query = (await firebase.database().ref('product').once('value')).val() || {};
            Object.keys(query).forEach(key => {
                const pr = query[key];
                resProduct.push(new Product(pr.bought, pr.purchaseReturns, pr.profit, pr.title, pr.description, pr.price, pr.inventory, pr.idSeason, pr.idType, pr.idMaterial, pr.idSize, pr.imageSrc, key))
            });
            commit('loadProduct', resProduct);
            dispatch('setLoading', false);
        } catch (e) {
            dispatch('setLoading', false);
            dispatch('setError', e.message);
            throw e
        }
    },
    async updateProduct({commit, dispatch}, product) {
        dispatch('clearError');
        dispatch('setLoading', true);
        try {
            await firebase.database().ref('product').child(product.id).update(product);
            commit('updateProduct', {title: product.title, description: product.description, id: product.id});
            dispatch('setLoading', false);
        } catch (e) {
            dispatch('setLoading', false);
            dispatch('setError', e.message);
            throw e
        }
    },
    async decrementProductInventoryDB({dispatch, getters}, id) {
        dispatch('clearError');
        dispatch('setLoading', true);
        try {
            const product = getters.productByID(id);
            await firebase.database().ref('product').child(id).update({inventory: product.inventory,});
            dispatch('setLoading', false);
        } catch (e) {
            dispatch('setLoading', false);
            dispatch('setError', e.message);
            throw e
        }
    },
    async imageAdd({commit, dispatch}, {file, id}) {
        dispatch('clearError');
        dispatch('setLoading', true);
        let item = (await firebase.database().ref(`product/${id}/imageSrc`).once('value')).val() || [];
        try {
            const imageExt = file.name.slice(file.name.lastIndexOf('.'));
            let fileData = await firebase.storage().ref(`product/${uuidv1()}${imageExt}`).put(file);
            let imageSrc = await firebase.storage().ref().child(fileData.ref.fullPath).getDownloadURL();
            item.push(imageSrc);
            await firebase.database().ref('product').child(id).update({imageSrc: item});
            commit('incrementImage', {id, imageSrc});
        } catch (e) {
            dispatch('setLoading', false);
            dispatch('setError', e.message);
            throw e
        }
    },
    async imageDel({commit, getters,dispatch}, {image, index,id}) {
        dispatch('clearError');
        dispatch('setLoading', true);
        // Create a reference to the file to delete
        let nameImage = image.slice(image.lastIndexOf('%') + 3, image.lastIndexOf('?'));
        let desertRef = await firebase.storage().ref('product').child(nameImage);
        // Delete the file
        desertRef.delete().then(function () {
            // File deleted successfully
            commit('decrementImage', {id, index});
            const img = getters.productByID(id);
            firebase.database().ref('product').child(id).update({imageSrc: img.imageSrc});
            dispatch('setLoading', false);
        }).catch(function (e) {
            // Uh-oh, an error occurred!
            dispatch('setLoading', false);
            dispatch('setError', e.message);
            throw e
        });
    }
};


export default {
    // namespaced: true,
    state,
    getters,
    actions,
    mutations
}

