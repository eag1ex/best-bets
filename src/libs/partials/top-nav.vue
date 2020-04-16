<template>
  <div id="top-nav" class="container-fluid bg-dark mb-4">  
    <div class="d-flex justify-content-center text-white">
      <div class="d-flex flex-md-row ml-2 mr-5">   
        <!--main logo-->
        <router-link class="md-title main-logo pl-0 ml-3" to="/">
              <div class="head-logo main-logo d-flex align-items-center">
                  <img :src="'./src/libs/img/csb-logo.gif'" id="logo-icon" alt=""/>
                  <div id="logo-text" class="ml-2">CANADA SPORTS BETTING</div>
              </div>      
        </router-link>
      </div>
    <div class="ml-2 mt-2 d-flex flex-md-row justify-content-between">
       <router-link 
        class=" d-md-inline-block text-white p-2 toolbar-link mx-2 d-none d-sm-none d-md-block"
        to="/home"
      >SPORTSBOOKS</router-link>
      <router-link
        class=" d-md-inline-block text-white p-2 toolbar-link mx-2 d-none d-sm-none d-md-block"
        to="/"
      >Sports Odds</router-link>
      <router-link
        class=" d-md-inline-block text-white p-2 toolbar-link mx-2 d-none d-sm-none d-md-block "
        to="/"
      >Free Picks</router-link>
      <router-link
        class=" d-md-inline-block text-white p-2 toolbar-link mx-2 d-none d-sm-none d-md-block "
        to="/"
      >Power Rankings</router-link>

      <router-link
        class=" d-md-inline-block text-white p-2 toolbar-link mx-2 d-none d-sm-none d-md-block "
        to="/"
      >Betting Guide</router-link>
    </div>
      <!--menu list-->
    </div>
  </div>
</template>

<script>

export default {
  name: "top-nav"
};
</script>

<style lang="scss">
@import './top-nav'
</style>