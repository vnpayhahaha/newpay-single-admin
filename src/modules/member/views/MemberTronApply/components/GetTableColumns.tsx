/**
 * MineAdmin is committed to providing solutions for quickly building web applications
 * Please view the LICENSE file that was distributed with this source code,
 * For the full copyright and license information.
 * Thank you very much for using MineAdmin.
 *
 * @Author X.Mo<root@imoi.cn>
 * @Link   https://github.com/mineadmin
 */
import type { MaProTableColumns, MaProTableExpose } from '@mineadmin/pro-table'
import type { MemberTronApplyVo } from '~/member/api/MemberTronApply.ts'
import type { UseDialogExpose } from '@/hooks/useDialog.ts'

import { useMessage } from '@/hooks/useMessage.ts'
import { deleteByIds } from '~/member/api/MemberTronApply.ts'
import { ResultCode } from '@/utils/ResultCode.ts'
import hasAuth from '@/utils/permission/hasAuth.ts'
import MaCopy from '@/components/ma-copy/index.vue'
import tool from '@/utils/tool.ts'
import { ElText, ElTag } from 'element-plus'
import { MemberTronApplyStatusEnum, MemberTronApplyTypeEnum, getEnumItem } from '~/member/enums'

export default function getTableColumns(dialog: UseDialogExpose, formRef: any, t: any): MaProTableColumns[] {
  const dictStore = useDictStore()
  const msg = useMessage()
  const i18n = useTrans()
  const local = i18n.localTrans

  const showBtn = (auth: string | string[], row: MemberTronApplyVo) => {
    return hasAuth(auth)
  }

  // 获取状态标签
  const getStatusTag = (status: number) => {
    const enumItem = getEnumItem(MemberTronApplyStatusEnum, status)
    if (!enumItem) {
      return <ElTag type="info" effect="dark">状态{status}</ElTag>
    }
    const labelKey = `MemberTronApply.status_enum.${enumItem.labelKey}`
    return <ElTag type={enumItem.color} effect="dark">{local(labelKey)}</ElTag>
  }

  // 获取类型标签
  const getTypeTag = (type: number) => {
    const enumItem = getEnumItem(MemberTronApplyTypeEnum, type)
    if (!enumItem) {
      return <ElTag type="info" effect="dark">类型{type}</ElTag>
    }
    const labelKey = `MemberTronApply.type_enum.${enumItem.labelKey}`
    return <ElTag type={enumItem.color} effect="dark">{local(labelKey)}</ElTag>
  }

  return [
    // 多选列
    { type: 'selection', showOverflowTooltip: false, label: () => t('crud.selection') },
    // 索引序号列
    { type: 'index' },
    // 普通列
    {
      label: () => local('MemberTronApply.member_id'),
      prop: 'member_id',
      width: 120,
      cellRender: ({ row }: { row: MemberTronApplyVo }) => (
        <MaCopy content={row.member_id?.toString() || ''} class="color-primary" />
      ),
    },
    {
      label: () => local('MemberTronApply.type'),
      prop: 'type',
      width: 100,
      cellRender: ({ row }: { row: MemberTronApplyVo }) => getTypeTag(row.type),
    },
    {
      label: () => local('MemberTronApply.status'),
      prop: 'status',
      width: 100,
      cellRender: ({ row }: { row: MemberTronApplyVo }) => getStatusTag(row.status),
    },
    {
      label: () => local('MemberTronApply.tron_address'),
      prop: 'tron_address',
      minWidth: 220,
      cellRender: ({ row }: { row: MemberTronApplyVo }) => (
        <MaCopy content={row.tron_address || ''} class="color-blue" />
      ),
    },
    {
      label: () => '金额信息',
      prop: 'amount_info',
      minWidth: 200,
      cellRender: ({ row }: { row: MemberTronApplyVo }) => (
        <div style={{ textAlign: 'left' }}>
          <p>
            <ElText size="small" type="info">申请: </ElText>
            <ElText type="primary" style={{ fontWeight: 'bold' }}>
              ₹ {tool.formatMoney(row.amount || 0)}
            </ElText>
          </p>
          {row.confirm_amount && (
            <p style={{ marginTop: '4px' }}>
              <ElText size="small" type="info">确认: </ElText>
              <ElText type="success" style={{ fontWeight: 'bold' }}>
                ₹ {tool.formatMoney(row.confirm_amount)}
              </ElText>
            </p>
          )}
        </div>
      ),
    },
    {
      label: () => local('MemberTronApply.confirm_time'),
      prop: 'confirm_time',
      width: 180,
      sortable: 'custom',
    },
    {
      label: () => local('MemberTronApply.created_at'),
      prop: 'created_at',
      width: 180,
      sortable: 'custom',
    },
    {
      label: () => local('MemberTronApply.remark'),
      prop: 'remark',
      minWidth: 150,
      cellRender: ({ row }: { row: MemberTronApplyVo }) => (
        <ElText truncated style={{ maxWidth: '100%' }}>{row.remark || '-'}</ElText>
      ),
    },

    // 操作列
    {
      type: 'operation',
      label: () => t('crud.operation'),
      width: '160px',
      fixed: 'right',
      operationConfigure: {
        type: 'tile',
        actions: [
          {
            name: 'del',
            show: ({ row }) => showBtn('members:member_tron_apply:delete', row),
            icon: 'i-heroicons:trash',
            text: () => t('crud.delete'),
            onClick: ({ row }, proxy: MaProTableExpose) => {
              msg.delConfirm(t('crud.delDataMessage')).then(async () => {
                const response = await deleteByIds([row.id])
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
