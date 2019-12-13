<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-expansion-panels>
        <v-expansion-panel>
            <v-expansion-panel-header>{{title}}</v-expansion-panel-header>
            <v-expansion-panel-content>
                <v-data-table :headers="headers" :items="configItems" sort-by="calories" class="elevation-1">
                    <template>
                        <v-toolbar flat color="white">
                            <div class="flex-grow-1"></div>
                            <v-dialog v-model="dialog" max-width="500px">
                                <template v-slot:activator="{ on }">
                                    <v-btn fab icon color="primary white--text" dark class="mb-2" v-on="on"><v-icon>create</v-icon></v-btn>
                                </template>
                                <v-card>
                                    <v-card-title><span class="headline">{{ formTitle }}</span></v-card-title>
                                    <v-card-text>
                                        <v-container>
                                            <v-row>
                                                <v-col cols="12" sm="12" md="12">
                                                    <v-text-field v-model="editedItem.name" label="Введите имя"/>
                                                </v-col>
                                            </v-row>
                                        </v-container>
                                    </v-card-text>
                                    <v-card-actions>
                                        <div class="flex-grow-1"></div>
                                        <v-btn color="blue darken-1" text @click="close">Отмена</v-btn>
                                        <v-btn color="blue darken-1" text @click="save">Сохранить</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </v-toolbar>
                    </template>
                    <template v-slot:item.action="{ item }">
                        <v-icon small class="mr-2" @click="editItem(item)">edit</v-icon>
                        <v-icon small @click="deleteItem(item)">delete</v-icon>
                    </template>
                </v-data-table>
            </v-expansion-panel-content>
        </v-expansion-panel>
    </v-expansion-panels>
</template>

<script>
	export default {
		name: "DataTables",
		props: ['dataItems', 'nameConfig','title'],
		computed: {
			formTitle() {
				return this.editedIndex === -1 ? 'Новый элемент' : 'Редактировать элемент'
			},
			configItems() {
				return this.dataItems
			},
		},
		data() {
			return {
				search: '',
				headers: [
					{text: 'Тип', align: 'left', value: 'name'},
					{text: 'Действия', value: 'action', sortable: false},
				],
				dialog: false,
				// eslint-disable-next-line vue/no-dupe-keys
				editedIndex: -1,
				editedItem: {id: '', name: ''},
				defaultItem: {name: ''},
			}
		},
		methods: {
			editItem(item) {
				this.editedIndex = this.configItems.indexOf(item);
				this.editedItem = Object.assign({}, item);
				this.dialog = true
			},
			deleteItem(item) {
				// console.log(`delete ${item.name}`);
				const index = this.dataItems.indexOf(item);
				confirm('Are you sure you want to delete this item?') && this.dataItems.splice(index, 1)
			},
			close() {
				this.dialog = false;
				setTimeout(() => {
					this.editedItem = Object.assign({}, this.defaultItem);
					this.editedIndex = -1
				}, 300)
			},
			async save() {
				if (this.editedIndex > -1) {
					const name = this.editedItem.name;
					const id = this.editedItem.id;
					try {
						await this.$store.dispatch(`updateConfigProduct`, {id, name, nameConfig: this.nameConfig});
						let item = this.configItems.find(i => i.id === id);
						item.name = name;
						this.close()
						// eslint-disable-next-line no-empty
					} catch (e) {
					}
				} else {
					const name = this.editedItem.name;
					try {
						const configItems = await this.$store.dispatch(`createConfigProduct`, {name: name, nameConfig: this.nameConfig});
						this.configItems.push(configItems);
						this.close()
						// eslint-disable-next-line no-empty
					} catch (e) {
					}
				}
			}
		},
		watch: {
			dialog(val) {
				val || this.close()
			}
		}
	}
</script>

<style scoped>

</style>