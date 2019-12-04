<template>
    <v-row justify="center">
        <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
            <template v-slot:activator="{ on }">
                <v-btn icon v-on="on">
                    <v-icon small>edit</v-icon>
                </v-btn>
            </template>
            <v-card style="height: 300px;">
                <v-toolbar dark color="primary">
                    <v-btn icon dark @click="dialog = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-toolbar-title>Редактирование {{this.product.title}}</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn dark text @click="SaveChange">Обновить</v-btn>
                    </v-toolbar-items>
                </v-toolbar>
                <v-list three-line subheader>
                    <v-subheader>окно редактирования товара</v-subheader>
                    <v-list-item>
                        <v-list-item-content>
                            <v-text-field
                                    outlined
                                    auto-grow
                                    name="title"
                                    label="Название"
                                    type="text"
                                    v-model="editedTitle"
                            ></v-text-field>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-content>
                            <v-textarea
                                    outlined
                                    auto-grow
                                    name="description"
                                    label="Описание"
                                    type="text"
                                    v-model="editedDescription"
                            ></v-textarea>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-content>
                            <v-text-field
                                    outlined
                                    auto-grow
                                    name="description"
                                    label="Цена"
                                    type="text"
                                    v-model="editedPrice"
                            ></v-text-field>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-content>
                            <v-text-field
                                    outlined
                                    auto-grow
                                    name="inventory"
                                    label="Количестово на складе"
                                    type="text"
                                    v-model="editedInventory"
                            ></v-text-field>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-content>
                            <v-select
                                    :hint="`${material.id}, ${material.name}`"
                                    :items="material"
                                    item-text="name"
                                    item-value="id"
                                    label="Outlined style"
                                    outlined
                                    v-model="editedMaterial"
                            ></v-select>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-content>
                            <v-select
                                    :hint="`${season.id}, ${season.name}`"
                                    :items="season"
                                    item-text="name"
                                    item-value="id"
                                    label="Сезон"
                                    outlined
                                    v-model="editedSeason"
                            ></v-select>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-content>
                            <v-select
                                    :hint="`${type.id}, ${type.name}`"
                                    :items="size"
                                    item-text="name"
                                    item-value="id"
                                    label="Тип"
                                    outlined
                                    v-model="editedSize"
                            ></v-select>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-content>
                            <v-select
                                    :hint="`${type.id}, ${type.name}`"
                                    :items="type"
                                    item-text="name"
                                    item-value="id"
                                    label="Тип"
                                    outlined
                                    v-model="editedType"
                            ></v-select>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-content>
                            <v-text-field
                                    outlined
                                    auto-grow
                                    name="inventory"
                                    label="Доход"
                                    type="text"
                                    v-model="editedProfit"
                            ></v-text-field>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-content>
                            <v-text-field
                                    outlined
                                    auto-grow
                                    name="inventory"
                                    label="Количество возврата товара"
                                    type="text"
                                    v-model="editedPurchaseReturns"
                            ></v-text-field>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                        <v-col cols="12" md="3">
                            <v-item-group>
                                <v-card class="d-flex align-center" dark height="200">
                                    <v-btn v-if="!formData.uploadFileData" @click="onButtonClick">
                                        <v-icon>attach_file</v-icon>
                                        Select File
                                    </v-btn>
                                    <input type="file" class="input-field-file" ref="fUpload" @change="onFileChange">

                                    <div v-if="readyToUpload">
                                        <img :src="formData.uploadFileData" class="preview-image" :alt="formData.displayFileName">
                                    </div>

                                    <v-btn v-if="readyToUpload" @click="uploadImage">
                                        <v-icon left>cloud_upload</v-icon>
                                        Upload File
                                    </v-btn>
                                </v-card>
                            </v-item-group>
                        </v-col>
                        <v-col v-for="(image, i) in this.imageSrc" :key="i" cols="12" md="3">
                            <v-item-group>
                                <v-card class="d-flex align-center" dark height="200">
                                    <v-img :src="image" :alt="editedTitle" height="200" class="text-right">
                                        <v-btn icon dark @click="removeImage(image,i,product.id)">
                                            <v-icon class="red--text">{{'clear'}}</v-icon>
                                        </v-btn>
                                    </v-img>
                                </v-card>
                            </v-item-group>
                        </v-col>
                    </v-list-item>
                </v-list>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: "EditProduct",
        props: ['product'],
        computed: {
            ...mapGetters({
                loading: 'loading',
            }),
            readyToUpload() {
                return (this.formData.displayFileName && this.formData.uploadFileData);
            }
        },
        async mounted() {
            this.material = await this.$store.dispatch('fetchMaterialProduct');
            this.season = await this.$store.dispatch('fetchSeasonProduct');
            this.type = await this.$store.dispatch('fetchTypeProduct');
            this.size = await this.$store.dispatch('fetchSizeProduct');
        },
        data() {
            return {
                material: [],
                season: [],
                type: [],
                size: [],
                formData: {
                    displayFileName: null,
                    uploadFileData: null,
                    file: null
                },
                dialog: false,
                editedTitle: this.product.title,
                editedInventory: this.product.inventory,
                editedDescription: this.product.description,
                editedPrice: this.product.price,
                editedMaterial: this.product.idMaterial,
                editedSeason: this.product.idSeason,
                editedType: this.product.idType,
                editedSize: this.product.idSize,
                imageSrc: this.product.imageSrc,
                editedProfit: this.product.profit,
                editedPurchaseReturns: this.product.purchaseReturns,
            }
        },
        methods: {
            products() {
                return this.$store.getters.productByID(this.id)
            },
            SaveChange() {
                const product = {
                    description: this.editedDescription,
                    id: this.product.id,
                    idMaterial: this.editedMaterial,
                    idSeason: this.editedSeason,
                    idSize: this.editedSize,
                    idType: this.editedType,
                    inventory: this.editedInventory,
                    price: this.editedPrice,
                    profit: this.editedProfit,
                    purchaseReturns: this.editedPurchaseReturns,
                    title: this.editedTitle,
                };
                this.$store.dispatch('updateProduct', product).then(() => {
                    this.dialog = false
                });

            },
            removeImage(image,index ,id) {
                this.$store.dispatch('imageDel', {image, index,id})
            },
            onFileChange(event) {
                if (event.target.files && event.target.files.length) {
                    let file = event.target.files[0];
                    this.formData.file = file;
                    this.formData.displayFileName =
                        event.target.files[0].name +
                        " (" +
                        this.calcSize(file.size) +
                        "Kb)";
                    let reader = new FileReader();
                    reader.onload = e => {
                        this.formData.uploadFileData = e.target.result;
                    };
                    reader.readAsDataURL(file);
                }
            },
            onButtonClick() {
                this.$refs.fUpload.click();
            },
            calcSize(size) {
                return Math.round(size / 1024);
            },
            uploadImage() {
                // let image = new FormData();
                // image.append("fupload", this.formData.file);
                let file = this.formData.file;
                let id = this.product.id;
                this.$store.dispatch('imageAdd', { file, id}).then(() => {
                    // this.showInfo("File was successfuly uploaded!");
                    this.formData = {
                        displayFileName: null,
                        uploadFileData: null,
                        file: null
                    };
                });

                // axios.post("/api/upload_file", data).then(response => {
                //     this.showInfo("File was successfuly uploaded!");
                //     this.formData = {
                //         displayFileName: null,
                //         uploadFileData: null,
                //         file: null
                //     };
                // });
            },
        }
    }
</script>
<style>
    .input-field-file {
        display: none;
    }

    .preview-image {
        width: 250px;
        padding: 15px;
        /*border: 1px solid #999;*/
        /*border-radius: 5px;*/
    }
</style>