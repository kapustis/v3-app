<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div>
        <v-app-bar color="teal" dark hide-on-scroll>
            <v-app-bar-nav-icon @click="toggleDrawer" class="hidden-md-and-up"></v-app-bar-nav-icon>
            <v-toolbar-title>
                <v-btn text>
                    <router-link :to="'/'" tag="span">V-App</router-link>
                </v-btn>
            </v-toolbar-title>

            <div class="flex-grow-1"></div>
            <div class="hidden-sm-and-down">
                <v-btn v-for="link in links" :key="link.title" :to="link.url" text>
                    <v-icon left>{{link.icon}}</v-icon>
                    {{link.title}}
                </v-btn>
                <v-btn icon text :to="'/cart'">
                    <v-badge bottom>
                        <template v-slot:badge v-if="countCart > 0">{{countCart}}</template>
                        <v-icon>shopping_cart</v-icon>
                    </v-badge>
                </v-btn>

            </div>

        </v-app-bar>
    </div>
</template>

<script>
	// Utilities
	import {mapGetters, mapMutations} from 'vuex'

	export default {
		name: "AppBar",
		computed: {
			...mapGetters({
				countCart: 'getCartCount',
			}),

			inSignUser() {
				return this.$store.getters.inSignUser
			},
			links() {
				if (this.inSignUser) {
					return [
						{title: 'Orders', icon: 'bookmark_border', url: '/orders'},
						{title: 'New ad', icon: 'note_add', url: '/new'},
						{title: 'My ads', icon: 'list', url: '/list'}
					]
				}
				return [
					{title: 'Контакты', icon: 'account_box', url: '/contacts'},
					{title: 'Оплата и доставка', icon: 'account_box', url: '/paymentAndDelivery'},
				]
			}
		},
		data() {
			return {}
		},
		methods: {
			...mapMutations(['toggleDrawer']),
			logoutUser() {
				this.$store.dispatch('logout');
				if (this.$router.currentRoute.path === '/') {
					window.location.href = '/';
					// this.$router.go('/') // it is not the right decision
				} else {
					this.$router.push('/');
				}
			}
		}
	}
</script>

<style scoped>

</style>
