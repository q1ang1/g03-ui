import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import DeliveryView from '../views/delivery-view.vue'
import G03LabView from '../views/g03-lab-view'
import WorkbenchView from '../views/workbench-view.vue'

/** Primary navigation routes available in the starter playground application. */
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/workbench'
  },
  {
    path: '/workbench',
    name: 'workbench',
    component: WorkbenchView
  },
  {
    path: '/delivery',
    name: 'delivery',
    component: DeliveryView
  },
  {
    path: '/g03-lab',
    name: 'g03-lab',
    component: G03LabView
  }
]

/**
 * GitHub Pages is static hosting, so the deployed playground app uses hash history to avoid 404 on refresh.
 */
function resolveHistory() {
  if (import.meta.env.BASE_URL !== '/') {
    return createWebHashHistory(import.meta.env.BASE_URL)
  }

  return createWebHistory(import.meta.env.BASE_URL)
}

const router = createRouter({
  history: resolveHistory(),
  routes
})

export default router
