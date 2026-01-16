/**
 * 文章管理搜索项配置
 */
import type { MaSearchItem } from '@mineadmin/search'
import { remote } from '~/article/api/ArticleCategory.ts'
import type { ArticleCategoryVo } from '~/article/api/ArticleCategory.ts'

export default function getSearchItems(t: any): MaSearchItem[] {
  return [
    {
      label: '文章标题',
      prop: 'title',
      render: () => <el-input placeholder="请输入文章标题" clearable />,
    },
    {
      label: '文章描述',
      prop: 'description',
      render: () => <el-input placeholder="请输入文章描述" clearable />,
    },
    {
      label: '文章内容',
      prop: 'content',
      render: () => <el-input placeholder="请输入文章内容关键词" clearable />,
    },
    {
      label: '文章分类',
      prop: 'category_id',
      render: () => <ma-remote-select filterable clearable placeholder="请选择文章分类" />,
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
          return flattenTree(response.data || [])
        },
      },
    },
    {
      label: '作者ID',
      prop: 'author_id',
      render: () => <el-input-number placeholder="请输入作者ID" min={1} controls-position="right" style={{ width: '100%' }} />,
    },
    {
      label: '创建时间',
      prop: 'created_at',
      render: () => <el-date-picker
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
        value-format="YYYY-MM-DD HH:mm:ss"
        style={{ width: '100%' }}
      />,
    },
    {
      label: '更新时间',
      prop: 'updated_at',
      render: () => <el-date-picker
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
        value-format="YYYY-MM-DD HH:mm:ss"
        style={{ width: '100%' }}
      />,
    },
  ]
}
