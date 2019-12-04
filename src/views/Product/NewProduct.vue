<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-container>
        <v-layout row>
            <v-flex xs8 offset-xs2>
                <h1 class="text--secondary mb-3">Добавить новый элемент</h1>
                <v-form v-model="valid" ref="form" validation class="mb-3">
                    <v-text-field
                            name="title"
                            label="Заголовок товара"
                            type="text"
                            v-model="title"
                            required
                            :rules="[v => !!v || 'Title is required']"
                    >
                    </v-text-field>

                    <v-textarea
                            name="description"
                            label="Описание товара"
                            type="text"
                            v-model="description"
                            :rules="[v => !!v || 'Description is required']"
                    >
                    </v-textarea>

                    <v-text-field
                            name="price"
                            label="Цена товара"
                            type="text"
                            v-model="price"
                            required
                            :rules="[v => !!v || 'Title is required']"
                    >
                    </v-text-field>
                    <v-text-field
                            name="quantity"
                            label="Количество товара"
                            type="text"
                            v-model="inventory"
                            required
                            :rules="[v => !!v || 'Title is required']"
                    >
                    </v-text-field>

                    <v-select
                            v-model="idSeason"
                            :hint="`${seasonProduct.id}, ${seasonProduct.name}`"
                            :items="seasonProduct"
                            item-text="name"
                            item-value="id"
                            label="Сезон"
                    >
                        <template v-slot:selection="{ item, index }">
                            <span>{{item.name}}</span>
                        </template>
                    </v-select>
                    <v-select
                            v-model="idType"
                            :hint="`${typeProduct.id}, ${typeProduct.name}`"
                            :items="typeProduct"
                            item-text="name"
                            item-value="id"
                            label="Тип"
                    >
                        <template v-slot:selection="{ item, index }">
                            <span>{{item.name}}</span>
                        </template>
                    </v-select>
                    <v-select
                            v-model="idMaterial"
                            :hint="`${materialProduct.id}, ${materialProduct.name}`"
                            :items="materialProduct"
                            item-text="name"
                            item-value="id"
                            label="Материал"
                    >
                        <template v-slot:selection="{ item, index }">
                            <span>{{item.name}}</span>
                        </template>
                    </v-select>
                    <v-select
                            v-model="idSize"
                            :hint="`${sizeProduct.id}, ${sizeProduct.name}`"
                            :items="sizeProduct"
                            item-text="name"
                            item-value="id"
                            label="Размер"
                    >
                        <template v-slot:selection="{ item, index }">
                            <span>{{item.name}}</span>
                        </template>
                    </v-select>
                </v-form>
                <v-layout row>
                    <v-flex xs12>
                        <v-file-input
                                label="File input"
                                prepend-icon="mdi-paperclip"
                                color="deep-purple accent-4"
                                outlined
                                placeholder="Select your files"
                                v-model="files"
                                accept="image/*"
                                counter
                                multiple
                                :show-size="1000"
                                @change="onFileChange"
                        >
                            <template v-slot:selection="{ index, text }">
                                <v-chip v-if="index < 3" color="deep-purple accent-4" dark label small>
                                    {{ text }}
                                </v-chip>
                                <span v-else-if="index === 3" class="overline grey--text text--darken-3 mx-2">
                                    +{{ files.length - 3 }} File(s)
                                </span>
                            </template>
                        </v-file-input>
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-col v-for="(image, i) in this.imageSrc" :key="i" cols="12" md="3">
                        <v-item-group>
                            <v-card class="d-flex align-center" dark height="200">
                                <v-img :src="image" alt="a" height="200" class="text-right">
                                    <v-btn icon dark @click="removeImage(i)">
                                        <v-icon class="red--text">{{'clear'}}</v-icon>
                                    </v-btn>
                                </v-img>
                            </v-card>
                        </v-item-group>
                    </v-col>
                </v-layout>
                <v-layout row>
                    <v-flex xs12>
                        <v-spacer/>
                        <v-btn :disabled="!valid || loading" class="success" @click="createAd">Create ad</v-btn>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        async mounted() {
            this.typeProduct = await this.$store.dispatch('fetchTypeProduct');
            this.seasonProduct = await this.$store.dispatch('fetchSeasonProduct');
            this.materialProduct = await this.$store.dispatch('fetchMaterialProduct');
            this.sizeProduct = await this.$store.dispatch('fetchSizeProduct')
        },
        computed: {
            ...mapGetters({
                loading: 'loading'
            })
        },
        data() {
            return {
                typeProduct: [],
                seasonProduct: [],
                materialProduct: [],
                sizeProduct: [],
                idSeason: '',
                idType: '',
                idMaterial: '',
                idSize: '',
                files: [],
                imageSrc: [],
                title: '',
                description: '',
                price: '',
                inventory: '',
                promo: false,
                valid: false,
            }
        },
        methods: {
            createAd() {
                // if (this.$refs.form.validate() && this.imageSrc) {
                const newProduct = {
                    title: this.title,
                    description: this.description,
                    price: this.price,
                    inventory: this.inventory,
                    idSeason: this.idSeason,
                    idType: this.idType,
                    idMaterial: this.idMaterial,
                    idSize: this.idSize,
                    image: this.files
                };
                this.$store.dispatch('createProduct', newProduct)
                    .then(() => {
                        this.$router.push('/list-product')
                    }).catch(() => {
                })
                // }
            },
            onFileChange(event) {
                this.createImages(event);
            },
            createImages(files) {
                [...files].forEach(file => {
                    const reader = new FileReader();
                    reader.onload = e => this.imageSrc.push(e.target.result);
                    reader.readAsDataURL(file);
                });
            },
            removeImage(index) {
                this.imageSrc.splice(index, 1);
                this.files.splice(index, 1);
            },
        },
        watch: {
            files: function (val) {
                if (val.length === 0) {
                    this.imageSrc = [];
                }
            }
        }
    }
</script>
