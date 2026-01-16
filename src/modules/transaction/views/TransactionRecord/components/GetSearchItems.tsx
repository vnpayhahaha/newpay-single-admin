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
      label: () => t('transaction_record.transaction_no'),
      prop: 'transaction_no',
      render: () => <el-input />,
      renderProps: {
        placeholder: t('transaction_record.transaction_no'),
      },
    },
    {
      label: () => t('transaction_record.account_type'),
      prop: 'account_type',
      render: () => <ma-remote-select filterable />,
      renderProps: {
        api: () => new Promise(resolve => resolve(selectStatus('tenant_account', 'account_type_list'))),
        dataHandle: (response: any) => {
          return response.data?.map((item: Common.StatusOptionItem) => {
            return { label: `${item.label}`, value: item.value }
          })
        },
        placeholder: t('transaction_record.account_type'),
      },
    },
    {
      label: () => t('transaction_record.transaction_type'),
      prop: 'transaction_type',
      render: () => <ma-remote-select filterable />,
      renderProps: {
        api: () => new Promise(resolve => resolve(selectStatus('transaction_record', 'type_list'))),
        dataHandle: (response: any) => {
          return response.data?.map((item: Common.StatusOptionItem) => {
            return { label: `${item.label}`, value: item.value }
          })
        },
      },
    },
    {
      label: () => t('transaction_record.settlement_delay_mode'),
      prop: 'settlement_delay_mode',
      render: () => <ma-remote-select filterable />,
      renderProps: {
        api: () => new Promise(resolve => resolve(selectStatus('transaction_record', 'settlement_delay_mode_list'))),
        dataHandle: (response: any) => {
          return response.data?.map((item: Common.StatusOptionItem) => {
            return { label: `${item.label}`, value: item.value }
          })
        },
      },
    },
    {
      label: () => t('transaction_record.holiday_adjustment'),
      prop: 'holiday_adjustment',
      render: () => <el-input />,
    },
    {
      label: () => t('transaction_record.transaction_status'),
      prop: 'transaction_status',
      render: () => <ma-remote-select filterable />,
      renderProps: {
        api: () => new Promise(resolve => resolve(selectStatus('transaction_record', 'status_list'))),
        dataHandle: (response: any) => {
          return response.data?.map((item: Common.StatusOptionItem) => {
            return { label: `${item.label}`, value: item.value }
          })
        },
      },
    },
  ]
}
