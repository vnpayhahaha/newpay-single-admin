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
import type { MemberLoginLogVo } from '~/member/api/MemberLoginLog.ts'
import type { UseDialogExpose } from '@/hooks/useDialog.ts'

import { useMessage } from '@/hooks/useMessage.ts'
import { deleteByIds } from '~/member/api/MemberLoginLog.ts'
import { ResultCode } from '@/utils/ResultCode.ts'
import hasAuth from '@/utils/permission/hasAuth.ts'
import MaCopy from '@/components/ma-copy/index.vue'
import { ElText, ElTag } from 'element-plus'
import { MemberLoginStatusEnum, getEnumItem } from '~/member/enums'

export default function getTableColumns(dialog: UseDialogExpose, formRef: any, t: any): MaProTableColumns[] {
  const dictStore = useDictStore()
  const msg = useMessage()
  const i18n = useTrans()
  const local = i18n.localTrans

  const showBtn = (auth: string | string[], row: MemberLoginLogVo) => {
    return hasAuth(auth)
  }

  // 获取状态标签
  const getStatusTag = (status: number) => {
    const enumItem = getEnumItem(MemberLoginStatusEnum, status)
    if (!enumItem) {
      return <ElTag type="info" effect="dark">状态{status}</ElTag>
    }
    const labelKey = `MemberLoginLog.status_enum.${enumItem.labelKey}`
    return <ElTag type={enumItem.color} effect="dark">{local(labelKey)}</ElTag>
  }

  return [
    // 多选列
    { type: 'selection', showOverflowTooltip: false, label: () => t('crud.selection') },
    // 索引序号列
    { type: 'index' },
    // 普通列
    {
      label: () => local('MemberLoginLog.member_id'),
      prop: 'member_id',
      width: 120,
      cellRender: ({ row }: { row: MemberLoginLogVo }) => (
        <MaCopy content={row.member_id?.toString() || ''} class="color-primary" />
      ),
    },
    {
      label: () => local('MemberLoginLog.username'),
      prop: 'username',
      width: 150,
      cellRender: ({ row }: { row: MemberLoginLogVo }) => (
        <ElText type="primary" truncated>{row.username}</ElText>
      ),
    },
    {
      label: () => local('MemberLoginLog.status'),
      prop: 'status',
      width: 100,
      cellRender: ({ row }: { row: MemberLoginLogVo }) => getStatusTag(row.status),
    },
    {
      label: () => local('MemberLoginLog.ip'),
      prop: 'ip',
      width: 140,
      cellRender: ({ row }: { row: MemberLoginLogVo }) => (
        <MaCopy content={row.ip || ''} class="color-blue" />
      ),
    },
    {
      label: () => '设备信息',
      prop: 'device_info',
      minWidth: 200,
      cellRender: ({ row }: { row: MemberLoginLogVo }) => (
        <div style={{ textAlign: 'left' }}>
          {row.os && (
            <p>
              <ElTag size="small" type="info">{row.os}</ElTag>
            </p>
          )}
          {row.browser && (
            <p style={{ marginTop: '4px' }}>
              <ElTag size="small" type="primary">{row.browser}</ElTag>
            </p>
          )}
        </div>
      ),
    },
    {
      label: () => local('MemberLoginLog.message'),
      prop: 'message',
      minWidth: 180,
      cellRender: ({ row }: { row: MemberLoginLogVo }) => (
        <ElText truncated style={{ maxWidth: '100%' }}>{row.message || '-'}</ElText>
      ),
    },
    {
      label: () => local('MemberLoginLog.login_time'),
      prop: 'login_time',
      width: 180,
      sortable: 'custom',
    },
    {
      label: () => local('MemberLoginLog.remark'),
      prop: 'remark',
      minWidth: 150,
      cellRender: ({ row }: { row: MemberLoginLogVo }) => (
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
            show: ({ row }) => showBtn('members:member_login_log:delete', row),
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
