import * as moment from 'moment';
<template>
  <span class="toggle" @click="toggled = !toggled" v-bind:class="{'selected': toggled}">
      <b-icon  class="selected"  v-cloak v-if="toggled" icon="toggle-on"></b-icon>
      <b-icon  class="selected"  v-cloak v-if="!toggled" icon="toggle-off"></b-icon>
  </span>
</template>
<script>
export default {
  name: "vue-toggle",
  props: ['toggled','label']
};
</script>

<style lang="scss" scoped>
.toggle {
  font-size: 40px;
  cursor: pointer;
}
.toggle-label {
    display: inline-block;
    padding: 2px 0 0 4px;
    vertical-align: top;
    font-size: 24px;
    color: #777;
}
.selected {
    animation: pulse 0.3s forwards;
}
@keyframes pulse {
    from {     
        opacity   : 1;
    }
    50% {   
        opacity   : 0.25;
    }
    to {      
        opacity   : 1;
    }
}

</style>