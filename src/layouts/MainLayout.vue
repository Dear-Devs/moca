<template>
  <q-layout view="hHh Lpr fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
        <q-toolbar-title> CODE </q-toolbar-title>
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
            @click="logoutPage()"
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

const linksList = [
  {
    title: "Perfil",
    caption: "",
    icon: "account_box",
    link: { name: "profile" },
  },
  {
    title: "Donaciones",
    caption: "",
    icon: "volunteer_activism",
    link: "",
    sub_items: [
      {
        title: "Pendientes",
        caption: "",
        icon: "pending_actions",
        link: { name: "donations" },
      },
      {
        title: "Realizadas",
        caption: "",
        icon: "assignment_turned_in",
        link: { name: "donations" },
      },
    ],
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

  },
  mounted() {
  },
});
</script>
