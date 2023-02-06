<template>
  <div class="admin-content-section pb-4">
    <div
      class="admin-card-header d-flex justify-content-between align-items-center mb-4"
    >
      <h4 class="m-0">Ingredient Categories</h4>
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
          :items="ingredientCategories"
          v-if="ingredientCategories.length > 0"
        >
          <template #cell(icon)="ingredientCategory">
            <img class="item-icon" :src="ingredientCategory.item.icon" alt="" />
          </template>
          <template #cell(actions)="ingredientCategory">
            <b-button
              size="sm"
              variant="link"
              title="Edit"
              @click="showModal(ingredientCategory.item.id)"
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
              v-if="ingredientCategory.item.total == 0"
              @click="deleteItem(ingredientCategory.item)"
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
        <Pagy @fetchNewData="fetchIngredientCategories"></Pagy>
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
          :state="categoryName.length != 0"
        >
          <b-form-input
            id="name-input"
            v-model="categoryName"
            :state="categoryName.length != 0"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          label="Icon"
          label-for="icon-input"
          invalid-feedback="Icon is required"
          :state="Boolean(newIcon) || icon != null"
        >
          <b-form-file
            v-model="newIcon"
            id="icon-input"
            :state="Boolean(newIcon) || icon != null"
            placeholder="Choose a file or drop it here..."
            accept=".jpg, .png, .jpeg"
            drop-placeholder="Drop file here..."
            required
          ></b-form-file>
        </b-form-group>
        <b-form-group
          label="Icon URL"
          label-for="icon-url-input"
          invalid-feedback="Icon is required"
          :state="icon ? icon.length != 0 : false"
          v-if="title == 'Edit' && newIcon == null"
        >
          <b-form-input
            id="icon-url-input"
            v-model="icon"
            :state="icon ? icon.length != 0 : false"
            required
          ></b-form-input>
        </b-form-group>
        <img class="w-100" v-if="icon && newIcon == null" :src="icon" alt="" />
      </form>
    </b-modal>
  </div>
</template>

<script>
import Pagy from "./shared/Pagy.vue";
import { createNamespacedHelpers } from "vuex";
import { mapFields } from "vuex-map-fields";

const { mapActions, mapState, mapMutations } = createNamespacedHelpers(
  "ingredientCategories"
);
const pagyMaper = createNamespacedHelpers("pagy");

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
          key: "icon",
          label: "Icon",
        },
        {
          key: "categoryName",
          label: "Category name",
          sortable: true,
        },
        {
          key: "total",
          label: "Ingredients number",
        },
        {
          key: "actions",
          label: "Actions",
        },
      ],
    };
  },
  computed: {
    ...mapState(["ingredientCategories"]),
    ...mapFields("ingredientCategories", {
      searchValue: "searchValue",
      categoryName: "ingredientCategory.categoryName",
      newIcon: "ingredientCategory.newIcon",
      icon: "ingredientCategory.icon",
    }),
  },
  mounted() {
    this.RESET_PAGE();
    this.fetchIngredientCategories();
  },
  methods: {
    ...mapMutations(["RESET_INGREDIENT_CATEGORY"]),
    ...mapActions([
      "fetchIngredientCategories",
      "deleteIngredientCategories",
      "addIngredientCategory",
      "getIngredientCategory",
      "updateIngredientCategory",
    ]),
    ...pagyMaper.mapMutations(["RESET_PAGE"]),
    async fetchData() {
      await this.RESET_PAGE();
      this.fetchIngredientCategories();
    },
    async deleteItem(item) {
      this.$confirm({
        message: "Do you want to delete this ingredient category?",
        button: {
          no: "Cancel",
          yes: "Delete",
        },
        callback: async (confirm) => {
          if (confirm) {
            await this.deleteIngredientCategories(item.id);
            this.fetchIngredientCategories();
          }
        },
      });
    },
    showModal(param) {
      this.id = param;
      if (param == "add") {
        this.title = "Add new";
        this.RESET_INGREDIENT_CATEGORY();
      } else {
        this.title = "Edit";
        this.newIcon = null;
        this.getIngredientCategory(param);
      }
      this.$refs["modal"].show();
    },
    checkFormValidity() {
      if (
        (this.newIcon && this.categoryName.length != 0) ||
        (this.categoryName.length != 0 && this.icon.length != 0)
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
          await this.addIngredientCategory();
          this.fetchData();
        } else {
          await this.updateIngredientCategory(this.id);
          this.fetchIngredientCategories();
        }
        this.$nextTick(() => {
          this.$bvModal.hide("modal-prevent-closing");
        });
      } else return;
    },
  },
  components: { Pagy },
};
</script>

<style lang="scss" scoped></style>
