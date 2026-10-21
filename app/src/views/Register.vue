<template>
  <div class="page page-narrow">
    <Card>
      <template #title>Create your account</template>
      <template #subtitle>It only takes a minute.</template>
      <template #content>
        <form class="form" @submit.prevent="userRegister">
          <div class="field-row">
            <div class="field">
              <label for="first_name">First name</label>
              <InputText id="first_name" v-model="user.first_name" autocomplete="given-name" required fluid/>
            </div>
            <div class="field">
              <label for="last_name">Last name</label>
              <InputText id="last_name" v-model="user.last_name" autocomplete="family-name" required fluid/>
            </div>
          </div>
          <div class="field">
            <label for="email">Email</label>
            <InputText id="email" v-model="user.email" type="email" autocomplete="email" required fluid/>
          </div>
          <div class="field">
            <label for="school">College</label>
            <Select inputId="school" v-model="user.school" :options="schools" placeholder="Choose your college" fluid/>
          </div>
          <div class="field">
            <label for="major">Major</label>
            <InputText id="major" v-model="user.major" fluid/>
          </div>
          <div class="field">
            <label for="password">Password</label>
            <Password inputId="password" v-model="user.password" toggleMask autocomplete="new-password"
              promptLabel="At least 8 characters" required fluid/>
          </div>
          <div class="field">
            <label for="confirm_password">Confirm password</label>
            <Password inputId="confirm_password" v-model="user.confirmPassword" :feedback="false" toggleMask
              autocomplete="new-password" :invalid="mismatch" required fluid/>
            <small v-if="mismatch" class="error">Passwords don't match</small>
          </div>
          <Button type="submit" label="Create account" :loading="loading" fluid/>
        </form>
      </template>
      <template #footer>
        <p class="muted switch">Already have an account? <router-link to="/login">Log in</router-link></p>
      </template>
    </Card>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import schools from '../schools';

export default {
  name: 'AppRegister',
  data() {
    return {
      user: { school: schools[0] },
      schools,
      loading: false
    }
  },
  computed: {
    mismatch() {
      return !!this.user.confirmPassword && this.user.password !== this.user.confirmPassword;
    }
  },
  methods: {
    ...mapActions(["register"]),
    userRegister() {
      if(this.user.password!==this.user.confirmPassword){
        this.$toast.add({ severity: 'warn', summary: "Passwords don't match", life: 3000 });
        return;
      }
      const { first_name, last_name, email, password, school, major } = this.user;
      this.loading = true;
      this.register({ first_name, last_name, email, password, school, major })
      .then(() => {
        this.$toast.add({ severity: 'success', summary: 'Welcome to Zutor 👋', life: 3000 });
        this.$router.push('/dashboard');
      })
      .catch(err => this.$toast.add({ severity: 'error', summary: 'Could not create account', detail: err, life: 4000 }))
      .finally(() => this.loading = false);
    }
  }
}
</script>

<style scoped>
.switch {
  margin: 0;
  text-align: center;
  font-size: 0.9rem;
}
.error {
  color: var(--p-red-500);
}
</style>
