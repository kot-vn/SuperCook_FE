<template>
  <div class="admin-content-section pb-4">
    <div
      class="admin-card-header d-flex justify-content-between align-items-center mb-4"
    >
      <h4 class="m-0">Ingredients</h4>
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
          :items="ingredients"
          v-if="ingredients.length > 0"
        >
          <template #cell(actions)="ingredient">
            <b-button
              size="sm"
              variant="link"
              title="Edit"
              @click="showModal(ingredient.item.id)"
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
              @click="deleteItem(ingredient.item)"
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
        <Pagy @fetchNewData="fetchIngredients"></Pagy>
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
          label="Category"
          label-for="category-input"
          invalid-feedback="Category is required"
          :state="ingredientCategoryId != null"
        >
          <multiselect
            v-model="ingredientCategoryId"
            :options="ingredientCategories"
            :close-on-select="false"
            :clear-on-select="false"
            :preserve-search="true"
            placeholder="Select category..."
            label="categoryName"
            track-by="categoryName"
            :options-limit="300"
            required
          >
          </multiselect>
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
  createNamespacedHelpers("ingredients");
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
          key: "name",
          label: "Name",
          sortable: true,
        },
        {
          key: "ingredientCategoryDto.categoryName",
          label: "Category name",
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
    ...mapState(["ingredients"]),
    ...mapFields("ingredients", {
      ingredientCategories: "ingredientCategories",
      searchValue: "searchValue",
      name: "ingredient.name",
      ingredientCategoryId: "ingredient.ingredientCategoryId",
    }),
  },
  mounted() {
    this.RESET_PAGE();
    this.fetchIngredients();
    this.fetchIngredientCategories();
  },
  methods: {
    ...mapMutations(["RESET_INGREDIENT"]),
    ...mapActions([
      "fetchIngredients",
      "fetchIngredientCategories",
      "deleteIngredient",
      "addIngredient",
      "getIngredient",
      "updateIngredient",
    ]),
    ...pagyMaper.mapMutations(["RESET_PAGE"]),
    async fetchData() {
      await this.RESET_PAGE();
      this.fetchIngredients();
    },
    async deleteItem(item) {
      this.$confirm({
        message: "Do you want to delete this ingredient?",
        button: {
          no: "Cancel",
          yes: "Delete",
        },
        callback: async (confirm) => {
          if (confirm) {
            try {
              await this.deleteIngredient(item.id);
              this.fetchIngredients();
            } catch (e) {
              console.log(e);
            }
          }
        },
      });
    },
    showModal(param) {
      this.id = param;
      if (param == "add") {
        this.title = "Add new";
        this.RESET_INGREDIENT();
      } else {
        this.title = "Edit";
        this.getIngredient(param);
      }
      this.$refs["modal"].show();
    },
    checkFormValidity() {
      if (this.name != null && this.ingredientCategoryId != null) {
        return true;
      } else {
        return false;
      }
    },
    async handleOK(bvModalEvent) {
      bvModalEvent.preventDefault();
      if (this.checkFormValidity()) {
        if (this.title == "Add new") {
          await this.addIngredient();
          if (this.errorMsg == null) {
            this.fetchData();
          }
        } else {
          await this.updateIngredient(this.id);
          if (this.errorMsg == null) {
            this.fetchIngredients();
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
