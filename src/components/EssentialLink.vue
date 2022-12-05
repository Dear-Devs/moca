<template>
  <!-- Item con submenu -->
  <q-expansion-item
    v-if="sub_items.length"
    expand-separator
    :icon="icon"
    :label="title"
    :caption="caption"
  >
    <q-item
      clickable
      v-for="subItem in sub_items"
      :key="subItem.title"
      tag="a"
      :to="subItem.link"
    >
      <q-item-section v-if="subItem.icon" avatar>
        <q-icon :name="subItem.icon" />
      </q-item-section>

      <q-item-section>
        <q-item-label>{{ subItem.title }}</q-item-label>
        <q-item-label caption>{{ subItem.caption }}</q-item-label>
      </q-item-section>
    </q-item>
  </q-expansion-item>

  <!-- Item con redirección -->
  <q-item v-else clickable tag="a" :to="link">
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>{{ caption }}</q-item-label>
    </q-item-section>
  </q-item>

  <q-separator />
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "EssentialLink",
  props: {
    title: {
      type: String,
      required: true,
    },

    caption: {
      type: String,
      default: "",
    },

    link: {
      type: String,
      default: "#",
    },

    icon: {
      type: String,
      default: "",
    },

    sub_items: {
      type: Array,
      default: () => [],
    },
  },
});
</script>
