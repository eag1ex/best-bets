<template>
  <div id="app-bestbets">
    <top-nav></top-nav>
    <div id="app-container" class="container-fluid">
      <div class="d-flex justify-content-center">
        <transition name="fade" mode="out-in" v-cloak>
          <router-view></router-view>
        </transition>
        <!-- <spinner v-bind:appLoading="!loading"></spinner> -->
      </div>
    </div>
    <footer-small v-bind:loading="loading"></footer-small>
  </div>
</template>

<script>
/**
 *  // NOTE {APP}
 *  This is the component which declares <top-nav/>, <router-view/>, and <footer-small/> in to applilcation
 *  - Every route/page loads via the router
 *  - once the app is loaded completely the {created} method disables the pre-loader.
 * - we also display messages via {{alert.message}} from store alert.module
 */

/* eslint-disable */
import { mapState, mapActions } from "vuex";

export default {
  name: "app",
  data: function() {
    return {
      loading: true
    };
  },
  created: function() {
    setTimeout(() => {
      this.loading = false;
      /// disable preloader
      window.document.getElementById("start-app-preloader").style.display =
        "none";
      window.document.getElementById("app-bestbets").style.visibility =
        "visible";
    }, 1300);
  },
  watch: {
    $route(to, from) {
      // clear alert on location change
      //  this.clearAlert();
    }
  }
};
</script>

<style lang="scss" scoped>
</style>