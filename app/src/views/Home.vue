<template>
  <div class="page">
    <section class="hero">
      <div class="hero-text">
        <Tag value="Tutoring made simple" icon="pi pi-heart-fill" rounded/>
        <h1>Book the help you need, when you need it.</h1>
        <p class="lead muted">
          Zutor lets students schedule tutoring sessions with their preferred tutors,
          then reschedule or cancel them in a couple of clicks.
        </p>
        <div class="actions">
          <Button as="router-link" to="/register" label="Get started" icon="pi pi-arrow-right" iconPos="right" size="large"/>
          <Button as="router-link" to="/login" label="I have an account" severity="secondary" text size="large"/>
        </div>
      </div>
      <img class="hero-art" src="/assets/img/teacher.png" alt=""/>
    </section>

    <section class="features">
      <Card v-for="feature in features" :key="feature.title">
        <template #content>
          <span class="feature-icon"><i :class="feature.icon"></i></span>
          <h3>{{ feature.title }}</h3>
          <p class="muted">{{ feature.text }}</p>
        </template>
      </Card>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      features: [
        { icon: 'pi pi-calendar-plus', title: 'Schedule', text: 'Pick a tutor, a topic, and a time that works for you.' },
        { icon: 'pi pi-refresh', title: 'Reschedule', text: 'Plans change. Move a session without starting over.' },
        { icon: 'pi pi-list-check', title: 'Stay on track', text: 'See all of your upcoming sessions in one place.' }
      ]
    }
  }
}
</script>

<style scoped>
.hero {
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  align-items: center;
  gap: 2rem;
  padding: 2rem 0 3rem;
}
.hero h1 {
  font-size: clamp(2rem, 5vw, 3rem);
  line-height: 1.1;
  margin: 1rem 0;
}
.lead {
  font-size: 1.125rem;
  line-height: 1.6;
  margin: 0 0 2rem;
}
.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}
.hero-art {
  width: 100%;
  max-width: 320px;
  justify-self: center;
  /* the source image has a striped square backdrop; keep only the round badge */
  clip-path: circle(41%);
}
.features {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}
.features h3 {
  font-size: 1.05rem;
  margin: 1rem 0 0.25rem;
}
.features p {
  margin: 0;
  line-height: 1.5;
}
.feature-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.75rem;
  background: var(--p-primary-50);
  color: var(--p-primary-color);
}
@media (max-width: 720px) {
  .hero {
    grid-template-columns: 1fr;
    padding-top: 0.5rem;
  }
  .hero-art {
    display: none;
  }
  .features {
    grid-template-columns: 1fr;
  }
}
</style>
