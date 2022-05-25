/// <reference types="vite/client" />
// 意思就是导入的是个模块，也就是文件的拓展的时候用
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}
declare module 'splitpanes' {
  export const Splitpanes: any;
  export const Pane: any
}
