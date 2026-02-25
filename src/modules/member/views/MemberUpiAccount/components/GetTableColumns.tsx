import type { MaProTableColumns, MaProTableExpose } from '@mineadmin/pro-table'
import type { MemberUpiAccountVo } from '~/member/api/MemberUpiAccount.ts'
import type { UseDialogExpose } from '@/hooks/useDialog.ts'

import { useMessage } from '@/hooks/useMessage.ts'
import { changeStatus, deleteByIds } from '~/member/api/MemberUpiAccount.ts'
import { ResultCode } from '@/utils/ResultCode.ts'
import hasAuth from '@/utils/permission/hasAuth.ts'
import { getEnumItem, MemberUpiAccountStatusEnum, MemberUpiAccountDefaultEnum, MemberUpiAccountCollectionEnum, MemberUpiAccountDisbursementEnum } from '~/member/enums/index.ts'

export default function getTableColumns(dialog: UseDialogExpose, formRef: any, t: any): MaProTableColumns[] {
  const msg = useMessage()
  const i18n = useTrans()
  const local = i18n.localTrans

  const showBtn = (auth: string | string[], row: MemberUpiAccountVo) => {
    return hasAuth(auth)
  }

  return [
    // 多选列
    { type: 'selection', showOverflowTooltip: false, label: () => t('crud.selection') },
    // 索引序号列
    { type: 'index' },
    // 客户用户名
    {
      label: () => local('MemberUpiAccount.member_username'),
      prop: 'member.username',
      width: 120,
      cellRender: ({ row }) => row.member?.username || '-',
    },
    // UPI地址
    {
      label: () => local('MemberUpiAccount.upi_id'),
      prop: 'upi_id',
      width: 180,
      cellRender: ({ row }) => <MaCopy content={row.upi_id} class="color-primary" />,
    },
    // 持有人姓名
    {
      label: () => local('MemberUpiAccount.upi_name'),
      prop: 'upi_name',
      width: 130,
    },
    // 关联手机号
    {
      label: () => local('MemberUpiAccount.phone'),
      prop: 'phone',
      width: 120,
    },
    // 状态
    {
      label: () => local('MemberUpiAccount.status'),
      prop: 'status',
      width: 90,
      cellRender: ({ row }) => {
        const enumItem = getEnumItem(MemberUpiAccountStatusEnum, row.status)
        if (!enumItem) return <ElTag type="info" effect="dark" size="small">-</ElTag>
        return (
          <ElTag type={enumItem.color} effect="dark" size="small">
            {local(`MemberUpiAccount.status_enum.${enumItem.labelKey}`)}
          </ElTag>
        )
      },
    },
    // 默认账号
    {
      label: () => local('MemberUpiAccount.is_default'),
      prop: 'is_default',
      width: 90,
      cellRender: ({ row }) => {
        const enumItem = getEnumItem(MemberUpiAccountDefaultEnum, row.is_default)
        if (!enumItem) return <ElTag type="info" size="small">-</ElTag>
        return (
          <ElTag type={enumItem.color} size="small">
            {local(`MemberUpiAccount.is_default_enum.${enumItem.labelKey}`)}
          </ElTag>
        )
      },
    },
    // 支持收款
    {
      label: () => local('MemberUpiAccount.support_collection'),
      prop: 'support_collection',
      width: 90,
      cellRender: ({ row }) => {
        const enumItem = getEnumItem(MemberUpiAccountCollectionEnum, row.support_collection)
        if (!enumItem) return <ElTag type="info" size="small">-</ElTag>
        return (
          <ElTag type={enumItem.color} size="small">
            {local(`MemberUpiAccount.yes_no.${enumItem.labelKey}`)}
          </ElTag>
        )
      },
    },
    // 支持付款
    {
      label: () => local('MemberUpiAccount.support_disbursement'),
      prop: 'support_disbursement',
      width: 90,
      cellRender: ({ row }) => {
        const enumItem = getEnumItem(MemberUpiAccountDisbursementEnum, row.support_disbursement)
        if (!enumItem) return <ElTag type="info" size="small">-</ElTag>
        return (
          <ElTag type={enumItem.color} size="small">
            {local(`MemberUpiAccount.yes_no.${enumItem.labelKey}`)}
          </ElTag>
        )
      },
    },
    // 当日已收款
    {
      label: () => local('MemberUpiAccount.today_receipt_amount'),
      prop: 'today_receipt_amount',
      width: 140,
      cellRender: ({ row }) => (
        <div>
          <ElText type="success" style={{ fontSize: '13px', fontWeight: 'bold' }}>
            ₹ {row.today_receipt_amount || '0.00'}
          </ElText>
          <ElText type="info" size="small" style={{ marginLeft: '4px', fontSize: '12px' }}>
            ({row.today_receipt_count || 0}笔)
          </ElText>
        </div>
      ),
    },
    // 当日已付款
    {
      label: () => local('MemberUpiAccount.today_payment_amount'),
      prop: 'today_payment_amount',
      width: 140,
      cellRender: ({ row }) => (
        <div>
          <ElText type="warning" style={{ fontSize: '13px', fontWeight: 'bold' }}>
            ₹ {row.today_payment_amount || '0.00'}
          </ElText>
          <ElText type="info" size="small" style={{ marginLeft: '4px', fontSize: '12px' }}>
            ({row.today_payment_count || 0}笔)
          </ElText>
        </div>
      ),
    },
    // 最近收款时间
    {
      label: () => local('MemberUpiAccount.last_receipt_at'),
      prop: 'last_receipt_at',
      width: 180,
      cellRender: ({ row }) => row.last_receipt_at || '-',
    },
    // 最近付款时间
    {
      label: () => local('MemberUpiAccount.last_payment_at'),
      prop: 'last_payment_at',
      width: 180,
      cellRender: ({ row }) => row.last_payment_at || '-',
    },
    // 创建时间
    {
      label: () => local('MemberUpiAccount.created_at'),
      prop: 'created_at',
      width: 180,
    },
    // 操作列
    {
      type: 'operation',
      label: () => t('crud.operation'),
      width: '260px',
      fixed: 'right',
      operationConfigure: {
        type: 'tile',
        actions: [
          {
            name: 'edit',
            icon: 'i-heroicons:pencil',
            show: ({ row }) => showBtn('member:member_upi_account:update', row),
            text: () => t('crud.edit'),
            onClick: ({ row }) => {
              dialog.setTitle(t('crud.edit'))
              dialog.open({ formType: 'edit', data: row })
            },
          },
          {
            name: 'status',
            icon: 'i-heroicons:arrow-path',
            show: ({ row }) => showBtn('member:member_upi_account:changeStatus', row),
            text: ({ row }) => row.status === 1 ? local('MemberUpiAccount.status_enum.disable') : local('MemberUpiAccount.status_enum.enable'),
            onClick: ({ row }, proxy: MaProTableExpose) => {
              const newStatus = row.status === 1 ? 0 : 1
              changeStatus(row.id, newStatus).then((res: any) => {
                if (res.code === ResultCode.SUCCESS) {
                  msg.success(t('crud.updateSuccess'))
                  proxy.refresh()
                }
              })
            },
          },
          {
            name: 'del',
            show: ({ row }) => showBtn('member:member_upi_account:delete', row),
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
