<template>
  <div class="admin-content-section pb-4">
    <div
      class="admin-card-header d-flex justify-content-between align-items-center mb-4"
    >
      <h4 class="m-0">Recipes</h4>
      <b-button variant="success" pill @click="showModal('add')">
        <i class="fa-solid fa-plus"></i>
        New
      </b-button>
    </div>
    <b-card class="admin-card-body">
      <form>
        <b-row>
          <b-col :sm="3">
            <div class="form-group">
              <label>Search</label>
              <b-form-input
                v-model="searchValue"
                class="form-control"
                @keyup="fetchData"
              ></b-form-input>
            </div>
          </b-col>
        </b-row>
      </form>
      <div>
        <b-table
          hover
          :fields="fields"
          :items="recipes"
          v-if="recipes.length > 0"
        >
          <template #cell(image)="recipe">
            <img class="item-icon" :src="recipe.item.image" alt="" />
          </template>
          <template #cell(actions)="recipe">
            <b-button
              size="sm"
              variant="link"
              title="Edit"
              @click="showModal(recipe.item.id)"
            >
              <i
                v-b-tooltip.hover
                title="Edit"
                class="fa-regular fa-pen-to-square"
              ></i>
            </b-button>
            <b-button
              variant="link"
              size="sm"
              title="Delete"
              @click="deleteItem(recipe.item)"
            >
              <i
                v-b-tooltip.hover
                title="Delete"
                class="fa-regular fa-trash-can text-danger"
              ></i>
            </b-button>
          </template>
        </b-table>
        <center v-else>
          <div class="text-danger p-3 mb-2">No data</div>
        </center>
        <Pagy @fetchNewData="fetchRecipes"></Pagy>
      </div>
    </b-card>
    <b-modal
      ref="modal"
      id="modal-prevent-closing"
      scrollable
      centered
      :title="title"
      @ok="handleOK"
    >
      <form ref="form" @submit.stop.prevent="handleOK">
        <b-form-group
          label="Name"
          label-for="name-input"
          invalid-feedback="Name is required"
          :state="name != null && name != ''"
        >
          <b-form-input
            id="name-input"
            v-model="name"
            :state="name != null && name != ''"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          label="Image"
          label-for="image-input"
          invalid-feedback="Image is required"
          :state="Boolean(newImage) || image != null"
        >
          <b-form-file
            v-model="newImage"
            id="image-input"
            :state="Boolean(newImage) || image != null"
            placeholder="Choose a file or drop it here..."
            accept=".jpg, .png, .jpeg"
            drop-placeholder="Drop file here..."
            required
          ></b-form-file>
        </b-form-group>
        <b-form-group
          label="Image URL"
          label-for="image-url-input"
          invalid-feedback="Image is required"
          :state="image ? image.length != 0 : false"
          v-if="title == 'Edit' && newImage == null"
        >
          <b-form-input
            id="image-url-input"
            v-model="image"
            :state="image ? image.length != 0 : false"
            required
          ></b-form-input>
        </b-form-group>
        <img
          class="w-100"
          v-if="image && newImage == null"
          :src="image"
          alt=""
        />
        <b-form-group
          label="Ingredient(s)"
          label-for="ingredients-input"
          invalid-feedback="Ingredient(s) is required"
          :state="
            ingredientDtoList != null &&
            ingredientDtoList != [] &&
            ingredientDtoList.length != 0
          "
        >
          <multiselect
            v-model="ingredientDtoList"
            :options="ingredients"
            :close-on-select="false"
            :clear-on-select="false"
            :preserve-search="true"
            :multiple="true"
            placeholder="Select ingredient(s)..."
            label="name"
            track-by="name"
            required
          >
          </multiselect>
        </b-form-group>
        <b-form-group
          label="Content"
          label-for="content-input"
          invalid-feedback="Content is required"
          :state="content != null && content != ''"
        >
          <b-form-input
            id="content-input"
            v-model="content"
            :state="content != null && content != ''"
            required
          ></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
import Pagy from "./shared/Pagy.vue";
import { createNamespacedHelpers } from "vuex";
import { mapFields } from "vuex-map-fields";
import Multiselect from "vue-multiselect";

const { mapActions, mapState, mapMutations } =
  createNamespacedHelpers("recipes");
const pagyMaper = createNamespacedHelpers("pagy");
const adminGlobalMaper = createNamespacedHelpers("adminGlobal");

export default {
  data() {
    return {
      title: "",
      id: null,
      fields: [
        {
          key: "id",
          label: "ID",
          sortable: true,
        },
        {
          key: "image",
          label: "Image",
        },
        {
          key: "title",
          label: "Name",
          sortable: true,
        },
        {
          key: "actions",
          label: "Actions",
        },
      ],
    };
  },
  components: { Pagy, Multiselect },
  computed: {
    ...adminGlobalMaper.mapState(["errorMsg"]),
    ...mapState(["recipes"]),
    ...mapFields("recipes", {
      ingredients: "ingredients",
      searchValue: "searchValue",
      name: "recipe.title",
      image: "recipe.image",
      newImage: "recipe.newImage",
      content: "recipe.content",
      ingredientDtoList: "recipe.ingredientDtoList",
    }),
  },
  mounted() {
    this.RESET_PAGE();
    this.fetchRecipes();
    this.fetchIngredients();
  },
  methods: {
    ...mapMutations(["RESET_RECIPE"]),
    ...mapActions([
      "fetchRecipes",
      "fetchIngredients",
      "deleteRecipe",
      "addRecipe",
      "getRecipe",
      "updateRecipe",
    ]),
    ...pagyMaper.mapMutations(["RESET_PAGE"]),
    async fetchData() {
      await this.RESET_PAGE();
      this.fetchRecipes();
    },
    async deleteItem(item) {
      this.$confirm({
        message: "Do you want to delete this recipe?",
        button: {
          no: "Cancel",
          yes: "Delete",
        },
        callback: async (confirm) => {
          if (confirm) {
            await this.deleteRecipe(item.id);
            this.fetchRecipes();
          }
        },
      });
    },
    showModal(param) {
      this.id = param;
      if (param == "add") {
        this.title = "Add new";
        this.RESET_RECIPE();
      } else {
        this.title = "Edit";
        this.getRecipe(param);
      }
      this.$refs["modal"].show();
    },
    checkFormValidity() {
      if (
        (this.name != null &&
          this.name != "" &&
          Boolean(this.newImage) &&
          this.ingredientDtoList != [] &&
          this.ingredientDtoList.length != 0 &&
          this.ingredientDtoList != null &&
          this.content != null &&
          this.content != "") ||
        (this.name != null &&
          this.name != "" &&
          this.image.length != 0 &&
          this.ingredientDtoList != null &&
          this.ingredientDtoList != [] &&
          this.ingredientDtoList.length != 0 &&
          this.content != null &&
          this.content != "")
      ) {
        return true;
      } else {
        return false;
      }
    },
    async handleOK(bvModalEvent) {
      bvModalEvent.preventDefault();
      if (this.checkFormValidity()) {
        if (this.title == "Add new") {
          await this.addRecipe();
          if (this.errorMsg == null) {
            this.fetchData();
          }
        } else {
          await this.updateRecipe(this.id);
          if (this.errorMsg == null) {
            this.fetchRecipes();
          }
        }
        if (this.errorMsg == null) {
          this.$nextTick(() => {
            this.$bvModal.hide("modal-prevent-closing");
          });
        }
      } else return;
    },
  },
};
</script>

<style lang="scss" scoped></style>
