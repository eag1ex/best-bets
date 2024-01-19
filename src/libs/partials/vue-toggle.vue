<template>
  <span class="toggle" :class="{'selected': update}" @click="handleClick">
    <b-icon v-cloak v-if="update" class="selected" icon="toggle-on" />
    <b-icon v-cloak v-if="!update" class="selected" icon="toggle-off" />
  </span>
</template>
<script>
/**
   * `vue-toggle`
   * toggling component on/off
   */
export default {
    name: 'VueToggle',
    props: ['toggled'],
    data: function () {
        return {
            update: this.toggled
        }
    },
    watch: {
        update: function (val, oldVal) {
            this.update = val
        }
    },
    created: function () {
        this.update = this.props
    },
    methods: {
        handleClick: function () {
            this.update = !this.update
            this.$emit('clickFromChild')
        }
    }
}
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
