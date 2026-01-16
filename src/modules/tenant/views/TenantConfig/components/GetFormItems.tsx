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
import type { TenantConfigVo } from '~/tenant/api/TenantConfig.ts'
import type { TenantDictVo } from '~/tenant/api/Tenant.ts'
import { remote } from '~/tenant/api/Tenant.ts'

export default function getFormItems(formType: 'add' | 'edit' = 'add', t: any, model: TenantConfigVo): MaFormItem[] {
  // 新增默认值
  if (formType === 'add') {
    model.enabled = true
  }

  // 编辑默认值
  if (formType === 'edit') {
    // todo...
  }

  return [
    {
      label: t('tenant.tenantId'),
      prop: 'tenant_id',
      cols: { md: 12, xs: 24 },
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
      label: t('tenantConfig.groupCode'),
      prop: 'group_code',
      cols: { md: 12, xs: 24 },
      render: () => <el-input />,
    },
    {
      label: t('tenantConfig.code'),
      prop: 'code',
      cols: { md: 12, xs: 24 },
      render: () => <el-input />,
    },
    {
      label: t('tenantConfig.name'),
      prop: 'name',
      cols: { md: 12, xs: 24 },
      render: () => <el-input />,
    },
    {
      label: t('tenantConfig.content'),
      prop: 'content',
      cols: { md: 12, xs: 24 },
      render: () => <el-input />,
    },
    {
      label: t('tenantConfig.enabled'),
      prop: 'enabled',
      cols: { md: 12, xs: 24 },
      render: () => <el-switch />,
    },
    {
      label: t('tenantConfig.intro'),
      prop: 'intro',
      render: () => <el-input type="textarea" />,
    },
    {
      label: t('tenantConfig.option'),
      prop: 'option',
      render: () => <el-input type="textarea" />,
    },
  ]
}
