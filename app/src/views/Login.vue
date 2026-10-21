<template>
  <div class="page page-narrow">
    <Card>
      <template #title>Welcome back</template>
      <template #subtitle>Log in to manage your tutoring sessions.</template>
      <template #content>
        <form class="form" @submit.prevent="userLogin">
          <div class="field">
            <label for="email">Email</label>
            <InputText id="email" v-model="email" type="email" autocomplete="email" required fluid/>
          </div>
          <div class="field">
            <label for="password">Password</label>
            <Password inputId="password" v-model="password" :feedback="false" toggleMask autocomplete="current-password" required fluid/>
          </div>
          <Button type="submit" label="Log in" :loading="loading" fluid/>
        </form>
      </template>
      <template #footer>
        <p class="muted switch">Don't have an account? <router-link to="/register">Sign up</router-link></p>
      </template>
    </Card>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'AppLogin',
  data() {
    return {
      email : "",
      password : "",
      loading: false
    }
  },
  methods: {
    ...mapActions(["login"]),
    userLogin: function() {
      this.loading = true;
      this.login({ email: this.email, password: this.password })
      .then(() => {
        this.$toast.add({ severity: 'success', summary: 'Hello 👋 & welcome back!', life: 3000 });
        this.$router.push('/dashboard');
      })
      .catch(err => this.$toast.add({ severity: 'error', summary: 'Could not log in', detail: err, life: 4000 }))
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
</style>
