<script setup lang="ts">
import { GConfigProvider } from '@g03/el-plus'
import { RouterView } from 'vue-router'
import AppLayout from './components/app-layout.vue'
</script>

<template>
  <GConfigProvider>
    <AppLayout>
      <RouterView v-slot="{ Component }">
        <Transition
          name="route-fade"
          mode="out-in"
        >
          <component :is="Component" />
        </Transition>
      </RouterView>
    </AppLayout>
  </GConfigProvider>
</template>

<style scoped lang="scss">
.route-fade-enter-active,
.route-fade-leave-active {
  transition: opacity 0.22s ease, transform 0.22s ease;
}

.route-fade-enter-from,
.route-fade-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>
