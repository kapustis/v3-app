<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-navigation-drawer v-model="drawer"
                         id="app-drawer"
                         :src="image"
                         app
                         color="grey darken-2"
                         dark
                         floating
                         mobile-break-point="991"
                         persistent
                         width="260"
    >
        <template v-slot:img="attrs">
            <v-img v-bind="attrs" gradient="to top, rgba(0, 0, 0, .7), rgba(0, 0, 0, .7)"/>
        </template>

        <v-list-item two-line>
            <v-list-item-avatar color="white">
                <v-img src="https://cdn.vuetifyjs.com/images/logos/v.png" height="34" contain/>
            </v-list-item-avatar>
            <v-list-item-title class="title">Onlinemag</v-list-item-title>
        </v-list-item>

        <v-divider class="mx-3 mb-3"/>

        <v-list nav>
            <!-- Bug in Vuetify for first child of v-list not receiving proper border-radius -->
            <!--      <div />-->

            <v-list-item
                    v-for="(link, i) in links"
                    :key="i"
                    :to="link.to"
                    active-class="primary white--text"
            >
                <v-list-item-action>
                    <v-icon>{{ link.icon }}</v-icon>
                </v-list-item-action>

                <v-list-item-title v-text="link.text"/>
            </v-list-item>
        </v-list>

    </v-navigation-drawer>
</template>

<script>
    // Utilities
    import {
        mapMutations,
        // mapState
    } from 'vuex'

    export default {
        mounted () {
            this.SET_DRAWER(true)
        },
        computed: {
            drawer: {
                get() {
                    return this.$store.state.drawer
                },
                set(val) {
                    this.SET_DRAWER(val)
                }
            },
        },
        data: () => ({
            links: [
                {
                    to: '/dashboard',
                    icon: 'mdi-view-dashboard',
                    text: 'Dashboard'
                },
                {
                    to: '/new-orders',
                    icon: 'mdi-bell',
                    text: 'Новые заказы'
                },
                {
                    to: '/orders',
                    icon: 'mdi-clipboard-outline',
                    text: 'Заказы'
                },
                {
                    to: '/list-product',
                    icon: 'store',
                    text: 'Товары'
                },
                {
                    to: '/config',
                    icon: 'mdi-settings-outline',
                    text: 'Настройки'
                }
            ],
            image: 'https://demos.creative-tim.com/vue-material-dashboard/img/sidebar-2.32103624.jpg'
        }),
        methods: {
            ...mapMutations(['SET_DRAWER']),
            // ...mapActions(['logout']),

        }
    }
</script>
