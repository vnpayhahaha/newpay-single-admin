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
import type { ChannelAccountVo } from '~/channel/api/ChannelAccount.ts'
import type { UseDialogExpose } from '@/hooks/useDialog.ts'

import { useMessage } from '@/hooks/useMessage.ts'
import { deleteByIds, save } from '~/channel/api/ChannelAccount.ts'
import { ResultCode } from '@/utils/ResultCode.ts'
import hasAuth from '@/utils/permission/hasAuth.ts'
import { tr } from 'element-plus/es/locale/index.mjs'

export default function getTableColumns(dialog: UseDialogExpose, formRef: any, t: any): MaProTableColumns[] {
  const dictStore = useDictStore()
  const msg = useMessage()

  const showBtn = (auth: string | string[], row: ChannelAccountVo) => {
    return hasAuth(auth)
  }

  return [
    // 多选列
    { type: 'selection', showOverflowTooltip: false, label: () => t('crud.selection') },
    // 索引序号列
    { type: 'index' },
    // 普通列
    {
      label: () => t('channelAccount.channel_id'), prop: 'channel_id',
      width: 220,
      cellRender: ({ row }) => {
        return (
          <div class="text-align-left" style={{ display: 'flex', alignItems: 'center' }}>
            <el-avatar shape="square" src={row.channel.channel_icon} />
            <div class="ml-5" style={{ flex: 1, minWidth: 0 }}>
              <p>
                <el-text class="mx-1" type="primary">{row.channel.channel_code}</el-text>
              </p>
              <p>
                <el-text class="mx-1" truncated>{row.channel.channel_name}</el-text>
              </p>
            </div>
          </div>
        )
      },
    },
    {
      label: () => t('channelAccount.merchant_id'), prop: 'merchant_id',
      width: 180,
      cellRenderTo: {
        name: 'nmCellEnhance',
        props: {
          type: 'copy',
        },
      },
     },
    { label: () => t('channelAccount.api_version'), prop: 'api_version', width: 80, hide: true },
    {
      label: () => t('channelAccount.callback_url'), prop: 'callback_url',
      width: 300,
      hide: true
     },
    {
      label: () => t('channelAccount.balance'), prop: 'balance',
      width: 120,
      cellRenderTo: {
        name: 'tag',
      }
     },
    { label: () => t('channelAccount.currency'), prop: 'currency', width: 80, hide: true },
    {
      label: () => t('channelAccount.used_quota'), prop: 'used_quota', width: 120,
       cellRenderTo: {
        name: 'tag',
        props: {
          type: 'success',
        },
      }
     },
    {
      label: () => t('channelAccount.limit_quota'), prop: 'limit_quota', width: 120,
      cellRenderTo: {
        name: 'tag',
        props: {
          type: 'danger',
        },
      }
     },
    {
      label: () => t('channelAccount.today_receipt_count'), prop: 'today_receipt_count',
      className: 'cellBackgroundBlue',
      labelClassName: 'cellBackgroundBlue',
     },
    {
      label: () => t('channelAccount.today_payment_count'), prop: 'today_payment_count',
      className: 'cellBackgroundRed',
      labelClassName: 'cellBackgroundRed',
     },
    {
      label: () => t('channelAccount.today_receipt_amount'), prop: 'today_receipt_amount',
      className: 'cellBackgroundBlue',
      labelClassName: 'cellBackgroundBlue',
     },
    {
      label: () => t('channelAccount.today_payment_amount'), prop: 'today_payment_amount',
      className: 'cellBackgroundRed',
      labelClassName: 'cellBackgroundRed',
     },
    { label: () => t('channelAccount.stat_date'), prop: 'stat_date',width: 120 ,hide: true},
    {
      label: () => t('channelAccount.status'), prop: 'status',
      width: 80,
      cellRenderTo: {
        name: 'nmCellEnhance',
        props: {
          type: 'switch',
          prop: 'status',
          props: {
            size: 'small',
            activeValue: true,
            inactiveValue: false,
            on: {
              change: (value: boolean, row: any, proxy: MaProTableExpose) => {
                console.log('value', value)
                save(row.id, {
                  ...row,
                  status: value,
                }).then((res) => {
                  if (res.code === ResultCode.SUCCESS) {
                    msg.success(t('crud.updateSuccess'))
                    proxy.refresh()
                  }
                  else {
                    msg.error(t('crud.updateError'))
                  }
                })
              },
            },
          },
        },
      },
    },
    {
      label: () => t('channelAccount.support_collection'), prop: 'support_collection',
      width: 80,
      cellRenderTo: {
        name: 'nmCellEnhance',
        props: {
          type: 'switch',
          prop: 'support_collection',
          props: {
            size: 'small',
            activeValue: true,
            inactiveValue: false,
            on: {
              change: (value: boolean, row: any, proxy: MaProTableExpose) => {
                console.log('value', value)
                save(row.id, {
                  ...row,
                  support_collection: value,
                }).then((res) => {
                  if (res.code === ResultCode.SUCCESS) {
                    msg.success(t('crud.updateSuccess'))
                    proxy.refresh()
                  }
                  else {
                    msg.error(t('crud.updateError'))
                  }
                })
              },
            },
          },
        },
      },
    },
    {
      label: () => t('channelAccount.support_disbursement'), prop: 'support_disbursement',
      width: 80,
      cellRenderTo: {
        name: 'nmCellEnhance',
        props: {
          type: 'switch',
          prop: 'support_disbursement',
          props: {
            size: 'small',
            activeValue: true,
            inactiveValue: false,
            on: {
              change: (value: boolean, row: any, proxy: MaProTableExpose) => {
                console.log('value', value)
                save(row.id, {
                  ...row,
                  support_disbursement: value,
                }).then((res) => {
                  if (res.code === ResultCode.SUCCESS) {
                    msg.success(t('crud.updateSuccess'))
                    proxy.refresh()
                  }
                  else {
                    msg.error(t('crud.updateError'))
                  }
                })
              },
            },
          },
        },
      },
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
            name: 'edit',
            icon: 'i-heroicons:pencil',
            show: ({ row }) => showBtn('channel:channel_account:update', row),
            text: () => t('crud.edit'),
            onClick: ({ row }) => {
              dialog.setTitle(t('crud.edit'))
              dialog.open({ formType: 'edit', data: row })
            },
          },
          {
            name: 'del',
            show: ({ row }) => showBtn('channel:channel_account:delete', row),
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
