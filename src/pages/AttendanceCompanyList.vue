<template>
  <q-page class="container">
    <div class="q-my-md">
      <h4 class="text-center text-bold">Company attendances</h4>
    </div>
    <div class="q-px-md">
      <Datatable v-bind="datatableConfig">
        <template #item-data="props">
          <q-card>
            <q-card-section class="">
              <div class="row q-my-sm text-center">
                <q-avatar
                  class="absolute-center"
                  size="80px"
                  font-size="50"
                  color="orange-13"
                  text-color="white"
                >
                  {{ props.row.name.substring(0, 2) }}
                </q-avatar>
              </div>
            </q-card-section>

            <q-separator />

            <q-card-section>
              <div class="row q-my-sm text-center text-h6">
                {{ props.row.name }} {{ props.row.first_surname
                }}{{
                  props.row.second_surname ? " " + props.row.second_surname : ""
                }}
                <br />
                {{ props.row.employee.job }}
              </div>
              <div class="row q-my-sm text-center">
                <q-btn-group spread>
                  <q-btn
                    push
                    label="Geo"
                    @click="
                      showMap(props.row.check_in.lat, props.row.check_in.lng)
                    "
                    icon="login"
                  />
                  <q-btn
                    v-if="props.row.check_out.date"
                    push
                    label="Geo"
                    @click="
                      showMap(props.row.check_in.lat, props.row.check_in.lng)
                    "
                    icon="logout"
                  />
                </q-btn-group>
              </div>
              <div class="row q-my-sm text-center">
                <q-btn-group spread>
                  <q-btn
                    push
                    @click="showImage(props.row.check_in.url_photo)"
                    label="Image"
                    icon="login"
                  />
                  <q-btn
                    v-if="props.row.check_out.date"
                    push
                    @click="showImage(props.row.check_out.url_photo)"
                    label="Image"
                    icon="logout"
                  />
                </q-btn-group>
              </div>
            </q-card-section>

            <q-separator />

            <!-- Información general de la donación -->
            <q-card-section class="text-body2">
              <!-- Día-->
              <div class="row q-my-sm">
                <div class="col-2">
                  <q-icon size="1.5rem" name="calendar_today" />
                </div>
                <div
                  class="col-10 q-my-auto"
                  v-text="
                    date.formatDate(
                      props.row.check_in.date.toDate(),
                      'YYYY-MM-DD'
                    )
                  "
                ></div>
              </div>

              <!-- Día -->
              <div class="row q-my-sm">
                <div class="col-2">
                  <q-icon size="1.5rem" name="logout" />
                </div>
                <div class="col-10 q-my-auto">
                  {{
                    date.formatDate(props.row.check_in.date.toDate(), "HH:mm")
                  }}
                  /
                  {{
                    props.row.check_out.date
                      ? date.formatDate(
                          props.row.check_out.date.toDate(),
                          "HH:mm"
                        )
                      : "-"
                  }}
                </div>
              </div>
            </q-card-section>
          </q-card>
        </template>
      </Datatable>
    </div>

    <!-- Dialog Mostrar Imagen -->
    <q-dialog
      v-model="dialogShowImage"
      :persistent="$q.screen.sm"
      :maximized="$q.screen.sm"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <q-bar class="bg-primary">
          <q-space />

          <q-btn dense flat color="white" icon="close" v-close-popup>
            <q-tooltip class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section class="text-h4 text-center">Show Image</q-card-section>

        <q-separator />

        <q-separator />

        <q-card-section>
          <div class="q-my-sm">
            <q-img :src="imgDialog" :ratio="4 / 3" style="max-width: 300px" />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- Dialog Mostrar Punto -->
    <q-dialog
      v-model="dialogShowMap"
      :persistent="$q.screen.sm"
      :maximized="$q.screen.sm"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <q-bar class="bg-primary">
          <q-space />

          <q-btn dense flat color="white" icon="close" v-close-popup>
            <q-tooltip class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section class="text-h4 text-center"
          >Show Point in Map</q-card-section
        >

        <q-separator />

        <q-separator />

        <q-card-section>
          <div class="q-my-sm">
            <div
              ref="map"
              style="width: 300px; height: 300px; margin: auto"
            ></div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import { getAllAttendances } from "/src/api/firestore.js";
import Datatable from "/src/components/DataTable.vue";
import { date } from "quasar";
import { createMap } from "/src/api/OpenLayer.js";

export default defineComponent({
  name: "AttendanceCompanyList",

  components: {
    Datatable,
  },

  setup() {
    const userLogged = JSON.parse(sessionStorage.getItem("user"));

    return {
      imgDialog: ref(""),
      dialogShowImage: ref(false),
      dialogShowMap: ref(false),
      date,
      datatableConfig: {
        functionRequest: getAllAttendances,
        params: [userLogged.company.id],
        title: "",
        grid: true,
        cols: [],
      },
    };
  },

  methods: {
    showImage(urlPhoto) {
      this.imgDialog = urlPhoto;
      this.dialogShowImage = true;
    },
    showMap(lat, lng) {
      navigator.geolocation.getCurrentPosition((position) => {
        const map = createMap(this.$refs.map, lat, lng);
      });
      this.dialogShowMap = true;
    },
  },
});
</script>
