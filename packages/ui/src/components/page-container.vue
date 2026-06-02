<script setup lang="ts">
/**
 * Props for the page-level title area used by admin views.
 */
type PageContainerProps = {
  eyebrow?: string
  title: string
  description: string
}

/** Stable title and description data for the current page. */
const props = withDefaults(defineProps<PageContainerProps>(), {
  eyebrow: 'G03'
})
</script>

<template>
  <section class="page-container">
    <header class="page-header">
      <p class="eyebrow">
        {{ props.eyebrow }}
      </p>
      <div class="header-main">
        <div class="title-block">
          <h1>{{ props.title }}</h1>
          <p>{{ props.description }}</p>
        </div>
        <div
          v-if="$slots.actions"
          class="actions"
        >
          <slot name="actions" />
        </div>
      </div>
    </header>
    <div class="page-body">
      <slot />
    </div>
  </section>
</template>

<style scoped lang="scss">
.page-container {
  display: grid;
  gap: 1.5rem;
}

.page-header {
  border: 1px solid rgba(15, 23, 42, 0.08);
  border-radius: 1.5rem;
  padding: 1.5rem;
  background:
    linear-gradient(135deg, rgba(11, 90, 88, 0.14), rgba(255, 255, 255, 0.9)),
    rgba(255, 255, 255, 0.94);
  box-shadow: 0 24px 48px rgba(15, 23, 42, 0.08);
}

.eyebrow {
  margin: 0 0 0.75rem;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--brand-strong);
}

.header-main {
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  align-items: flex-start;
}

.title-block {
  display: grid;
  gap: 0.65rem;
}

.title-block h1 {
  margin: 0;
  font-size: clamp(2rem, 4vw, 3rem);
  line-height: 1.05;
  color: var(--ink-strong);
}

.title-block p {
  margin: 0;
  max-width: 44rem;
  color: var(--ink-soft);
  line-height: 1.7;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.page-body {
  display: grid;
  gap: 1.25rem;
}

@media (max-width: 768px) {
  .page-header {
    padding: 1.25rem;
  }

  .header-main {
    flex-direction: column;
  }

  .actions {
    width: 100%;
  }
}
</style>
