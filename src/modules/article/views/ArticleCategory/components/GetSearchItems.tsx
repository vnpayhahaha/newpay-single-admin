/**
 * 文章分类搜索项配置
 */
import type { MaSearchItem } from '@mineadmin/search'

export default function getSearchItems(t: any): MaSearchItem[] {
  return [
    {
      label: '分类名称',
      prop: 'category_name',
      render: () => <el-input placeholder="请输入分类名称" />,
    },
    {
      label: '父级分类ID',
      prop: 'parent_id',
      render: () => <el-input-number placeholder="请输入父级分类ID" min={0} />,
    },
    {
      label: '排序值',
      prop: 'sort_order',
      render: () => <el-input-number placeholder="请输入排序值" min={0} />,
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
      />,
    },
  ]
}
