/**
 * MineAdmin is committed to providing solutions for quickly building web applications
 * Please view the LICENSE file that was distributed with this source code,
 * For the full copyright and license information.
 * Thank you very much for using MineAdmin.
 *
 * @Author X.Mo<root@imoi.cn>
 * @Link   https://github.com/mineadmin
 */
import type { Plugin } from '#/global'
import { useProTableRenderPlugin } from '@mineadmin/pro-table'
import type { MaProTableExpose } from '@mineadmin/pro-table'
import type { TableColumnRenderer } from '@mineadmin/table'
import { remote } from '$/west/cell-enhance/api/userDict'
import CellEnhance from '$/west/cell-enhance/components'

const pluginConfig: Plugin.PluginConfig = {
  install(app) {
  },
  hooks: {
    start: (config): any => {
      // console.log(
      //     '您正在使用插件',
      //     `插件名称: ${config.info.description}`,
      //     `插件版本: ${config.info.version}`,
      // )
    },
    setup: (): any => {
      const { addPlugin } = useProTableRenderPlugin()
      // 注册插件
      addPlugin({
        // 插件名，唯一标识符，如果需要上传应用市场，请带上专属前缀
        name: 'nmCellEnhance',
        // 插件渲染函数，支持指定其他vue组件或者直接编写 tsx 与 jsx 都可以
        render: (data: TableColumnRenderer, props: any, proxy: MaProTableExpose) => {
          return h(CellEnhance, {
            data,
            props, // 直接传递 props 对象，而不是解构后扩展
            proxy,
          })
        },
      })
    },
    getUserInfo() {
      const dictStore = useDictStore()
      remote()
        .then((response: any) => {
          // 如果数据成功返回
          if (response.code === 200) {
            // 将数据推入到字典 store 中
            dictStore.push('userDict', response.data)
            console.log('用户字典已更新')
          }
          else {
            // 处理返回错误代码
            console.error('获取用户字典失败:', response.message)
          }
        })
        .catch((error) => {
          // 错误处理
          console.error('请求失败:', error)
        })
    },
  },
  config: {
    enable: true,
    info: {
      name: 'west/cell-enhance',
      version: '1.0.1',
      author: 'west',
      description: '单元格增强器',
    },
  },
}

export default pluginConfig
