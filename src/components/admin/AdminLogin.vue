<template>
  <div class="login-wrapper">
    <div class="container admin-login pt-5">
      <div class="row d-flex justify-content-center">
        <div class="col-md-6">
          <div class="card px-5 py-5" id="form1">
            <div class="form-data" v-if="!submitted">
              <center class="mb-4 font-weight-bold">
                <h1>LOGIN</h1>
              </center>
              <div class="forms-inputs mb-4">
                <span class="position-absolute rounded">Email</span>
                <input
                  autocomplete="off"
                  type="text"
                  placeholder="Enter your email..."
                  id="field1"
                  v-model="email"
                  v-bind:class="{
                    'form-control': true,
                    'is-invalid': !validEmail(email) && emailBlurred,
                  }"
                  v-on:blur="emailBlurred = true"
                />
                <div class="invalid-feedback">A valid email is required!</div>
              </div>
              <div class="forms-inputs mb-4">
                <span class="position-absolute rounded">Password</span>
                <input
                  autocomplete="off"
                  placeholder="Enter your password..."
                  id="field2"
                  type="password"
                  v-model="password"
                  v-bind:class="{
                    'form-control': true,
                    'is-invalid': !validPassword(password) && passwordBlurred,
                  }"
                  v-on:blur="passwordBlurred = true"
                />
                <div class="invalid-feedback">
                  Password must be in valid form!
                </div>
              </div>
              <div class="mb-3">
                <button
                  v-on:click.stop.prevent="submit"
                  class="btn btn-dark w-100"
                >
                  Login
                </button>
              </div>
            </div>
            <div class="d-flex flex-column" v-else>
              <div class="text-center d-flex flex-column">
                <i class="fa-regular fa-circle-check mb-2"></i>
                <span class="text-center fs-1">
                  You have been logged in <br />
                  Successfully
                </span>
                <span>Auto redirect in {{ timer }}s</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapFields } from "vuex-map-fields";
import { createNamespacedHelpers } from "vuex";

const { mapActions, mapState } = createNamespacedHelpers("adminGlobal");

export default {
  data() {
    return {
      timer: 3,
    };
  },
  computed: {
    ...mapState(["token"]),
    ...mapFields("adminGlobal", {
      email: "email",
      emailBlurred: "emailBlurred",
      valid: "valid",
      submitted: "submitted",
      password: "password",
      passwordBlurred: "passwordBlurred",
    }),
  },
  mounted() {},
  watch: {
    timer: {
      handler(value) {
        if (value > 0) {
          setTimeout(() => {
            this.timer--;
            console.log("run?");
          }, 1000);
        }
      },
    },
  },
  methods: {
    ...mapActions(["adminAuthenticate"]),
    validate() {
      this.emailBlurred = true;
      this.passwordBlurred = true;
      if (this.validEmail(this.email) && this.validPassword(this.password)) {
        this.valid = true;
      }
    },
    validEmail(email) {
      var re = /(.+)@(.+){2,}\.(.+){2,}/;
      if (re.test(email.toLowerCase())) {
        return true;
      }
    },
    validPassword(password) {
      var re = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
      if (re.test(password)) {
        return true;
      }
    },
    submit() {
      this.validate();
      if (this.valid) {
        this.adminAuthenticate().then(() => {
          if (this.token) {
            this.submitted = true;
            this.timer--;
            setTimeout(this.redirect, 3000);
          }
        });
      }
    },
    redirect() {
      this.$router.push({ path: "/admin" });
    },
  },
};
</script>

<style lang="scss" scoped>
.login-wrapper {
  height: 100vh;
  background: url("@/assets/images/vegetable_pattern.svg")
    var(--background-pink) !important;
}
</style>
