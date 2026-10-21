<template>
  <header class="header">
    <div class="header-inner">
      <router-link :to="isLoggedIn ? '/dashboard' : '/'" class="brand">
        <img class="logo" src="../../assets/logo.png" alt="Zutor"/>
      </router-link>
      <nav class="nav">
        <template v-if="isLoggedIn">
          <Button as="router-link" to="/dashboard" label="Dashboard" icon="pi pi-calendar" text class="nav-link"/>
          <Button as="router-link" to="/profile" label="Profile" icon="pi pi-user" text class="nav-link"/>
          <Button label="Log out" icon="pi pi-sign-out" severity="secondary" outlined @click="userLogout()"/>
        </template>
        <template v-else>
          <Button as="router-link" to="/login" label="Log in" text/>
          <Button as="router-link" to="/register" label="Sign up"/>
        </template>
      </nav>
    </div>
  </header>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'AppHeader',
  computed: mapGetters(["isLoggedIn"]),
  methods: {
    ...mapActions(["logout"]),
    userLogout: function(){
      this.logout().then(() => this.$router.push('/'));
    }
  }
}
</script>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 10;
  background: color-mix(in srgb, var(--p-surface-0) 90%, transparent);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--p-surface-200);
}
.header-inner {
  max-width: 960px;
  margin: 0 auto;
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}
.brand {
  display: flex;
  flex-shrink: 0;
}
.logo {
  height: 28px;
  width: auto;
}
.nav {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}
.nav-link.router-link-active {
  background: var(--p-primary-50);
}
/* Icon-only nav on phones */
@media (max-width: 560px) {
  .nav :deep(.p-button-label) {
    display: none;
  }
  .nav :deep(.p-button-icon) {
    margin: 0;
  }
}
</style>
