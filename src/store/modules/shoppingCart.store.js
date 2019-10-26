const state = {
	shoppingCart: []
};
const getters = {
	getCart(state) {
		return state.shoppingCart
	}
};
const mutations = {
	addToShoppingCart(state, payload) {
		state.shoppingCart.push(payload)
	},
	UPDATE_QUANTITY(state, payload) {
		const prod = state.shoppingCart.find(p => {
			return p.id === payload.id
		});
		prod.quantity = Math.round((payload.count += parseInt(prod.quantity)) * 100) / 100;
	},
	DELETE_PRODUCT(state, index) {
		state.shoppingCart.splice(index, 1)
	},
	CLEAR_CART() {
		state.shoppingCart = []
	}
};
const actions = {
	addToShoppingCart({commit}, products) {
		const prod = state.shoppingCart.find(p => {
			return p.id === products.id
		});
		if (prod) {
			prod.quantity += 1;
		} else {
			products.quantity = 1;
			commit('addToShoppingCart', products)
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
