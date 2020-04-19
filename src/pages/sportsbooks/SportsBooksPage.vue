<template>
  <div id="sports-book-page" class="col-11 col-12-mobile p-0-mobile">
    <div class="row">
      <div class="w-100 mx-2">
        <div class="d-flex justify-content-between mt-3 mb-4 page-heading \">
          <button id="sort-alpha" type="button" class="btn btn-outline text-dark sort-text" @click="sortAlpha">
            Sort Alphabetically
          </button>

          <div class="heading align-self-center">
            <div class="d-flex justify-content-center mr-2">
              <span id="canada-flag" class="my-2 mr-2 fl" />
              <h2 class="title my-0 mr-4 fl">
                Best Sports Betting Sites
              </h2>
            </div>
            <div class="line" />
          </div>
          <vue-toggle class="d-none d-sm-block mr-3 hide-mobile" :toggled="0" label="Disabled"
                      @clickFromChild="handleToogle"
          />
        </div>
      </div>
    </div>

    <div class="row">
      <div id="outter-table" class="col-12 px-1 min-h">
        <!--table component-->
        <sportsbook-table v-if="sportsBooksTable" ref="sportsbooktable" :table-data="sportsBooksTable"
                          :is-stacked="isStacked" :mobile-view="mobileView"
        />

        <box-spinner v-if="!sportsBooksTable" />
        <!--table component:end-->
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
import { mapActions } from 'vuex'

export default {
    name: 'SportsBooksPage',
    props: ['appStatus'],
    data: () => ({
        mobileView: false,
        isStacked: false,
        loading: true,
        sortInx: 0,
        sportsBooksTable: null,
    }),
    created: function () {
        this.loading = false
        this.getAllsportsbooks()
        this.$store.subscribe((mutation, state) => {
            if (mutation.type.includes('sportsBooksAction/getAllSuccess')) {
                //  setTimeout(() => {
                this.sportsBooksTable = mutation.payload
                // }, 2000);
            }
        })

        this.detectResize()
    },
    methods: {
        ...mapActions('sportsBooksAction', {
            getAllsportsbooks: 'getAll',
        }),
        detectResize() {
            const docSize = () => {
                const mobileWidth = 736 // max width for iphon 5,6,7,8, Plus
                if (document.body.clientWidth <= mobileWidth) {
                    this.isStacked = false
                    this.mobileView = true
                }
                if (document.body.clientWidth > mobileWidth && !this.isStacked) {
                    this.isStacked = true
                    this.mobileView = false
                }
                console.log('isStacked/mobileView', this.isStacked, this.mobileView)
            }
            window.addEventListener('resize', ev => {
                docSize()
            })
            docSize()
        },
        handleToogle() {
            this.isStacked = !this.isStacked
        },

        sortAlpha() {
            try {
                const childRef = this.$refs['sportsbooktable'].$refs
                if (this.sortInx === 0) {
                    childRef.table.localItems.sort((a, b) =>
                        a.compaign_name.localeCompare(b.compaign_name)
                    )
                }
                // back to original state
                if (this.sortInx === 1) childRef.table.refresh()
                // or reverse order
                // childRef.table.localItems.sort((a, b) =>
                //   b.compaign_name.localeCompare(a.compaign_name)
                // );
                this.sortInx = this.sortInx === 0 ? 1 : 0
            } catch (err) {
                console.error('sortAlpha', err)
            }
        },
    },
}
</script>

<style lang="scss" scoped>
  @import './SportsBooksPage';
</style>
