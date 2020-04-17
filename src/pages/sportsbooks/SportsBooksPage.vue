<template>
  <div id="sports-book-page">
    <div class="d-flex justify-content-between my-2 mx-3">
      <button
        @click="sortAlpha"
        type="button"
        class="btn btn-outline text-dark"
        id="sort-alpha"
      >Sort Alphabetically</button>

      <div class="heading">
        <div class="d-flex justify-content-center mr-2">
          <span id="canada-flag" class="my-2 mr-4 fl"></span>
          <h1 class="title my-0 mr-4 fl">Best Sports Betting Sites</h1>
        </div>
        <div class="line"></div>
      </div>

      <vue-toggle v-bind:toggled="0" label="Disabled" @clickFromChild="handleToogle"></vue-toggle>
    </div>

    <b-table
      ref="table"
      id="sports-book-table"
      class="p-2"
      v-bind:class="{'table-not-stacked': !isStacked}"
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
      :stacked="isStacked"
      :tbody-transition-props="transProps"
      :fields="sportsBooksTable.fields"
      :items="sportsBooksTable.items"
    >
      <template v-slot:head()="scope">
        <span v-if="(scope.label)"></span>
      </template>

      <template v-slot:cell(compaign_name)="data">
        <span class="img">
          <img :src="'./src/libs/img/'+getByName(data).compaign_url" :alt="data.value" />
        </span>
      </template>

      <template v-slot:cell(rating)="data">
        <span v-for="n in Number(data.value)" class="rating-item">
          <b-icon icon="star-fill">{{ n }}</b-icon>
        </span>
      </template>

      <template v-slot:cell(review_link)="data">
        <a class="read_review text-dark" :href="compaingURL(data)" target="_blank">Read Review</a>
      </template>

      <template v-slot:cell(message)="data">
        <span class="text-primary text-message" v-html="data.value"></span>
      </template>

      <template v-slot:cell(play_message)="data" class="w-100">
        <a class="btn btn-danger play_message" :href="getByName(data).play_link">
          <span class="d-flex d-flex justify-content-around">
            <span class="px-4">{{data.value}}</span>
            <b-icon icon="chevron-right" class="p-1"></b-icon>
          </span>
        </a>
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
//import { isEmpty, cloneDeep } from "lodash";

export default {
  name: "SportsBooksPage",
  props: ["appStatus"],
  data: () => ({
    isStacked: false, //or "'sm', 'md', 'lg', or 'xl'"
    transProps: { name: "flip-list" },
    sortInx: 0,
    loading: true,
    sportsBooksTable: {}
  }),
  created: function() {
    this.getAllsportsbooks();
    this.$store.subscribe((mutation, state) => {
      if (mutation.type.includes("sportsBooksAction/getAllSuccess")) {
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
    handleToogle() {
      this.isStacked = !this.isStacked;
    },

    /**
     * - render important messages as strong (#) and super strong (##)
     * example: `##- Exclusive -##` > becomes `<strong class="s1">- Exclusive -</strong>`
     * example: `#$200#` > becomes `<strong class="s2">$200</strong>`
     */

    formatMessage() {
      // `###223.55.66###  ##asddg45## `.match(/###(.*)###/)
    },

    sortAlpha() {
      if (this.sortInx === 0)
        this.$refs.table.localItems.sort((a, b) =>
          b.compaign_name.localeCompare(a.compaign_name)
        );
      if (this.sortInx === 1)
        this.$refs.table.localItems.sort((a, b) =>
          a.compaign_name.localeCompare(b.compaign_name)
        );
      this.sortInx = this.sortInx == 0 ? 1 : 0;
    },

    // https://www.google.com/search?as_epq=Bet365+reviews&lr=lang_en
    /**
     * - return formated google url search query
     */
    compaingURL({ item }) {
      const { compaign_name, id } = item;
      //if(!review_link || review_link===''){
      const base = `https://www.google.com/search`;
      const as_epq = compaign_name.replace(/ /gi, "+"); // make exact search results
      const lr = `lang_en`; // search results only in english
      return `${base}?as_epq=${as_epq}&lr=${lr}`;
      // }
      //else return review_link
    },

    getByName({ item }) {
      const { id } = item;
      if (!Object.entries(this.sportsBooksTable).length) return null;
      return this.sportsBooksTable.items.filter(z => z.id === id)[0] || null;
    },

    bTable(data = []) {
      if (!(data || []).length) return [];

      const formatter = (value, key, item) => {
        return value;
      };
      /**
        id: 6,
        compaign_name: ,
        rating: ,
        review_link:,
        message:,
        play_message:
       */
      return {
        fields: [
          { key: "id", sortable: false, formatter },
          { key: "compaign_name", sortable: true, formatter },
          { key: "rating", sortable: false, formatter },
          "review_link",
          "message",
          "play_message"
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