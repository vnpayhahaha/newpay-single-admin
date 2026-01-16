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
import type { RecycleBinVo } from '~/base/api/RecycleBin.ts'
import type { UseDialogExpose } from '@/hooks/useDialog.ts'

import { useMessage } from '@/hooks/useMessage.ts'
import { restore } from '~/base/api/RecycleBin.ts'
import { ResultCode } from '@/utils/ResultCode.ts'
import hasAuth from '@/utils/permission/hasAuth.ts'

export default function getTableColumns(dialog: UseDialogExpose, formRef: any, t: any): MaProTableColumns[] {
  const dictStore = useDictStore()
  const msg = useMessage()

  const showBtn = (auth: string | string[], row: RecycleBinVo) => {
    return hasAuth(auth)
  }

  return [
    // 多选列
    { type: 'selection', showOverflowTooltip: false, label: () => t('crud.selection') },
    // 索引序号列
    { type: 'index' },
    // 普通列
    { label: () => t('recycleBin.tenantId'), prop: 'tenant_id' },
    { label: () => t('recycleBin.data'), prop: 'data' },
    { label: () => t('recycleBin.tableName'), prop: 'table_name' },
    { label: () => t('recycleBin.isRestored'), prop: 'is_restored' },
    { label: () => 'ip', prop: 'ip' },
    { label: () => t('recycleBin.operateBy'), prop: 'operate_by' },

    // 操作列
    {
      type: 'operation',
      label: () => t('crud.operation'),
      width: '260px',
      operationConfigure: {
        type: 'tile',
        actions: [
          {
            name: 'restore',
            icon: 'i-heroicons:archive-box-x-mark',
            show: ({ row }) => showBtn('recycle_bin:update', row),
            text: () => t('crud.restore'),
            onClick: ({ row }, proxy: MaProTableExpose) => {
              msg.delConfirm(t('crud.restoreDataMessage')).then(async () => {
                const response = await restore(row.id)
                if (response.code === ResultCode.SUCCESS) {
                  msg.success(t('crud.restoreSuccess'))
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
