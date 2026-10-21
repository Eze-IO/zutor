<template>
  <div class="page page-form">
    <div class="page-header">
      <div class="identity">
        <Avatar :label="initials" size="xlarge" shape="circle" class="avatar"/>
        <div>
          <h1>{{ student.first_name }} {{ student.last_name }}</h1>
          <p class="muted subtitle">{{ student.email }}</p>
        </div>
      </div>
    </div>

    <Card>
      <template #title>Profile</template>
      <template #subtitle>Update your details. Leave the password blank to keep your current one.</template>
      <template #content>
        <form class="form" @submit.prevent="updateProfile">
          <div class="field-row">
            <div class="field">
              <label for="first_name">First name</label>
              <InputText id="first_name" v-model="student.first_name" autocomplete="given-name" required fluid/>
            </div>
            <div class="field">
              <label for="last_name">Last name</label>
              <InputText id="last_name" v-model="student.last_name" autocomplete="family-name" required fluid/>
            </div>
          </div>
          <div class="field">
            <label for="email">Email</label>
            <InputText id="email" v-model="student.email" type="email" autocomplete="email" required fluid/>
          </div>
          <div class="field-row">
            <div class="field">
              <label for="school">College</label>
              <Select inputId="school" v-model="student.school" :options="schools" placeholder="Choose your college" fluid/>
            </div>
            <div class="field">
              <label for="major">Major</label>
              <InputText id="major" v-model="student.major" fluid/>
            </div>
          </div>
          <div class="field">
            <label for="new_password">New password</label>
            <Password inputId="new_password" v-model="student.password" toggleMask autocomplete="new-password"
              promptLabel="At least 8 characters" placeholder="Unchanged" fluid/>
          </div>
          <div class="form-actions">
            <Button type="submit" label="Save changes" :loading="saving"/>
          </div>
        </form>
      </template>
    </Card>

    <Card class="danger">
      <template #title>Delete account</template>
      <template #content>
        <div class="danger-body">
          <p class="muted">This permanently removes your account. It can't be undone.</p>
          <Button label="Delete account" icon="pi pi-trash" severity="danger" outlined @click="deleteProfile()"/>
        </div>
      </template>
    </Card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import schools from '../schools';

export default {
  name: 'AppProfile',
  data() {
    return {
      student: {},
      schools,
      saving: false
    }
  },
  computed: {
    ...mapGetters({ _student : "currentStudent" }),
    initials() {
      return ((this.student.first_name || '?')[0] + (this.student.last_name || '')[0]).toUpperCase();
    }
  },
  methods: {
    ...mapActions(["updateStudent","deleteStudent","logout"]),
    onLoad: function() {
      this.student = { ...this._student, password: '' };
    },
    updateProfile: function() {
      const password = this.student.password || '';
      if(password.length>0 && password.length<8){
        this.$toast.add({ severity: 'warn', summary: 'Password needs to be at least 8 characters', life: 3000 });
        return;
      }
      this.saving = true;
      this.updateStudent(this.student)
      .then(() => {
        this.$toast.add({
          severity: 'success',
          summary: 'Profile updated',
          detail: password.length>=8 ? 'Your password was changed too.' : undefined,
          life: 3000
        });
        this.onLoad();
      })
      .catch(err => this.$toast.add({ severity: 'error', summary: 'Could not update profile', detail: err, life: 4000 }))
      .finally(() => this.saving = false);
    },
    deleteProfile: function() {
      this.$confirm.require({
        header: 'Delete your account?',
        message: 'Your account will be permanently deleted and you will be logged out.',
        icon: 'pi pi-exclamation-triangle',
        rejectProps: { label: 'Keep account', severity: 'secondary', outlined: true },
        acceptProps: { label: 'Delete account', severity: 'danger' },
        accept: () => {
          this.deleteStudent(this.student._id)
          .then(() => this.logout())
          .then(() => {
            this.$toast.add({ severity: 'info', summary: 'Account deleted', detail: 'Goodbye 👋', life: 4000 });
            this.$router.push('/');
          })
          .catch(err => this.$toast.add({ severity: 'error', summary: 'Could not delete account', detail: err, life: 4000 }));
        }
      });
    }
  },
  created() {
    this.onLoad();
  }
}
</script>

<style scoped>
.page-form {
  max-width: 640px;
}
.identity {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.avatar {
  background: var(--p-primary-100);
  color: var(--p-primary-700);
  font-weight: 600;
}
.subtitle {
  margin: 0.25rem 0 0;
}
.form-actions {
  display: flex;
  justify-content: flex-end;
}
.danger {
  margin-top: 1.5rem;
  border: 1px solid var(--p-red-200);
}
.danger-body {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}
.danger-body p {
  margin: 0;
}
</style>
