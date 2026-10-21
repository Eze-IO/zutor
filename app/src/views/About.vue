<template>
  <div class="page page-narrow">
    <Card class="about">
      <template #content>
        <img class="about-logo" src="../assets/logo.png" alt="Zutor"/>
        <p class="tagline">A tutoring scheduling application.</p>
        <Divider/>
        <p class="muted">Created by Eze Ahuna.</p>
        <p class="muted small">© 2020–{{ year }} Zutor. All rights reserved.</p>
        <Button label="Back" icon="pi pi-arrow-left" text @click="$router.back()"/>
      </template>
    </Card>
  </div>
</template>

<script>
export default {
  name: 'About',
  data() {
    return { year: new Date().getFullYear() }
  }
}
</script>

<style scoped>
.about {
  text-align: center;
}
.about-logo {
  width: 60%;
  margin: 1rem 0 0.5rem;
}
.tagline {
  font-size: 1.1rem;
  margin: 0;
}
.small {
  font-size: 0.85rem;
}
</style>
