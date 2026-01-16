/**
 * 文章管理表单项配置
 */
import { h } from 'vue'
import type { MaFormItem } from '@mineadmin/form'
import type { ArticleVo } from '~/article/api/Article.ts'
import { remote } from '~/article/api/ArticleCategory.ts'
import type { ArticleCategoryVo } from '~/article/api/ArticleCategory.ts'
import NmTinyMCE from '$/west/tinymce/views/index.vue'

export default function getFormItems(formType: 'add' | 'edit' = 'add', t: any, model: ArticleVo): MaFormItem[] {
  // 新增默认值
  if (formType === 'add') {
    model.category_id = 0
    model.content = ''
  }

  return [
    {
      label: '文章标题',
      prop: 'title',
      itemProps: { required: true },
      render: () => <el-input placeholder="请输入文章标题" maxlength={200} show-word-limit />,
    },
    {
      label: '文章描述',
      prop: 'description',
      render: () => <el-input
        type="textarea"
        placeholder="请输入文章描述"
        maxlength={500}
        show-word-limit
        rows={3}
      />,
    },
    {
      label: '缩略图',
      prop: 'thumbnail',
      render: () => <ma-upload-image />,
    },
    {
      label: '文章分类',
      prop: 'category_id',
      render: () => <ma-remote-select
        filterable
        clearable
        placeholder="请选择文章分类"
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
          // 添加无分类选项
          return [{ label: '无分类', value: 0 }, ...options]
        },
      },
    },
    {
      label: '文章内容',
      prop: 'content',
      render: () => h(NmTinyMCE, { height: 500 }),
    },
  ]
}
