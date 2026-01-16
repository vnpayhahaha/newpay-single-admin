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
import type { TenantAccountVo } from '~/tenant/api/TenantAccount.ts'
import type { UseDialogExpose } from '@/hooks/useDialog.ts'

import { useMessage } from '@/hooks/useMessage.ts'
import { deleteByIds } from '~/tenant/api/TenantAccount.ts'
import { ResultCode } from '@/utils/ResultCode.ts'
import hasAuth from '@/utils/permission/hasAuth.ts'

export default function getTableColumns(dialog: UseDialogExpose, formRef: any, t: any): MaProTableColumns[] {
  const dictStore = useDictStore()
  const msg = useMessage()

  const showBtn = (auth: string | string[], row: TenantAccountVo) => {
    return hasAuth(auth)
  }

  return [
    // 多选列
    // { type: 'selection', showOverflowTooltip: false, label: () => t('crud.selection') },
    // 索引序号列
    { type: 'index' },
    { label: () => t('tenantAccount.account_id'), prop: 'account_id' },
    // 普通列
    {
      label: () => t('tenant.tenantId'), prop: 'tenant_id',
      cellRender: ({ row }) => {
        return (
          <div class="text-align-left">
            <p class="cell-ellipsis">
              {row.tenant_id}
            </p>
            <p>
              {row.tenant.company_name}
            </p>
          </div>
        )
      },
    },
    { label: () => t('tenantAccount.balance_available'), prop: 'balance_available' },
    { label: () => t('tenantAccount.balance_frozen'), prop: 'balance_frozen' },
    {
      label: () => t('tenantAccount.account_type'), prop: 'account_type',
      cellRenderTo: {
        name: 'nmCellEnhance',
        props: {
          type: 'tag',
          data: [
            { label: t('enums.tenantAccount.account_type.collection'), value: 1, color: '#409EFF' },
            { label: t('enums.tenantAccount.account_type.payment'), value: 2, color: '#F56C6C' },
          ],
          props: {
            effect: 'dark',
          },
        },
      },
    },
    { label: () => t('tenantAccount.version'), prop: 'version', hide: true },
    { label: () => t('tenantAccount.created_at'), prop: 'created_at', hide: true },
    { label: () => t('tenantAccount.updated_at'), prop: 'updated_at', width: 180 },

    // 操作列
    {
      type: 'operation',
      label: () => t('crud.operation'),
      width: '160px',
      operationConfigure: {
        type: 'auto',
        fold: 2,
        actions: [
          {
            name: 'add',
            icon: 'i-heroicons:plus-circle-16-solid',
            show: ({ row }) => showBtn('tenant:tenant_account:update', row),
            text: () => t('tenantAccount.add'),
            onClick: ({ row }) => {
              dialog.setTitle(t('tenantAccount.add'))
              dialog.open({ formType: 'add', data: row })
            },
          },
          {
            name: 'sub',
            icon: 'i-heroicons:minus-circle-16-solid',
            show: ({ row }) => showBtn('tenant:tenant_account:update', row),
            text: () => t('tenantAccount.sub'),
            onClick: ({ row }) => {
              dialog.setTitle(t('tenantAccount.sub'))
              dialog.open({ formType: 'sub', data: row })
            },
          },
          {
            name: 'freeze',
            icon: 'i-heroicons:document-currency-rupee',
            show: ({ row }) => showBtn('tenant:tenant_account:update', row),
            text: () => t('tenantAccount.freeze'),
            onClick: ({ row }) => {
              dialog.setTitle(t('tenantAccount.freeze'))
              dialog.open({ formType: 'freeze', data: row })
            },
          },
          {
            name: 'unfreeze',
            icon: 'i-heroicons:document-currency-rupee-solid',
            show: ({ row }) => showBtn('tenant:tenant_account:update', row),
            text: () => t('tenantAccount.unfreeze'),
            onClick: ({ row }) => {
              dialog.setTitle(t('tenantAccount.unfreeze'))
              dialog.open({ formType: 'unfreeze', data: row })
            },
          },
          // {
          //   name: 'edit',
          //   icon: 'i-heroicons:pencil',
          //   show: ({ row }) => showBtn('tenant:tenant_account:update', row),
          //   text: () => t('crud.edit'),
          //   onClick: ({ row }) => {
          //     dialog.setTitle(t('crud.edit'))
          //     dialog.open({ formType: 'edit', data: row })
          //   },
          // },
          // {
          //   name: 'del',
          //   show: ({ row }) => showBtn('tenant:tenant_account:delete', row),
          //   icon: 'i-heroicons:trash',
          //   text: () => t('crud.delete'),
          //   onClick: ({ row }, proxy: MaProTableExpose) => {
          //     msg.delConfirm(t('crud.delDataMessage')).then(async () => {
          //       const response = await deleteByIds([row.id])
          //       if (response.code === ResultCode.SUCCESS) {
          //         msg.success(t('crud.delSuccess'))
          //         await proxy.refresh()
          //       }
          //     })
          //   },
          // },
        ],
      },
    },
  ]
}
