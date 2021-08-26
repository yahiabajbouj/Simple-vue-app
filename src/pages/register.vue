<template>
  <div class="h-100vh linear-gradient-page">
    <div class="EllipseBackground h-100">
      <v-container class="h-100">
        <v-row class="h-100" align="center" justify="center">
          <v-col
            class="border-secoundrey rounded-121 px-12"
            cols="12"
            lg="8"
            sm="12"
            md="8"
          >
            <v-row class="text-center white--text">
              <v-col>
                <h2 class="font-weight-bold font-size-38 mt-4">sign up</h2>
              </v-col>
            </v-row>
            <v-row class="text-center white--text">
              <v-col>
                <p class="opacity-5 font-size-38">Welcome to Manarat Almedad</p>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" sm="12" md="6" class="mb-0">
                <v-text-field
                  label="Full Name"
                  solo
                  dark
                  rounded
                  style="height: 50px"
                  v-model="form.fullName"
                  :error-messages="fullNameErrors"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="12" md="6" class="mb-0">
                <v-text-field
                  label="Email"
                  solo
                  dark
                  rounded
                  style="height: 50px"
                  v-model="form.email"
                  :error-messages="emailErrors"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="12" md="6" class="mb-0">
                <v-text-field
                  label="Phone"
                  solo
                  dark
                  rounded
                  type="number"
                  style="height: 50px"
                  v-model="form.phone"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="12" md="6" class="mb-0">
                <v-text-field
                  label="Password"
                  solo
                  dark
                  rounded
                  type="Password"
                  style="height: 50px"
                  v-model="form.password"
                  :error-messages="passwordErrors"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-col cols="12" sm="12" md="6" offset-md="3" lg="6" offset-lg="3">
              <v-btn
                :loading="loading"
                @click="register"
                class="w-100 mt-3"
                rounded
                color="secoundrey"
                >sign up</v-btn
              >
            </v-col>
            <v-col>
              <p
                class="text-center white--text courser-pointer"
                @click="$router.push({ name: 'login' })"
              >
                Already have an account? log in
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
        fullName: "",
        email: "",
        phone: "",
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
      fullName: {
        required,
      },
    },
  },

  methods: {
    register() {
      this.$v.$touch();
      if (this.$v.$invalid) return;
      this.loading = true;
      this.suingUpUser(this.form)
        .then(() => {
          this.$router.push({ name: "Recipes" });
        })
        .catch((err) => {
          this.snackbar = true;
          this.text = err;
          console.warn(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },

    ...mapActions({
      suingUpUser: "suingUp",
    }),
  },

  computed: {
    emailErrors() {
      const errors = [];
      if (!this.$v.form.email.$dirty) return errors;
      !this.$v.form.email.email && errors.push("email is required");
      !this.$v.form.email.required && errors.push("email is incorrect");
      return errors;
    },

    passwordErrors() {
      const errors = [];
      if (!this.$v.form.$dirty) return errors;
      !this.$v.form.password.required && errors.push("password is required");
      return errors;
    },

    fullNameErrors() {
      const errors = [];
      if (!this.$v.form.fullName.$dirty) return errors;
      !this.$v.form.fullName.required && errors.push("password is required");
      return errors;
    },
  },
};
</script>

<style>
.h-100vh {
  min-height: 90vh;
}

.border-secoundrey {
  border: 3px solid var(--v-secoundrey-base);
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

.rounded-121 {
  border-radius: 121px 0px;
}

.opacity-5 {
  opacity: 0.5;
}

.font-size-38 {
  font-size: 28px;
}

.courser-pointer {
  cursor: pointer;
}

.linear-gradient-page {
}
</style>
