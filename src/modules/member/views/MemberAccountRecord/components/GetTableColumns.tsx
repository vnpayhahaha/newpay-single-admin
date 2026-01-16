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
import type { MemberAccountRecordVo } from '~/member/api/MemberAccountRecord.ts'
import type { UseDialogExpose } from '@/hooks/useDialog.ts'

import { useMessage } from '@/hooks/useMessage.ts'
import { deleteByIds } from '~/member/api/MemberAccountRecord.ts'
import { ResultCode } from '@/utils/ResultCode.ts'
import hasAuth from '@/utils/permission/hasAuth.ts'
import MaCopy from '@/components/ma-copy/index.vue'
import tool from '@/utils/tool.ts'
import { ElText, ElTag } from 'element-plus'
import { MemberAccountRecordTypeEnum, getEnumItem } from '~/member/enums'

export default function getTableColumns(dialog: UseDialogExpose, formRef: any, t: any): MaProTableColumns[] {
  const dictStore = useDictStore()
  const msg = useMessage()
  const i18n = useTrans()
  const local = i18n.localTrans

  const showBtn = (auth: string | string[], row: MemberAccountRecordVo) => {
    return hasAuth(auth)
  }

  // 获取类型标签
  const getTypeTag = (type: number) => {
    const enumItem = getEnumItem(MemberAccountRecordTypeEnum, type)
    if (!enumItem) {
      return <ElTag type="info" effect="dark">类型{type}</ElTag>
    }
    const labelKey = `MemberAccountRecord.type_enum.${enumItem.labelKey}`
    return <ElTag type={enumItem.color} effect="dark">{local(labelKey)}</ElTag>
  }

  return [
    // 多选列
    { type: 'selection', showOverflowTooltip: false, label: () => t('crud.selection') },
    // 索引序号列
    { type: 'index' },
    // 普通列
    {
      label: () => local('MemberAccountRecord.member_id'),
      prop: 'member_id',
      width: 120,
      cellRender: ({ row }: { row: MemberAccountRecordVo }) => (
        <MaCopy content={row.member_id?.toString() || ''} class="color-primary" />
      ),
    },
    {
      label: () => local('MemberAccountRecord.type'),
      prop: 'type',
      width: 120,
      cellRender: ({ row }: { row: MemberAccountRecordVo }) => getTypeTag(row.type),
    },
    {
      label: () => local('MemberAccountRecord.change_amount'),
      prop: 'change_amount',
      width: 150,
      cellRender: ({ row }: { row: MemberAccountRecordVo }) => {
        const amount = row.change_amount || 0
        const isPositive = amount >= 0
        return (
          <ElText type={isPositive ? 'success' : 'danger'} style={{ fontSize: '14px', fontWeight: 'bold' }}>
            {isPositive ? '+' : ''} ₹ {tool.formatMoney(amount)}
          </ElText>
        )
      },
    },
    {
      label: () => '变更前/后余额',
      prop: 'balance_info',
      minWidth: 200,
      cellRender: ({ row }: { row: MemberAccountRecordVo }) => (
        <div style={{ textAlign: 'left' }}>
          <p>
            <ElText type="info" size="small">
              {local('MemberAccountRecord.balance_available_before')}: ₹ {tool.formatMoney(row.balance_available_before || 0)}
            </ElText>
          </p>
          <p>
            <ElText type="success" size="small">
              {local('MemberAccountRecord.balance_available_after')}: ₹ {tool.formatMoney(row.balance_available_after || 0)}
            </ElText>
          </p>
        </div>
      ),
    },
    {
      label: () => '变更前/后冻结',
      prop: 'frozen_info',
      minWidth: 200,
      cellRender: ({ row }: { row: MemberAccountRecordVo }) => (
        <div style={{ textAlign: 'left' }}>
          <p>
            <ElText type="info" size="small">
              {local('MemberAccountRecord.balance_frozen_before')}: ₹ {tool.formatMoney(row.balance_frozen_before || 0)}
            </ElText>
          </p>
          <p>
            <ElText type="warning" size="small">
              {local('MemberAccountRecord.balance_frozen_after')}: ₹ {tool.formatMoney(row.balance_frozen_after || 0)}
            </ElText>
          </p>
        </div>
      ),
    },
    {
      label: () => local('MemberAccountRecord.transaction_no'),
      prop: 'transaction_no',
      minWidth: 220,
      cellRender: ({ row }: { row: MemberAccountRecordVo }) => {
        if (!row.transaction_no) return <ElText type="info">-</ElText>
        return <MaCopy content={row.transaction_no} class="color-blue" />
      },
    },
    {
      label: () => local('MemberAccountRecord.created_at'),
      prop: 'created_at',
      width: 180,
      sortable: 'custom',
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
            show: ({ row }) => showBtn('members:member_account_record:delete', row),
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
