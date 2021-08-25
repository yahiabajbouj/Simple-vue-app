<template>
  <v-app id="app" :style="{ background: $vuetify.theme.themes['light'].primary }">
    <navbar />
    <router-view></router-view>
  </v-app>
</template>

<script>
import navbar from "./components/nav.vue";

export default {
  name: "App",
  components: {
    navbar,
  },
};
</script>

<style></style>
