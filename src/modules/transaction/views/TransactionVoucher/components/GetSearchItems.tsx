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
import { reactive } from 'vue'
import { selectStatus } from '@/modules/Common'
import type { ChannelDictVo } from '~/channel/api/Channel.ts'
import { remote } from '~/channel/api/Channel.ts'
import type {
  BankAccountDictVo } from '~/channel/api/BankAccount.ts'
import {
  remote as remoteBankAccount,
} from '~/channel/api/BankAccount.ts'
import type {
  ChannelAccountDictVo,
} from '~/channel/api/ChannelAccount.ts'
import {
  remote as channelAccountRemote,
} from '~/channel/api/ChannelAccount.ts'

export default function getSearchItems(t: any): MaSearchItem[] {
  // 创建一个响应式的 channel_id 状态
  const searchState = reactive({
    channelId: undefined as any,
    channelAccountKey: 0, // 用于强制重新渲染 channel_account_id
    bankAccountKey: 0, // 用于强制重新渲染 bank_account_id
  })

  return [
    {
      label: () => t('transaction_voucher.channel_id'),
      prop: 'channel_id',
      render: () => <ma-remote-select filterable />,
      renderProps: {
        api: () =>
          new Promise(resolve => resolve(remote())),
        dataHandle: (response: any) => {
          return response.data?.map((item: ChannelDictVo) => {
            return { label: `${item.channel_name}`, value: item.id }
          })
        },
        onChange: (value: any) => {
          // 更新响应式状态
          searchState.channelId = value
          searchState.channelAccountKey++
          searchState.bankAccountKey++
        },
      },
    },
    {
      label: () => t('transaction_voucher.channel_account_id'),
      prop: 'channel_account_id',
      render: () => {
        // 使用响应式状态作为key来强制重新渲染
        const key = `channel-account-${searchState.channelAccountKey}`
        return <ma-remote-select filterable key={key} />
      },
      renderProps: {
        api: () => {
          const channelId = searchState.channelId

          const params = {
            status: 1,
            _t: Date.now(),
            ...(channelId && { channel_id: channelId }),
          }

          return new Promise(resolve =>
            resolve(channelAccountRemote(params)),
          )
        },
        dataHandle: (response: any) => {
          return response.data?.map((item: ChannelAccountDictVo) => {
            return {
              label: `${item.merchant_id}`,
              value: item.id,
              extend: item,
            }
          })
        },
      },
    },
    {
      label: () => t('transaction_voucher.bank_account_id'),
      prop: 'bank_account_id',
      render: () => {
        // 使用响应式状态作为key来强制重新渲染
        const key = `bank-account-${searchState.bankAccountKey}`
        return <ma-remote-select filterable key={key} />
      },
      renderProps: {
        api: () => {
          const channelId = searchState.channelId

          const params = {
            status: 1,
            _t: Date.now(),
            ...(channelId && { channel_id: channelId }),
          }

          return new Promise(resolve =>
            resolve(remoteBankAccount(params)),
          )
        },
        dataHandle: (response: any) => {
          return response.data?.map((item: BankAccountDictVo) => {
            return {
              label: `${item.account_holder}`,
              value: item.id,
              extend: item,
            }
          })
        },
      },
    },
    {
      label: () => t('transaction_voucher.collection_card_no'),
      prop: 'collection_card_no',
      render: () => <el-input />,
    },
    {
      label: () => t('transaction_voucher.collection_time'),
      prop: 'collection_time',
      render: () => <el-date-picker />,
      renderProps: {
        type: 'datetimerange',
        rangeSeparator: '~',
        startPlaceholder: t('common.startTime'),
        endPlaceholder: t('common.endTime'),
        valueFormat: 'YYYY-MM-DD HH:mm:ss',
        name: [t('transaction_voucher.collection_time')],
      },
    },
    {
      label: () => t('transaction_voucher.collection_status'),
      prop: 'collection_status',
      render: () => <ma-remote-select filterable />,
      renderProps: {
        api: () => new Promise(resolve => resolve(selectStatus('transaction_voucher', 'collection_status_list'))),
        dataHandle: (response: any) => {
          return response.data?.map((item: Common.StatusOptionItem) => {
            return { label: `${item.label}`, value: item.value }
          })
        },
      },
    },
    {
      label: () => t('transaction_voucher.collection_source'),
      prop: 'collection_source',
      render: () => <ma-remote-select filterable />,
      renderProps: {
        api: () => new Promise(resolve => resolve(selectStatus('transaction_voucher', 'collection_source_list'))),
        dataHandle: (response: any) => {
          return response.data?.map((item: Common.StatusOptionItem) => {
            return { label: `${item.label}`, value: item.value }
          })
        },
      },
    },
    {
      label: () => t('transaction_voucher.transaction_voucher_type'),
      prop: 'transaction_voucher_type',
      render: () => <ma-remote-select filterable />,
      renderProps: {
        api: () => new Promise(resolve => resolve(selectStatus('transaction_voucher', 'transaction_voucher_type_list'))),
        dataHandle: (response: any) => {
          return response.data?.map((item: Common.StatusOptionItem) => {
            return { label: `${item.label}`, value: item.value }
          })
        },
      },
    },
    {
      label: () => t('transaction_voucher.order_no'),
      prop: 'order_no',
      render: () => <el-input />,
    },
    {
      label: () => t('transaction_voucher.transaction_type'),
      prop: 'transaction_type',
      render: () => <ma-remote-select filterable />,
      renderProps: {
        api: () => new Promise(resolve => resolve(selectStatus('transaction_voucher', 'transaction_type_list'))),
        dataHandle: (response: any) => {
          return response.data?.map((item: Common.StatusOptionItem) => {
            return { label: `${item.label}`, value: item.value }
          })
        },
      },
    },
  ]
}
