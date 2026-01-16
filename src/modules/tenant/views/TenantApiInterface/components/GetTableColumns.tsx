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
import type { TenantApiInterfaceVo } from '~/tenant/api/TenantApiInterface.ts'
import type { UseDialogExpose } from '@/hooks/useDialog.ts'

import { useMessage } from '@/hooks/useMessage.ts'
import { deleteByIds } from '~/tenant/api/TenantApiInterface.ts'
import { ResultCode } from '@/utils/ResultCode.ts'
import hasAuth from '@/utils/permission/hasAuth.ts'

export default function getTableColumns(dialog: UseDialogExpose, formRef: any, t: any): MaProTableColumns[] {
  const dictStore = useDictStore()
  const msg = useMessage()

  const showBtn = (auth: string | string[], row: TenantApiInterfaceVo) => {
    return hasAuth(auth)
  }

  return [
    // 多选列
    { type: 'selection', showOverflowTooltip: false, label: () => t('crud.selection') },
    // 索引序号列
    { type: 'index' },
    // 普通列
    { label: () => t('tenant_api_interface.api_name'), prop: 'api_name' },
    { label: () => t('tenant_api_interface.api_uri'), prop: 'api_uri' },
    { label: () => t('tenant_api_interface.http_method'), prop: 'http_method' },
    { label: () => t('tenant_api_interface.request_params'), prop: 'request_params' },
    { label: () => t('tenant_api_interface.response_params'), prop: 'response_params' },
    { label: () => t('tenant_api_interface.description'), prop: 'description' },
    { label: () => t('tenant_api_interface.status'), prop: 'status' },
    { label: () => t('tenant_api_interface.rate_limit'), prop: 'rate_limit' },
    { label: () => t('tenant_api_interface.auth_mode'), prop: 'auth_mode' },
    { label: () => t('tenant_api_interface.created_by'), prop: 'created_by', width: '160px', hide: true },
    { label: () => t('tenant_api_interface.updated_by'), prop: 'updated_by', width: '160px' },
    { label: () => t('tenant_api_interface.created_at'), prop: 'created_at', width: '180px', hide: true },
    { label: () => t('tenant_api_interface.updated_at'), prop: 'updated_at', width: '180px' },

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
            name: 'edit',
            icon: 'i-heroicons:pencil',
            show: ({ row }) => showBtn('tenant:tenant_api_interface:update', row),
            text: () => t('crud.edit'),
            onClick: ({ row }) => {
              dialog.setTitle(t('crud.edit'))
              dialog.open({ formType: 'edit', data: row })
            },
          },
          {
            name: 'del',
            show: ({ row }) => showBtn('tenant:tenant_api_interface:delete', row),
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
