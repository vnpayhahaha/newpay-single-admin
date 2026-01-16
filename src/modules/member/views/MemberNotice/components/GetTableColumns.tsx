/**
 * 会员通知管理表格列配置
 */
import type { MaProTableColumns } from '@mineadmin/pro-table'
import type { MemberNoticeVo } from '~/member/api/MemberNotice.ts'
import { ElTag, ElText } from 'element-plus'
import hasAuth from '@/utils/permission/hasAuth.ts'
import MaCopy from '@/components/ma-copy/index.vue'
import { MemberNoticeTypeEnum, getEnumItem } from '~/member/enums'

export default function getTableColumns(
  t: any,
  local: any,
  refresh: () => void,
  handleEdit: (row: MemberNoticeVo) => void,
  handleDel: (row: MemberNoticeVo) => void,
): MaProTableColumns[] {
  // 获取类型标签
  const getTypeTag = (type: number) => {
    const enumItem = getEnumItem(MemberNoticeTypeEnum, type)
    if (!enumItem) {
      return <ElTag type="info" effect="dark">{local('MemberNotice.unknown')}</ElTag>
    }
    const labelKey = `MemberNotice.type_${enumItem.labelKey}`
    return <ElTag type={enumItem.color} effect="dark">{local(labelKey)}</ElTag>
  }

  return [
    { type: 'selection', showOverflowTooltip: false, label: () => t('crud.selection') },
    { label: () => 'ID', prop: 'id', width: 80 },
    {
      label: () => local('MemberNotice.title'),
      prop: 'title',
      minWidth: 200,
      cellRender: ({ row }: { row: MemberNoticeVo }) => (
        <ElText truncated style={{ maxWidth: '100%' }}>
          {row.title}
        </ElText>
      ),
    },
    {
      label: () => local('MemberNotice.type'),
      prop: 'type',
      width: 100,
      cellRender: ({ row }: { row: MemberNoticeVo }) => getTypeTag(row.type),
    },
    {
      label: () => local('MemberNotice.receiver'),
      prop: 'member_id',
      width: 140,
      cellRender: ({ row }: { row: MemberNoticeVo }) => {
        if (row.member_id === 0) {
          return <ElTag type="danger" effect="dark">{local('MemberNotice.all_members')}</ElTag>
        }
        return (
          <div>
            <ElText type="primary">{local('MemberNotice.member_id')}: </ElText>
            <MaCopy content={row.member_id.toString()} />
          </div>
        )
      },
    },
    {
      label: () => local('MemberNotice.content'),
      prop: 'content',
      minWidth: 250,
      cellRender: ({ row }: { row: MemberNoticeVo }) => (
        <ElText truncated style={{ maxWidth: '100%' }}>
          {row.content}
        </ElText>
      ),
    },
    {
      label: () => local('MemberNotice.click_num'),
      prop: 'click_num',
      width: 100,
      cellRender: ({ row }: { row: MemberNoticeVo }) => (
        <ElTag type="info">{row.click_num || 0}</ElTag>
      ),
    },
    {
      label: () => t('crud.remark'),
      prop: 'remark',
      minWidth: 150,
      cellRender: ({ row }: { row: MemberNoticeVo }) => (
        <ElText truncated style={{ maxWidth: '100%' }}>
          {row.remark || '-'}
        </ElText>
      ),
    },
    {
      label: () => local('MemberNotice.created_at'),
      prop: 'created_at',
      width: 180,
      sortable: 'custom',
    },
    {
      label: () => local('MemberNotice.updated_at'),
      prop: 'updated_at',
      width: 180,
      sortable: 'custom',
    },
    {
      type: 'operation',
      label: () => t('crud.operation'),
      width: 160,
      fixed: 'right',
      operationConfigure: {
        type: 'tile',
        actions: [
          {
            name: 'edit',
            show: () => hasAuth('member:notice:update'),
            icon: 'i-heroicons:pencil',
            text: () => t('crud.edit'),
            onClick: ({ row }: { row: MemberNoticeVo }) => {
              handleEdit(row)
            },
          },
          {
            name: 'del',
            show: () => hasAuth('member:notice:delete'),
            icon: 'i-heroicons:trash',
            text: () => t('crud.delete'),
            type: 'danger',
            onClick: ({ row }: { row: MemberNoticeVo }) => {
              handleDel(row)
            },
          },
        ],
      },
    },
  ]
}
