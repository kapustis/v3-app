<template>
    <v-navigation-drawer v-model="drawer" app temporary>
        <v-list dense>
            <v-list-item v-for="link of links" :key="link.title" :to="link.url">
                <v-list-item-action>
                    <v-icon color="pink">{{link.icon}}</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title v-text="link.title"></v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item v-if="inSignUser" @click="logout">
                <v-list-item-action>
                    <v-icon color="pink">exit_to_app</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title v-text="'Logout'"></v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
	// Utilities
	import {
		// mapGetters,
		mapMutations,
        mapActions
	} from 'vuex'

	export default {
		name: "NavDrawer",
		computed: {
			drawer: {
				get() {
					return this.$store.state.drawer
				},
				set(val) {
					this.SET_DRAWER(val)
				}
			},
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
					// {title: 'Login', icon: 'account_box', url: '/login'},
					// {title: 'Registration', icon: 'face', url: '/registration'}
				]
			}
		},
		methods: {
			...mapMutations(['setDrawer']),
            ...mapActions(['logout']),
		}
	}
</script>

<style scoped>

</style>