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
      label: () => t('transaction_voucher.device_id'),
      prop: 'device_id',
      render: () => <el-input type="number" />,
      renderProps: {
        placeholder: t('transaction_voucher.device_id'),
      },
    },
    {
      label: () => t('transaction_voucher.member_id'),
      prop: 'member_id',
      render: () => <el-input type="number" />,
      renderProps: {
        placeholder: t('transaction_voucher.member_id'),
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
