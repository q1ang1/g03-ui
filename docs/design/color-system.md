# G03 配色系统

G03 的配色不是手挑十几个颜色，而是参考 **Element Plus** 的做法：定一支主色，再用固定算法派生出整条色阶。这样品牌色、悬浮态、禁用态、背景底色全部从一个值推导，将来换色只改一处。

## 一、命名与理念

**G03 = Green No.03**，一支绿色色卡上的第 03 号色（Pantone 式色号设定）。

设定逻辑：想象一张从深到浅的绿色色卡——`01` 墨绿（太沉）、`02` 森林绿（偏暗）、`03` 才是第一支"亮起来但不刺眼"的绿。所以拿 `03` 当品牌主色：它介于墨绿与荧光绿之间，饱和度与明度都够，长时间盯着也不累，是最适合做界面主色的那一格。

对外只用代号 `G03`，不需要解释含义；对内它就是一个色号，天然能延伸出 `G03-3 / G03-5 / G03-9` 这样的色阶命名，直接对接主题变量。

## 二、派生算法（对齐 Element Plus）

Element Plus 的主题色按这个规则生成，G03 沿用：

- **浅色阶** `light-{3,5,7,8,9}`：主色按 `30% / 50% / 70% / 80% / 90%` 的比例混入白色，数字越大越浅。
- **深色** `dark-2`：主色混入 `20%` 黑色，用于按下/加深态。

混色公式（与 SCSS `mix($white, $primary, weight)` 一致）：

```
light-i = primary × (1 - i × 0.1) + #FFFFFF × (i × 0.1)
dark-2  = primary × 0.8
```

下表的色值即按此公式从主色 `#1F9D6B` 算出。

## 三、主色 G03 色阶

| Token | Hex | 用途 |
|---|---|---|
| `primary` | `#1F9D6B` | 主按钮、链接、激活态 |
| `primary-dark-2` | `#197E56` | hover / 按下加深 |
| `primary-light-3` | `#62BA97` | 次级强调 |
| `primary-light-5` | `#8FCEB5` | 禁用态文字 / 图标 |
| `primary-light-7` | `#BCE2D3` | 浅边框、选中描边 |
| `primary-light-8` | `#D2EBE1` | hover 背景 |
| `primary-light-9` | `#E9F5F0` | 选中行、标签底色 |

## 四、功能色

沿用 Element Plus 的功能色习惯，只把 success 调成与品牌同色系：

| 角色 | Hex | 说明 |
|---|---|---|
| `success` | `#3BA776` | 与品牌绿同色系但更深更"稳"，靠明度区分、不打架 |
| `warning` | `#E6A23C` | 沿用 EP，黄橙在绿主色下对比清晰 |
| `danger` | `#F56C6C` | 沿用 EP |
| `info` | `#909399` | 沿用 EP |

> **取舍点：** 主色是绿、success 也是绿，容易混。这里靠明度拉开（success 更深）。如果想彻底区分，可把 success 换成 EP 默认的黄绿 `#67C23A`。当前先用"同色系区分"这版。

## 五、中性色

中性灰与主色解耦，沿用 Element Plus 体系，换主色时这一组无需改动：

| 角色 | Hex |
|---|---|
| 文字 - 主要 | `#303133` |
| 文字 - 常规 | `#606266` |
| 文字 - 次要 | `#909399` |
| 文字 - 占位 | `#A8ABB2` |
| 边框 - 基础 | `#DCDFE6` |
| 边框 - 浅 | `#E4E7ED` |
| 背景 - 页面 | `#F2F3F5` |
| 背景 - 卡片 | `#FFFFFF` |

## 六、语义 Token 分层

落地时建议在主色色阶之上再加一层**语义变量**，组件只引用语义层，不直接写死色阶。这样换主色只改映射、不动组件：

```css
:root {
  /* 语义层 → 映射到色阶 */
  --g03-brand: var(--el-color-primary);
  --g03-brand-hover: var(--el-color-primary-dark-2);
  --g03-brand-bg: var(--el-color-primary-light-9);
  --g03-surface: #ffffff;
  --g03-border: var(--el-border-color, #dcdfe6);
}
```

`@g03/ui` 组件库与 `playground` 测试台共用同一套语义变量，保证组件库和展示环境视觉一致。

## 七、接入 Element Plus

将来引入 Element Plus 后，用 CSS 变量覆盖即可换肤（无需重新编译 EP）：

```css
:root {
  --el-color-primary: #1F9D6B;          /* G03 */
  --el-color-primary-dark-2: #197E56;
  --el-color-primary-light-3: #62BA97;
  --el-color-primary-light-5: #8FCEB5;
  --el-color-primary-light-7: #BCE2D3;
  --el-color-primary-light-8: #D2EBE1;
  --el-color-primary-light-9: #E9F5F0;

  --el-color-success: #3BA776;
  /* warning / danger / info 用 EP 默认即可，不必覆盖 */
}
```

**暗色模式（后续预留）：** Element Plus 暗色通过在 `html` 上加 `.dark` 类切换。届时主色可保持或略提亮，中性阶（文字/背景）整体反转，本文档当前只给亮色规格。

## 八、落地建议

- 主题变量入口未来放 `packages/ui`，与组件库同源，保证 `@g03/ui` 自带正确配色。
- `playground` 引入该入口做可视化验证：新组件挂上去后，直接在测试台核对配色是否符合本规格。
- 本文档是**设计规格**，仅定义颜色与接入方式；真正接入 Element Plus、落地主题变量是后续独立任务，当前项目尚未引入 Element Plus 依赖。
