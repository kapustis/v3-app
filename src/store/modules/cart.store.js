const state = {
    items: [], //[{ id, quantity }]  items ? JSON.parse(items) :
};
const getters = {
    getCart(state) {
        return state.items;
    },
    getCartCount(state) {
        let sum = 0;
        for (let i = 0; i < state.items.length; i++) {
            sum += state.items[i].quantity;
        }
        return sum;
    },
    cartProducts: (state, getters) => {
        return state.items.map(({id, quantity}) => {
            const product = getters.products.find(p => p.id === id);
            return {
                id: id,
                title: product.title,
                price: product.price,
                imageSrc: product.imageSrc[0],
                quantity
            }
        })
    },
    cartTotalPrice: (state, getters) => {
        return getters.cartProducts.reduce((total, product) => {
            return total + product.price * product.quantity
        }, 0)
    },
};
const mutations = {
    pushProductToCart(state, {id}) {
        state.items.push({id, quantity: 1});
    },
    // SAVE_CART(state) {
    //     window.localStorage.setItem('cart', JSON.stringify(state.items));
    //     window.localStorage.setItem('cartCount', state.cartCount);
    // },
    UPDATE_QUANTITY(state, {id, count}) {
        const cartItem = state.items.find(p => p.id === id);
        cartItem.quantity = Math.round((count += parseInt(cartItem.quantity)) * 100) / 100;
        state.cartCount = state.cartCount += count;
    },
    DELETE_PRODUCT(state, index) {
        state.items.splice(index, 1)
    },
    CLEAR_CART() {
        state.items = [];
    }
};
const actions = {
    addToShoppingCart({state, commit, dispatch}, product) {
        if (product.inventory > 0) {
            const cartItem = state.items.find(item => item.id === product.id);
            if (!cartItem) {
                commit('pushProductToCart', {id: product.id});
                commit('decrementProductInventory', {id: product.id});
            } else {
                commit('UPDATE_QUANTITY', ({id: cartItem.id, count: 1}));
                commit('decrementProductInventory', {id: product.id});
            }
        } else {
            dispatch('setError', 'Больше нет в наличии');
        }
    },
    updateQuantity({commit, dispatch, getters}, {id, count}) {
        const product = getters.products.find(p => p.id === id);
        const item = getters.getCart.find(p => p.id === id);
        if (parseInt(count) >0) {
            if (product.inventory > 0) {
                commit('UPDATE_QUANTITY', {id: id, count: count});
                commit('decrementProductInventory', {id: product.id});
            } else {
                dispatch('setError', 'Больше нет в наличии');
            }
        } else {
            if (item.quantity > 1) {
                commit('UPDATE_QUANTITY', {id: id, count: count});
                commit('incrementProductInventory', {id: product.id});
            } /*else {
                dispatch('setError', 'ноль незя (сотавить или удалить это else)');
            }*/
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
