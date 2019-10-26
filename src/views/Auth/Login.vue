<template>
    <v-container fluid fill-height>
        <v-row align="center" justify="center">
            <v-col cols="12" sm="8" md="4">
                <v-card class="elevation-12">
                    <v-toolbar color="blue-grey lighten-1" dark flat>
                        <v-toolbar-title>Login form</v-toolbar-title>
                        <div class="flex-grow-1"></div>
                    </v-toolbar>
                    <v-card-text>
                        <v-form ref="form" v-model="valid" lazy-validation color="blue-grey lighten-1">
                            <v-text-field
                                    prepend-icon="email"
                                    name="email"
                                    label="Email"
                                    type="email"
                                    v-model="email"
                                    :rules="emailRules"
                                    color="pink"
                            >
                            </v-text-field>

                            <v-text-field
                                    id="password"
                                    prepend-icon="lock"
                                    name="password"
                                    label="Password"
                                    type="password"
                                    v-model="password"
                                    :rules="passwordRules"
                                    color="pink"
                            >
                            </v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <div class="flex-grow-1"></div>
                        <v-btn color="#28B78D" @click="onSubmit" :disabled="!valid || loading">Login</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
	import {
		mapGetters,
		// mapMutations
		// mapActions
	} from 'vuex'

	export default {
		name: 'Login',
		// created() {
		// 	if (this.$route.query['loginError']) {
		// 		this.$store.dispatch('setError', 'Please log in to access this page.')
		// 	}
		// },
		computed: {
			...mapGetters({
				loading: 'loading'
			}),
		},
		// mounted() {
		// 	M.updateTextFields()
		// },
		data() {
			return {
				email: '',
				password: '',
				valid: false,
				emailRules: [
					v => !!v || 'E-mail is required',
					v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
				],
				passwordRules: [
					v => !!v || 'Password is required',
					v => (v && v.length >= 6) || 'Password must be equal or more than 6 characters'
				]
			}
		},
		methods: {
			async onSubmit() {
				if (this.$refs.form.validate()) {
					const user = {
						email: this.email,
						password: this.password
					};
					await this.$store.dispatch('login', user)
						.then(() => {
							// this.$router.push('/')
							this.$router.replace('/dashboard')
						})
						.catch(() => {
						})
				}
			}
		}
	}
</script>
