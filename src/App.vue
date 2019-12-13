<template>
  <v-app>
    <app-bar-dashboard v-if="inSignUser" />
    <app-bar v-else />
    <nav-drawer-dashboard v-if="inSignUser" />
    <nav-drawer v-else />

    <v-content>
      <router-view />
    </v-content>
    <template v-if="error">
      <div class="text-center">
        <v-snackbar :timeout="600000" :multi-line="true" @input="clearError" :value="true">
          {{ error }}
          <v-btn color="red" text @click.native="clearError">Close</v-btn>
        </v-snackbar>
      </div>
    </template>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "App",

  components: {
    NavDrawer: () => import("./components/NavDrawer"),
    AppBar: () => import("./components/AppBar"),
    AppBarDashboard: () => import("./components/core/AppBar"),
    NavDrawerDashboard: () => import("./components/core/Drawer")
  },
  computed: {
    ...mapGetters({
      error: "error",
      inSignUser: "inSignUser"
    })
  },
  data: () => ({
    on: false,
    date: new Date().getTime(),
    interval: null
  }),
  methods: {
    ...mapActions({ clearError: "clearError" })
  },
  mounted() {
    this.interval = setInterval(() => {
      this.date = new Date();
    }, 1000);
  }
};
</script>
