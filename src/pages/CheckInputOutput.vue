<template>
  <q-page class="container">
    <div class="q-my-md text-center text-h4">Time</div>
    <div class="q-my-md text-center text-h5" v-text="actualHour"></div>

    <div class="row q-my-md text-center">
      <div class="col-12 column">
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
        :label="idAttendance ? 'Check out' : 'Check in'"
        :icon="idAttendance ? 'logout' : 'login'"
        glossy
        unelevated
        rounded
        @click="saveAttendance"
      />
    </div>
  </q-page>
</template>

<script>
import { ref, reactive } from "vue";
import { date, useQuasar } from "quasar";
import { Camera } from "/src/api/Camera.js";
import { createMap } from "/src/api/OpenLayer.js";
import { addToCollection, getPendingAttendance } from "/src/api/firestore.js";
import { saveImageBase64 } from "/src/api/firebase.js";

export default {
  name: "CheckInputOutput",

  setup() {
    const userLogged = JSON.parse(sessionStorage.getItem("user"));

    return {
      $q: useQuasar(),
      userLogged,
      base64Str: "",
      actualHour: ref(""),
      timer: ref(null),
      cameraRef: ref(null),
      facingMode: "environment",
      idAttendance: ref(null),
      lat: ref(0),
      lng: ref(0),
      attendance: reactive({
        name: userLogged.name,
        first_surname: userLogged.first_surname,
        second_surname: userLogged.second_surname,
        employee_id: userLogged.employee.id,
        // company: userLogged.company,
        // role: userLogged.role,
        // employee: userLogged.employee,
        employee_status: userLogged.employeeStatus,
        check_in: {
          url_photo: ref("bad_url.jpg"),
          lat: ref(""),
          lng: ref(""),
          date: ref(""),
        },
        check_out: {
          url_photo: ref("bad_url.jpg"),
          lat: ref(""),
          lng: ref(""),
          date: ref(""),
        },
      }),
    };
  },

  methods: {
    async doOperationCamera(event) {
      this.attendance.showImage = false;

      if (this.cameraRef == null) {
        this.cameraRef = new Camera(this.$refs.videoCameraRef);
      }

      if (!this.cameraRef.isPowerOn()) {
        let status = await this.cameraRef.power(this.facingMode);
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

    async saveAttendance(event) {
      this.$q.loading.show();

      const typeCheck = !this.idAttendace ? "check_in" : "check_out";
      let folderAttendance = `attendance/employee${
        this.userLogged.id
      }/${Date.now()}.jpg`;
      const respImage = await saveImageBase64(folderAttendance, this.base64Str);

      if (!respImage.status) {
        this.$q.loading.hide();
        this.$noti(false, "An error has occurred.");
        return;
      }

      this.attendance[typeCheck].url_photo = respImage.data;
      this.attendance[typeCheck].date = new Date();
      this.attendance[typeCheck].lat = this.lat;
      this.attendance[typeCheck].lng = this.lng;

      const respAdd = await addToCollection("attendance", this.attendance);

      console.log(respAdd);

      if (respAdd.status) {
        this.cameraRef = new Camera(this.$refs.videoCameraRef);
        await this.cameraRef.power(this.facingMode);
      }

      this.$noti(
        respAdd.status,
        respAdd.status ? "Successful load" : "An error has occurred"
      );

      this.$q.loading.hide();
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
      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;

      const map = createMap(
        this.$refs.map,
        position.coords.latitude,
        position.coords.longitude
      );
    });

    const respPending = await getPendingAttendance(this.userLogged.employee.id);

    console.log(respPending);

    if (respPending.status) {
      this.idAttendance = respPending.data.id;

      this.attendance.check_in.url_photo =
        respPending.data.data.check_in.url_photo;
      this.attendance.check_in.date =
        respPending.data.data.check_in.date.toDate();
      this.attendance.check_in.lat = respPending.data.data.check_in.lat;
      this.attendance.check_in.lng = respPending.data.data.check_in.lng;
    }

    this.cameraRef = new Camera(this.$refs.videoCameraRef);
    await this.cameraRef.power(this.facingMode);
  },
};
</script>
