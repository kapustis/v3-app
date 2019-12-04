<template>
    <v-container fluid>
        <v-row justify="center" :id=" this.id">
            <v-col cols="12" md="8" :id=" this.id">
                <material-card color="green" title="Редактирование Заказа" :text="order.createAt">
                    <v-form>
                        <v-container class="py-0">
                            <v-row>
                                <v-col cols="12" md="4">
                                    <v-text-field label="Телефон" :value="order.phone"/>
                                </v-col>

                                <v-col cols="12" md="4">
                                    <v-text-field name="name" label="Ф.И.О." :value="order.name" />
                                </v-col>

                                <v-col cols="12" md="4">
                                    <v-text-field  type="email" label="Email" :value="order.email"/>
                                </v-col>

                                <v-col cols="12" md="4">
                                    <v-text-field name="city" label="Город" :value="order.city"/>
                                </v-col>

                                <v-col cols="12" md="4">
                                    <v-text-field label="Отделение Новой почты" :value="order.address"/>
                                </v-col>

                                <v-col cols="12" md="4">
                                    <v-text-field label="Postal Code" type="text" v-model="payMethod"/>
                                </v-col>

                                <v-col cols="12" md="4">
                                    <v-text-field label="Postal Code" type="text" v-model="done"/>
                                </v-col>

                                <v-col cols="12" md="4">
                                    <v-text-field label="Скидка" type="text" v-model="discount"/>
                                </v-col>

                                <v-col cols="12" md="4">
                                    <v-text-field label="Total" type="text" v-model="total"/>
                                </v-col>

                                <v-col cols="12">
                                    <v-switch
                                            v-model="ban"
                                            label="Чёрный список"
                                            color="error"
                                            value="yes"
                                            hide-details
                                    />
                                </v-col>
                                <v-col cols="12">
                                    <v-textarea class="purple-input" label="About Me" value="Lorem ipsum dolor sit amet, consectetur adipiscing elit."/>
                                </v-col>
                                <v-col cols="12" class="text-right">
                                    <v-btn type="submit" color="success" @click="onUpdate">Сохранить</v-btn>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-form>
                </material-card>
            </v-col>
            <v-col cols="12" md="4">
                <material-card class="v-card-profile" v-for="(item, index) in cart" :key="index">
                    <v-img :src="item.imageSrc" height="194"/>
                    <v-card-text>
                        {{item.title}}
                    </v-card-text>
                </material-card>
<!--todo добавить редактирование товара в заказе    -->
<!--                <material-card>-->
<!--                    <v-card-actions>-->
<!--                        <div>-->
<!--                            <v-select-->
<!--                                    color="#18CE0F"-->
<!--                                    label="Товары"-->
<!--                                    v-model="select"-->
<!--                                    :items="products"-->
<!--                                    item-text="title"-->
<!--                                    item-value="id"-->
<!--                                    return-object-->
<!--                                    outlined-->
<!--                            />-->
<!--                            <v-spacer/>-->
<!--                            <v-btn color="primary" depressed @click="addCart">-->
<!--                                <v-icon large color="blue-grey darken-2">mdi-plus-one</v-icon>-->
<!--                            </v-btn>-->
<!--                        </div>-->
<!--                    </v-card-actions>-->
<!--                </material-card>-->

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
                loading: 'loading'
            }),
            order() {
                return this.$store.getters.orderByID(this.id)
            },
        },
        created() {
            this.status = this.$store.getters.getStatus;
            // const index = this.$router.currentRoute.params.id;
            // this.order =  this.$store.getters.orderByID(index);
            if (this.order) {
                this.done = this.order.done;
                this.payMethod = this.order.payMethod;
                this.cart = [...this.order.cart];
            }
        },
        data() {
            return {
                select: [],
                name:'' ,
                // order: null,
                status: null,
                done: null,
                cart: null,
                payMethod: null,
                total: 2520,
                discount: 0,
                ban: false
            }
        },
        methods: {
            onSave() {
                this.$store.dispatch('updateOrder', {
                    done: this.done,
                    id: this.order.id
                });
            },
            addCart() {
                this.cart.push(this.select);
            },
            dellCart(index) {
                this.cart.splice(index, 1)
            },
            onUpdate(){
                // eslint-disable-next-line no-console
                console.log(name)
            }
        }

    }
</script>

<style scoped>

</style>