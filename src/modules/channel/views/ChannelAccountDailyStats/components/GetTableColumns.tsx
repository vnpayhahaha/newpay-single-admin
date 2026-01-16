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
import type { ChannelAccountDailyStatsVo } from '~/channel/api/ChannelAccountDailyStats.ts'
import type { UseDialogExpose } from '@/hooks/useDialog.ts'

import { h } from 'vue'
import { useMessage } from '@/hooks/useMessage.ts'
import { deleteByIds } from '~/channel/api/ChannelAccountDailyStats.ts'
import { ResultCode } from '@/utils/ResultCode.ts'
import hasAuth from '@/utils/permission/hasAuth.ts'

export default function getTableColumns(dialog: UseDialogExpose, formRef: any, t: any): MaProTableColumns[] {
  const msg = useMessage()

  const showBtn = (auth: string | string[]) => {
    return hasAuth(auth)
  }

  // 格式化数字显示，添加千分位分隔符
  const formatNumber = (value: string | number) => {
    if (!value && value !== 0) return '-'
    return Number(value).toLocaleString('zh-CN')
  }

  // 格式化金额显示
  const formatAmount = (value: string | number) => {
    if (!value && value !== 0) return '-'
    return `${Number(value).toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }

  // 格式化百分比显示
  const formatPercentage = (value: string | number) => {
    if (!value && value !== 0) return '-'
    const num = Number(value)
    return `${num.toFixed(2)}%`
  }

  // 格式化限额状态
  const formatLimitStatus = (status: string | number) => {
    const statusValue = String(status)
    const statusMap: Record<string, { text: string; type: 'success' | 'warning' | 'danger' | 'info' }> = {
      '0': { text: '正常', type: 'success' },
      '1': { text: '部分限额', type: 'warning' },
      '2': { text: '完全限额', type: 'danger' }
    }
    return statusMap[statusValue] || { text: '未知', type: 'info' }
  }

  return [
    // 多选列
    { type: 'selection', showOverflowTooltip: false, label: () => t('crud.selection'), width: '55px' },
    // 索引序号列
    { type: 'index', width: '65px' },
    // 基础信息列
    {
      label: () => t("collection_order.channel"),
      prop: "channel",
      width: 220,
      cellRender: ({ row }) => {
        return (
          <div
            class="text-align-left"
            style={{ display: "flex", alignItems: "center" }}
          >
            <el-avatar shape="square" src={row.channel.channel_icon} />
            <div class="ml-5" style={{ flex: 1, minWidth: 0 }}>
              <p>
                <el-text class="mx-1" type="primary">
                  {row.channel.channel_code}
                </el-text>
              </p>
              <p>
                <el-text class="mx-1" truncated>
                  {row.channel.channel_name}
                </el-text>
              </p>
              {row.bank_account?.branch_name && (
                <p>
                  <el-text class="mx-1" truncated>
                    {row.bank_account?.branch_name}
                  </el-text>
                </p>
              )}
              {row.channel_account?.merchant_id && (
                <p>
                  <el-text class="mx-1" truncated>
                    {row.channel_account?.merchant_id}
                  </el-text>
                </p>
              )}
            </div>
          </div>
        );
      },
    },
    {
      label: () => t('ChannelAccountDailyStats.channel_account_id'),
      prop: 'channel_account_id',
      width: '120px',
      hide: true,
      cellRender: ({ row }) => formatNumber(row.channel_account_id)
    },
    {
      label: () => t('ChannelAccountDailyStats.bank_account_id'),
      prop: 'bank_account_id',
      width: '120px',
      hide: true,
      cellRender: ({ row }) => formatNumber(row.bank_account_id)
    },
    {
      label: () => t('ChannelAccountDailyStats.channel_id'),
      prop: 'channel_id',
      width: '100px',
      hide: true,
      cellRender: ({ row }) => formatNumber(row.channel_id)
    },
    {
      label: () => t('ChannelAccountDailyStats.stat_date'),
      prop: 'stat_date',
      width: '120px',
      showOverflowTooltip: true
    },
    // 交易统计列
    {
      label: () => t('ChannelAccountDailyStats.transaction_count'),
      prop: 'transaction_count',
      width: '100px',
      cellRender: ({ row }) => formatNumber(row.transaction_count)
    },
    {
      label: () => t('ChannelAccountDailyStats.collection_success_count'),
      prop: 'collection_success_count',
      width: '120px',
      cellRender: ({ row }) => formatNumber(row.collection_success_count)
    },
    {
      label: () => t('ChannelAccountDailyStats.collection_failure_count'),
      prop: 'collection_failure_count',
      width: '120px',
      cellRender: ({ row }) => formatNumber(row.collection_failure_count)
    },
    {
      label: () => t('ChannelAccountDailyStats.collection_success_rate'),
      prop: 'collection_success_rate',
      width: '100px',
      cellRender: ({ row }) => {
        const rate = Number(row.success_rate)
        const color = rate >= 95 ? '#67c23a' : rate >= 80 ? '#e6a23c' : '#f56c6c'
        return h('span', { style: { color, fontWeight: '600' } }, formatPercentage(row.collection_success_rate))
      }
    },
    {
      label: () => t('ChannelAccountDailyStats.receipt_amount'),
      prop: 'receipt_amount',
      width: '140px',
      cellRender: ({ row }) => formatAmount(row.receipt_amount)
    },
    // 平均处理时间列
    {
      label: () => t('ChannelAccountDailyStats.collection_avg_process_time'),
      prop: 'collection_avg_process_time',
      width: '120px',
      cellRender: ({ row }) => {
        if (!row.collection_avg_process_time && row.collection_avg_process_time !== 0) return '-'
        return `${formatNumber(row.collection_avg_process_time)}s`
      }
    },
    {
      label: () => t('ChannelAccountDailyStats.disbursement_success_count'),
      prop: 'disbursement_success_count',
      width: '120px',
      cellRender: ({ row }) => formatNumber(row.disbursement_success_count)
    },
    {
      label: () => t('ChannelAccountDailyStats.disbursement_failure_count'),
      prop: 'disbursement_failure_count',
      width: '120px',
      cellRender: ({ row }) => formatNumber(row.disbursement_failure_count)
    },
    {
      label: () => t('ChannelAccountDailyStats.disbursement_success_rate'),
      prop: 'disbursement_success_rate',
      width: '100px',
      cellRender: ({ row }) => {
        const rate = Number(row.success_rate)
        const color = rate >= 95 ? '#67c23a' : rate >= 80 ? '#e6a23c' : '#f56c6c'
        return h('span', { style: { color, fontWeight: '600' } }, formatPercentage(row.disbursement_success_rate))
      }
    },
    // 金额列
    {
      label: () => t('ChannelAccountDailyStats.payment_amount'),
      prop: 'payment_amount',
      width: '140px',
      cellRender: ({ row }) => formatAmount(row.payment_amount)
    },
    // 平均处理时间列
     {
      label: () => t('ChannelAccountDailyStats.disbursement_avg_process_time'),
      prop: 'disbursement_avg_process_time',
      width: '120px',
      cellRender: ({ row }) => {
        if (!row.disbursement_avg_process_time && row.disbursement_avg_process_time !== 0) return '-'
        return `${formatNumber(row.disbursement_avg_process_time)}s`
      }
    },
    // 限额状态列
    {
      label: () => t('ChannelAccountDailyStats.limit_status'),
      prop: 'limit_status',
      width: '100px',
      cellRender: ({ row }) => {
        const status = formatLimitStatus(row.limit_status)
        return h('el-tag', {
          type: status.type,
          size: 'small'
        }, status.text)
      }
    },
    { label: () => t('ChannelAccountDailyStats.created_at'), prop: 'created_at', width: '180px', hide: true },
    { label: () => t('ChannelAccountDailyStats.updated_at'), prop: 'updated_at', width: '180px', hide: true },

    // 操作列
    {
      type: 'operation',
      hide: true,
      label: () => t('crud.operation'),
      width: '260px',
      operationConfigure: {
        type: 'tile',
        actions: [
          {
            name: 'edit',
            icon: 'i-heroicons:pencil',
            show: () => showBtn('channel:channel_account_daily_stats:update'),
            text: () => t('crud.edit'),
            onClick: ({ row }) => {
              dialog.setTitle(t('crud.edit'))
              dialog.open({ formType: 'edit', data: row })
            },
          },
          {
            name: 'del',
            show: () => showBtn('channel:channel_account_daily_stats:delete'),
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
