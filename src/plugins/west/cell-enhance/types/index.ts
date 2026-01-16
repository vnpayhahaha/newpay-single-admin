export interface Image {
  src: string
  // 图片如何适应容器框
  fit?: '' | 'fill' | 'contain' | 'cover' | 'none' | 'scale-down'
  // 是否可以通过点击遮罩层关闭 preview
  hideOnClickModal?: boolean
  // 浏览器加载图像的策略
  loading?: 'eager' | 'lazy'
  // 是否使用懒加载
  laz?: boolean
  //
  previewSrcList?: string[]
  // 图片预览的 z-index
  zIndex?: number
  // 初始预览图像索引
  initialIndex?: number
  // 是否可以通过按下 ESC 关闭 Image Viewer
  closeOnPressEscape?: boolean
  // 是否将 image-viewer 插入至 body 元素上
  previewTeleported?: boolean
  // 是否可以无限循环预览
  infinite?: boolean
  // 图像查看器缩放事件的缩放速率
  zoomRate?: number
  // 图像查看器缩放事件的最小缩放比例
  minScale?: number
  // 图像查看器缩放事件的最大缩放比例
  maxScale?: number
  // 事件
  on?: Record<string, (...args: any[]) => void>
}

export interface Avatar {
  icon?: string | Component
  size?: number | 'large' | 'default' | 'small'
  shape?: 'circle' | 'square'
  srcSet?: string
  alt?: string
  fit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down'
}

export interface Tag {
  type?: 'primary' | 'success' | 'info' | 'warning' | 'danger'
  closable?: boolean
  disableTransitions?: boolean
  hit?: boolean
  color?: string
  size?: 'large' | 'default' | 'small'
  effect?: 'dark' | 'light' | 'plain'
  round?: boolean
  // 事件
  on?: Record<string, (...args: any[]) => void>
}

export interface AvatarGroup {
  maxCount?: number
  icon?: string | Component
  size?: number | 'large' | 'default' | 'small'
  shape?: 'circle' | 'square'
  srcSet?: string
  alt?: string
  fit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down'
}

export interface Text {
  type?: 'primary' | 'success' | 'info' | 'warning' | 'danger'
  size?: 'large' | 'default' | 'small'
  truncated?: boolean
  lineClamp?: number | string
  tag?: string | Component
}

// Switch 组件属性接口
export interface Switch {
  /** 绑定值（开关状态） */
  modelValue: boolean | string | number
  /** 禁用状态 */
  disabled?: boolean
  /** 加载状态 */
  loading?: boolean
  /** 尺寸 */
  size?: 'large' | 'default' | 'small'
  /** 宽度（像素） */
  width?: number
  /** 图标类名 */
  inlinePrompt?: boolean
  /** 开启状态的图标 */
  activeIcon?: string | Component
  /** 关闭状态的图标 */
  inactiveIcon?: string | Component
  /** 开启时文字描述 */
  activeText?: string
  /** 关闭时文字描述 */
  inactiveText?: string
  /** 开启时的值 */
  activeValue?: boolean | string | number
  /** 关闭时的值 */
  inactiveValue?: boolean | string | number
  /** 原生 name 属性 */
  name?: string
  /** 是否显示加载图标 */
  showLoading?: boolean
  /** 是否在加载时禁用 */
  loadingIsDisabled?: boolean
  /** 是否在加载时隐藏文字 */
  loadingHideText?: boolean
  // 事件
  on?: Record<string, (...args: any[]) => void>
}

export { }
