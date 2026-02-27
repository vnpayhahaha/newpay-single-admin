import type { MaProTableColumns, MaProTableExpose } from '@mineadmin/pro-table'
import type { UpiChannelVo } from '~/member/api/UpiChannel.ts'
import type { UseDialogExpose } from '@/hooks/useDialog.ts'

import { useMessage } from '@/hooks/useMessage.ts'
import { changeStatus, deleteByIds } from '~/member/api/UpiChannel.ts'
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
    // 渠道编码
    {
      label: () => local('UpiChannel.channel_code'),
      prop: 'channel_code',
      width: 140,
    },
    // 渠道名称
    {
      label: () => local('UpiChannel.channel_name'),
      prop: 'channel_name',
      width: 140,
    },
    // 渠道图标
    {
      label: () => local('UpiChannel.channel_icon'),
      prop: 'channel_icon',
      width: 100,
      cellRender: ({ row }) => {
        if (!row.channel_icon) return '-'
        return <el-image src={row.channel_icon} style={{ width: '32px', height: '32px' }} fit="contain" />
      },
    },
    // 国家代码
    {
      label: () => local('UpiChannel.country_code'),
      prop: 'country_code',
      width: 100,
    },
    // 状态
    {
      label: () => local('UpiChannel.status'),
      prop: 'status',
      width: 90,
      cellRender: ({ row }) => {
        return row.status === 1
          ? <ElTag type="success" effect="dark" size="small">{local('UpiChannel.status_enum.enable')}</ElTag>
          : <ElTag type="danger" effect="dark" size="small">{local('UpiChannel.status_enum.disable')}</ElTag>
      },
    },
    // 创建时间
    {
      label: () => local('UpiChannel.created_at'),
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
            show: () => showBtn('upi_channel:update'),
            text: () => t('crud.edit'),
            onClick: ({ row }) => {
              dialog.setTitle(t('crud.edit'))
              dialog.open({ formType: 'edit', data: row })
            },
          },
          {
            name: 'status',
            icon: 'i-heroicons:arrow-path',
            show: () => showBtn('upi_channel:changeStatus'),
            text: ({ row }) => row.status === 1 ? local('UpiChannel.status_enum.disable') : local('UpiChannel.status_enum.enable'),
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
            show: () => showBtn('upi_channel:delete'),
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
