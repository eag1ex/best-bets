<template>
  <b-navbar
    id="top-nav"
    toggleable
    type="dark"
    variant="dark"
    class="container-fluid bg-black mb-4 p-0"
  >
    <div class="d-flex justify-content-center w-100">
      <div
        class="show-mobile d-block d-sm-none align-self-center bg-dark navbar-toggle-wrap"
      >
        <b-navbar-toggle target="navbar-toggle-collapse">
          <template v-slot:default="{ expanded }">
            <b-icon
              class="align-self-center"
              v-if="expanded"
              icon="x"
              font-scale="1.5"
            ></b-icon>
            <b-icon
              class="align-self-center"
              v-else
              icon="justify"
              font-scale="1.5"
            ></b-icon>
          </template>
        </b-navbar-toggle>

        <b-collapse id="navbar-toggle-collapse" class="bg-dark" is-nav>
          <b-navbar-nav class="ml-auto px-3 py-2">
            <b-nav-item
              class="py-0"
              v-for="list in menuList"
              :key="list.name"
              :href="list.link"
              >{{ list.name }}
            </b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </div>

      <b-navbar-brand class="md-title main-logo p-0">
        <router-link
          to="/home"
          class="head-logo main-logo d-flex align-items-center"
        >
          <img :src="'./src/libs/img/csb-logo.gif'" id="logo-icon" alt />
          <div id="logo-text" class="ml-2">CANADA SPORTS BETTING</div>
        </router-link>
      </b-navbar-brand>

      <div class="d-none d-sm-none d-md-block hide-mobile">
        <div class="ml-2 mt-1 d-flex align-items-center">
          <router-link
            v-for="list in menuList"
            :key="list.name"
            class="text-white p-2 toolbar-link mx-1 "
            :to="list.link"
          >
            {{ list.name }}
          </router-link>
        </div>
      </div>
    </div>
  </b-navbar>
</template>

<script>
  export default {
    name: 'top-nav',
    data: () => ({
      menuList: [
        { name: 'SPORTSBOOKS', link: '/sportsbooks' },
        { name: 'Sports Odds', link: '/' },
        { name: 'Free Picks', link: '/' },
        { name: 'Power Rankings', link: '/' },
        { name: 'Betting Guide', link: '/' },
      ],
    }),
    created: function() {},
    methods: {},
  };
</script>

<style lang="scss">
  @import './top-nav';
</style>
