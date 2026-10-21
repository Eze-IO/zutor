<template>
  <div class="app">
    <AppHeader />
    <main>
      <router-view />
    </main>
    <AppFooter />
    <Toast position="top-center" />
    <ConfirmDialog />
  </div>
</template>

<script>
import AppHeader from './components/layouts/Header.vue';
import AppFooter from './components/layouts/Footer.vue';
import { mapActions } from 'vuex';

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter
  },
  methods: {
    ...mapActions(["logout"])
  },
  created: function () {
    this.$http.interceptors.response.use(undefined, (err) => {
      if (err.response?.status === 401 && err.config && !err.config.__isRetryRequest) {
        this.logout();
      }
      return Promise.reject(err);
    });
  }
}
</script>

<style>
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex: 1;
}
</style>
