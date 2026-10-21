<template>
  <div class="page">
    <div class="page-header">
      <div>
        <h1>Hi{{ currentStudent.first_name ? `, ${currentStudent.first_name}` : '' }} 👋</h1>
        <p class="muted subtitle">Here are your tutoring sessions.</p>
      </div>
      <Button as="router-link" to="/session" label="Schedule a session" icon="pi pi-plus"/>
    </div>

    <Tabs value="self">
      <TabList>
        <Tab value="self">Your sessions <Badge :value="userSessions.length" severity="secondary"/></Tab>
        <Tab value="all">All sessions <Badge :value="allSessions.length" severity="secondary"/></Tab>
      </TabList>
      <TabPanels>
        <TabPanel v-for="tab in tabs" :key="tab.value" :value="tab.value">
          <div v-if="loading" class="list">
            <Skeleton v-for="n in 3" :key="n" height="5.5rem" borderRadius="12px"/>
          </div>
          <div v-else-if="tab.sessions.length>0" class="list">
            <SessionCard
              v-for="session in tab.sessions"
              :key="session._id"
              :session="session"
              :editable="currentStudent._id===session.student_id"
              @cancel="cancelSession"
            />
          </div>
          <div v-else class="empty">
            <i class="pi pi-calendar"></i>
            <h3>No sessions scheduled</h3>
            <p class="muted">When you book a tutoring session, it will show up here.</p>
            <Button as="router-link" to="/session" label="Schedule your first session" icon="pi pi-plus" outlined/>
          </div>
        </TabPanel>
      </TabPanels>
    </Tabs>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import SessionCard from '../components/SessionCard.vue';

export default {
  name: 'Dashboard',
  components: { SessionCard },
  data() {
    return {
      loading: true
    }
  },
  computed: {
    ...mapGetters(["allSessions", "userSessions", "currentStudent"]),
    tabs() {
      return [
        { value: 'self', sessions: this.sortByDate(this.userSessions) },
        { value: 'all', sessions: this.sortByDate(this.allSessions) }
      ];
    }
  },
  methods: {
    ...mapActions(["getSessions", "deleteSession"]),
    // Upcoming sessions first (soonest at top), then past ones (most recent at top)
    sortByDate(sessions) {
      const now = Date.now();
      return [...sessions].sort((a, b) => {
        const ta = new Date(a.availability).getTime(), tb = new Date(b.availability).getTime();
        const pa = ta < now, pb = tb < now;
        if (pa !== pb) return pa ? 1 : -1;
        return pa ? tb - ta : ta - tb;
      });
    },
    cancelSession(session){
      this.$confirm.require({
        header: 'Cancel this session?',
        message: `"${session.description}" with ${session.tutor} will be removed.`,
        icon: 'pi pi-exclamation-triangle',
        rejectProps: { label: 'Keep it', severity: 'secondary', outlined: true },
        acceptProps: { label: 'Cancel session', severity: 'danger' },
        accept: () => {
          this.deleteSession(session._id)
          .then(() => this.$toast.add({ severity: 'success', summary: 'Session cancelled', life: 3000 }))
          .catch(err => this.$toast.add({ severity: 'error', summary: 'Could not cancel session', detail: err, life: 4000 }));
        }
      });
    }
  },
  created() {
    this.getSessions()
      .catch(err => this.$toast.add({ severity: 'error', summary: 'Could not load sessions', detail: err, life: 4000 }))
      .finally(() => this.loading = false);
  }
}
</script>

<style scoped>
.subtitle {
  margin: 0.25rem 0 0;
}
.list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding-top: 0.5rem;
}
.empty {
  text-align: center;
  padding: 3rem 1rem;
}
.empty > i {
  font-size: 2.5rem;
  color: var(--p-surface-400);
}
.empty h3 {
  margin: 1rem 0 0.25rem;
  font-size: 1.1rem;
}
.empty p {
  margin: 0 0 1.5rem;
}
:deep(.p-tab) {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
:deep(.p-tabpanels) {
  background: transparent;
  padding-left: 0;
  padding-right: 0;
}
</style>
