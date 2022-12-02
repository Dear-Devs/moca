<template>
  <q-page>
    <div class="flex justify-around items-center">
      <q-img
        src="https://placeimg.com/500/300/nature"
        style="max-width: 320px"
        class="q-mt-md"
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
import { defineComponent } from "vue";

export default defineComponent({
  name: "AttendanceDetail",

  setup() {
    return {};
  },
});
</script>
