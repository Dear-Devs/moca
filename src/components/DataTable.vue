<template>
  <q-table
    ref="tableRef"
    :title="title"
    :rows="rows"
    :columns="cols"
    :row-key="row_key"
    :grid="grid"
    :filter="filter"
    :loading="loading"
    @request="onRequest"
    hide-header
  >
    <!-- Ícono de busqueda -->
    <template v-slot:top-right>
      <div class="q-my-sm">
        <q-btn icon="cached" @click="refresh" flat />
      </div>
      <div class="q-my-sm">
        <q-input dense debounce="300" v-model="filter" label="Buscar">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
    </template>

    <!-- Diseño de la información -->
    <template v-slot:item="props">
      <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4">
        <slot name="item-data" v-bind="props.row"></slot>
      </div>
    </template>
  </q-table>
</template>

<script>
import { defineComponent, ref, reactive } from "vue";

export default defineComponent({
  name: "DataTable",
  props: {
    row_key: {
      type: String,
      required: false,
      default: "id",
    },

    title: {
      type: String,
      required: true,
    },

    grid: {
      type: Boolean,
      required: false,
      default: true,
    },

    cols: {
      type: Array,
      default: () => [],
    },

    url: {
      type: String,
      required: true,
    },
  },
  setup() {
    return {
      tableRef: ref(),
      rows: ref([]),
      filter: ref(""),
      loading: ref(false),
      pagination: reactive({
        sortBy: ref("desc"),
        descending: ref(false),
        page: ref(1),
        rowsPerPage: ref(3),
        rowsNumber: ref(10),
      }),
    };
  },
  methods: {
    async onRequest(props) {
      const { page, rowsPerPage, sortBy, descending } = props.pagination;
      const filter = props.filter;
      const params = {};

      this.loading = true;

      Object.assign(params, { length: rowsPerPage });
      Object.assign(params, { start: (page - 1) * rowsPerPage });
      Object.assign(params, { "search[value]": filter });
      Object.assign(params, { "search[regex]": false });

      // server
      try {

        this.pagination.rowsNumber = 10;

        this.rows = [
          {
            name: "Frozen Yogurt",
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
            sodium: 87,
            calcium: "14%",
            iron: "1%",
          },
          {
            name: "Ice cream sandwich",
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3,
            sodium: 129,
            calcium: "8%",
            iron: "1%",
          },
          {
            name: "Eclair",
            calories: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0,
            sodium: 337,
            calcium: "6%",
            iron: "7%",
          },
          {
            name: "Cupcake",
            calories: 305,
            fat: 3.7,
            carbs: 67,
            protein: 4.3,
            sodium: 413,
            calcium: "3%",
            iron: "8%",
          },
          {
            name: "Gingerbread",
            calories: 356,
            fat: 16.0,
            carbs: 49,
            protein: 3.9,
            sodium: 327,
            calcium: "7%",
            iron: "16%",
          },
          {
            name: "Jelly bean",
            calories: 375,
            fat: 0.0,
            carbs: 94,
            protein: 0.0,
            sodium: 50,
            calcium: "0%",
            iron: "0%",
          },
          {
            name: "Lollipop",
            calories: 392,
            fat: 0.2,
            carbs: 98,
            protein: 0,
            sodium: 38,
            calcium: "0%",
            iron: "2%",
          },
          {
            name: "Honeycomb",
            calories: 408,
            fat: 3.2,
            carbs: 87,
            protein: 6.5,
            sodium: 562,
            calcium: "0%",
            iron: "45%",
          },
          {
            name: "Donut",
            calories: 452,
            fat: 25.0,
            carbs: 51,
            protein: 4.9,
            sodium: 326,
            calcium: "2%",
            iron: "22%",
          },
          {
            name: "KitKat",
            calories: 518,
            fat: 26.0,
            carbs: 65,
            protein: 7,
            sodium: 54,
            calcium: "12%",
            iron: "6%",
          },
        ];

        this.pagination.page = page;
        this.pagination.rowsPerPage = rowsPerPage;
        this.pagination.sortBy = sortBy;
        this.pagination.descending = descending;
      } catch (ex) {
        console.error(ex);
      }

      this.loading = false;
    },
    refresh() {
      this.onRequest({
        pagination: {
          page: 1,
          rowsPerPage: 2,
          sortBy: "desc",
          descending: false,
        },
        url: "",
        filter: "",
      });
      console.log(this.rows);
    },
  },
  mounted() {
    // get initial data from server (1st page)
    this.refresh();
  },
});
</script>
