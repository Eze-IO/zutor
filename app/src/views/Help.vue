<template>
  <div class="page page-form">
    <div class="intro">
      <Tag value="FAQ" rounded/>
      <h1>How can we help?</h1>
      <p class="muted">Answers to the questions we hear most.</p>
    </div>

    <Accordion value="0" class="faq">
      <AccordionPanel value="0">
        <AccordionHeader>How do I schedule a tutoring session?</AccordionHeader>
        <AccordionContent>
          Go to the <router-link to="/dashboard">dashboard</router-link> and click
          <strong>Schedule a session</strong>. Describe what you need help with, enter your tutor's name,
          pick a date and time, then click <strong>Schedule session</strong>.
        </AccordionContent>
      </AccordionPanel>
      <AccordionPanel value="1">
        <AccordionHeader>Can I cancel my tutoring session?</AccordionHeader>
        <AccordionContent>
          Yes. On the <router-link to="/dashboard">dashboard</router-link>, click the
          <i class="pi pi-trash"></i> icon on the session you'd like to cancel and confirm.
        </AccordionContent>
      </AccordionPanel>
      <AccordionPanel value="2">
        <AccordionHeader>Can I reschedule my tutoring session?</AccordionHeader>
        <AccordionContent>
          Yes. On the <router-link to="/dashboard">dashboard</router-link>, click the
          <i class="pi pi-pencil"></i> icon on the session, pick a new time and click <strong>Save changes</strong>.
        </AccordionContent>
      </AccordionPanel>
      <AccordionPanel value="3">
        <AccordionHeader>How do I update my information or password?</AccordionHeader>
        <AccordionContent>
          <router-link to="/login">Log in</router-link>, then click <strong>Profile</strong> in the top bar.
          Change your details, optionally enter a new password, and click <strong>Save changes</strong>.
        </AccordionContent>
      </AccordionPanel>
      <AccordionPanel value="4">
        <AccordionHeader>How do I create an account?</AccordionHeader>
        <AccordionContent>
          Go to the <router-link to="/register">sign-up page</router-link>, enter your information and
          click <strong>Create account</strong>.
        </AccordionContent>
      </AccordionPanel>
      <AccordionPanel value="5">
        <AccordionHeader>How do I delete my account?</AccordionHeader>
        <AccordionContent>
          <router-link to="/login">Log in</router-link>, open your <strong>Profile</strong>, and click
          <strong>Delete account</strong> at the bottom of the page.
        </AccordionContent>
      </AccordionPanel>
    </Accordion>
  </div>
</template>

<script>
export default {
  name: 'Help'
}
</script>

<style scoped>
.page-form {
  max-width: 720px;
}
.intro {
  text-align: center;
  margin-bottom: 2rem;
}
.intro h1 {
  font-size: 2.25rem;
  margin: 0.75rem 0 0.5rem;
}
.intro p {
  margin: 0;
}
.faq {
  background: var(--p-surface-0);
  border: 1px solid var(--p-surface-200);
  border-radius: var(--p-border-radius-xl);
  overflow: hidden;
}
.faq :deep(.p-accordioncontent-content) {
  line-height: 1.6;
}
.faq :deep(.p-accordionpanel:last-child) {
  border-bottom: 0;
}
</style>
