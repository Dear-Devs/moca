<template>
  <q-page class="container">
    <div class="q-my-md">
      <h4 class="text-center text-bold">Empleados</h4>
    </div>
    <div class="q-px-md">
      <Datatable v-bind="datatableConfig">
        <template #item-data="row">
          <q-card>
            <q-card-section class="text-h5 text-center">
              <div class="flex justify-around items-center">
                <div class="col-2">
                  <q-avatar class="col-2" color="red" text-color="white" icon="directions" />

                </div>
                <div>
                  <h4 class="col-10">Nombre <br>
                    <span>Puesto</span>

                  </h4>
                </div>

              </div>
            </q-card-section>

            <q-separator />

            <!-- Información general de la donación -->
            <q-card-section class="text-body2">
              <!-- Empresa -->
              <div class="row q-my-sm">
                <div class="col-2">
                  <q-icon size="1.5rem" name="logout" />
                </div>
                <div class="col-10 q-my-auto">{{  }} Entrada / salida </div>
              </div>

              <!-- Banco de alimentos-->
              <div class="row q-my-sm">
                <div class="col-2">
                  <q-icon size="1.5rem" name="calendar_today" />
                </div>
                <div class="col-10 q-my-auto ellipsis-3-lines">
                  {{  }} Hora y dia
                </div>
              </div>


            </q-card-section>

            <!-- Acciones -->
            <q-card-actions align="center" class="flex justify-around">

              <div >
                <q-btn
                outline
                rounded
                size="md"
                style="width: 100%"
                color="primary"
                label="Detalles"
                :to="{
                  name: 'donation-product',
                  params: { donationId: row },
                }"
              />


              </div>

              <div >
                <q-btn
                outline
                rounded
                size="md"
                style="width: 100%"
                color="primary"
                label="Asistencias "
                :to="{
                  name: 'attendance-list',
                  params: { donationId: row },
                }"
              />

             </div>
            </q-card-actions>
          </q-card>
        </template>
      </Datatable>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import Datatable from "/src/components/DataTable.vue";

export default defineComponent({
  name: "AttendanceList",

  components: {
    Datatable,
  },

  setup() {
    return {
      datatableConfig: {
        url: "donation",
        title: "",
        grid: true,
        cols: [
          { name: "id", label: "id", field: "id" },
          {
            name: "calories",
            label: "Nombre de la compañía",
            field: "calories",
          },
          {
            name: "fat",
            label: "Dirección de la tienda",
            field: "fat",
          },
          {
            name: "carbs",
            label: "Banco de alimentos",
            field: "carbs",
          },
          {
            name: "protein",
            label: "Estatus",
            field: "protein",
          },
          {
            name: "sodium",
            label: "Cantidad",
            field: "sodium",
          },
        ],
      },
    };
  },
});
</script>
