<template id="sportsbook-table">
  <b-table v-if="tableData" id="sports-book-table" ref="table" class="px-0 mx-0"
           :class="{'table-not-stacked': !isStacked}" small no-collapse primary-key="id" :no-border-collapse="true"
           :bordered="false" :outlined="false" :borderless="true" caption-top responsive striped hover :stacked="isStacked"
           :tbody-transition-props="transProps" :fields="sportsBooksTableData.fields" :items="sportsBooksTableData.items"
  >
    <template v-slot:head()="scope">
      <span v-if="(scope.label)">&nbsp;</span>
    </template>

    <template v-slot:cell(compaign_name)="data">
      <a class="compaign_name_seo" :name="data.value" :href="getByName(data).compaign_url">
        <img
          :src="'./src/libs/img/'+getByName(data).compaign_img" :alt="data.value"
        ><p class="compaign_name_seo_text">{{ data.value }}</p></a>
    </template>

    <template v-slot:cell(rating)="data">
      <span v-for="n in Number(data.value)" class="rating-item">
        <b-icon icon="star-fill">{{ n }}</b-icon>
      </span>
    </template>

    <template v-slot:cell(review_link)="data">
      <a class="read_review text-dark" :href="data.value" target="_blank">{{
        isMobile() ? 'Review' : 'Read Review'
      }}</a>
    </template>

    <template v-slot:cell(message)="data">
      <span class="text-primary html-message" v-html="data.value" />
    </template>

    <template v-slot:cell(play_message)="data" class="w-100">
      <a target="_blank" class="btn btn-danger play_message" :href="getByName(data).play_link">
        <span v-if="!isMobile()" class="d-flex justify-content-around">
          <span class="px-4">{{ data.value }}</span>
          <b-icon icon="chevron-right" class="p-1" />
        </span>
        <b-icon v-if="isMobile()" class="p-1" icon="chevron-right" />
      </a>
    </template>
  </b-table>
</template>
<script>
/**
     * own sportsbook-table component
     * requires `{tableData}` for binding
     */
export default {
    name: 'SportsbookTable',
    props: {
        tableData: {
            type: Array,
            required: true,
            // eslint-disable-next-line vue/require-valid-default-prop
            default: [],
        },
        // is stacked table layout is changed
        // !!stacked > is for mobile
        isStacked: {
            required: true,
            type: Boolean,
            default: false,
        },
        // in mobileView together with isStacked=true, we server mobile layout
        mobileView: {
            required: false,
            type: Boolean,
            default: false,
        },
    },
    data: () => ({
        // isStacked: false, //or "'sm', 'md', 'lg', or 'xl'"
        transProps: { name: 'flip-list' },
        loading: true,
        sportsBooksTableData: {},
    }),
    created: function () {
        this.sportsBooksTableData = this.bTable(this.tableData)
    },
    mounted: function () {
        this.disableClick()
    },

    methods: {
        isMobile() {
            return this.mobileView && !this.isStacked
        },

        disableClick() {
            const items = document.querySelectorAll(`.compaign_name_seo`) || []
            if (!items.length) return
            // eslint-disable-next-line no-return-assign
            items.forEach((el, i) => el.href = '#')
        },

        /**
     * - render important messages as strong (#) and super strong (##)
     * example: `##- Exclusive -##` > becomes `<strong class="s1">- Exclusive -</strong>`
     * example: `#$200#` > becomes `<strong class="s2">$200</strong>`
     */
        formatMessage({ message, message_short }) {
            let new_message = this.isMobile() ? message_short : message
            const mark = {
                1: `#1#`,
                2: `#2#`,
            }
            const s1 = () => `<strong class='s1'>$1</strong>`
            const s2 = () => `<strong class='s2'>$1</strong>`
            const marks = [
                { pat: `${mark['1']}(.*)${mark['1']}`, rep: s1 },
                { pat: `${mark['2']}(.*)${mark['2']}`, rep: s2 },
            ]
            for (let i = 0; i < marks.length; i++) {
                // if not match ignore
                if (!Object.values(mark).filter(z => new_message.includes(z)).length) { continue }
                const m = marks[i]
                const regx = new RegExp(m.pat)
                new_message = new_message.replace(regx, m.rep())
            }
            return new_message
        },

        /**
     * - return formated google url search query
     */
        compaingURL(item) {
            const { compaign_name, review_link } = item
            if (review_link) return review_link

            const base = `https://www.google.com/search`
            const as_epq = compaign_name.replace(/ /gi, '+') // make exact search results
            const lr = `lang_en` // search results only in english
            return `${base}?as_epq=${as_epq}&lr=${lr}`
        },

        getByName({ item }) {
            const { id } = item
            if (!Object.entries(this.sportsBooksTableData).length) return null
            return (
                this.sportsBooksTableData.items.filter(z => z.id === id)[0] || null
            )
        },

        bTable(data = []) {
            if (!(data || []).length) return []

            const formatter = (value, key, item) => {
                if (key === 'review_link') return this.compaingURL(item)
                if (key === 'message' || key === 'message_short') { return this.formatMessage(item) }
                return value
            }
            /**
   * example: item slot
    id: 10,
    compaign_name: 'William Hill',
    compaign_img: 'william-hill-logo.jpg',
    compaign_url: 'https://www.williamhill.com',
    rating: 2,
    review_link: '',
    message: '100% Sign Up Bonus Up to #2#$200#2#',
    message_short: 'Bonus #1#$200#1#',
    play_message: 'Play Now',
    play_link: "#"
   */
            return {
                // data we display
                fields: [
                    { key: 'id', sortable: false, formatter },
                    { key: 'compaign_name', sortable: true, formatter },
                    { key: 'rating', sortable: false, formatter },
                    { key: 'review_link', sortable: false, formatter },
                    { key: 'message', sortable: false, formatter },
                    'play_message',
                ],
                items: data.map(z => {
                    z.isActive = true
                    return z
                }),
            }
        },
    },
}
</script>

<style lang="scss" scoped>
  @import './sportsbook-table';
</style>
