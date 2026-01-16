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
import type { MemberAccountVo } from '~/member/api/MemberAccount.ts'
import type { UseDialogExpose } from '@/hooks/useDialog.ts'

import { useMessage } from '@/hooks/useMessage.ts'
import { deleteByIds } from '~/member/api/MemberAccount.ts'
import { ResultCode } from '@/utils/ResultCode.ts'
import hasAuth from '@/utils/permission/hasAuth.ts'
import MaCopy from '@/components/ma-copy/index.vue'
import tool from '@/utils/tool.ts'
import { ElText, ElTag } from 'element-plus'

export default function getTableColumns(dialog: UseDialogExpose, formRef: any, t: any): MaProTableColumns[] {
  const dictStore = useDictStore()
  const msg = useMessage()
  const i18n = useTrans()
  const local = i18n.localTrans

  const showBtn = (auth: string | string[], row: MemberAccountVo) => {
    return hasAuth(auth)
  }

  return [
    // 多选列
    { type: 'selection', showOverflowTooltip: false, label: () => t('crud.selection') },
    // 索引序号列
    { type: 'index' },
    // 普通列
    {
      label: () => local('MemberAccount.member_id'),
      prop: 'member_id',
      width: 120,
      cellRender: ({ row }: { row: MemberAccountVo }) => (
        <MaCopy content={row.member_id?.toString() || ''} class="color-primary" />
      ),
    },
    {
      label: () => local('MemberAccount.balance_available'),
      prop: 'balance_available',
      width: 150,
      cellRender: ({ row }: { row: MemberAccountVo }) => (
        <div>
          <ElText type="success" style={{ fontSize: '14px', fontWeight: 'bold' }}>
            ₹ {tool.formatMoney(row.balance_available || 0)}
          </ElText>
        </div>
      ),
    },
    {
      label: () => local('MemberAccount.balance_frozen'),
      prop: 'balance_frozen',
      width: 150,
      cellRender: ({ row }: { row: MemberAccountVo }) => (
        <div>
          <ElText type="warning" style={{ fontSize: '14px', fontWeight: 'bold' }}>
            ₹ {tool.formatMoney(row.balance_frozen || 0)}
          </ElText>
        </div>
      ),
    },
    {
      label: () => local('MemberAccount.created_at'),
      prop: 'created_at',
      width: 180,
      sortable: 'custom',
    },
    {
      label: () => local('MemberAccount.updated_at'),
      prop: 'updated_at',
      width: 180,
      sortable: 'custom',
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
            show: ({ row }) => showBtn('members:member_account:update', row),
            text: () => t('crud.edit'),
            onClick: ({ row }) => {
              dialog.setTitle(t('crud.edit'))
              dialog.open({ formType: 'edit', data: row })
            },
          },
          {
            name: 'del',
            show: ({ row }) => showBtn('members:member_account:delete', row),
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
