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
import { remote, selectStatus } from '~/tenant/api/Tenant.ts'

export default function getSearchItems(t: any): MaSearchItem[] {
  return [
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
      label: () => t('tenantApp.appName'),
      prop: 'app_name',
      render: () => <el-input />,
    },
    {
      label: () => t('tenantApp.appKey'),
      prop: 'app_key',
      render: () => <el-input />,
    },
    {
      label: () => t('tenantApp.status'),
      prop: 'status',
      render: () => <ma-remote-select filterable />,
      renderProps: {
        api: () => new Promise(resolve => resolve(selectStatus())),
        dataHandle: (response: any) => {
          return response.data?.map((item: Common.StatusOptionItem) => {
            return { label: `${item.label}`, value: item.value }
          })
        },
      },
    },
  ]
}
