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
import type { MemberOperationLogVo } from '~/member/api/MemberOperationLog.ts'
import type { UseDialogExpose } from '@/hooks/useDialog.ts'

import { useMessage } from '@/hooks/useMessage.ts'
import { deleteByIds } from '~/member/api/MemberOperationLog.ts'
import { ResultCode } from '@/utils/ResultCode.ts'
import hasAuth from '@/utils/permission/hasAuth.ts'
import MaCopy from '@/components/ma-copy/index.vue'
import { ElText, ElTag } from 'element-plus'
import { MemberOperationSuccessEnum, getEnumItem } from '~/member/enums'

export default function getTableColumns(dialog: UseDialogExpose, formRef: any, t: any): MaProTableColumns[] {
  const dictStore = useDictStore()
  const msg = useMessage()
  const i18n = useTrans()
  const local = i18n.localTrans

  const showBtn = (auth: string | string[], row: MemberOperationLogVo) => {
    return hasAuth(auth)
  }

  // 获取成功状态标签
  const getSuccessTag = (isSuccess: number) => {
    const enumItem = getEnumItem(MemberOperationSuccessEnum, isSuccess)
    if (!enumItem) {
      return <ElTag type="info" effect="dark">状态{isSuccess}</ElTag>
    }
    const labelKey = `MemberOperationLog.success_enum.${enumItem.labelKey}`
    return <ElTag type={enumItem.color} effect="dark">{local(labelKey)}</ElTag>
  }

  return [
    // 多选列
    { type: 'selection', showOverflowTooltip: false, label: () => t('crud.selection') },
    // 索引序号列
    { type: 'index' },
    // 普通列
    {
      label: () => local('MemberOperationLog.member_id'),
      prop: 'member_id',
      width: 120,
      cellRender: ({ row }: { row: MemberOperationLogVo }) => (
        <MaCopy content={row.member_id?.toString() || ''} class="color-primary" />
      ),
    },
    {
      label: () => local('MemberOperationLog.username'),
      prop: 'username',
      width: 150,
      cellRender: ({ row }: { row: MemberOperationLogVo }) => (
        <ElText type="primary" truncated>{row.username}</ElText>
      ),
    },
    {
      label: () => local('MemberOperationLog.is_success'),
      prop: 'is_success',
      width: 100,
      cellRender: ({ row }: { row: MemberOperationLogVo }) => getSuccessTag(row.is_success),
    },
    {
      label: () => '请求信息',
      prop: 'request_info',
      minWidth: 220,
      cellRender: ({ row }: { row: MemberOperationLogVo }) => (
        <div style={{ textAlign: 'left' }}>
          <p>
            <ElTag size="small" type="primary">{row.method}</ElTag>
            {' '}
            <ElText size="small" truncated style={{ maxWidth: '180px' }}>{row.router}</ElText>
          </p>
          {row.service_name && (
            <p style={{ marginTop: '4px' }}>
              <ElText size="small" type="info">{row.service_name}</ElText>
            </p>
          )}
        </div>
      ),
    },
    {
      label: () => local('MemberOperationLog.ip'),
      prop: 'ip',
      width: 140,
      cellRender: ({ row }: { row: MemberOperationLogVo }) => (
        <MaCopy content={row.ip || ''} class="color-blue" />
      ),
    },
    {
      label: () => '响应信息',
      prop: 'response_info',
      minWidth: 150,
      cellRender: ({ row }: { row: MemberOperationLogVo }) => (
        <div style={{ textAlign: 'left' }}>
          <p>
            <ElText size="small">状态: </ElText>
            <ElTag size="small" type={row.response_status === 200 ? 'success' : 'danger'}>
              {row.response_status}
            </ElTag>
          </p>
          {row.request_duration && (
            <p style={{ marginTop: '4px' }}>
              <ElText size="small" type="info">{row.request_duration}ms</ElText>
            </p>
          )}
        </div>
      ),
    },
    {
      label: () => local('MemberOperationLog.request_id'),
      prop: 'request_id',
      minWidth: 180,
      cellRender: ({ row }: { row: MemberOperationLogVo }) => {
        if (!row.request_id) return <ElText type="info">-</ElText>
        return <MaCopy content={row.request_id} class="color-blue" />
      },
    },
    {
      label: () => local('MemberOperationLog.created_at'),
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
            show: ({ row }) => showBtn('members:member_operation_log:delete', row),
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
