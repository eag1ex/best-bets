<template>
  <div id="box-spinner">
    <svg viewBox="0 0 120 120">
      <g class="g1">
        <rect class="r1" x="30" y="30" width="60" height="60" />
        <rect class="big" x="81" y="81" width="8" height="8" />
        <rect class="r_ol" x="31" y="31" width="8" height="8" />
        <rect class="r_or" x="81" y="31" width="8" height="8" />
        <rect class="r_ul" x="31" y="81" width="8" height="8" />
        <xrect class="r_ur" x="81" y="81" width="8" height="8" />
      </g>
    </svg>
  </div>
</template>

<script>
export default {
    name: 'BoxSpinner',
    props: ['appLoading'],

    // created: function() {
    //   console.log('---appLoading');
    // },
    // watch: {
    //   appLoading: function(d) {},
    // },
    // computed: {},
    // methods: {}
}
</script>

<style lang="scss" scoped>
  @import './box-spinner';
</style>
