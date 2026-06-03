import type { ButtonProps } from 'element-plus'
import { ElButton } from 'element-plus'
import { createTransparentWrapper } from '../transparent'

// 透明包装 demo:ElButton → GButton,渲染出 `g-button … g-btn`。
export const GButton = createTransparentWrapper<ButtonProps>('GButton', ElButton, 'btn')
