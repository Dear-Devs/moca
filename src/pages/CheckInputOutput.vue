<template>
  <q-page class="container">
    <div class="q-my-md text-center text-h4">Time</div>
    <div class="q-my-md text-center text-h5" v-text="actualHour"></div>

    <div class="row q-my-md text-center">
      <div class="col-12 col-md-6 column">
        <div class="col col-auto self-center">
          <!-- Botón para mostrar la cámara -->
          <q-btn
            push
            class="q-mx-sm"
            color="negative"
            v-bind:icon="
              cameraRef == null
                ? 'photo_camera'
                : cameraRef.isPowerOn()
                ? 'center_focus_strong'
                : 'replay'
            "
            @click="doOperationCamera"
          />

          <!-- Botón para cambiar el lado de la camara -->
          <q-btn
            push
            class="q-mx-sm"
            color="positive"
            icon="flip_camera_ios"
            @click="switchCamera"
          />
        </div>
        <div
          class="col self-center text-center column"
          v-bind:class="videoClasses"
        >
          <video
            ref="videoCameraRef"
            class="col self-center q-my-md"
            style="width: 300px; height: 300px"
            autoplay
          ></video>
        </div>
      </div>
      <div class="col-12 col-md-6" v-bind:class="imgClasses">
        <div class="col col-auto self-center text-center">
          <q-img
            :src="attendance.url_photo"
            :ratio="1"
            class="q-mt-md"
            style="width: 300px"
          >
            <template v-slot:error>
              <div style="width: 300px" class="bg-blue-grey-4 text-center">
                <q-avatar
                  square
                  size="200px"
                  font-size="6rem"
                  color="blue-grey-4"
                  text-color="white"
                  icon="hide_image"
                />
                <p class="text-white text-h6">No photo uploaded!</p>
              </div>
            </template>
          </q-img>
        </div>
      </div>
    </div>
    <div class="row q-my-md text-center">
      <div class="col-12 column">
        <div class="col self-center">
          <div ref="map" style="width: 300px; height: 300px"></div>
        </div>
      </div>
    </div>

    <div class="q-my-md flex justify-around">
      <q-btn
        color="primary"
        label="Check"
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
import { Camera } from "/src/api/Camera.js";
import { createMap } from "/src/api/OpenLayer.js";
import { date } from "quasar";

export default {
  name: "CheckInputOutput",

  setup() {
    const userLogged = JSON.parse(sessionStorage.getItem("user"));

    return {
      actualHour: ref(new Date()),
      timer: ref(null),
      cameraRef: ref(null),
      facingMode: "enviroment",
      attendance: reactive({
        showImage: ref(true),
        name: userLogged.name,
        first_surname: userLogged.first_surname,
        second_surname: userLogged.second_surname,
        company: userLogged.company,
        role: userLogged.role,
        employee: userLogged.employee,
        employee_status: userLogged.employeeStatus,
        url_photo: ref("bad_url.jpg"),
        lat: ref(""),
        lng: ref(""),
        check_in_date: ref(""),
        check_out_date: ref(""),
      }),
    };
  },

  computed: {
    videoClasses: function () {
      return {
        hidden: this.attendance.showImage || this.cameraRef == null,
      };
    },
    imgClasses: function () {
      return [
        {
          hidden:
            !this.attendance.showImage ||
            !(
              this.cameraRef == null ||
              !this.cameraRef.isPowerOn() ||
              this.cameraRef.isPhotoTaken()
            ),
        },
      ];
    },
    actualTime: function () {
      return date.formatDate(Date.now(), "HH:mm:ss");
    },
  },

  methods: {
    async doOperationCamera(event) {
      this.attendance.showImage = false;

      if (this.cameraRef == null) {
        this.cameraRef = new Camera(this.$refs.videoCameraRef);
      }

      if (!this.cameraRef.isPowerOn()) {
        let status = await this.cameraRef.power();
        this.$noti(
          status,
          status ? "The camera is turned on!" : "An error has occurred."
        );
      } else {
        this.base64Str = await this.cameraRef.takePhoto();
        this.cameraRef.off();
      }
    },

    async switchCamera(event) {
      this.facingMode =
        this.facingMode === "environment" ? "user" : "environment";

      if (!this.cameraRef)
        this.cameraRef = new Camera(this.$refs.videoCameraRef);

      this.cameraRef.off();

      await this.cameraRef.power(this.facingMode);
    },

    setDateTime() {
      this.actualHour = date.formatDate(Date.now(), "HH:mm:ss");
    },
  },

  beforeMount() {
    this.timer = setInterval(this.setDateTime, 1000);
  },
  beforeUnmount() {
    clearInterval(this.timer);
  },

  async mounted() {
    navigator.geolocation.getCurrentPosition((position) => {
      const map = createMap(
        this.$refs.map,
        position.coords.latitude,
        position.coords.longitude
      );
    });
  },
};
</script>
