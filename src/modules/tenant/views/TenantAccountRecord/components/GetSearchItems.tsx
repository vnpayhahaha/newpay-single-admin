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
import type { TenantDictVo } from '~/tenant/api/Tenant.ts'
import { remote } from '~/tenant/api/Tenant.ts'
import { selectStatus } from '@/modules/Common'

export default function getSearchItems(t: any, hideChangeType: boolean = false): MaSearchItem[] {
  const searchItems: MaSearchItem[] = [
    {
      label: () => t('tenantAccountRecord.transaction_no'),
      prop: 'transaction_no',
      render: () => <el-input />,
      renderProps: {
        placeholder: t('tenantAccountRecord.transaction_no'),
      },
    },
    {
      label: () => t('tenantAccountRecord.account_id'),
      prop: 'account_id',
      render: () => <el-input />,
      renderProps: {
        placeholder: t('tenantAccountRecord.account_id'),
      },
    },
    {
      label: () => t('tenant.tenantId'),
      prop: 'tenant_id',
      render: () => <ma-remote-select filterable />,
      renderProps: {
        api: () => new Promise(resolve => resolve(remote())),
        dataHandle: (response: any) => {
          return response.data?.map((item: TenantDictVo) => {
            return { label: `${item.tenant_id} ${item.company_name}`, value: item.tenant_id }
          })
        },
      },
    },
    {
      label: () => t('tenantAccountRecord.account_type'),
      prop: 'account_type',
      render: () => <ma-remote-select filterable />,
      renderProps: {
        api: () => new Promise(resolve => resolve(selectStatus('tenant_account', 'account_type_list'))),
        dataHandle: (response: any) => {
          return response.data?.map((item: Common.StatusOptionItem) => {
            return { label: `${item.label}`, value: item.value }
          })
        },
      },
    },
    {
      label: () => t('tenantAccountRecord.created_at'),
      prop: 'created_at',
      render: () => <el-date-picker />,
      renderProps: {
        type: 'datetimerange',
        rangeSeparator: '~',
        startPlaceholder: t('common.startTime'),
        endPlaceholder: t('common.endTime'),
        valueFormat: 'YYYY-MM-DD HH:mm:ss',
        name: [t('tenantAccountRecord.created_at')],
      },
    },
  ]
  if (!hideChangeType) {
    searchItems.push({
      label: () => t('tenantAccountRecord.change_type'),
      prop: 'change_type',
      render: () => <ma-remote-select filterable />,
      renderProps: {
        api: () => new Promise(resolve => resolve(selectStatus('tenant_account_record', 'change_type_list'))),
        dataHandle: (response: any) => {
          return response.data?.map((item: Common.StatusOptionItem) => {
            return { label: `${item.label}`, value: item.value }
          })
        },
      },
    })
  }
  return searchItems
}
