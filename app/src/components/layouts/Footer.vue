<template>
  <footer class="footer">
    <div class="footer-inner">
      <span>© 2020–{{ year }} Zutor. A tutoring scheduling application.</span>
      <nav class="links">
        <router-link to="/about">About</router-link>
        <router-link to="/help">Help</router-link>
      </nav>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter',
  data() {
    return { year: new Date().getFullYear() }
  }
}
</script>

<style scoped>
.footer {
  border-top: 1px solid var(--p-surface-200);
  background: var(--p-surface-0);
  font-size: 0.875rem;
  color: var(--p-surface-500);
}
.footer-inner {
  max-width: 960px;
  margin: 0 auto;
  padding: 1.25rem 1rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.75rem;
}
.links {
  display: flex;
  gap: 1.25rem;
}
.links a {
  color: var(--p-surface-600);
  text-decoration: none;
}
.links a:hover {
  color: var(--p-primary-color);
}
</style>
