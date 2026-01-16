/**
 * 文章分类表单项配置
 */
import type { MaFormItem } from '@mineadmin/form'
import type { ArticleCategoryVo } from '~/article/api/ArticleCategory.ts'
import { remote } from '~/article/api/ArticleCategory.ts'

export default function getFormItems(formType: 'add' | 'edit' = 'add', t: any, model: ArticleCategoryVo): MaFormItem[] {
  // 新增默认值
  if (formType === 'add') {
    model.parent_id = 0
    model.sort_order = 0
  }

  return [
    {
      label: '分类名称',
      prop: 'category_name',
      itemProps: { required: true },
      render: () => <el-input placeholder="请输入分类名称" maxlength={100} show-word-limit />,
    },
    {
      label: '父级分类',
      prop: 'parent_id',
      render: () => <ma-remote-select
        filterable
        clearable
        placeholder="请选择父级分类，默认为顶级分类"
      />,
      renderProps: {
        api: remote,
        dataHandle: (response: any) => {
          // 处理树形结构为扁平列表
          const flattenTree = (items: ArticleCategoryVo[], result: any[] = []) => {
            items.forEach((item) => {
              result.push({ label: item.category_name, value: item.id })
              if (item.children && item.children.length > 0) {
                flattenTree(item.children, result)
              }
            })
            return result
          }
          const options = flattenTree(response.data || [])
          // 添加顶级分类选项
          return [{ label: '顶级分类', value: 0 }, ...options]
        },
      },
    },
    {
      label: '排序值',
      prop: 'sort_order',
      render: () => <el-input-number
        placeholder="请输入排序值"
        min={0}
        controls-position="right"
        style={{ width: '100%' }}
      />,
    },
  ]
}
