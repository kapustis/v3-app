<template>
    <v-container>
        <v-card>
            <v-card-title> Не обработаные заказы
                <v-spacer></v-spacer>
                <v-text-field
                        v-model="search"
                        append-icon="search"
                        label="Поиск"
                        single-line
                        hide-details
                ></v-text-field>
                <v-spacer></v-spacer>
                <v-btn class="btn waves-effect waves-light btn-small" @click="refresh">
                    <i class="material-icons">refresh</i>
                </v-btn>
            </v-card-title>
            <v-data-table
                    :headers="headers"
                    :items="orders"
                    :search="search"
                    :footer-props="{
                      itemsPerPageText: 'Строк на странице',
                      itemsPerPageAllText: 'Все',
                      noResultsText: 'Пусто',
                      showFirstLastPage: true,
                      firstIcon: 'mdi-arrow-collapse-left',
                      lastIcon: 'mdi-arrow-collapse-right',
                      prevIcon: 'mdi-minus',
                      nextIcon: 'mdi-plus'
                    }"
            >
                <template v-slot:item.cart="{ item }">
                    <div v-for="(product,index) in item.cart" :key="index">
                        <img :src="product.imageSrc" width="75" :alt="product.title">
                        {{product.title}}
                    </div>
                </template>
                <template v-slot:item.city="{ item }">
                    <div>
                        <p>{{item.name}} {{item.phone}}</p>
                        <p>Город {{item.city}}</p>
                        <p>Отделение {{item.address}}</p>
                        <p class="success">{{item.payMethod}}</p>
                    </div>

                </template>
                <template v-slot:item.action="{ item }">
                    <v-btn icon :to="'/order/'+ item.id" ><v-icon small class="mr-2">edit</v-icon></v-btn>

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
            this.$store.dispatch('fetchOrders');
            // setInterval(() => {
            //     this.$store.dispatch('fetchOrders')
            // }, 60000)
        },
        computed: {
            ...mapGetters({
                orders: 'getOrders',
                status: 'getStatus',
            }),
        },
        // async mounted() {
        //     if (this.getOrders.length === 0) {
        //         await this.fetchOrders;
        //     }
        // },
        data() {
            return {
                search: '',
                headers: [
                    {text: 'Товар', align: 'left', value: 'cart',},
                    {text: 'ФИО', value: 'city'},
                    {text: 'Статус', value: 'done'},
                    {text: 'Дата', value: 'createAt'},
                    { text: 'Actions', value: 'action', sortable: false }
                ],
            }
        },
        methods:{
            // ...mapActions(['fetchOrders']),
            refresh(){
                this.$store.dispatch('fetchOrders')
            }
        }
    }
</script>

<style scoped>

</style>