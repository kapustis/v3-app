<template>
    <v-container>
        <v-card>
            <v-card-title>
                Не обработаные заказы
                <v-spacer></v-spacer>
                <v-text-field
                        v-model="search"
                        append-icon="search"
                        label="Поиск"
                        single-line
                        hide-details
                ></v-text-field>
            </v-card-title>
            <v-data-table
                    :headers="headers"
                    :items="orders"
                    :search="search"
                    :footer-props="{
                      itemsPerPageText: 'Строк на странице',
                      itemsPerPageAllText: 'Все',
                      // itemsPerPage
                      noResultsText: 'Пусто',
                      showFirstLastPage: true,
                      firstIcon: 'mdi-arrow-collapse-left',
                      lastIcon: 'mdi-arrow-collapse-right',
                      prevIcon: 'mdi-minus',
                      nextIcon: 'mdi-plus'
                    }"
            >
                <template v-slot:item.cart="{ item }">
                    <p v-for="(product,index) in item.cart" :key="index">
                        <img :src="product.imageSrc[0]" width="75" :alt="product.title">
                        {{product.title.split('.')[0]}}
                    </p>
                </template>
                <template v-slot:item.city="{ item }">
                    <p>{{item.name}} {{item.phone}}</p>
                    <p>Город {{item.city}}</p>
                    <p>отделение {{item.address}}</p>
                    <p class="success">{{item.payMethod}}</p>
                </template>
            </v-data-table>
        </v-card>
    </v-container>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: "NewOrders",
        created() {
            this.$store.dispatch('fetchOrders')
        },
        computed: {
            ...mapGetters({
                orders: 'getOrders',
                status: 'getStatus'
            })
        },
        data() {
            return {
                search: '',
                headers: [
                    {text: 'Товар', align: 'left'/*, sortable: false*/, value: 'cart'},
                    {text: 'ФИО', value: 'city'},
                    {text: 'Статус', value: 'done'},
                    {text: 'Дата', value: 'address'},
                ],
            }
        },
        methods: {
            prData(id) {
                return this.$store.getters.productByID(id)
            }
        }
    }
</script>

<style scoped>

</style>