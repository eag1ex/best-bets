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
        <b-table
          class="px-0 mx-0"
          ref="table"
          id="sports-book-table"
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
            <a class="read_review text-dark" :href="data.value" target="_blank">Read Review</a>
          </template>

          <template v-slot:cell(message)="data">
            <span class="text-primary html-message" v-html="data.value"></span>
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
    formatMessage({ message }) {
      const mark = {
        1: `#1#`,
        2: `#2#`
      };
      const s1 = () => `<strong class='s1'>$1</strong>`;
      const s2 = () => `<strong class='s2'>$1</strong>`;
      const marks = [
        { pat: `${mark["1"]}(.*)${mark["1"]}`, rep: s1 },
        { pat: `${mark["2"]}(.*)${mark["2"]}`, rep: s2 }
      ];
      for (let i = 0; i < marks.length; i++) {
        // if not match ignore
        if (!Object.values(mark).filter(z => message.includes(z)).length)
          continue;

        const m = marks[i];
        const regx = new RegExp(m.pat);
        message = message.replace(regx, m.rep());
      }
      return message;
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

    /**
     * - return formated google url search query
     */
    compaingURL(item) {
      const { compaign_name, id } = item;
      const base = `https://www.google.com/search`;
      const as_epq = compaign_name.replace(/ /gi, "+"); // make exact search results
      const lr = `lang_en`; // search results only in english
      return `${base}?as_epq=${as_epq}&lr=${lr}`;
    },

    getByName({ item }) {
      const { id } = item;
      if (!Object.entries(this.sportsBooksTable).length) return null;
      return this.sportsBooksTable.items.filter(z => z.id === id)[0] || null;
    },

    bTable(data = []) {
      if (!(data || []).length) return [];

      const formatter = (value, key, item) => {
        if (key === "review_link") return this.compaingURL(item);
        if (key === "message") return this.formatMessage(item);
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
          { key: "review_link", sortable: false, formatter },
          { key: "message", sortable: false, formatter },
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