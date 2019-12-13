import firebase from "firebase/app";
import dateTimeFilter from "../../filters/dateTime.filter";

class Order {
    constructor(
        name,
        phone,
        city,
        address,
        payMethod,
        email,
        cart = [],
        done,
        discount,
        note = "",
        total,
        createAt,
        id = null
    ) {
        this.name = name;
        this.phone = phone;
        this.city = city;
        this.address = address;
        this.payMethod = payMethod;
        this.email = email;
        this.cart = cart;
        this.done = done;
        this.discount = discount;
        this.note = note;
        this.total = total;
        this.createAt = createAt;
        this.id = id;
    }
}

const state = {
    orders: [],
    payMethod: {0: "При получении +35", 1: "На банковскую карту"},
    status: [
        {code: 'notProcessed', desc: "Не обработан"},
        {code: 'awaitDelivery', desc: "Ожидает отправки",},
        {code: 'productSend', desc: "Товар отправлен",},
        {code: 'moneyReceived', desc: "Деньги получены",},
        {code: 'notSend', desc: "Не отправлен",},
        {code: 'backSend', desc: "Возврат",},
        {code: 'notTaken', desc: "Не забрали",},
    ]
};
const getters = {
    getNewOrders(state) {
        // return state.orders.filter(
        //     orders => orders.done === state.status[0].code
        // );
        return state.orders;
    },
    getOrders(state) {
        return state.orders;
    },
    getStatus(state) {
        return state.status;
    },
    orderByID(state) {
        return oId => {
            return state.orders.find(o => o.id === oId)
        };
    }
};
const mutations = {
    SET_ORDERS(state, orders) {
        state.orders = orders;
    },
    UPDATE_ORDER(state, payload) {
        const order = state.orders.find(o => {
            return o.id === payload.id;
        });
        order.done = payload.done;
    }
};
const actions = {
    async createOrder({commit, dispatch}, payload) {
        let date = new Date();
        let newOrder = new Order(
            payload.name,
            payload.phone,
            payload.city,
            payload.address,
            payload.payMethod,
            payload.email,
            payload.cart,
            state.status[0].code,
            payload.discount,
            payload.total,
            date
        );
        date = dateTimeFilter(date, "datetime");
        dispatch("clearError");
        try {
            await firebase.database().ref(`orders`).push(newOrder);
            let keys = Object.keys(payload.cart);
            for (let i = 0; i < keys.length; i++) {
                dispatch("decrementProductInventoryDB", payload.cart[i].id);
            }
            commit("CLEAR_CART");
        } catch (e) {
            commit("SET_ERROR", e.message);
            throw e;
        }
    },
    async fetchOrders({commit}) {
        let resOrders = [];
        try {
            const orders = (await firebase.database().ref(`orders`).once("value")).val() || {};
            Object.keys(orders).forEach(key => {
                const o = orders[key];
                resOrders.push(
                    new Order(
                        o.name,
                        o.phone,
                        o.city,
                        o.address,
                        o.payMethod,
                        o.email,
                        o.cart,
                        o.done,
                        o.discount,
                        o.note,
                        o.total,
                        o.createAt,
                        key
                    )
                );
            });
            commit("SET_ORDERS", resOrders);
        } catch (e) {
            commit("SET_ERROR", e.message);
            throw e;
        }
    },
    async updateOrder({commit, dispatch}, {id, edOr}) {
        dispatch("clearError");
        dispatch("setLoading", true);
        try {
            await firebase.database().ref("orders").child(id).update(edOr);
            commit("UPDATE_ORDER", {
                id: id,
                done: edOr.done,
                phone: edOr.phone,
                city: edOr.city,
                address: edOr.address,
            });
            dispatch("setLoading", false);
        } catch (e) {
            dispatch("setLoading", false);
            dispatch("setError", e.message);
            throw e;
        }
    },
    async markOrderStatus({dispatch}, payload) {
        dispatch("clearError");
        try {
            await firebase
                .database()
                .ref(`orders`)
                .child(payload)
                .update({done: true});
        } catch (e) {
            dispatch("setError", e.message);
            throw e;
        }
    }
};

export default {
    // namespaced: true,
    state,
    getters,
    actions,
    mutations
};
