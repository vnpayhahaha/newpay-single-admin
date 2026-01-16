/**
 * MineAdmin is committed to providing solutions for quickly building web applications
 * Please view the LICENSE file that was distributed with this source code,
 * For the full copyright and license information.
 * Thank you very much for using MineAdmin.
 *
 * @Author X.Mo<root@imoi.cn>
 * @Link   https://github.com/mineadmin
 */
import type { MaFormItem } from '@mineadmin/form'
import type { TenantAccountVo } from '~/tenant/api/TenantAccount.ts'
import { selectStatus } from '@/modules/Common'
import type { TenantDictVo } from '~/tenant/api/Tenant.ts'
import { remote } from '~/tenant/api/Tenant.ts'

export default function getFormItems(formType: 'add' | 'edit' = 'add', t: any, model: TenantAccountVo): MaFormItem[] {
  // 新增默认值
  if (formType === 'add') {
    // todo...
  }

  // 编辑默认值
  if (formType === 'edit') {
    // todo...
  }

  return [
    {
      label: t('tenant.tenantId'),
      prop: 'tenant_id',
      render: () => <ma-remote-select filterable disabled={formType === 'edit'} />,
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
      label: t('tenantAccount.account_type'),
      prop: 'account_type',
      itemProps: { required: true },
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
      label: t('tenantAccount.balance_available'),
      prop: 'balance_available',
      cols: { md: 12, xs: 24 },
      itemProps: { required: true },
      render: () => <el-input-number min={0} max={9999999999} precision={2} />,
    },
    {
      label: t('tenantAccount.balance_frozen'),
      prop: 'balance_frozen',
      cols: { md: 12, xs: 24 },
      itemProps: { required: true },
      render: () => <el-input-number min={0} max={9999999999} precision={2} />,
    },
  ]
}
