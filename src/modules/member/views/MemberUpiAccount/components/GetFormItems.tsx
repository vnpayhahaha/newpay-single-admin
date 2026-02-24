import type { MaFormItem } from '@mineadmin/form'
import type { MemberUpiAccountVo } from '~/member/api/MemberUpiAccount.ts'
import { remote } from '~/member/api/Member.ts'

export default function getFormItems(formType: 'add' | 'edit' = 'add', t: any, model: MemberUpiAccountVo, local?: any): MaFormItem[] {
  if (!local) {
    local = t
  }

  // 新增默认值
  if (formType === 'add') {
    model.status = 1
    model.is_default = 0
    model.support_collection = 1
    model.support_disbursement = 1
    model.daily_max_receipt_amount = '0'
    model.daily_max_payment_amount = '0'
    model.daily_max_receipt_count = 0
    model.daily_max_payment_count = 0
  }

  return [
    // 客户选择（仅新增时可选）
    {
      label: () => local('MemberUpiAccount.member_id'),
      prop: 'member_id',
      render: ({ formData }: any) => {
        const api = () => new Promise(resolve => resolve(remote()))
        const dataHandle = (response: any) => {
          return (response.data || []).map((m: any) => ({
            label: `${m.username} (${m.nickname || m.phone})`,
            value: m.id,
          }))
        }
        return (
          <ma-remote-select
            v-model={formData.member_id}
            filterable
            clearable
            placeholder={local('MemberUpiAccount.placeholder.select_member')}
            disabled={formType === 'edit'}
            style={{ width: '100%' }}
            api={api}
            dataHandle={dataHandle}
          />
        )
      },
      itemProps: {
        rules: [
          { required: true, message: local('MemberUpiAccount.rules.member_id_required'), trigger: 'change' },
        ],
      },
    },
    // UPI地址
    {
      label: () => local('MemberUpiAccount.upi_id'),
      prop: 'upi_id',
      render: ({ formData }: any) => (
        <el-input
          v-model={formData.upi_id}
          placeholder={local('MemberUpiAccount.placeholder.upi_id')}
          clearable
        />
      ),
      itemProps: {
        rules: [
          { required: true, message: local('MemberUpiAccount.rules.upi_id_required'), trigger: 'blur' },
        ],
      },
    },
    // 持有人姓名
    {
      label: () => local('MemberUpiAccount.upi_name'),
      prop: 'upi_name',
      render: ({ formData }: any) => (
        <el-input
          v-model={formData.upi_name}
          placeholder={local('MemberUpiAccount.placeholder.upi_name')}
          clearable
        />
      ),
      itemProps: {
        rules: [
          { required: true, message: local('MemberUpiAccount.rules.upi_name_required'), trigger: 'blur' },
        ],
      },
    },
    // 关联手机号
    {
      label: () => local('MemberUpiAccount.phone'),
      prop: 'phone',
      render: ({ formData }: any) => (
        <el-input
          v-model={formData.phone}
          placeholder={local('MemberUpiAccount.placeholder.phone')}
          clearable
        />
      ),
    },
    // 状态
    {
      label: () => local('MemberUpiAccount.status'),
      prop: 'status',
      render: ({ formData }: any) => (
        <el-radio-group v-model={formData.status}>
          <el-radio value={1}>{local('MemberUpiAccount.status_enum.enable')}</el-radio>
          <el-radio value={0}>{local('MemberUpiAccount.status_enum.disable')}</el-radio>
        </el-radio-group>
      ),
      itemProps: {
        rules: [
          { required: true, message: local('MemberUpiAccount.rules.status_required'), trigger: 'change' },
        ],
      },
    },
    // 默认账号
    {
      label: () => local('MemberUpiAccount.is_default'),
      prop: 'is_default',
      render: ({ formData }: any) => (
        <el-radio-group v-model={formData.is_default}>
          <el-radio value={1}>{local('MemberUpiAccount.yes_no.yes')}</el-radio>
          <el-radio value={0}>{local('MemberUpiAccount.yes_no.no')}</el-radio>
        </el-radio-group>
      ),
    },
    // 支持收款
    {
      label: () => local('MemberUpiAccount.support_collection'),
      prop: 'support_collection',
      render: ({ formData }: any) => (
        <el-radio-group v-model={formData.support_collection}>
          <el-radio value={1}>{local('MemberUpiAccount.yes_no.yes')}</el-radio>
          <el-radio value={0}>{local('MemberUpiAccount.yes_no.no')}</el-radio>
        </el-radio-group>
      ),
    },
    // 支持付款
    {
      label: () => local('MemberUpiAccount.support_disbursement'),
      prop: 'support_disbursement',
      render: ({ formData }: any) => (
        <el-radio-group v-model={formData.support_disbursement}>
          <el-radio value={1}>{local('MemberUpiAccount.yes_no.yes')}</el-radio>
          <el-radio value={0}>{local('MemberUpiAccount.yes_no.no')}</el-radio>
        </el-radio-group>
      ),
    },
    // 单日收款限额
    {
      label: () => local('MemberUpiAccount.daily_max_receipt_amount'),
      prop: 'daily_max_receipt_amount',
      render: ({ formData }: any) => (
        <el-input-number
          v-model={formData.daily_max_receipt_amount}
          min={0}
          precision={2}
          step={1000}
          placeholder={local('MemberUpiAccount.placeholder.daily_max_receipt_amount')}
          style={{ width: '100%' }}
          controls-position="right"
        />
      ),
    },
    // 单日付款限额
    {
      label: () => local('MemberUpiAccount.daily_max_payment_amount'),
      prop: 'daily_max_payment_amount',
      render: ({ formData }: any) => (
        <el-input-number
          v-model={formData.daily_max_payment_amount}
          min={0}
          precision={2}
          step={1000}
          placeholder={local('MemberUpiAccount.placeholder.daily_max_payment_amount')}
          style={{ width: '100%' }}
          controls-position="right"
        />
      ),
    },
    // 单日收款次数上限
    {
      label: () => local('MemberUpiAccount.daily_max_receipt_count'),
      prop: 'daily_max_receipt_count',
      render: ({ formData }: any) => (
        <el-input-number
          v-model={formData.daily_max_receipt_count}
          min={0}
          step={10}
          placeholder={local('MemberUpiAccount.placeholder.daily_max_receipt_count')}
          style={{ width: '100%' }}
          controls-position="right"
        />
      ),
    },
    // 单日付款次数上限
    {
      label: () => local('MemberUpiAccount.daily_max_payment_count'),
      prop: 'daily_max_payment_count',
      render: ({ formData }: any) => (
        <el-input-number
          v-model={formData.daily_max_payment_count}
          min={0}
          step={10}
          placeholder={local('MemberUpiAccount.placeholder.daily_max_payment_count')}
          style={{ width: '100%' }}
          controls-position="right"
        />
      ),
    },
    // 备注
    {
      label: () => local('MemberUpiAccount.remark'),
      prop: 'remark',
      render: ({ formData }: any) => (
        <el-input
          v-model={formData.remark}
          type="textarea"
          rows={3}
          placeholder={local('MemberUpiAccount.placeholder.remark')}
          maxlength={255}
          show-word-limit
        />
      ),
    },
  ]
}
