<template>
  <div
    class="sidebar position-relative d-flex flex-column position-fixed"
    :class="isOpened ? 'open' : ''"
  >
    <div
      class="logo-details d-flex position-relative align-items-center natural-margin"
    >
      <img :src="menuLogo" alt="menu-logo" class="menu-logo icon" />
      <div class="logo_name">
        <router-link
          class="master-title text-decoration-none"
          :to="{ path: '' }"
          tag="a"
        >
          {{ menuTitle }}
        </router-link>
      </div>
      <i
        class="bx position-absolute"
        :class="isOpened ? 'bx-menu-alt-right' : 'bx-menu'"
        id="btn"
        @click="isOpened = !isOpened"
      />
    </div>
    <div
      class="menu-nav-list d-flex flex-column justify-content-between flex-grow-1"
    >
      <div id="my-scroll" class="natural-margin">
        <ul class="nav-list p-0" style="overflow: visible">
          <span v-for="(menuItem, index) in menuItems" :key="index">
            <li class="position-relative list-unstyled">
              <router-link
                :to="{ path: '/admin/' + menuItem.link }"
                tag="a"
                class="d-flex align-items-center text-decoration-none"
              >
                <i class="bx" :class="menuItem.icon || 'bx-square-rounded'" />
                <span class="links_name">
                  {{ menuItem.name }}
                </span>
              </router-link>
              <span class="tooltip position-absolute">
                {{ menuItem.tooltip || menuItem.name }}
              </span>
            </li>
          </span>
        </ul>
      </div>
      <div
        class="profile d-flex position-relative align-items-center justify-content-start"
      >
        <h6 class="m-0">Logout</h6>
        <i
          class="bx bx-log-out position-absolute"
          id="log_out"
          @click="logout"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import { mapFields } from "vuex-map-fields";

const { mapMutations } = createNamespacedHelpers("adminGlobal");

export default {
  props: {
    isMenuOpen: {
      type: Boolean,
      default: true,
    },
    menuTitle: {
      type: String,
      default: "SuperCook",
    },
    menuLogo: {
      type: String,
      default: require("@/assets/images/logo.png"),
    },
    isPaddingLeft: {
      type: Boolean,
      default: true,
    },
    menuOpenedPaddingLeftBody: {
      type: String,
      default: "250px",
    },
    menuClosedPaddingLeftBody: {
      type: String,
      default: "78px",
    },
    menuItems: {
      type: Array,
      default: () => [
        {
          link: "",
          name: "Ingredient Categories",
          tooltip: "Ingredient Categories",
          icon: "bx-category-alt",
        },
        {
          link: "ingredients",
          name: "Ingredients",
          tooltip: "Ingredients",
          icon: "bx-food-menu",
        },
        {
          link: "recipes",
          name: "Recipes",
          tooltip: "Recipes",
          icon: "bx-book-content",
        },
      ],
    },
  },
  data() {
    return {
      isOpened: false,
    };
  },
  computed: {
    ...mapFields("adminGlobal", {
      email: "email",
      emailBlurred: "emailBlurred",
      valid: "valid",
      submitted: "submitted",
      password: "password",
      passwordBlurred: "passwordBlurred",
    }),
  },
  mounted() {
    this.isOpened = this.isMenuOpen;
  },
  watch: {
    isOpened() {
      window.document.body.style.paddingLeft =
        this.isOpened && this.isPaddingLeft
          ? this.menuOpenedPaddingLeftBody
          : this.menuClosedPaddingLeftBody;
    },
  },
  methods: {
    ...mapMutations(["CLEAR_TOKEN"]),
    logout() {
      this.CLEAR_TOKEN();
      this.email = "";
      this.emailBlurred = false;
      this.valid = false;
      this.submitted = false;
      this.password = "";
      this.passwordBlurred = false;
      this.$router.push({ path: "/admin/login" });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/admin/sideBar.scss";
</style>
