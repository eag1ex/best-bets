<template>
  <div v-cloak v-if="!loading" class="container-fluid mb-3">
    <footer class="row d-flex justify-content-center mt-3">
      <div class="col-sm-12 col-md-8 col-lg-11 mt-3 right">
        <small class="pr-2 right">CANADA SPORTS BETTING</small>
        <small class="pr-2 right">
          <i>Practical exercise</i>
        </small>
      </div>
    </footer>
  </div>
</template>

<script>
/**
   * `footer-small`
   * - small footer with caption
   */
export default {
    name: 'FooterSmall',
    props: ['loading'],
    created: function () { },
}
</script>

<style lang="scss" scoped>
  footer {
    .right {
      text-align: right;
      clear: both;
      float: right;
    }

    small {
      clear: both;
      color: #ccc;
    }

    footer>div>small::nth-child(2) {
      color: #aaa !important;
    }
  }
</style>
