<template>
    <v-container fluid fill-height>
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
                <v-card class="elevation-12">
                    <v-toolbar dark color="blue-grey lighten-1">
                        <v-toolbar-title>Registration</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-form v-model="valid" ref="form" lazy-validation>
                            <v-text-field prepend-icon="person" name="firstName" label="First Name" type="text" color="pink" v-model="firstName" :rules="firstNameRules"></v-text-field>
                            <v-text-field prepend-icon="person" name="lastName" label="Last Name" type="text" color="pink" v-model="lastName"></v-text-field>
                            <v-text-field prepend-icon="email" name="email" label="Email" type="email" v-model="email" :rules="emailRules" color="pink"></v-text-field>
                            <v-text-field
                                    prepend-icon="lock"
                                    name="password"
                                    label="Password"
                                    type="password"
                                    color="pink"
                                    v-model="password"
                                    :rules="passwordRules"
                            >
                            </v-text-field>
                            <v-text-field
                                    prepend-icon="lock"
                                    name="confirm-password"
                                    label="Confirm Password"
                                    type="password"
                                    color="pink"
                                    v-model="confirmPassword"
                                    :rules="confirmPasswordRules"
                            >
                            </v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="#28B78D" @click="onSubmit" :disabled="!valid">Create an account</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
	export default {
		name: 'Registration',
		data() {
			return {
				valid: false,
				firstName: '',
				lastName: '',
				email: '',
				password: '',
				confirmPassword: '',
				firstNameRules: [
					v => !!v || 'first Name is required'
				],
				emailRules: [
					v => !!v || 'E-mail is required',
					v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
				],
				passwordRules: [
					v => !!v || 'Password is required',
					v => (v && v.length >= 6) || 'Password must be equal or more than 6 characters'
				],
				confirmPasswordRules: [
					v => !!v || 'Password is required',
					v => v === this.password || 'qq'
				]
			}
		},
		methods: {
			onSubmit() {
				if (this.$refs.form.validate()) {
					const user = {
						email: this.email,
						password: this.password,
						firstName: this.firstName,
						lastName: this.lastName
					};

					this.$store.dispatch('register', user)
						.then(() => {
							this.$router.push('/')
						})
						// .catch(err => console.log(err))
						.catch(() => {
						})
				}
			}
		}
	}
</script>

<style scoped>
    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    textarea:-webkit-autofill,
    textarea:-webkit-autofill:hover,
    textarea:-webkit-autofill:focus,
    select:-webkit-autofill,
    select:-webkit-autofill:hover,
    select:-webkit-autofill:focus {
        border: 1px solid green;
        -webkit-text-fill-color: green;
        -webkit-box-shadow: 0 0 0px 1000px #000 inset;
        transition: background-color 5000s ease-in-out 0s;
    }
</style>
