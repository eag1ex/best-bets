<template id="sportsbook-table">
  <b-table
    v-if="tableData"
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
    :fields="sportsBooksTableData.fields"
    :items="sportsBooksTableData.items"
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
</template>
<script>
export default {
  name: "sportsbook-table",
  props: ["tableData", "isStacked"],
  data: () => ({
    //isStacked: false, //or "'sm', 'md', 'lg', or 'xl'"
    transProps: { name: "flip-list" },
    loading: true,
    sportsBooksTableData: {}
  }),
  created: function() {
    console.log("this.tableData", this.tableData);
    this.sportsBooksTableData = this.bTable(this.tableData);
  },
  methods: {
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
      if (!Object.entries(this.sportsBooksTableData).length) return null;
      return (
        this.sportsBooksTableData.items.filter(z => z.id === id)[0] || null
      );
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
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./sportsbook-table";
</style>