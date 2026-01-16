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
import type { ChannelDictVo } from '~/channel/api/Channel.ts'
import { remote } from '~/channel/api/Channel.ts'
import { selectStatus } from '@/modules/Common'

export default function getSearchItems(t: any): MaSearchItem[] {
  return [
    {
      label: () => t('bankAccount.channel_id'),
      prop: 'channel_id',
      render: () => <ma-remote-select filterable />,
      renderProps: {
        api: () => new Promise(resolve => resolve(remote({channel_type:1}))),
        dataHandle: (response: any) => {
          return response.data?.map((item: ChannelDictVo) => {
            return { label: `${item.channel_name}`, value: item.id }
          })
        },
      },
    },
    {
      label: () => t('bankAccount.branch_name'),
      prop: 'branch_name',
      render: () => <el-input />,
    },
    {
      label: () => t('bankAccount.account_holder'),
      prop: 'account_holder',
      render: () => <el-input />,
    },
    {
      label: () => t('bankAccount.account_number'),
      prop: 'account_number',
      render: () => <el-input />,
    },
    {
      label: () => t('bankAccount.bank_code'),
      prop: 'bank_code',
      render: () => <el-input />,
    },
    {
      label: () => t('bankAccount.account_type'),
      prop: 'account_type',
      render: () => <el-input />,
    },
    {
      label: () => t('bankAccount.status'),
      prop: 'status',
      render: () => <ma-remote-select filterable />,
      renderProps: {
        api: () => new Promise(resolve => resolve(selectStatus('bank_account', 'status_list'))),
        dataHandle: (response: any) => {
          return response.data?.map((item: Common.StatusOptionItem) => {
            return { label: `${item.label}`, value: item.value }
          })
        },
      },
    },
    {
      label: () => t('bankAccount.support_collection'),
      prop: 'support_collection',
      render: () => <ma-remote-select filterable />,
      renderProps: {
        api: () => new Promise(resolve => resolve(selectStatus('bank_account', 'support_collection_list'))),
        dataHandle: (response: any) => {
          return response.data?.map((item: Common.StatusOptionItem) => {
            return { label: `${item.label}`, value: item.value }
          })
        },
      },
    },
    {
      label: () => t('bankAccount.support_disbursement'),
      prop: 'support_disbursement',
      render: () => <ma-remote-select filterable />,
      renderProps: {
        api: () => new Promise(resolve => resolve(selectStatus('bank_account', 'support_disbursement_list'))),
        dataHandle: (response: any) => {
          return response.data?.map((item: Common.StatusOptionItem) => {
            return { label: `${item.label}`, value: item.value }
          })
        },
      },
    },
  ]
}
