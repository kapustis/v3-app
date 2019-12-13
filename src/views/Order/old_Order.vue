<template>
    <v-container fluid>
        <v-row justify="center" :id=" this.id">
            <v-col cols="12" md="8" :id=" this.id">
                <material-card color="green" title="Редактирование Заказа" :text="order.createAt">
                    <v-form>
                        <v-container class="py-0">
                            <v-row>
                                <v-col cols="12" md="4">
                                    <v-text-field label="Телефон" v-model="phone"/>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field name="name" label="Ф.И.О." v-model="name"/>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field type="email" label="Email" v-model="email"/>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field name="city" label="Город" v-model="city"/>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field label="Отделение Новой почты" v-model="address"/>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field label="Тип оплаты" type="text" v-model="payMethod"/>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-select
                                            :chips=false
                                            v-model="done"
                                            :items="statusOrder"
                                            item-text="desc"
                                            item-value="code"
                                            label="Статус Заказа"
                                    >
                                    </v-select>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field label="Скидка" type="text" v-model="discount"/>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field label="Сумма заказа" type="text" v-model="total"/>
                                </v-col>
                                <v-col cols="12">
                                    <v-switch label="Чёрный список" color="error" value="yes" hide-details v-model="ban"/>
                                </v-col>
                                <v-col cols="12">
                                    <v-textarea class="purple-input" label="Заметка к звказу" v-model="note"/>
                                </v-col>
                                <v-col cols="12" class="text-right">
                                    <v-btn color="success" @click="onUpdate">Сохранить</v-btn>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-form>
                </material-card>
            </v-col>
            <v-col cols="12" md="4">
                <material-card class="v-card-profile" v-for="(item, index) in cart" :key="index">
                    <v-img :src="item.imageSrc" height="194" :alt="item.title"/>
                    <v-card-text>{{item.title}}</v-card-text>
                </material-card>
                <!--todo добавить редактирование товара в заказе    -->
                <material-card style="background: #f44336">
                    <v-card-actions>
                        <div>
                            <v-select
                                    color="#18CE0F"
                                    label="Товары"
                                    v-model="select"
                                    :items="products"
                                    item-text="title"
                                    item-value="id"
                                    return-object
                                    outlined
                            />
                            <v-spacer/>
                            <v-btn color="primary" depressed @click="addCart">
                                <v-icon large color="blue-grey darken-2">mdi-plus-one</v-icon>
                            </v-btn>
                        </div>
                    </v-card-actions>
                </material-card>

            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: "Order",
        props: ['id'],
        computed: {
            ...mapGetters({
                products: 'products',
                loading: 'loading',
                statusOrder: 'getStatus'
            }),
            order() {
                return this.$store.getters.orderByID(this.id)
            },
        },
        created() {
            if (this.order) {
                this.phone = this.order.phone;
                this.name = this.order.name;
                this.email = this.order.email;
                this.city = this.order.city;
                this.address = this.order.address;
                this.payMethod = this.order.payMethod;
                this.done = this.order.done;
                this.discount = this.order.discount;
                this.total = this.order.total;
                this.ban = this.order.ban;
                this.cart = [...this.order.cart];
                this.note = this.order.note;
            }
        },
        data() {
            return {
                select: [],
                name: '',
                status: null,
                done: null,
                cart: null,
                payMethod: null,
                total: 0,
                discount: 0,
                ban: false,
                phone: null,
                email: null,
                address: null,
                city: null,
                note: ''
            }
        },
        methods: {
            addCart() {
                // eslint-disable-next-line no-console
                console.log('add to cart in editOrder')
            },
            onUpdate() {
                let edOr = {
                    name: this.name,
                    phone: this.phone,
                    city: this.city,
                    address: this.address,
                    payMethod: this.payMethod,
                    email: this.email,
                    cart: this.cart,
                    discount: this.discount,
                    note: this.note,
                    total: this.total,
                    done: this.done,
                };
                if (this.ban) {
                    // eslint-disable-next-line no-console
                    console.log('Сделай бан систему')
                }

                this.$store.dispatch('updateOrder', {id: this.order.id, edOr});
            }
        }

    }
</script>

<style scoped>
    .v-card-profile {
        background: #3598dc;
    }
</style>