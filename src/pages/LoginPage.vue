<template>
  <img src="../assets/wave.png" class="wave" alt="login-wave" />
  <div class="row" style="height: 90vh">
    <div
      v-bind:class="{
        'justify-center': $q.screen.md || $q.screen.sm || $q.screen.xs,
      }"
      class="offset-4 col-8 flex content-center"
    >
      <q-card
        v-bind:style="$q.screen.lt.sm ? { width: '80%' } : { width: '50%' }"
      >
        <q-card-section>
          <q-avatar size="103px" class="absolute-center shadow-10">
            <img
              size="100px"
              src="https://cdn.quasar.dev/logo-v2/svg/logo.svg"
              alt="avatar"
            />
          </q-avatar>
        </q-card-section>
        <q-card-section>
          <div class="q-pt-lg">
            <div class="col text-h6 ellipsis flex justify-center">
              <h2 class="text-h3 text-uppercase q-my-none text-weight-regular">
                Login
              </h2>
            </div>
          </div>
        </q-card-section>
        <q-card-section>
          <q-form class="q-gutter-md">
            <q-input label="Email" rounded outlined dense v-model="user.email">
            </q-input>
            <q-input
              label="Password"
              rounded
              dense
              outlined
              type="password"
              v-model="user.password"
            >
            </q-input>
            <div>
              <q-btn
                class="full-width"
                color="primary"
                label="Login"
                rounded
                @click="sesion"
              ></q-btn>
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import { useQuasar } from "quasar";
import { ref, reactive } from "vue";
import { login } from "/src/api/auth.js";

export default {
  name: "LoginPage",
  setup() {
    return {
      $q: useQuasar(),
      user: reactive({
        email: ref(""),
        password: ref(""),
        device_name: ref(navigator.userAgent),
      }),
    };
  },

  methods: {
    async sesion(event) {
      this.$q.loading.show();
      const res = await login(this.user);
      if (res.status) {
        this.$noti(true, res.message);
        this.$q.loading.hide();
        this.$router.push("/");
      } else {
        this.$q.loading.hide();
        this.$noti(false, `${res.message}`);
      }
    },
  },
};
</script>

<style scoped>
.wave {
  position: fixed;
  height: 100%;
  left: 0;
  bottom: 0;
  z-index: -1;
}
</style>
