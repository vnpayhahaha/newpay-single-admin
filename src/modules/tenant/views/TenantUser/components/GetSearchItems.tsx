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
import { selectStatus } from '~/tenant/api/TenantUser.ts'

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
      label: () => t('tenantUser.username'),
      prop: 'username',
      render: () => <el-input />,
    },
    {
      label: () => t('tenantUser.phone'),
      prop: 'phone',
      render: () => <el-input />,
    },
    {
      label: () => t('tenantUser.status'),
      prop: 'status',
      render: () => <ma-remote-select filterable />,
      renderProps: {
        api: () => new Promise(resolve => resolve(selectStatus('status_list'))),
        dataHandle: (response: any) => {
          return response.data?.map((item: Common.StatusOptionItem) => {
            return { label: `${item.label}`, value: item.value }
          })
        },
      },
    },
    {
      label: () => t('tenantUser.is_enabled_google'),
      prop: 'is_enabled_google',
      render: () => <ma-remote-select filterable />,
      renderProps: {
        api: () => new Promise(resolve => resolve(selectStatus('google_status_list'))),
        dataHandle: (response: any) => {
          return response.data?.map((item: Common.StatusOptionItem) => {
            return { label: `${item.label}`, value: item.value }
          })
        },
      },
    },
    {
      label: () => t('tenantUser.is_bind_google'),
      prop: 'is_bind_google',
      render: () => <ma-remote-select filterable />,
      renderProps: {
        api: () => new Promise(resolve => resolve(selectStatus('google_bind_list'))),
        dataHandle: (response: any) => {
          return response.data?.map((item: Common.StatusOptionItem) => {
            return { label: `${item.label}`, value: item.value }
          })
        },
      },
    },
    {
      label: () => t('tenantUser.remark'),
      prop: 'remark',
      render: () => <el-input />,
    },
  ]
}
