<template>
  <div class="page page-form">
    <Button as="router-link" to="/dashboard" label="Back to dashboard" icon="pi pi-arrow-left" text class="back"/>
    <Card>
      <template #title>{{ valid_id ? 'Change scheduled session' : 'Schedule a session' }}</template>
      <template #subtitle>{{ valid_id ? 'Update the details or move it to a new time.' : 'Tell us what you need help with and when.' }}</template>
      <template #content>
        <form class="form" @submit.prevent="saveSession">
          <div class="field">
            <label for="description">What do you need help with?</label>
            <InputText id="description" v-model="session.description" placeholder="e.g. Calculus III homework" required fluid/>
          </div>
          <div class="field">
            <label for="tutor">Tutor</label>
            <IconField>
              <InputIcon class="pi pi-user"/>
              <InputText id="tutor" v-model="session.tutor" placeholder="Tutor's name" required fluid/>
            </IconField>
          </div>
          <div class="field">
            <label for="availability">Date & time</label>
            <DatePicker inputId="availability" v-model="availability" showTime hourFormat="12" showIcon iconDisplay="input"
              :stepMinute="15" dateFormat="D, M d, yy" required fluid/>
          </div>
          <div class="form-actions">
            <Button as="router-link" to="/dashboard" label="Cancel" severity="secondary" text/>
            <Button type="submit" :label="valid_id ? 'Save changes' : 'Schedule session'" :loading="saving"/>
          </div>
        </form>
      </template>
    </Card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

// Next full hour, as a sensible default for a new session
function nextHour() {
  const d = new Date();
  d.setHours(d.getHours() + 1, 0, 0, 0);
  return d;
}

export default {
  name: 'Session',
  data() {
    return {
      availability: nextHour(),
      session : {
        description: "",
        tutor: "",
        student_id: "",
        availability: ""
      },
      valid_id: false,
      saving: false
    }
  },
  computed: mapGetters({ Sessions : "allSessions", currentStudent: "currentStudent" }),
  methods: {
    ...mapActions(["getSessions","addSession","updateSession"]),
    async onLoad() {
      const id = this.$route.params.id;
      if(id===undefined) return;
      // Sessions may not be loaded yet when this page is opened directly
      if(this.Sessions.length===0) await this.getSessions().catch(() => {});
      const s = this.Sessions.find(session => session._id === id);
      if(s){
        this.session = { ...s };
        if(s.availability) this.availability = new Date(s.availability);
        this.valid_id = true;
      }
    },
    saveSession() {
      this.session.availability = this.availability;
      this.saving = true;
      let request;
      if(this.valid_id){
        request = this.updateSession(this.session)
          .then(() => this.$toast.add({ severity: 'success', summary: 'Session updated', life: 3000 }));
      } else {
        this.session.student_id = this.currentStudent._id;
        request = this.addSession(this.session)
          .then(() => this.$toast.add({ severity: 'success', summary: 'Session scheduled', detail: 'See you there!', life: 3000 }));
      }
      request
        .then(() => this.$router.push('/dashboard'))
        .catch(err => this.$toast.add({ severity: 'error', summary: 'Could not save session', detail: err, life: 4000 }))
        .finally(() => this.saving = false);
    }
  },
  created(){
    this.onLoad()
  }
}
</script>

<style scoped>
.page-form {
  max-width: 560px;
}
.back {
  margin: -0.5rem 0 0.75rem -0.75rem;
}
.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}
</style>
