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
import type { MemberTronTransactionRecordVo } from '~/member/api/MemberTronTransactionRecord.ts'
import type { UseDialogExpose } from '@/hooks/useDialog.ts'

import { useMessage } from '@/hooks/useMessage.ts'
import { deleteByIds } from '~/member/api/MemberTronTransactionRecord.ts'
import { ResultCode } from '@/utils/ResultCode.ts'
import hasAuth from '@/utils/permission/hasAuth.ts'
import MaCopy from '@/components/ma-copy/index.vue'
import tool from '@/utils/tool.ts'
import { ElText, ElTag } from 'element-plus'
import { MemberTronTransactionStatusEnum, getEnumItem } from '~/member/enums'

export default function getTableColumns(dialog: UseDialogExpose, formRef: any, t: any): MaProTableColumns[] {
  const dictStore = useDictStore()
  const msg = useMessage()
  const i18n = useTrans()
  const local = i18n.localTrans

  const showBtn = (auth: string | string[], row: MemberTronTransactionRecordVo) => {
    return hasAuth(auth)
  }

  // 获取状态标签
  const getStatusTag = (status: number) => {
    const enumItem = getEnumItem(MemberTronTransactionStatusEnum, status)
    if (!enumItem) {
      return <ElTag type="info" effect="dark">状态{status}</ElTag>
    }
    const labelKey = `MemberTronTransactionRecord.status_enum.${enumItem.labelKey}`
    return <ElTag type={enumItem.color} effect="dark">{local(labelKey)}</ElTag>
  }

  return [
    // 多选列
    { type: 'selection', showOverflowTooltip: false, label: () => t('crud.selection') },
    // 索引序号列
    { type: 'index' },
    // 普通列
    {
      label: () => local('MemberTronTransactionRecord.member_id'),
      prop: 'member_id',
      width: 120,
      cellRender: ({ row }: { row: MemberTronTransactionRecordVo }) => (
        <MaCopy content={row.member_id?.toString() || ''} class="color-primary" />
      ),
    },
    {
      label: () => local('MemberTronTransactionRecord.status'),
      prop: 'status',
      width: 100,
      cellRender: ({ row }: { row: MemberTronTransactionRecordVo }) => getStatusTag(row.status),
    },
    {
      label: () => local('MemberTronTransactionRecord.transaction_id'),
      prop: 'transaction_id',
      minWidth: 220,
      cellRender: ({ row }: { row: MemberTronTransactionRecordVo }) => (
        <MaCopy content={row.transaction_id || ''} class="color-blue" />
      ),
    },
    {
      label: () => '代币信息',
      prop: 'token_info',
      minWidth: 180,
      cellRender: ({ row }: { row: MemberTronTransactionRecordVo }) => (
        <div style={{ textAlign: 'left' }}>
          <p>
            <ElTag size="small" type="primary">{row.symbol}</ElTag>
            {' '}
            <ElText size="small">{row.token_name}</ElText>
          </p>
          {row.token_address && (
            <p style={{ marginTop: '4px' }}>
              <ElText size="small" type="info" truncated style={{ maxWidth: '160px' }}>
                {row.token_address}
              </ElText>
            </p>
          )}
        </div>
      ),
    },
    {
      label: () => local('MemberTronTransactionRecord.amount'),
      prop: 'amount',
      width: 150,
      cellRender: ({ row }: { row: MemberTronTransactionRecordVo }) => (
        <ElText type="success" style={{ fontSize: '14px', fontWeight: 'bold' }}>
          {tool.formatMoney(row.amount || 0)}
        </ElText>
      ),
    },
    {
      label: () => '地址信息',
      prop: 'address_info',
      minWidth: 220,
      cellRender: ({ row }: { row: MemberTronTransactionRecordVo }) => (
        <div style={{ textAlign: 'left' }}>
          <p>
            <ElText size="small" type="info">From: </ElText>
            <MaCopy content={row.from_address || ''} />
          </p>
          <p style={{ marginTop: '4px' }}>
            <ElText size="small" type="info">To: </ElText>
            <MaCopy content={row.to_address || ''} />
          </p>
        </div>
      ),
    },
    {
      label: () => local('MemberTronTransactionRecord.transaction_type'),
      prop: 'transaction_type',
      width: 120,
      cellRender: ({ row }: { row: MemberTronTransactionRecordVo }) => (
        <ElTag size="small" type="info">{row.transaction_type}</ElTag>
      ),
    },
    {
      label: () => local('MemberTronTransactionRecord.block_timestamp'),
      prop: 'block_timestamp',
      width: 180,
      sortable: 'custom',
    },
    {
      label: () => local('MemberTronTransactionRecord.created_at'),
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
            show: ({ row }) => showBtn('members:member_tron_transaction_record:delete', row),
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
