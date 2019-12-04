<template>
    <v-container>
        <v-layout row>
            <v-flex xs12>
                <h1 class="text--secondary mb-3">Orders</h1>
                <v-list subheader two-line>
                    <v-list-item v-for="order in orders" :key="order.id">
                        <v-list-item-action>
                            <v-checkbox :input-value="order.done" @change="markDone(order)" color="success"></v-checkbox>
                            <!--              :disabled="!order.done"-->
                        </v-list-item-action>

                        <v-list-item-content>
                            <v-list-item-title>{{order.name}}</v-list-item-title>
                            <v-list-item-subtitle>{{order.phone}}</v-list-item-subtitle>
                        </v-list-item-content>
                        <v-list-item-action>
                            <v-btn :to="'/advertising/' + order.adId" class="primary">Open</v-btn>
                        </v-list-item-action>
                    </v-list-item>
                </v-list>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
	import {
		mapGetters,
		// mapMutations,
		// mapActions
	} from 'vuex'

	export default {
		name: 'Orders',
		mounted() {
			this.$store.dispatch('fetchOrders')
		},

		computed: {
			loading() {
				return this.$store.getters.loading
			},
			// orders() {
			// 	return this.$store.getters.getOrders
			// },
			...mapGetters({
				orders: 'getOrders'
			})
		},
		data() {
			return {}
		},
		methods: {
			markOrderStatus(order) {
				order.done = true
			}
		}
	}
</script>

<style scoped>

</style>
