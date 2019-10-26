<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-dialog v-model="dialog" persistent max-width="1000px">
        <template v-slot:activator="{on}">
            <v-btn color="success" dark v-on="on">Купить</v-btn>
        </template>
        <v-card>
            <v-card-title>
                <span class="headline">{{product.title}}</span>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12" md="6">
                            <v-text-field label="Фамилия Имя*" name="name" v-model="name" required></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                            <v-text-field label="Телефон*" name="phone" v-model="phone" required></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field label="Город" name="city" v-model="city" required></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field label="Номер отделения НОВОЙ ПОЧТЫ" name="address" v-model="address" required></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-select
                                    name="payMethod"
                                    v-model="payMethod"
                                    :items="['при получении + 35', 'На банковскую карту']"
                                    label="Способ оплаты*"
                                    required
                            ></v-select>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field label="Email*" name="email" v-model="email" required></v-text-field>
                        </v-col>
                    </v-row>
                </v-container>
                <small>*указывает на обязательное поле</small>
            </v-card-text>
            <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn color="blue darken-1" text @click="dialog = false">Закрыть</v-btn>
                <v-btn color="success" text @click="onBuy" :disabled="localLoading" :loading="localLoading">Купить</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
	// import {eamil} from 'vuel'
	export default {
		name: "Buy",
		props: ['product'],
		data() {
			return {
				dialog: false,
				localLoading: false,
				name: '',
				phone: '',
				city: '',
				address: '',
				payMethod: '',
				email: '',
			}
		},
		methods: {
			onBuy() {
				if (this.name !== '' && this.phone !== '') {
					this.localLoading = true;
					const newOrder = {
						name: this.name,
						phone: this.phone,
						city: this.city,
						address: this.address,
						payMethod: this.payMethod,
						email: this.email,
						// cart: [{'productId':this.product.id,'quantity': 1}],
						cart: this.product,
						// ownerId: this.product.ownerId

					};
					this.$store.dispatch('createOrder', newOrder)
						.finally(() => {
							this.localLoading = false;
							this.dialog = false
						})
				}
			}
		}

	}
</script>

<style scoped>

</style>
