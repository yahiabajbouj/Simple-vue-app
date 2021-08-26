<template>
  <div>
    <v-row class="white--text food-card rounded-lg ma-1 pa-3 shadow">
      <v-col cols="12" sm="6" lg="6">
        <h4 class="mb-2">{{item.title}}</h4>
        <v-row>
          <v-btn
            color="secoundrey"
            @click="open(item.description)"
            class="my-2 white--text"
          >Description</v-btn>
        </v-row>
        <v-row>
          <v-btn color="secoundrey mr-2" @click="openEdit()" class="my-2 white--text">edit</v-btn>
          <v-btn color="secoundrey ml-2" @click="deletes(item)" class="my-2 white--text">delete</v-btn>
        </v-row>
      </v-col>
      <v-col cols="12" sm="6" lg="6" class="pa-0">
        <v-img class="rounded-r-lg" min-height="100%" :src="item.img" :lazy-src="item.img" />
      </v-col>
    </v-row>

    <v-dialog v-model="descriptionDialog" width="500">
      <v-card class="descriptionDialog">
        <v-card-title class="text-h5 grey descriptionDialogTitle">Description</v-card-title>
        <v-card-text class="descriptionDialog">{{description}}</v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="#fff" text @click="descriptionDialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="editDialog" width="80%">
      <v-card class="descriptionDialog">
        <v-card-title class="text-h5 grey descriptionDialogTitle">edit</v-card-title>
        <v-row class="ma-0 d-flex justify-center">
          <v-col cols="10">
            <v-text-field dark label="Title" solo rounded style="height: 50px" v-model="editing.title"></v-text-field>
          </v-col>
        </v-row>

        <v-row class="ma-0 d-flex justify-center">
          <v-col cols="10">
            <v-textarea dark solo name="input-7-4" label="Description" v-model="editing.description"></v-textarea>
          </v-col>
        </v-row>

        <v-row class="ma-0 d-flex justify-center">
          <v-col cols="10">
            <v-avatar color="secoundrey" size="36" @click="openimgUplod">
              <v-icon>mdi-plus-circle-outline</v-icon>
            </v-avatar>
            <input class="d-none white--text" ref="imgUplod" type="file" dark @change="saveImg" />
            <div id="preview">
              <v-img v-if="editing.img" :src="editing.img" />
            </div>
          </v-col>
        </v-row>

        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="#fff" text @click="edits">edit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: ["item"],
  data() {
    return {
      descriptionDialog: false,
      editDialog: false,
      description: null,
      editing: null
    };
  },

  methods: {
    open(description) {
      this.descriptionDialog = true;
      this.description = description;
    },

    ...mapActions({
      edit: "recipes/edit",
      deletes: "recipes/delete"
    }),

    openEdit(){
      this.editing = this.item;
      this.editDialog = true;
    }

    edits() {
      this.edit(this.item);
      this.editDialog = false;
    },

    saveImg(e) {
      const file = e.target.files[0];
      this.item.img = URL.createObjectURL(file);
    },

    openimgUplod() {
      this.$refs.imgUplod.click();
    }
  }
};
</script>

<style scoped>
.descriptionDialog {
  background-color: #242424;
  color: #fff !important;
}

.descriptionDialogTitle {
  background-color: #151515 !important;
  color: #fff;
}

.shadow {
  box-shadow: 0px 0px 20px #333;
}

.v-icon {
  color: #fff;
}
</style>