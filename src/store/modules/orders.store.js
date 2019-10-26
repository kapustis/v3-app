import firebase from 'firebase/app'

class Order {
    constructor(name, phone, city, address, payMethod, email, cart = [], createAt = null, done = "Не обработаный заказ", id = null) {
        this.name = name;
        this.phone = phone;
        this.city = city;
        this.address = address;
        this.payMethod = payMethod;
        this.email = email;
        this.cart = cart;
        this.createAt = createAt;
        this.done = done;
        this.id = id;
    }
}

const state = {
    orders: [],
    status: { 0:'Не обработан',
		1:'Ожидает отправки',
		2:'Товар отправлен',
		3:'Деньги получины',
		thre:'Не отправлен',
		4:'Возврат',
		5:'Не забрали',
	}


};
const getters = {
    getOrders(state) {
        return state.orders
    },
    getStatus(state) {
        return state.status;
    }
};
const mutations = {
    SET_ORDERS(state, orders) {
        state.orders = orders
    },
};
const actions = {
    async createOrder({commit, dispatch}, payload) {
        let newOrder = new Order(
            payload.name,
            payload.phone,
            payload.city,
            payload.address,
            payload.payMethod,
            payload.email,
            payload.cart,
            'syka'
        );
        dispatch('clearError',);
        try {
            await firebase.database().ref(`orders`).push(newOrder);
            commit('CLEAR_CART')
        } catch (e) {
            commit('SET_ERROR', e.message);
            throw e
        }
    },
    async fetchOrders({commit}) {
        let resOrders = [];
        try {
            const orders = (await firebase.database().ref(`orders`).once('value')).val() || {};
            Object.keys(orders).forEach(key => {
                const o = orders[key];
                resOrders.push(new Order(o.name, o.phone, o.city, o.address, o.payMethod, o.email, o.cart, o.createAt, o.done, key))
            });
            commit('SET_ORDERS', resOrders)
        } catch (e) {
            commit('SET_ERROR', e.message);
            throw e
        }
    },
    async markOrderStatus({dispatch}, payload) {
        dispatch('clearError');
        try {
            await firebase.database().ref(`orders`).child(payload).update({done: true})
        } catch (e) {
            dispatch('setError', e.message);
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

