<template>
  <div>
    <v-container>
      <v-row class="mt-3">
        <v-col cols="12" class="d-flex justify-end">
          <v-btn @click="addDialog = true" color="secoundrey" class="white--text">add</v-btn>
        </v-col>
      </v-row>
      <v-row class="min-h100">
        <v-col cols="12" sm="12" lg="6" v-for="(item, i) in items" :key="i">
          <card :item="item" />
        </v-col>
      </v-row>
    </v-container>

    <v-dialog v-model="addDialog" width="80%">
      <v-card class="descriptionDialog">
        <v-card-title class="text-h5 grey descriptionDialogTitle">add</v-card-title>
        <v-row class="ma-0 d-flex justify-center">
          <v-col cols="10">
            <v-text-field
              :error-messages="titleErrors"
              dark
              label="Title"
              solo
              rounded
              style="height: 50px"
              v-model="form.title"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row class="ma-0 d-flex justify-center">
          <v-col cols="10">
            <v-textarea
              :error-messages="descriptionErrors"
              dark
              solo
              name="input-7-4"
              label="Description"
              v-model="form.description"
            ></v-textarea>
          </v-col>
        </v-row>

        <v-row class="ma-0 d-flex justify-center">
          <v-col cols="10">
            <v-avatar color="secoundrey" size="36" @click="openimgUplod">
              <v-icon>mdi-plus-circle-outline</v-icon>
            </v-avatar>
            <input class="d-none white--text" ref="imgUplod" type="file" dark @change="saveImg" />
            <p color="secoundrey" class="errorMesg" v-if="imgErrors[0]">{{imgErrors[0]}}</p>
            <div id="preview">
              <v-img v-if="form.img" :src="form.img" />
            </div>
          </v-col>
        </v-row>

        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="#fff" text @click="add" :loading="loading">add</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Card from "../components/card.vue";
import { required } from "vuelidate/lib/validators";
import { mapActions, mapState } from "vuex";

export default {
  components: {
    Card
  },
  data() {
    return {
      addDialog: false,
      loading: false,
      form: {
        title: null,
        description: null,
        img: null
      }
    };
  },

  validations: {
    form: {
      title: {
        required
      },
      description: {
        required
      },
      img: {
        required
      }
    }
  },

  methods: {
    ...mapActions({
      create: "recipes/create"
    }),

    add() {
      // this.form.img = this.getBase64Image(this.form.img);
      this.$v.$touch();
      if (this.$v.$invalid) return;
      this.loading = true;
      this.create(this.form).then(() => {
        this.loading = false;
        this.addDialog = false;
      });
    },

    saveImg(e) {
      const file = e.target.files[0];
      this.form.img = URL.createObjectURL(file);
    },

    openimgUplod() {
      this.$refs.imgUplod.click();
    }
  },

  computed: {
    ...mapState({
      items: state => state.recipes.data
    }),

    titleErrors() {
      const errors = [];
      if (!this.$v.form.title.$dirty) return errors;
      !this.$v.form.title.required && errors.push("Title is required");
      return errors;
    },

    descriptionErrors() {
      const errors = [];
      if (!this.$v.form.description.$dirty) return errors;
      !this.$v.form.description.required &&
        errors.push("Description is required");
      return errors;
    },

    imgErrors() {
      const errors = [];
      if (!this.$v.form.img.$dirty) return errors;
      !this.$v.form.img.required && errors.push("Image is required");
      return errors;
    }
  }
};
</script>

<style scoped>
.min-h100 {
  min-height: 100%;
}
.v-dialog {
  width: unset;
}

.descriptionDialog {
  background-color: #242424;
  color: #fff !important;
}

.descriptionDialogTitle {
  background-color: #151515 !important;
  color: #fff;
}

.errorMesg {
  color: #e64d4d;
  font-size: 12px;
}

.v-icon{
  color: #fff;
}
</style>