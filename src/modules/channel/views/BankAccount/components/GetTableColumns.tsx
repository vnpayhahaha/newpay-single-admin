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
import type { BankAccountVo } from '~/channel/api/BankAccount.ts'
import type { UseDialogExpose } from '@/hooks/useDialog.ts'

import { useMessage } from '@/hooks/useMessage.ts'
import { deleteByIds, save } from '~/channel/api/BankAccount.ts'
import { ResultCode } from '@/utils/ResultCode.ts'
import hasAuth from '@/utils/permission/hasAuth.ts'

export default function getTableColumns(dialog: UseDialogExpose, formRef: any, t: any): MaProTableColumns[] {
  const dictStore = useDictStore()
  const msg = useMessage()

  const showBtn = (auth: string | string[], row: BankAccountVo) => {
    return hasAuth(auth)
  }

  return [
    // 多选列
    { type: 'selection', showOverflowTooltip: false, label: () => t('crud.selection') },
    // 索引序号列
    { type: 'index' },
    // 普通列
    {
      label: () => t('bankAccount.channel_id'), prop: 'channel_id',
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
    { label: () => t('bankAccount.bank_code'), prop: 'bank_code' },
    {
      label: () => t('bankAccount.branch_name'), prop: 'branch_name',
      width: 220,
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
    {
      label: () => t('bankAccount.account_holder'), prop: 'account_holder', width: 180,
      cellRender: ({ row }) => {
        return (
          <div class="text-align-left">
            <p class="cell-ellipsis">
              {row.account_holder}
            </p>
            <p>
              <el-text class="mx-1" type="primary">Account:</el-text>
              {row.account_number}
            </p>
            <p>
              <el-text class="mx-1" type="warning">UPI ID:</el-text>
              {row.upi_id}
            </p>
          </div>
        )
      },

    },

    {
      label: () => t('bankAccount.balance'), prop: 'balance', width: 120,
      cellRenderTo: {
        name: 'tag',
      },
    },
    {
      label: () => t('bankAccount.float_amount_enabled'), prop: 'float_amount_enabled',
      width: 80,
      cellRenderTo: {
        name: 'nmCellEnhance',
        props: {
          type: 'switch',
          prop: 'float_amount_enabled',
          props: {
            size: 'small',
            activeValue: true,
            inactiveValue: false,
            on: {
              change: (value: boolean, row: any, proxy: MaProTableExpose) => {
                console.log('value', value)
                save(row.id, {
                  ...row,
                  float_amount_enabled: value,
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
      label: () => t('bankAccount.daily_receipt'),
      prop: 'daily_receipt',
      type: 'merge',
      minWidth: 220,
      cellRender: ({ row }) => {
        return (
          <div class="text-align-left">
            <p>
              <el-text class="mx-1" type="primary">{t('bankAccount.daily_max_receipt')}:</el-text>
              {row.daily_max_receipt}
            </p>
            <p>
              <el-text class="mx-1" type="primary">{t('bankAccount.daily_max_receipt_count')}:</el-text>
              {row.daily_max_receipt_count}
            </p>
            <p>
              <el-text class="mx-1" type="warning">{t('bankAccount.max_receipt_per_txn')}:</el-text>
              {row.max_receipt_per_txn}
            </p>
            <p>
              <el-text class="mx-1" type="warning">{t('bankAccount.min_receipt_per_txn')}:</el-text>
              {row.min_receipt_per_txn}
            </p>
          </div>
        )
      },
    },
    {
      label: () => t('bankAccount.daily_payment'),
      prop: 'daily_payment',
      type: 'merge',
      minWidth: 220,
      cellRender: ({ row }) => {
        return (
          <div class="text-align-left">
            <p>
              <el-text class="mx-1" type="primary">{t('bankAccount.daily_max_payment')}:</el-text>
              {row.daily_max_payment}
            </p>
            <p>
              <el-text class="mx-1" type="primary">{t('bankAccount.daily_max_payment_count')}:</el-text>
              {row.daily_max_payment_count}
            </p>
            <p>
              <el-text class="mx-1" type="warning">{t('bankAccount.max_payment_per_txn')}:</el-text>
              {row.max_payment_per_txn}
            </p>
            <p>
              <el-text class="mx-1" type="warning">{t('bankAccount.min_payment_per_txn')}:</el-text>
              {row.min_payment_per_txn}
            </p>
          </div>
        )
      },
    },
    {
      label: () => t('bankAccount.daily_max_receipt'),
      hide: true,
      width: 140,
      prop: 'daily_max_receipt',
      className: 'cellBackgroundBlue',
      labelClassName: 'cellBackgroundBlue',
    },
    {
      label: () => t('bankAccount.daily_max_payment'),
      hide: true,
      width: 140,
      prop: 'daily_max_payment',
      className: 'cellBackgroundRed',
      labelClassName: 'cellBackgroundRed',
    },
    {
      label: () => t('bankAccount.daily_max_receipt_count'),
      hide: true,
      width: 140,
      prop: 'daily_max_receipt_count',
      className: 'cellBackgroundBlue',
      labelClassName: 'cellBackgroundBlue',
    },
    {
      label: () => t('bankAccount.daily_max_payment_count'),
      hide: true,
      width: 140,
      prop: 'daily_max_payment_count',
      className: 'cellBackgroundRed',
      labelClassName: 'cellBackgroundRed',
    },
    {
      label: () => t('bankAccount.max_receipt_per_txn'),
      hide: true,
      width: 140,
      prop: 'max_receipt_per_txn',
      className: 'cellBackgroundBlue',
      labelClassName: 'cellBackgroundBlue',
    },
    {
      label: () => t('bankAccount.max_payment_per_txn'),
      hide: true,
      width: 140,
      prop: 'max_payment_per_txn',
      className: 'cellBackgroundRed',
      labelClassName: 'cellBackgroundRed',
    },
    {
      label: () => t('bankAccount.min_receipt_per_txn'),
      hide: true,
      width: 140,
      prop: 'min_receipt_per_txn',
      className: 'cellBackgroundBlue',
      labelClassName: 'cellBackgroundBlue',
    },
    {
      label: () => t('bankAccount.min_payment_per_txn'),
      hide: true,
      width: 140,
      prop: 'min_payment_per_txn',
      className: 'cellBackgroundRed',
      labelClassName: 'cellBackgroundRed',
    },
    {
      label: () => t('bankAccount.security_level'),
      width: 100,
      prop: 'security_level'
    },
    {
      label: () => t('bankAccount.last_used_time'),
      width: 180,
      prop: 'last_used_time'
    },
    {
      label: () => t('bankAccount.used_quota'),
      width: 100,
      prop: 'used_quota'
    },
    {
      label: () => t('bankAccount.limit_quota'),
      width: 100,
      prop: 'limit_quota'
    },
    {
      label: () => t('bankAccount.today_receipt'),
      prop: 'today_receipt',
      type: 'merge',
      minWidth: 220,
      cellRender: ({ row }) => {
        return (
          <div class="text-align-left">
            <p>
              <el-text class="mx-1" type="primary">{t('bankAccount.today_receipt_count')}:</el-text>
              {row.today_receipt_count}
            </p>
            <p>
              <el-text class="mx-1" type="primary">{t('bankAccount.today_receipt_amount')}:</el-text>
              {row.today_receipt_amount}
            </p>
          </div>
        )
      },
    },
    {
      label: () => t('bankAccount.today_payment'),
      prop: 'today_payment',
      type: 'merge',
      minWidth: 220,
      cellRender: ({ row }) => {
        return (
          <div class="text-align-left">
            <p>
              <el-text class="mx-1" type="primary">{t('bankAccount.today_payment_count')}:</el-text>
              {row.today_payment_count}
            </p>
            <p>
              <el-text class="mx-1" type="primary">{t('bankAccount.today_payment_amount')}:</el-text>
              {row.today_payment_amount}
            </p>
          </div>
        )
      },
    },
    {
      label: () => t('bankAccount.today_receipt_count'),
      hide: true,
      width: 120,
      prop: 'today_receipt_count',
      className: 'cellBackgroundBlue',
      labelClassName: 'cellBackgroundBlue',
    },
    {
      label: () => t('bankAccount.today_payment_count'),
      hide: true,
      width: 120,
      prop: 'today_payment_count',
      className: 'cellBackgroundRed',
      labelClassName: 'cellBackgroundRed',
    },
    {
      label: () => t('bankAccount.today_receipt_amount'),
      hide: true,
      width: 120,
      prop: 'today_receipt_amount',
      className: 'cellBackgroundBlue',
      labelClassName: 'cellBackgroundBlue',
    },
    {
      label: () => t('bankAccount.today_payment_amount'),
      hide: true,
      width: 120,
      prop: 'today_payment_amount',
      className: 'cellBackgroundRed',
      labelClassName: 'cellBackgroundRed',
    },
    {
      label: () => t('bankAccount.stat_date'),
      width: 120,
      prop: 'stat_date'
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
            show: ({ row }) => showBtn('channel:bank_account:update', row),
            text: () => t('crud.edit'),
            onClick: ({ row }) => {
              dialog.setTitle(t('crud.edit'))
              dialog.open({ formType: 'edit', data: row })
            },
          },
          {
            name: 'del',
            show: ({ row }) => showBtn('channel:bank_account:delete', row),
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
