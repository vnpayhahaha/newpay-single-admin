import type { MaProTableColumns, MaProTableExpose } from '@mineadmin/pro-table'
import type { MemberUpiChannelVo } from '~/member/api/MemberUpiChannel.ts'
import type { UseDialogExpose } from '@/hooks/useDialog.ts'

import { useMessage } from '@/hooks/useMessage.ts'
import { deleteByIds } from '~/member/api/MemberUpiChannel.ts'
import { ResultCode } from '@/utils/ResultCode.ts'
import hasAuth from '@/utils/permission/hasAuth.ts'

export default function getTableColumns(dialog: UseDialogExpose, formRef: any, t: any): MaProTableColumns[] {
  const msg = useMessage()
  const i18n = useTrans()
  const local = i18n.localTrans

  const showBtn = (auth: string | string[]) => {
    return hasAuth(auth)
  }

  return [
    // 多选列
    { type: 'selection', showOverflowTooltip: false, label: () => t('crud.selection') },
    // 索引序号列
    { type: 'index' },
    // 客户用户名
    {
      label: () => local('MemberUpiChannel.member_username'),
      prop: 'member.username',
      width: 120,
      cellRender: ({ row }) => row.member?.username || '-',
    },
    // 渠道名称
    {
      label: () => local('MemberUpiChannel.channel_name'),
      prop: 'upi_channel.channel_name',
      width: 140,
      cellRender: ({ row }) => {
        const channel = row.upi_channel
        if (!channel) return '-'
        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            {channel.channel_icon && <el-image src={channel.channel_icon} style={{ width: '20px', height: '20px' }} fit="contain" />}
            <span>{channel.channel_name}</span>
          </div>
        )
      },
    },
    // 渠道编码
    {
      label: () => local('MemberUpiChannel.channel_code'),
      prop: 'channel_code',
      width: 130,
    },
    // 渠道配置
    {
      label: () => local('MemberUpiChannel.config'),
      prop: 'config',
      width: 200,
      cellRender: ({ row }) => {
        if (!row.config) return '-'
        return (
          <el-popover trigger="hover" width={300}>
            {{
              reference: () => <el-link type="primary">{local('MemberUpiChannel.view_config')}</el-link>,
              default: () => <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all', fontSize: '12px' }}>{row.config}</pre>,
            }}
          </el-popover>
        )
      },
    },
    // 创建时间
    {
      label: () => local('MemberUpiChannel.created_at'),
      prop: 'created_at',
      width: 180,
    },
    // 操作列
    {
      type: 'operation',
      label: () => t('crud.operation'),
      width: '200px',
      fixed: 'right',
      operationConfigure: {
        type: 'tile',
        actions: [
          {
            name: 'edit',
            icon: 'i-heroicons:pencil',
            show: () => showBtn('member:member_upi_channel:update'),
            text: () => t('crud.edit'),
            onClick: ({ row }) => {
              dialog.setTitle(t('crud.edit'))
              dialog.open({ formType: 'edit', data: row })
            },
          },
          {
            name: 'del',
            show: () => showBtn('member:member_upi_channel:delete'),
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
