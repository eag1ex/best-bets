<template>
  <div id="app-bestbets">
    <top-nav />
    <div id="app-container" class="container-fluid">
      <div class="d-flex justify-content-center">
        <transition v-cloak name="fade" mode="out-in">
          <router-view />
        </transition>
      </div>
    </div>
    <footer-small :loading="loading" />
  </div>
</template>
<script>
/* eslint-disable indent */
  /**
           *  // NOTE {APP}
           *  This is the component which declares <top-nav/>, <router-view/>, and <footer-small/> in to applilcation
           *  - Every route/page loads via the router
           *  - once the app is loaded completely the {created} method disables the pre-loader.
           * - we also display messages via {{alert.message}} from store alert.module
           */
  // import { mapState, mapActions } from 'vuex';

  export default {
    name: 'App',
    data: function () {
      return {
        loading: true,
      }
    },
    watch: {
      $route(to, from) {
        // clear alert on location change
        //  this.clearAlert();
      },
    },
    created: function () {
      setTimeout(() => {
        this.loading = false
        /// disable preloader
        window.document.getElementById('start-app-preloader').style.display =
          'none'
        window.document.getElementById('app-bestbets').style.visibility =
          'visible'
      }, 1300)
    },
  }
</script>

<style lang="scss" scoped></style>
