<template>
  <q-page class="container">
    <div class="q-pa-md">
      <div class="flex justify-around">
        <q-avatar size="100px" font-size="52px" color="teal" text-color="white">
          <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
        </q-avatar>
      </div>

      <h4 class="text-center text-bold">Información basica</h4>
    </div>

    <div class="q-pa-md">
      <div class="flex justify-around row mb-4 q-mb-md">
        <div class="col-12 col-md-5 q-mb-sm">
          <label for="" class="">Nombre(s):</label>
          <q-input rounded outlined v-model="user.name">
            <template v-slot:prepend>
              <q-icon name="account_circle" />
            </template>
          </q-input>
        </div>

        <div class="col-12 col-md-5 q-mt-sm">
          <label for="" class="">Apellido Paterno:</label>
          <q-input rounded outlined v-model="user.firstSurname">
            <template v-slot:prepend>
              <q-icon name="account_circle" />
            </template>
          </q-input>
        </div>
      </div>

      <div class="flex justify-around row q-mt-md">
        <div class="col-12 col-md-5 q-mb-sm">
          <label for="" class="">Apellido Materno:</label>
          <q-input rounded outlined v-model="user.secondSurname">
            <template v-slot:prepend>
              <q-icon name="account_circle" />
            </template>
          </q-input>
        </div>

        <div class="col-12 col-md-5">
          <label for="" class="">Telefono:</label>
          <q-input rounded outlined v-model="user.phone" type="number">
            <template v-slot:prepend>
              <q-icon name="smartphone" />
            </template>
          </q-input>
        </div>
      </div>

      <div class="flex justify-around row q-mt-md">
        <div class="col-12 col-md-5 q-mb-sm">
          <label for="" class="">Correo electronico:</label>
          <q-input rounded outlined v-model="user.email">
            <template v-slot:prepend>
              <q-icon name="lock" />
            </template>
          </q-input>
        </div>

        <div class="col-12 col-md-5">
          <div class="flex justify-center">
            <q-btn class="q-mt-md" rounded color="primary" icon="edit"
              >Actualizar información</q-btn
            >
          </div>
        </div>
      </div>
      <hr class="q-mt-md" />
      <h4 class="text-center text-bold">Cambiar contraseña</h4>

      <div class="flex justify-around row q-mt-md">
        <div class="col-12 col-md-5 q-mb-sm">
          <label for="" class="">Contraseña actual:</label>
          <q-input
            rounded
            outlined
            v-model="newPassword.password"
            type="password"
          >
            <template v-slot:prepend>
              <q-icon name="lock" />
            </template>
          </q-input>
        </div>

        <div class="col-12 col-md-5">
          <label for="" class="">Nueva contraseña:</label>
          <q-input
            rounded
            outlined
            v-model="newPassword.newPassword"
            type="password"
          >
            <template v-slot:prepend>
              <q-icon name="lock" />
            </template>
          </q-input>
        </div>
      </div>

      <div class="flex justify-around row q-mt-md">
        <div class="col-12 col-md-5 q-mb-sm">
          <label for="" class="">Repetir nueva contraseña:</label>
          <q-input
            rounded
            outlined
            v-model="newPassword.repeatPassword"
            type="password"
          >
            <template v-slot:prepend>
              <q-icon name="lock" />
            </template>
          </q-input>
        </div>

        <div class="col-12 col-md-5">
          <div class="flex justify-center">
            <q-btn class="q-mt-md" rounded color="primary" icon="edit"
              >Actualizar contraseña</q-btn
            >
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "EditProfilePage",
  setup() {
    return {
      user: {
        id: null,
        name: "gustavo",
        firstSurname: "lopez",
        secondSurname: "zarate",
        phone: 7776251622,
        email: "gus@gmail.com",
      },
      newPassword: {
        password: "gus1234",
        newPassword: "gus1234",
        repeatPassword: "gus1234",
      },
    };
  },
});
</script>
