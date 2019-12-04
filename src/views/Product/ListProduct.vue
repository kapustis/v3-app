<template>
    <v-container>
        <v-card>
            <v-card-title>
                Товары
                <div class="flex-grow-1"></div>
                <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details>
                </v-text-field>
                <v-btn fab icon class="primary white--text" :to="'new-product'">
                    <v-icon>create</v-icon>
                </v-btn>
            </v-card-title>
            <v-data-table
                    :loading="isLoading" loading-text="Loading... Please wait"
                    :headers="headers"
                    :items="product"
                    :search="search"
            >
                <template v-slot:item.imageSrc="{ item }">
                    <img :src="item.imageSrc[0]" height="75" alt="1">
                </template>
                <template v-slot:item.action="{ item }">
                <edit-product :product="item"></edit-product>

                    <!--                    <v-icon small color="red">mdi-eye-off</v-icon>-->
                    <!--                    <v-icon small color="green">mdi-eye</v-icon>-->
                </template>
                <template v-slot:no-data>
                    <v-btn color="primary" @click="initialize">Reset</v-btn>
                </template>
            </v-data-table>
        </v-card>
    </v-container>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: 'ListAdvertising',
        components: {
            EditProduct: () => import('./EditProduct'),
        },
        computed: {
            ...mapGetters({
                product: 'products',
                isLoading: 'loading',
                getOrders: 'getOrders',
            }),
        },
        data() {
            return {
                search: '',
                headers: [
                    {text: 'Рисунок', align: 'left', sortable: false, value: 'imageSrc',},
                    {text: 'Название', value: 'title'},
                    {text: 'Цена', value: 'price'},
                    {text: 'Количество', value: 'inventory'},
                    {text: 'Доход', value: 'profit'},
                    {text: 'Покупки', value: 'bought'},
                    {text: 'Возврат', value: 'purchaseReturns'},
                    {text: 'Actions', value: 'action', sortable: false},
                ],
            }
        },
        methods: {
            initialize() {
                this.$store.dispatch('selectProduct');
            },
        }
    }
</script>

<style>
    .v-data-table td {
        height: 90px;
    }
</style>
