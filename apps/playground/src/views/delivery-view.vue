<script setup lang="ts">
import { PageContainer, SectionPanel } from '@g03/ui'

type RuleItem = {
  title: string
  description: string
}

/** Branch rules that keep the public repository simple and the main branch stable. */
const branchRules: RuleItem[] = [
  {
    title: '只长期维护 main',
    description: 'main 作为唯一长期分支，对外文档、Pages 和 release 都从这里发。'
  },
  {
    title: '开发走短分支',
    description: '统一使用 feat/*、fix/*、docs/*、chore/*，合并后尽快删除。'
  },
  {
    title: 'main 禁止直接 push',
    description: '等远程仓库创建后，开启 PR、状态检查和会话解决要求。'
  }
]

/** CI/CD stages exposed in the first version of the repository workflows. */
const pipelineStages: RuleItem[] = [
  {
    title: 'CI 校验',
    description: '在 PR 和 main push 上跑 lint、typecheck、test、build。'
  },
  {
    title: '站点部署',
    description: 'main 更新后自动构建管理台和 docs，根路径发布管理台，/docs 发布文档。'
  },
  {
    title: '后续 release',
    description: '下一阶段可以接 Changesets，再把版本发布自动化。'
  }
]

/** Remote repository setup steps required after the local starter is ready. */
const remoteSetupChecklist: string[] = [
  '在 GitHub 新建仓库，并把 Pages Source 切换到 GitHub Actions。',
  '添加 origin，先推 main，再根据需要推 feature 分支。',
  '为 main 打开 branch protection，要求 PR、状态检查和 conversation resolution。',
  '如果想尽量只对外暴露 main，就不要长期保留远程 feature 分支，合并后自动删除。'
]
</script>

<template>
  <PageContainer
    eyebrow="G03 Delivery"
    title="远程接入后就按这套流程跑"
    description="这页把分支方案和 CI/CD 节点写清楚了，方便你后面接 GitHub 时直接按文档配置，不用再临时回忆。"
  >
    <div class="delivery-grid">
      <SectionPanel
        title="分支管理方案"
        description="优先使用 GitHub Flow。它最适合你现在这个开源项目，不会像 Git Flow 那样太重。"
      >
        <article
          v-for="item in branchRules"
          :key="item.title"
          class="rule-card"
        >
          <strong>{{ item.title }}</strong>
          <p>{{ item.description }}</p>
        </article>
      </SectionPanel>

      <SectionPanel
        title="CI / CD 节点"
        description="现在仓库里已经预留了基础工作流，接上远程后就可以直接触发。"
      >
        <article
          v-for="item in pipelineStages"
          :key="item.title"
          class="rule-card"
        >
          <strong>{{ item.title }}</strong>
          <p>{{ item.description }}</p>
        </article>
      </SectionPanel>
    </div>

    <SectionPanel
      title="接 GitHub 时的操作顺序"
      description="这四步做完，仓库就从本地样板进入真正可协作的状态。"
    >
      <ol class="checklist">
        <li
          v-for="item in remoteSetupChecklist"
          :key="item"
        >
          {{ item }}
        </li>
      </ol>
    </SectionPanel>
  </PageContainer>
</template>

<style scoped lang="scss">
.delivery-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

.rule-card {
  padding: 1rem;
  border-radius: 1rem;
  background: rgba(148, 163, 184, 0.1);
}

.rule-card strong {
  display: block;
  margin-bottom: 0.45rem;
  color: var(--ink-strong);
}

.rule-card p {
  margin: 0;
  color: var(--ink-soft);
  line-height: 1.7;
}

.checklist {
  margin: 0;
  padding-left: 1.2rem;
  color: var(--ink-soft);
  line-height: 1.8;
}

@media (max-width: 960px) {
  .delivery-grid {
    grid-template-columns: 1fr;
  }
}
</style>
