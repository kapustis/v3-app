<template>
    <div v-if="!loading">
        <v-container grid-list-lg>
            <v-layout row wrap>
                <v-flex xs12 sm6 md4 v-for="product of products" :key="product.id">
                    <v-card>
                        <router-link :to="'/product/' + product.id">
                            <v-img :src="product.imageSrc[0]" height="200px"></v-img>
                        </router-link>
                        <v-card-title  primary-title class="ho">
                            <router-link :to="'/product/' + product.id" >
                                <h3 class="headline mb-0">{{product.title}}</h3>
                            </router-link>
                        </v-card-title>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn-toggle>
                                <v-btn raised class="success" @click="addToCart(product)">В корзину</v-btn>
                                <app-buy :product="product"></app-buy>
                            </v-btn-toggle>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
    <div v-else>
        <v-progress-linear indeterminate color="yellow darken-2"></v-progress-linear>
        <br>
        <v-progress-linear indeterminate color="green"></v-progress-linear>
        <br>
        <v-progress-linear indeterminate color="teal"></v-progress-linear>
        <br>
        <v-progress-linear indeterminate color="cyan"></v-progress-linear>
    </div>
</template>

<script>
	import {
		mapGetters,
		// mapMutations
		// mapActions
	} from 'vuex'

	export default {
		name: 'Home',
		computed: {
			...mapGetters({
				products: 'product',
				promoAdvertising: 'promoProduct',
				loading: 'loading'
			}),
		},
      methods:{
			addToCart(products){
              this.$store.dispatch('addToShoppingCart',products)
            }
      }
		// async mounted() {
		// 	this.$store.dispatch('selectAdvertising');
		// }
	}
</script>

<style scoped>
    .center-cor {
        background-color: #EF6C00;
        display: flex;
        justify-content: center;
        align-items: center;
        /*height: 100%;*/
        width: 100%;
    }

    .center-cor:hover {
        cursor: pointer;
    }

    .ho {
        -moz-transition: all 0.4s;
        -webkit-transition: all 0.4s;
        -ms-transition: all 0.4s;
        -o-transition: all 0.4s;
        transition: all 0.4s;
        opacity: 1;
        filter: alpha(opacity=100);
    }

    .ho:hover {
        opacity: 0.5;
        filter: alpha(opacity=50);
    }
</style>
