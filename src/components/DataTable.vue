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
    </template>

    <!-- Diseño de la información -->
    <template v-slot:item="props">
      <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4">
        <slot name="item-data" v-bind="props"></slot>
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

    functionRequest: {
      type: Function,
      required: true,
    },

    params: {
      type: Array,
      default: () => [],
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

      // server
      try {
        this.pagination.rowsNumber = 10;

        const response = await this.functionRequest(...this.params);
        this.rows = response.data;

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
