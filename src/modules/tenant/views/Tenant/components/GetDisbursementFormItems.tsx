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
import type { TenantVo } from '~/tenant/api/Tenant.ts'
import { selectStatus } from '@/modules/Common'
import MaDictCheckbox from '@/components/ma-dict-picker/ma-dict-checkbox.vue'

export default function getFormItems(t: any, model: TenantVo): MaFormItem[] {
  model.payment_assign_items = model.payment_assign_items ?? []
  return [
    {
      label: t('tenant.companyName'),
      prop: 'company_name',
      render: () => <el-input disabled />,
      itemProps: {
        required: true,
      },
      cols: {
        span: 12,
      },
    },
    {
      label: t('tenant.is_payment'),
      prop: 'is_payment',
      render: () => <el-switch />,
      itemProps: {
        required: true,
      },
      cols: {
        span: 12,
      },
    },
    {
      label: t('tenant.auto_transfer'),
      prop: 'auto_transfer',
      render: () => <el-switch />,
      itemProps: {
        required: true,
      },
      cols: {
        span: 12,
      },
    },
    {
      label: t('tenant.payment_fee_type'),
      prop: 'payment_fee_type',
      render: () => MaDictCheckbox,
      renderProps: {
        multiple: true,
        data: [
          {
            label: t('tenant.payment_fixed_fee'),
            value: 1,
          },
          {
            label: t('tenant.payment_fee_rate'),
            value: 2,
          },
        ],
      },
    },
    {
      label: t('tenant.payment_fixed_fee'),
      prop: 'payment_fixed_fee',
      hide: () => !model.payment_fee_type.includes(1),
      render: () => <el-input-number class="w-full" />,
      itemProps: {
        required: true,
      },
      renderProps: {
        min: 0,
        max: 99,
        precision: 2,
      },
      cols: {
        span: 12,
      },
      renderSlots: {
        prefix: () => <span style="margin-left: 8px">INR</span>,
      },
    },
    {
      label: t('tenant.payment_fee_rate'),
      prop: 'payment_fee_rate',
      hide: () => !model.payment_fee_type.includes(2),
      render: () => <el-input-number class="w-full" />,
      itemProps: {
        required: true,
      },
      renderProps: {
        min: 0,
        max: 99,
        precision: 2,
        step: 0.01,
      },
      cols: {
        span: 12,
      },
      renderSlots: {
        suffix: () => <span style="margin-right: 8px">%</span>,
      },
    },
    {
      label: t('tenant.payment_min_amount'),
      prop: 'payment_min_amount',
      render: () => <el-input-number class="w-full" />,
      itemProps: {
        required: true,
      },
      renderProps: {
        min: 0,
        max: 99,
        precision: 2,
      },
      cols: {
        span: 12,
      },
      renderSlots: {
        prefix: () => <span style="margin-left: 8px">INR</span>,
      },
    },
    {
      label: t('tenant.payment_max_amount'),
      prop: 'payment_max_amount',
      render: () => <el-input-number class="w-full" />,
      itemProps: {
        required: true,
      },
      renderProps: {
        min: 0,
        max: 99,
        precision: 2,
      },
      cols: {
        span: 12,
      },
      renderSlots: {
        prefix: () => <span style="margin-left: 8px">INR</span>,
      },
    },
    {
      label: t('tenant.payment_expire_minutes'),
      prop: 'payment_expire_minutes',
      render: () => <el-input-number class="w-full" />,
      itemProps: {
        required: true,
      },
      renderProps: {
        min: 0,
        max: 9999,
      },
      cols: {
        span: 12,
      },
      renderSlots: {
        suffix: () => <span style="margin-left: 8px">MIN</span>,
      },
    },
  ]
}
