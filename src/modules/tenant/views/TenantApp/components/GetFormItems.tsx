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
import type { TenantAppVo } from '~/tenant/api/TenantApp.ts'
import type { TenantDictVo } from '~/tenant/api/Tenant.ts'
import { remote } from '~/tenant/api/Tenant.ts'
import { getAppKey, getAppSecret } from '~/tenant/api/TenantApp.ts'

export default function getFormItems(formType: 'add' | 'edit' = 'add', t: any, model: TenantAppVo): MaFormItem[] {
  const getAppKeyHandle = () => {
    getAppKey().then((res) => {
      console.log(res)
      model.app_key = res.data.app_key
      return res.data
    })
  }

  const getAppSecretHandle = () => {
    getAppSecret().then((res) => {
      console.log(res)
      model.app_secret = res.data.app_secret
      return res.data
    })
  }

  // 新增默认值
  if (formType === 'add') {
    // todo...
    model.status = true
    getAppKeyHandle()
    getAppSecretHandle()
  }

  // 编辑默认值
  if (formType === 'edit') {
    // todo...
  }

  return [
    {
      label: t('tenant.tenantId'),
      prop: 'tenant_id',
      itemProps: { required: true },
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
      label: t('tenantApp.appName'),
      prop: 'app_name',
      cols: { md: 12, xs: 24 },
      itemProps: { required: true },
      render: () => <el-input />,
    },
    {
      label: t('tenantApp.status'),
      prop: 'status',
      cols: { md: 12, xs: 24 },
      render: () => <el-switch />,
    },
    {
      label: t('tenantApp.appKey'),
      prop: 'app_key',
      itemProps: { required: true },
      render: () => <el-input />,
      renderSlots: {
        append: () => {
          return <el-button onClick={getAppKeyHandle}>{ t('tenantApp.refreshAppKey')}</el-button>
        },
      },
    },
    {
      label: t('tenantApp.appSecret'),
      prop: 'app_secret',
      render: () => <el-input />,
      itemProps: {
        required: true,
      },
      renderSlots: {
        append: () => {
          return <el-button onClick={getAppSecretHandle}>{ t('tenantApp.refreshAppSecret')}</el-button>
        },
      },
      renderProps: {
        api: () => new Promise(resolve => resolve(getAppSecret())),
        dataHandle: (response: any) => {
          return response.data?.app_secret
        },
      },
    },
    {
      label: t('tenantApp.description'),
      prop: 'description',
      render: () => <el-input />,
    },
    {
      label: t('tenantApp.remark'),
      prop: 'remark',
      render: () => <el-input type="textarea" />,
      renderProps: {
        placeholder: t('tenantApp.remarkPlaceholder'),
      },
    },
  ]
}
