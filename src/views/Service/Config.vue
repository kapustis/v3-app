<template>
    <v-container>
        <v-layout row>
            <v-flex xs12>
                <data-tables :dataItems="typeProduct" :nameConfig="'typeProduct'"  :title="'Тип'"></data-tables>
                <data-tables :dataItems="seasonProduct" :nameConfig="'seasonProduct'" :title="'Сезон'"></data-tables>
                <data-tables :dataItems="materialProduct" :nameConfig="'materialProduct'" :title="'Материал'"></data-tables>
                <data-tables :dataItems="sizeProduct" :nameConfig="'sizeProduct'" :title="'Размер'"></data-tables>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
	export default {
		name: "Config",
		async mounted() {
			this.typeProduct = await this.$store.dispatch('fetchTypeProduct', {nameConfig: 'typeProduct'});
			this.seasonProduct = await this.$store.dispatch('fetchTypeProduct', {nameConfig: 'seasonProduct'});
			this.materialProduct = await this.$store.dispatch('fetchTypeProduct', {nameConfig: 'materialProduct'});
			this.sizeProduct = await this.$store.dispatch('fetchTypeProduct', {nameConfig: 'sizeProduct'})
		},
		components: {
			DataTables: () => import('../../components/data_table/DataTables'),
		},
		data() {
			return {
				typeProduct: [],
				seasonProduct: [],
				materialProduct: [],
				sizeProduct: [],
			}
		}
	}
</script>

<style scoped>

</style>
