<template>
  <q-page>
    <div class="main">
      <div class="flex">
        <!-- Map Display here -->
        <div class="map-holder">
          <div id="map"></div>
        </div>
        <!-- Coordinates Display here -->
        <div class="dislpay-arena">
          <div class="coordinates-header">
            <h3>Current Coordinates</h3>
            <p>Latitude: {{ center[0] }}</p>
            <p>Longitude: {{ center[1] }}</p>
          </div>
          <div class="coordinates-header">
            <h3>Current Location</h3>
            <div class="form-group">
              <input
                type="text"
                class="location-control"
                :value="location"
                readonly
              />
              <button type="button" class="copy-btn">Copy</button>
            </div>
            <button type="button" class="location-btn">Get Location</button>
          </div>
        </div>
      </div>
      </div>
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
            style="width: 350px; height: 350px"
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
            style="width: 350px"
          >
            <template v-slot:error>
              <div style="width: 350px" class="bg-blue-grey-4 text-center">
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
    <div class="flex justify-around items-center q-mt-md">
      <q-uploader url="http://localhost:4444/upload" style="max-width: 320px" />

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
import axios from "axios";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "mapbox-gl/dist/mapbox-gl.css";
import { ref, reactive } from "vue";
import { Camera } from "/src/api/Camera.js";

export default {
  name: "CheckInputOutput",
  setup() {
    const userLogged = JSON.parse(sessionStorage.getItem("user"));

    return {
      loading: false,
      location: "",
      access_token:
        "",
      center: [10, 0],
      map: {},
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
  },

  methods: {
    async createMap() {
      try {
        mapboxgl.accessToken = this.access_token;
        this.map = new mapboxgl.Map({
          container: "map",
          style: "https://api.mapbox.com/mapbox-gl-js/v2.11.0/mapbox-gl.css",
          center: this.center,
          zoom: 11,
        });

        let geocoder = new MapboxGeocoder({
          accessToken: this.access_token,
          mapboxgl: mapboxgl,
          marker: false,
        });

        this.map.addControl(geocoder);

        geocoder.on("result", (e) => {
          const marker = new mapboxgl.Marker({
            draggable: true,
            color: "#D80739",
          })
            .setLngLat(e.result.center)
            .addTo(this.map);
          this.center = e.result.center;
          marker.on("dragend", (e) => {
            this.center = Object.values(e.target.getLngLat());
          });
        });
      } catch (err) {
        console.log("map error", err);
      }
    },

    async getLocation() {
      try {
        this.loading = true;
        const response = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${this.center[0]},${this.center[1]}.json?access_token=${this.access_token}`
        );
        console.log(response);
        this.loading = false;
        this.location = response.data.features[0].place_name;
      } catch (err) {
        this.loading = false;
        console.log(err);
      }
    },

    copyLocation() {
      if (this.location) {
        navigator.clipboard.writeText(this.location);
        alert("Location Copied");
      }
      return;
    },

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
  },

  mounted() {
    this.createMap();
  },
};
</script>

<style scoped>
.main {
  padding: 45px 50px;
}
.flex {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.map-holder {
  width: 65%;
}
#map {
  height: 70vh;
}
.dislpay-arena {
  background: #ffffff;
  box-shadow: 0px -3px 10px rgba(0, 58, 78, 0.1);
  border-radius: 5px;
  padding: 20px 30px;
  width: 25%;
}
.coordinates-header {
  margin-bottom: 50px;
}
.coordinates-header h3 {
  color: #1f2a53;
  font-weight: 600;
}
.coordinates-header p {
  color: rgba(13, 16, 27, 0.75);
  font-weight: 600;
  font-size: 0.875rem;
}
.form-group {
  position: relative;
}
.location-control {
  height: 30px;
  background: #ffffff;
  border: 1px solid rgba(31, 42, 83, 0.25);
  box-shadow: 0px 0px 10px rgba(73, 165, 198, 0.1);
  border-radius: 4px;
  padding: 0px 10px;
  width: 90%;
}
.location-control:focus {
  outline: none;
}
.location-btn {
  margin-top: 15px;
  padding: 10px 15px;
  background: #d80739;
  box-shadow: 0px 4px 10px rgba(73, 165, 198, 0.1);
  border-radius: 5px;
  border: 0;
  cursor: pointer;
  color: #ffffff;
  font-size: 0.875rem;
  font-weight: 600;
}
.location-btn:focus {
  outline: none;
}
.disabled {
  background: #db7990;
  cursor: not-allowed;
}
.copy-btn {
  background: #f4f6f8 0% 0% no-repeat padding-box;
  border: 1px solid #f4f6f8;
  border-radius: 0px 3px 3px 0px;
  position: absolute;
  color: #5171ef;
  font-size: 0.875rem;
  font-weight: 500;
  height: 30px;
  padding: 0px 10px;
  cursor: pointer;
  right: 3.5%;
  top: 5%;
}
.copy-btn:focus {
  outline: none;
}
.wave {
  position: fixed;
  height: 100%;
  left: 0;
  bottom: 0;
  z-index: -1;
}
</style>
