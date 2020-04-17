<template>
  <span class="toggle" @click="handleClick" v-bind:class="{'selected': update}">
    <b-icon class="selected" v-cloak v-if="update" icon="toggle-on"></b-icon>
    <b-icon class="selected" v-cloak v-if="!update" icon="toggle-off"></b-icon>
  </span>
</template>
<script>
export default {
  name: "vue-toggle",
  props: ["toggled"],
  data: function() {
    return {
      update: this.toggled
    };
  },
  created: function() {
    this.update = this.props;
  },
  watch: {
    update: function(val, oldVal) {
      this.update = val;
    }
  },
  methods: {
    handleClick: function() {
      this.update = !this.update;
      this.$emit("clickFromChild");
    }
  }
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
    opacity: 1;
  }
  50% {
    opacity: 0.25;
  }
  to {
    opacity: 1;
  }
}
</style>