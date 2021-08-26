<template>
  <div class="bb-white-3" :style="{ background: $vuetify.theme.themes['light'].primary }">
    <v-container>
      <v-row>
        <v-col lg="3" sm="6" cols="12" align-self="center"></v-col>
        <v-col lg="6" sm="12" cols="12" class="d-flex justify-center d-none d-md-flex">
          <v-btn
            :style="{ background: $vuetify.theme.themes['light'].primary }"
            v-for="tab in 3"
            :key="tab"
            text
            color="#fff"
          >test</v-btn>
        </v-col>
        <v-col lg="3" sm="12" cols="12" class="d-flex justify-center">
          <v-btn v-if="isLogin" rounded outlined @click="logOut" color="#fff">Log out</v-btn>
          <v-btn  v-else rounded outlined :to="{ name: 'register' }" color="#fff">Sign up</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  methods: {
    ...mapActions({
      logoutUser: "logout"
    }),

    logOut() {
      this.logoutUser();
      this.$router.push({ name: "LogIn" });
    }
  },

  computed: mapState({
    isLogin: state => state.isLogin
  })
};
</script>

<style>
.bb-white-3 {
  border-bottom: 3px solid #fff;
}
</style>
