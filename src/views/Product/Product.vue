<template>
    <v-container>
        <v-layout row :id=" this.id">
            <v-flex xs12 :id=" this.id">
                <v-card v-if="!loading">
                    <v-img :src="product.imageSrc[0]" height="300px"></v-img>
                    <v-card-text>
                        <h1 class="text--primary">{{product.title}}</h1>
                        <p>{{product.description}}</p>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
<!--                        <edit-ad :advertising="advertising1" v-if="isOwner"/>-->
                        <v-btn raised class="success">В корзину</v-btn>
                        <app-buy :product="product"></app-buy>
                    </v-card-actions>
                </v-card>
                <v-card v-else>
                    <v-progress-linear indeterminate color="yellow darken-2"></v-progress-linear>
                    <br>
                    <v-progress-linear indeterminate color="green"></v-progress-linear>
                    <br>
                    <v-progress-linear indeterminate color="teal"></v-progress-linear>
                    <br>
                    <v-progress-linear indeterminate color="cyan"></v-progress-linear>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'

	export default {
		name: 'Product',
		props: ['id'],
		computed: {
			...mapGetters({
				loading: 'loading',
				user: 'user'
			}),
			product() {
				return this.$store.getters.productByID(this.id)
			},
			isOwner() {
				return this.productByID.ownerId === this.$store.getters.user.id
			},
		},
		// components: {
			// EditAd: () => import('../../components/EditAdvertising');
            // eslint-disable-next-line vue/no-unused-components
            // Buy: () => import('../../components/shared/Buy')
		// }
	}
</script>
