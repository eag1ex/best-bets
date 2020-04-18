<template>
  <div id="sports-book-page" class="col-11 col-12-mobile p-0-mobile">
    <div class="row">
      <div class="w-100 mx-2">
        <div class="d-flex justify-content-between my-4 page-heading">
          <button
            @click="sortAlpha"
            type="button"
            class="btn btn-outline text-dark sort-text"
            id="sort-alpha"
          >Sort Alphabetically</button>

          <div class="heading">
            <div class="d-flex justify-content-center mr-2">
              <span id="canada-flag" class="my-2 mr-2 fl"></span>
              <h2 class="title my-0 mr-4 fl">Best Sports Betting Sites</h2>
            </div>
            <div class="line"></div>
          </div>
          <vue-toggle
            class="d-none d-sm-block"
            v-bind:toggled="0"
            label="Disabled"
            @clickFromChild="handleToogle"
          ></vue-toggle>
        </div>
      </div>
    </div>

    <div class="row">
      <div id="outter-table" class="col-12 px-0">
        <sportsbook-table
          ref="sportsbooktable"
          v-if="sportsBooksTable"
          :tableData="sportsBooksTable"
          v-bind:isStacked="isStacked"
        ></sportsbook-table>
      </div>
    </div>
    <div class="row">
      <div class="d-flex justify-content-center mt-1 col">
        <a id="view-all" class="text-center text-primary" href="#">View All Bettings Sites</a>
      </div>
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
//import { isEmpty, cloneDeep } from "lodash";

export default {
  name: "SportsBooksPage",
  props: ["appStatus"],
  data: () => ({
    isStacked: false,
    loading: true,
    sortInx: 0,
    sportsBooksTable: null
  }),
  created: function() {
    this.getAllsportsbooks();
    this.$store.subscribe((mutation, state) => {
      if (mutation.type.includes("sportsBooksAction/getAllSuccess")) {
        this.sportsBooksTable = mutation.payload;

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

    handleToogle() {
      this.isStacked = !this.isStacked;
    },

    sortAlpha() {
      try {
        const childRef = this.$refs["sportsbooktable"].$refs;
        if (this.sortInx === 0)
          childRef.table.localItems.sort((a, b) =>
            b.compaign_name.localeCompare(a.compaign_name)
          );
        if (this.sortInx === 1)
          childRef.table.localItems.sort((a, b) =>
            a.compaign_name.localeCompare(b.compaign_name)
          );
        this.sortInx = this.sortInx == 0 ? 1 : 0;
      } catch (err) {
        console.error("sortAlpha", err);
      }
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