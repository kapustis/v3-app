<template>
    <!--    <v-row justify="center">-->
    <v-dialog v-model="dialog" hide-overlay transition="dialog-bottom-transition">
        <!--    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">-->
        <template v-slot:activator="{ on }">
            <v-btn class="warning" dark v-on="on">Edit</v-btn>
        </template>
        <v-card>
            <v-toolbar dark color="primary">
                <v-btn icon dark @click="dialog = false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>Edit name advertising</v-toolbar-title>
                <div class="flex-grow-1"></div>
                <v-toolbar-items>
                    <v-btn dark text @click="onSave">Save</v-btn>
                </v-toolbar-items>
            </v-toolbar>
            <v-list three-line subheader>
                <!--                    <v-subheader>User Controls</v-subheader>-->
                <!--                    <v-list-item>-->
                <!--                        <v-list-item-content>-->
                <!--                            <v-list-item-title>Content filtering</v-list-item-title>-->
                <!--                            <v-list-item-subtitle>Set the content filtering level to restrict apps that can be downloaded</v-list-item-subtitle>-->
                <!--                        </v-list-item-content>-->
                <!--                    </v-list-item>-->
                <!--                    <v-list-item>-->
                <!--                        <v-list-item-content>-->
                <!--                            <v-list-item-title>Password</v-list-item-title>-->
                <!--                            <v-list-item-subtitle>Require password for purchase or use password to restrict purchase</v-list-item-subtitle>-->
                <!--                        </v-list-item-content>-->
                <!--                    </v-list-item>-->
                <v-form ref="form" validation class="mb-3">
                    <v-text-field
                            name="title"
                            label="Advertising title"
                            type="text"
                            v-model="title"
                    >
                    </v-text-field>

                    <v-textarea
                            name="description"
                            label="Advertising description"
                            type="text"
                            v-model="description"
                    >
                    </v-textarea>
                </v-form>
            </v-list>
            <v-divider></v-divider>
            <v-list three-line subheader>
                <v-subheader>General</v-subheader>
                <v-list-item>
                    <v-list-item-group>
                        <img :src="imageSrc" height="100" v-if="imageSrc" alt="a">
                    </v-list-item-group>
                </v-list-item>
                <v-list-item>
                    <v-list-item-action>
                        <v-switch label="Add to promo?" v-model="promo" color="success"></v-switch>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Notifications</v-list-item-title>
                        <v-list-item-subtitle>Notify me about updates to apps or games that I downloaded</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-card>
    </v-dialog>
    <!--    </v-row>-->
</template>

<script>
	// import {
	// 	mapGetters,
	// 	mapMutations,
	// 	mapActions
	// } from 'vuex'

	export default {
		name: "EditAdvertising",
		props: ['advertising'],
		data() {
			return {
				dialog: false,
				notifications: false,
				sound: true,
				widgets: false,

				title: this.advertising.title,
				description: this.advertising.description,
				promo: this.advertising.promo,
				valid: false,
				image: null,
				imageSrc: this.advertising.imageSrc
			}
		},
		methods: {
			onSave() {
				if (this.title !== '' && this.description !== '' ) {
					this.$store.dispatch('updateAdvertising', {
						title: this.title,
						description: this.description,
                        id : this.advertising.id
					});
					this.dialog = false
				}
			}
		}
	}
</script>

<style scoped>

</style>