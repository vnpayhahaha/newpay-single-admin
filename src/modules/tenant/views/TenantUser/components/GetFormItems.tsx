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
import type { TenantUserVo } from '~/tenant/api/TenantUser.ts'
import type { TenantDictVo } from '~/tenant/api/Tenant.ts'
import MaUploadImage from '@/components/ma-upload-image/index.vue'
import MaDictRadio from '@/components/ma-dict-picker/ma-dict-radio.vue'
import { remote } from '~/tenant/api/Tenant.ts'

export default function getFormItems(formType: 'add' | 'edit' = 'add', t: any, model: TenantUserVo): MaFormItem[] {
  // 新增默认值
  if (formType === 'add') {
    model.password = '123456'
    model.status = true
    model.is_enabled_google = false
    model.ip_whitelist = '*.*.*.*'
  }

  // 编辑默认值
  if (formType === 'edit') {
    // todo...
  }

  return [
    {
      label: t('tenantUser.avatar'),
      prop: 'avatar',
      render: () => MaUploadImage,
    },
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
      itemProps: {
        required: true,
      },
    },
    {
      label: t('tenantUser.username'),
      prop: 'username',
      cols: { md: 12, xs: 24 },
      render: () => <el-input />,
      itemProps: {
        required: true,
      },
    },
    {
      label: t('tenantUser.phone'),
      prop: 'phone',
      cols: { md: 12, xs: 24 },
      render: () => <el-input />,
      itemProps: {
        required: true,
      },
    },
    {
      label: t('tenantUser.status'),
      prop: 'status',
      cols: { md: 12, xs: 24 },
      render: () => <el-switch />,
    },
    {
      label: t('tenantUser.is_enabled_google'),
      prop: 'is_enabled_google',
      cols: { md: 12, xs: 24 },
      render: () => <el-switch />,
    },
    {
      label: t('tenantUser.ip_whitelist'),
      prop: 'ip_whitelist',
      render: () => <el-input type="textarea" />,
    },
    {
      label: t('tenantUser.remark'),
      prop: 'remark',
      render: () => <el-input type="textarea" />,
    },
  ]
}
