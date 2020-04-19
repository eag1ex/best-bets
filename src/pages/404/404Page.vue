<template>
  <div>
    <div v-cloak id="template-list-item" class="bg-inverse m-2 p-3">
      <div class="w-100">
        <h1 class="md-headline mb-2">
          {{ message }}
        </h1>
      </div>
      <p>
        <router-link to="/Home">
          Home
        </router-link>
      </p>
    </div>
  </div>
</template>

<script>
/**
   * {page404}
   * Show this page when the router des not match any url.
   */
export default {
    name: 'Page404',
    data: () => ({
        message: '404, ups.. page not found'
    })
}
</script>
<style lang="scss" scoped>
</style>
