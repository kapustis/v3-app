<template>
    <v-container>
        <v-card>
            <v-card-title>
                Товары
                <div class="flex-grow-1"></div>
                <v-text-field
                        v-model="search"
                        append-icon="search"
                        label="Search"
                        single-line
                        hide-details
                ></v-text-field>
                <v-btn fab icon class="primary white--text" :to="'new-product'">
                    <v-icon>create</v-icon>
                </v-btn>
            </v-card-title>
            <v-data-table
                    :headers="headers"
                    :items="product"
                    :search="search"
            >
                <template v-slot:item.imageSrc="{ item }">
                    <img :src="item.imageSrc[0]" height="75" alt="1">
                </template>
            </v-data-table>
        </v-card>
    </v-container>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'

	export default {
		name: 'ListAdvertising',
		computed: {
			...mapGetters({
				product: 'product',
				loading: 'loading'
			}),
		},
		data() {
			return {
				search: '',
				headers: [
					{
						text: 'Рисунок',
						align: 'left',
						sortable: false,
						value: 'imageSrc',
					},
					{text: 'Название', value: 'title'},
					{text: 'Цена', value: 'price'},
					{text: 'Количество', value: 'quantityInStock'},
					{text: 'Доход', value: 'quantity'},
					{text: 'Покупки', value: 'quantity'},
					{text: 'Возврат', value: 'quantity'},
					{text: 'Не было', value: 'quantity'},
				],
			}
		},
	}
</script>

<style scoped>

</style>
