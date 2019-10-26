import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins'
import vuetify from './plugins/vuetify';
import firebase from 'firebase/app'
import 'vuetify/dist/vuetify.min.css'
import AppBuy from './components/shared/Buy'


require('firebase/auth');
require('firebase/database');
require('firebase/firestore');

Vue.component('app-buy', AppBuy);

Vue.config.productionTip = false;

firebase.initializeApp({
	apiKey: 'AIzaSyAoDVxn1NdhAlSjwpVrGGFco3WiHOQjHyU',
	authDomain: 'shopsinglepageapplication.firebaseapp.com',
	databaseURL: 'https://shopsinglepageapplication.firebaseio.com',
	projectId: 'shopsinglepageapplication',
	storageBucket: 'shopsinglepageapplication.appspot.com',
	messagingSenderId: '223230455345',
	appId: '1:223230455345:web:50bc29d7df437e4d'
});


// let app;
// firebase.auth().onAuthStateChanged(() => {
// 	if (!app) {
// 		app = new Vue({
// 			router,
// 			vuetify,
// 			store,
// 			render: h => h(App),
// 			created() {
// 				this.$store.dispatch('selectAdvertising');
// 			}
// 		}).$mount('#app')
// 	}
// });

new Vue({
    router,
    vuetify,
    store,
    render: h => h(App),
    created() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.$store.dispatch('autoLoginUser', user)
            }
        });

        this.$store.dispatch('selectProduct');
    }
}).$mount('#app');
