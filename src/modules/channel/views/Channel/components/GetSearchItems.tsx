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
import { selectStatus } from '@/modules/Common'

export default function getSearchItems(t: any): MaSearchItem[] {
  return [
    {
      label: () => t('channel.channel_code'),
      prop: 'channel_code',
      render: () => <el-input />,
    },
    {
      label: () => t('channel.channel_name'),
      prop: 'channel_name',
      render: () => <el-input />,
    },
    {
      label: () => t('channel.country_code'),
      prop: 'country_code',
      render: () => <el-input />,
    },
    {
      label: () => t('channel.currency'),
      prop: 'currency',
      render: () => <el-input />,
    },
    {
      label: () => t('channel.support_collection'),
      prop: 'support_collection',
      render: () => <ma-remote-select filterable />,
      renderProps: {
        api: () => new Promise(resolve => resolve(selectStatus('channel', 'support_collection_list'))),
        dataHandle: (response: any) => {
          return response.data?.map((item: Common.StatusOptionItem) => {
            return { label: `${item.label}`, value: item.value }
          })
        },
      },
    },
    {
      label: () => t('channel.support_disbursement'),
      prop: 'support_disbursement',
      render: () => <ma-remote-select filterable />,
      renderProps: {
        api: () => new Promise(resolve => resolve(selectStatus('channel', 'support_disbursement_list'))),
        dataHandle: (response: any) => {
          return response.data?.map((item: Common.StatusOptionItem) => {
            return { label: `${item.label}`, value: item.value }
          })
        },
      },
    },
    {
      label: () => t('channel.status'),
      prop: 'status',
      render: () => <ma-remote-select filterable />,
      renderProps: {
        api: () => new Promise(resolve => resolve(selectStatus('channel', 'status_list'))),
        dataHandle: (response: any) => {
          return response.data?.map((item: Common.StatusOptionItem) => {
            return { label: `${item.label}`, value: item.value }
          })
        },
      },
    },
  ]
}
