<template>
    <div v-if="!loading">
        <v-container grid-list-lg>
            <v-layout row wrap >
                <v-flex xs2 md1>
                    <v-checkbox
                            multiple
                            v-for="item in typeProduct"
                            :key="item.id"
                            :label="`${item.name}`"
                            :value="item.id"
                            v-model="selectedType"
                    />
                </v-flex>
                <v-flex xs2 md1>
                    <v-checkbox
                            multiple
                            v-for="item in seasonProduct"
                            :key="item.id"
                            :label="`${item.name}`"
                            :value="item.id"
                            v-model="selectedSeason"
                    />
                </v-flex>
                <v-flex xs2 md1>
                    <v-checkbox
                            multiple
                            v-for="item in materialProduct"
                            :key="item.id"
                            :label="`${item.name}`"
                            :value="item.id"
                            v-model="selectedMaterial"
                    />
                </v-flex>
            </v-layout>


            <v-layout row wrap>
                <v-flex xs12 sm6 md4 v-for="product of this.filterTest" :key="product.id">
                    <v-card>
                        <router-link :to="'/product/' + product.id">
                            <v-img :src="product.imageSrc[0]" height="200px" :alt="product.title"/>
                        </router-link>
                        <v-card-title primary-title class="ho">
                            <router-link :to="'/product/' + product.id">
                                <h3 class="headline mb-0">{{product.title}}</h3>
                            </router-link>
                        </v-card-title>
                        <v-card-actions>
                            <v-spacer/>
                            <v-btn-toggle>
                                <v-btn raised class="success" @click="addToShoppingCart(product)">В корзину</v-btn>
                                <app-buy :product="onBuy(product)"/>
                            </v-btn-toggle>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
    <div v-else>
        <v-progress-linear indeterminate color="yellow darken-2"/>
        <br>
        <v-progress-linear indeterminate color="green"/>
        <br>
        <v-progress-linear indeterminate color="teal"/>
        <br>
        <v-progress-linear indeterminate color="cyan"/>
    </div>
</template>

<script>
    import {
        mapGetters,
        mapActions
    } from 'vuex'

    export default {
        name: 'Home',
        async mounted() {
            this.typeProduct = await this.$store.dispatch('fetchTypeProduct');
            this.seasonProduct = await this.$store.dispatch('fetchSeasonProduct');
            this.materialProduct = await this.$store.dispatch('fetchMaterialProduct');
            this.sizeProduct = await this.$store.dispatch('fetchSizeProduct')
        },
        computed: {
            ...mapGetters({
                products: 'products',
                loading: 'loading'
            }),
            filterTest: function () {
                return this.products.filter( item =>{
                    let result = [true];
                    if (this.selectedType.length > 0) {
                        result.push(this.selectedType.indexOf(item.idType) > -1);
                    }
                    if (this.selectedSeason.length > 0) {
                        result.push(this.selectedSeason.indexOf(item.idSeason) > -1);
                    }
                    if (this.selectedMaterial.length > 0) {
                        result.push(this.selectedMaterial.indexOf(item.idMaterial) > -1);
                    }
                    return result.every(result => result);
                })
            }
        },
        data() {
            return {
                typeProduct: [],
                seasonProduct: [],
                materialProduct: [],
                sizeProduct: [],
                selectedType: '',
                selectedSeason: '',
                selectedMaterial: '',
                items: ''
            }
        },
        methods: {
            ...mapActions({addToShoppingCart: 'addToShoppingCart'}),
            onBuy(product) {
                const item = [];
                item.push({
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    imageSrc: product.imageSrc[0],
                    quantity: 1
                });
                return item
            }
        }

    }
</script>

<style scoped>

</style>
