/**
 * MineAdmin is committed to providing solutions for quickly building web applications
 * Please view the LICENSE file that was distributed with this source code,
 * For the full copyright and license information.
 * Thank you very much for using MineAdmin.
 *
 * @Author X.Mo <root@imoi.cn>
 * @Link   https://github.com/mineadmin
 */

import type { MaSearchItem } from '@mineadmin/search'

export default function getSearchItems(t: any): MaSearchItem[] {
  return [
    {
      label: () => t('ChannelAccountDailyStats.channel_account_id'),
      prop: 'channel_account_id',
      render: () => <el-input />,
    },
    {
      label: () => t('ChannelAccountDailyStats.bank_account_id'),
      prop: 'bank_account_id',
      render: () => <el-input />,
    },
    {
      label: () => t('ChannelAccountDailyStats.channel_id'),
      prop: 'channel_id',
      render: () => <el-input />,
    },
    {
      label: () => t('ChannelAccountDailyStats.stat_date'),
      prop: 'stat_date',
      render: () => <el-input />,
    },
    {
      label: () => t('ChannelAccountDailyStats.collection_success_rate'),
      prop: 'collection_success_rate',
      render: () => <el-input />,
    },
    {
      label: () => t('ChannelAccountDailyStats.disbursement_success_rate'),
      prop: 'disbursement_success_rate',
      render: () => <el-input />,
    },
    {
      label: () => t('ChannelAccountDailyStats.limit_status'),
      prop: 'limit_status',
      render: () => <el-input />,
    },
    {
      label: () => t('ChannelAccountDailyStats.created_at'),
      prop: 'created_at',
      render: () => <el-input />,
    },
  ]
}
