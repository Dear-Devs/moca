<template>
  <q-page class="container full-width">
    <div class="absolute-top">
      <q-avatar class="absolute-center" size="100px" color="orange">{{
        recolector.initials
      }}</q-avatar>
      <div
        class="text-h4 text-weight-bold text-center"
        style="margin-top: 170px"
      >
        Información Básica
      </div>
    </div>
    <div class="full-width absolute-center text-subtitle1">
      <!-- Nombre -->
      <div class="row q-my-lg q-mx-lg">
        <div class="col-2">
          <q-icon color="primary" size="3rem" name="person" />
        </div>
        <div class="col-auto q-my-auto">
          {{ recolector.name }}
        </div>
      </div>

      <!-- Email -->
      <div class="row q-my-lg q-mx-lg">
        <div class="col-2">
          <q-icon color="primary" size="3rem" name="email" />
        </div>
        <div class="col-auto q-my-auto">
          {{ recolector.email }}
        </div>
      </div>

      <!-- Phone -->
      <div class="row q-my-lg q-mx-lg">
        <div class="col-2">
          <q-icon color="primary" size="3rem" name="phone" />
        </div>
        <div class="col-auto q-my-auto">
          {{ recolector.phone }}
        </div>
      </div>
    </div>

    <!-- Actualizar información -->
    <div class="absolute-bottom" style="margin-bottom: 3rem">
      <div class="absolute full-width">
        <q-btn
          class="absolute-center"
          color="blue"
          text-color="white"
          glossy
          unelevated
          rounded
          style="width: 80%"
          icon="edit"
          label="Actualizar"
        />
      </div>
    </div>
  </q-page>
</template>
<script>

export default {
  data() {
    return {
      recolector: {
        name: "",
        email: "",
        phone: "",
        initials: "",
      },
    };
  },
  methods: {
  },
  mounted() {
  },
};
</script>
