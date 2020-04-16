

<template>
  <div id="sports-book-page">
    <div class="d-flex justify-content-center">
      <span id="canada-flag" class="my-2 mr-4"></span>
      <h1 class="title my-0 mr-4">Best Sports Betting Sites</h1>
    </div>
    <button
      @click="sortAlpha"
      type="button"
      class="btn btn-outline"
      id="sort-alpha"
    >Sort Alphabetically</button>
    <b-table
      ref="table"
      id="sports-book-table"
      class="p-2"
      small
      noCollapse
      primary-key="id"
      :no-border-collapse="true"
      :bordered="false"
      :outlined="false"
      :borderless="true"
      caption-top
      responsive
      striped
      hover
      :tbody-transition-props="transProps"
      :fields="sportsBooksTable.fields"
      :items="sportsBooksTable.items"
    >
      <template v-slot:head()="scope">
        <span v-if="(scope.label)"></span>
      </template>

      <template v-slot:cell(rating)="data">
        <span v-for="n in Number(data.value)" class="rating-item m-1">
          <b-icon icon="star-fill">{{ n }}</b-icon>
        </span>
      </template>

      <template v-slot:cell(play_link)="data">
        <button type="button" class="btn btn-danger play_link">
          <div class="d-flex d-flex justify-content-around">
            <span class="px-4">{{data.value}}</span>
            <b-icon icon="chevron-right" class="p-1"></b-icon>
          </div>
        </button>
      </template>

      <template v-slot:cell(CTA)="data">
        <span class="img" v-html="data.value"></span>
      </template>

      <template v-slot:cell(message)="data">
        <span class="text-primary text-message" v-html="data.value"></span>
      </template>
    </b-table>

    <div class="d-flex justify-content-center mt-1">
      <a id="view-all" class="text-center text-primary" href="#">View All Bettings Sites</a>
    </div>
  </div>
</template>

<script>
/**
 * resource: `https://bootstrap-vue.js.org/docs/components/table`
 * NOTE {SportsBooksPage}
 * This is a main welcome page
 *  */
import { mapState, mapActions } from "vuex";
//import * as moment from "moment";
//import { isEmpty, cloneDeep } from "lodash";

export default {
  name: "SportsBooksPage",
  props: ["appStatus"],
  data: () => ({
    transProps: { name: "flip-list" },
    sortInx: 0,
    sportsBooks: [],
    loading: true,
    sportsBooksTable: {}
  }),
  created: function() {
    this.getAllsportsbooks();
    this.$store.subscribe((mutation, state) => {
      if (mutation.type.includes("sportsBooksAction/getAllSuccess")) {
        this.sportsBooks = mutation.payload || [];
        this.sportsBooksTable = this.bTable(mutation.payload);
        setTimeout(() => {
          this.loading = false;
        }, 500);
      }
    });
  },
  methods: {
    ...mapActions("sportsBooksAction", {
      getAllsportsbooks: "getAll"
    }),

    sortAlpha() {
      if (this.sortInx === 0)
        this.$refs.table.localItems.sort((a, b) => b.id - a.id);
      if (this.sortInx === 1)
        this.$refs.table.localItems.sort((a, b) => a.id - b.id);
      this.sortInx = this.sortInx == 0 ? 1 : 0;
    },
    bTable(data = []) {
      if (!(data || []).length) return [];
      /**
       id: 6,
        CTA: ,
        rating: ,
        review_link:,
        message:,
        play_link:
       */

      return {
        fields: [
          { key: "id", sortable: false },
          { key: "CTA", sortable: true },
          { key: "rating", sortable: false },
          "review_link",
          "message",
          "play_link"
        ],
        items: data.map(z => {
          z.isActive = true;
          return z;
        })
      };
    },

    goTo() {
      this.$router.push(`/home`);
    },

    goToItem(item) {
      if (item.id) {
        console.log("execute goto location", item);
        //  this.$router.push(`/item/${item.id}`);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./SportsBooksPage";
</style>