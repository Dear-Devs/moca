<template>
  <q-layout view="hHh Lpr fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
        <q-toolbar-title> MOCA </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <div class="absolute-top bg-primary" style="height: 160px">
        <div class="bg-transparent absolute full-width">
          <q-avatar
            class="absolute-center"
            size="80px"
            font-size="50"
            color="orange-13"
            text-color="white"
          >
            {{ initials }}
          </q-avatar>
          <div
            class="text-weight-bold text-center text-white text-h6"
            style="margin-top: 120px"
          >
            <router-link
              style="color: inherit; text-decoration-color: initial"
              :to="{ name: 'profile' }"
            >
              {{ fullName }}
            </router-link>
          </div>
        </div>
      </div>
      <q-scroll-area style="height: calc(100% - 160px); margin-top: 160px">
        <q-list padding>
          <EssentialLink
            v-for="link in essentialLinks"
            :key="link.title"
            v-bind="link"
          />
        </q-list>
      </q-scroll-area>
      <div class="absolute-bottom" style="height: 100px">
        <div class="bg-transparent full-width">
          <q-btn
            style="width: 80%"
            color="primary"
            class="absolute-center"
            icon="logout"
            label="Cerrar sesión"
            glossy
            unelevated
            rounded
            @click="logoutPage"
          ></q-btn>
        </div>
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";
import { logout, userProfile } from "/src/api/auth.js";

const linksList = [
  {
    title: "Perfil",
    caption: "",
    icon: "account_box",
    link: { name: "profile" },
  },
  {
    title: "Checar entrada y salida",
    caption: "",
    icon: "check",
    link: { name: "check-input-output" },
  },
  {
    title: "Lista de asistencias",
    caption: "",
    icon: "format_list_bulleted",
    link: { name: "attendance-list" },
  },
  {
    title: "Lista de empleados",
    caption: "",
    icon: "groups",
    link: { name: "employees-list" },
  },
];

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
  },

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      fullName: ref(""),
      initials: ref(""),
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
  methods: {
    logoutPage() {
      logout();
      this.$api.defaults.headers.common["Authorization"] = ``;
      sessionStorage.clear();
      this.$noti(true, "Se ha cerrado la sesión correctamente");
      this.$router.push("/login");
    },

    async getPersonalInfo() {
      // Check if the name exists in sessionStorage
      const name = sessionStorage.getItem("name");

      if (!name) {
        const res = await userProfile();

        if (res.status) {
          this.fullName = `${res.data.name} ${res.data.first_surname}${
            res.data.second_surname ? " " + res.data.second_surname : ""
          }`;

          sessionStorage.setItem("name", this.fullName);
        } else {
          this.fullName = "Generic Name";
        }
      } else {
        this.fullName = name;
      }

      this.initials = this.fullName.substring(0, 2);
    },
  },
  mounted() {
    this.getPersonalInfo();
  },
});
</script>
