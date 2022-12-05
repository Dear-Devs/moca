<template>
   <q-page>
    <div class="flex justify-around items-center q-mt-md">
      <q-uploader
        url="http://localhost:4444/upload"
        style="max-width: 320px"
      />

      <q-img
        src="https://placeimg.com/500/300/nature"
        style="max-width: 320px"
        class="q-mt-md"
      />
    </div>

    <div class="q-mt-md text-center">Hora de entrada y salida</div>
    <div class="q-mt-md text-center">8 AM</div>

    <div class="flex justify-around">
      <q-btn
        class="q-mt-md"
        color="primary"
        label="Regresar"
        icon="keyboard_return"
        glossy
        unelevated
        rounded
      />
    </div>
  </q-page>
</template>

<script>
import { ref, reactive } from "vue";

export default {
  name: "CheckInputOutput",
  setup() {
    return {
      user: reactive({
        email: ref(""),
        password: ref(""),
      }),
    };
  },

  methods: {
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
