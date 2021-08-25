<template>
  <div class="h-100vh linear-gradient-page">
    <div class="EllipseBackground h-100">
      <v-container class="h-100">
        <v-row class="h-100" align="center" justify="center">
          <v-col
            class="border-secoundrey rounded-121 px-9"
            cols="12"
            lg="4"
            sm="10"
            md="4"
          >
            <v-col>
              <h2 class="text-center white--text font-weight-bold">log in</h2>
            </v-col>
            <v-col>
              <v-text-field
                label="Email"
                solo
                dark
                v-model="form.email"
                rounded
                style="height: 50px"
                :error-messages="emailErrors"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                label="Password"
                type="password"
                solo
                dark
                v-model="form.password"
                rounded
                style="height: 50px"
                :error-messages="passwordErrors"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-btn
                :loading="loading"
                @click="login"
                class="w-100"
                rounded
                color="secoundrey"
                >log in</v-btn
              >
            </v-col>
            <v-col>
              <v-spacer></v-spacer>
              <p
                @click="$router.push({ name: 'register' })"
                class="text-center white--text courser-pointer"
              >
                Already have an account? sign up
              </p>
            </v-col>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <v-snackbar v-model="snackbar">
      {{ text }}
      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { required, email } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      loading: false,
      snackbar: false,
      text: null,
    };
  },

  validations: {
    form: {
      email: {
        required,
        email,
      },
      password: {
        required,
      },
    },
  },

  methods: {
    login() {
      this.$v.$touch();
      if (this.$v.$invalid) return;
      this.loading = true;
      this.loginUser(this.form)
        .then((res) => {
          this.$router.push({ name: "Recipes" });
          console.log(res);
        })
        .catch((err) => {
          this.text = err;
          this.snackbar = true;
          console.log(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    ...mapActions({
      loginUser: "login",
    }),
  },

  computed: {
    emailErrors() {
      const errors = [];
      if (!this.$v.form.email.$dirty) return errors;
      !this.$v.form.email.required && errors.push("email is incorrect");
      !this.$v.form.email.email && errors.push("email is required");
      return errors;
    },

    passwordErrors() {
      const errors = [];
      if (!this.$v.form.password.$dirty) return errors;
      !this.$v.form.password.required && errors.push("password is required");
      return errors;
    },
  },
};
</script>

<style>
.h-100vh {
  min-height: 90vh;
}

.h-100 {
  height: 100%;
}

.v-input__slot {
  color: #fff !important;
  background-color: rgba(255, 255, 255, 0.1) !important;
}

.w-100 {
  width: 100%;
}
.courser-pointer {
  cursor: pointer;
}

.rounded-121 {
  border-radius: 121px 0px;
}

.border-secoundrey {
  border: 3px solid var(--v-secoundrey-base);
}

.linear-gradient-page {
}
</style>
