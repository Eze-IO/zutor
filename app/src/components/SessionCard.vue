<template>
  <div class="session-card" :class="{ past: isPast }">
    <div class="date-badge">
      <span class="month">{{ month }}</span>
      <span class="day">{{ day }}</span>
    </div>
    <div class="details">
      <h3>{{ session.description }}</h3>
      <p class="meta muted">
        <span><i class="pi pi-user"></i> {{ session.tutor }}</span>
        <span><i class="pi pi-clock"></i> {{ time }}</span>
        <Tag v-if="isPast" value="Past" severity="secondary"/>
      </p>
    </div>
    <div v-if="editable" class="card-actions">
      <Button icon="pi pi-pencil" text rounded severity="secondary" aria-label="Edit session"
        v-tooltip.top="'Edit'" @click="$router.push(`/session/${session._id}`)"/>
      <Button icon="pi pi-trash" text rounded severity="danger" aria-label="Cancel session"
        v-tooltip.top="'Cancel'" @click="$emit('cancel', session)"/>
    </div>
  </div>
</template>

<script>
import Tooltip from 'primevue/tooltip';

export default {
  name: 'SessionCard',
  directives: { tooltip: Tooltip },
  props: {
    session: { type: Object, required: true },
    editable: { type: Boolean, default: false }
  },
  emits: ['cancel'],
  computed: {
    date() { return new Date(this.session.availability); },
    month() { return this.date.toLocaleDateString([], { month: 'short' }); },
    day() { return this.date.getDate(); },
    // e.g. "Sunday · 2:00 PM", with the year added when it isn't this year
    time() {
      const sameYear = this.date.getFullYear() === new Date().getFullYear();
      const day = this.date.toLocaleDateString([], sameYear ? { weekday: 'long' } : { weekday: 'long', year: 'numeric' });
      return day + ' · ' + this.date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    },
    isPast() { return this.date < new Date(); }
  }
}
</script>

<style scoped>
.session-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.25rem;
  background: var(--p-surface-0);
  border: 1px solid var(--p-surface-200);
  border-radius: var(--p-border-radius-xl);
  transition: border-color 0.15s, box-shadow 0.15s;
}
.session-card:hover {
  border-color: var(--p-primary-200);
  box-shadow: 0 4px 12px rgb(0 0 0 / 0.04);
}
.session-card.past {
  opacity: 0.7;
}
.date-badge {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: var(--p-border-radius-lg);
  background: var(--p-primary-50);
  color: var(--p-primary-700);
}
.month {
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
}
.day {
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1;
}
.details {
  flex: 1;
  min-width: 0;
}
.details h3 {
  font-size: 1rem;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.25rem 1rem;
  margin: 0.35rem 0 0;
  font-size: 0.875rem;
}
.meta i {
  font-size: 0.8rem;
  margin-right: 0.25rem;
}
.card-actions {
  display: flex;
  flex-shrink: 0;
}
</style>
