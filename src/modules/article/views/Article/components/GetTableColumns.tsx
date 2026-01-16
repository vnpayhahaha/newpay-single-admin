/**
 * 文章管理表格列配置
 */
import type { MaProTableColumns, MaProTableExpose } from '@mineadmin/pro-table'
import type { ArticleVo } from '~/article/api/Article.ts'
import type { UseDialogExpose } from '@/hooks/useDialog.ts'

import { useMessage } from '@/hooks/useMessage.ts'
import { deleteByIds } from '~/article/api/Article.ts'
import { ResultCode } from '@/utils/ResultCode.ts'
import hasAuth from '@/utils/permission/hasAuth.ts'

export default function getTableColumns(dialog: UseDialogExpose, formRef: any, t: any): MaProTableColumns[] {
  const msg = useMessage()

  const showBtn = (auth: string | string[], row: ArticleVo) => {
    return hasAuth(auth)
  }

  return [
    // 多选列
    { type: 'selection', showOverflowTooltip: false, label: () => t('crud.selection') },
    // 索引序号列
    { type: 'index' },
    // 普通列
    {
      label: '缩略图',
      prop: 'thumbnail',
      width: 100,
      cellRenderTo: {
        name: 'nmCellEnhance',
        props: {
          type: 'avatar',
          props: {
            shape: 'square',
            size: 60,
          },
        },
      },
    },
    {
      label: '文章标题',
      prop: 'title',
      minWidth: 200,
      showOverflowTooltip: true,
    },
    {
      label: '文章描述',
      prop: 'description',
      minWidth: 200,
      showOverflowTooltip: true,
    },
    {
      label: '分类',
      prop: 'category.category_name',
      width: 120,
    },
    {
      label: '作者',
      prop: 'author.nickname',
      width: 120,
      cellRenderTo: {
        name: 'nmCellEnhance',
        props: {
          type: 'text',
          render: (row: ArticleVo) => {
            return row.author?.nickname || row.author?.username || '-'
          },
        },
      },
    },
    {
      label: '创建时间',
      prop: 'created_at',
      width: 180,
    },
    {
      label: '更新时间',
      prop: 'updated_at',
      width: 180,
    },

    // 操作列
    {
      type: 'operation',
      label: () => t('crud.operation'),
      width: '200px',
      operationConfigure: {
        type: 'tile',
        actions: [
          {
            name: 'edit',
            icon: 'i-heroicons:pencil',
            show: ({ row }) => showBtn('article:article:update', row),
            text: () => t('crud.edit'),
            onClick: ({ row }) => {
              dialog.setTitle(t('crud.edit'))
              dialog.open({ formType: 'edit', data: row })
            },
          },
          {
            name: 'del',
            show: ({ row }) => showBtn('article:article:delete', row),
            icon: 'i-heroicons:trash',
            text: () => t('crud.delete'),
            onClick: ({ row }, proxy: MaProTableExpose) => {
              msg.delConfirm(t('crud.delDataMessage')).then(async () => {
                const response = await deleteByIds([row.id as number])
                if (response.code === ResultCode.SUCCESS) {
                  msg.success(t('crud.delSuccess'))
                  await proxy.refresh()
                }
              })
            },
          },
        ],
      },
    },
  ]
}
