import firebase from 'firebase/app'

require('firebase/storage');

class Product {
	constructor(title, description, price, quantityInStock, idSeason, idType, idMaterial, ownerId, imageSrc = [], promo = false, id = null) {
		this.title = title;
		this.description = description;
		this.price = price;
		this.quantityInStock = quantityInStock;
		this.idSeason = idSeason;
		this.idType = idType;
		this.idMaterial = idMaterial;
		this.ownerId = ownerId;
		this.imageSrc = imageSrc;
		this.promo = promo;
		this.id = id
	}
}


const state = {
		product: []
	};
const	getters = {
		product(state) {
			return state.product
		},
		promoProduct(state) {
			return state.product.filter(product => {
				return product.promo
			})
		},
		myProduct(state,getters) {
			return state.product
				.filter(ad => {
					return ad.ownerId === getters.user.id;
				})
		},
		productByID(state) {
			return adId => {
				return state.product.find(ad => ad.id === adId)
			}
		}
	};
const mutations = {
		createProduct(state, payload) {
			state.product.push(payload)
		},
		loadProduct(state, payload) {
			state.product = payload
		},
		updateProduct(state, payload) {
			const prod = state.product.find(a => {
				return a.id === payload.id
			});
			prod.title = payload.title;
			prod.description = payload.description
		}
	};
const	actions= {
		async createProduct({commit, dispatch}, payload) {
			const user = firebase.auth().currentUser;
			const image = payload.image;
			let downloadURL = [];
			dispatch('clearError');
			dispatch('setLoading', true);
			const newProduct = new Product(
				payload.title,
				payload.description,
				payload.price,
				payload.quantityInStock,
				payload.idSeason,
				payload.idType,
				payload.idMaterial,
				user ? user.uid : null,
				'',
				payload.promo
			);
			try {
				const product = await firebase.database().ref('product').push(newProduct);
				
				let keys = Object.keys(image);

				for (let i = 0; i < keys.length; i++ ) {
					const imageExt = image[i].name.slice(image[i].name.lastIndexOf('.'));
					let fileData = await firebase.storage().ref(`product/${product.key} ${i} ${imageExt}`).put(image[i]);
					downloadURL.push(await firebase.storage().ref().child(fileData.ref.fullPath).getDownloadURL());
				}

				await firebase.database().ref('product').child(product.key).update({imageSrc: downloadURL});

				commit('createProduct', {...newProduct, id: product.key, imageSrc: downloadURL});
				dispatch('setLoading', false);
			} catch (error) {
				dispatch('setLoading', false);
				dispatch('setError', error.message);
				throw error
			}
		},
		async selectProduct({commit, dispatch}) {
			const resProduct = [];
			dispatch('clearError');
			dispatch('setLoading', true);
			try {
				const query = (await firebase.database().ref('product').once('value')).val() || {};
				Object.keys(query).forEach(key => {
					const ad = query[key];
					resProduct.push(
						new Product(
							ad.title,
							ad.description,
							ad.price,
							ad.quantityInStock,
							ad.idSeason,
							ad.idType,
							ad.idMaterial,
							ad.ownerId,
							ad.imageSrc,
							ad.promo,
							key)
					)
				});
				commit('loadProduct', resProduct);
				dispatch('setLoading', false);
			} catch (e) {
				dispatch('setLoading', false);
				dispatch('setError', e.message);
				throw e
			}
		},
		async updateProduct({commit, dispatch}, payload) {
			dispatch('clearError');
			dispatch('setLoading', true);
			try {
				await firebase.database().ref('product').child(payload.id).update({
					title: payload.title,
					description: payload.description
				});
				commit('updateProduct', {
					title: payload.title,
					description: payload.description,
					id: payload.id
				});
				dispatch('setLoading', false);
			} catch (error) {
				dispatch('setLoading', false);
				dispatch('setError', error.message);
				throw error
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

