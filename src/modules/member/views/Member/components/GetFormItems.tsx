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
import type { MemberVo } from '~/member/api/Member.ts'

export default function getFormItems(formType: 'add' | 'edit' = 'add', t: any, model: MemberVo): MaFormItem[] {
  // 新增默认值
  if (formType === 'add') {
    model.status = '1' // 默认启用
    model.in_sell = '0' // 默认不接收代收订单
    model.is_bind_google = '0' // 默认未绑定Google验证
  }

  // 编辑默认值
  if (formType === 'edit') {
    // todo...
  }

  return [
    {
      label: () => t('Member.username'),
      prop: 'username',
      render: () => <el-input v-model={model.username} placeholder={t('Member.placeholder.username')} clearable />,
      itemProps: {
        rules: [
          { required: true, message: t('Member.rules.username_required'), trigger: 'blur' },
          { min: 3, max: 30, message: t('Member.rules.username_length'), trigger: 'blur' },
        ],
      },
    },
    {
      label: () => t('Member.password'),
      prop: 'password',
      render: () => (
        <el-input
          v-model={model.password}
          type="password"
          placeholder={formType === 'edit' ? t('Member.placeholder.password_edit') : t('Member.placeholder.password')}
          clearable
          show-password
        />
      ),
      itemProps: {
        rules: formType === 'add'
          ? [
              { required: true, message: t('Member.rules.password_required'), trigger: 'blur' },
              { min: 6, max: 32, message: t('Member.rules.password_length'), trigger: 'blur' },
            ]
          : [],
      },
    },
    {
      label: () => t('Member.pin'),
      prop: 'pin',
      render: () => (
        <el-input
          v-model={model.pin}
          type="password"
          placeholder={t('Member.placeholder.pin')}
          clearable
          show-password
        />
      ),
      itemProps: {
        rules: [
          { pattern: /^\d{4,6}$/, message: t('Member.rules.pin_pattern'), trigger: 'blur' },
        ],
      },
    },
    {
      label: () => t('Member.nickname'),
      prop: 'nickname',
      render: () => <el-input v-model={model.nickname} placeholder={t('Member.placeholder.nickname')} clearable />,
      itemProps: {
        rules: [
          { required: true, message: t('Member.rules.nickname_required'), trigger: 'blur' },
        ],
      },
    },
    {
      label: () => t('Member.phone'),
      prop: 'phone',
      render: () => <el-input v-model={model.phone} placeholder={t('Member.placeholder.phone')} clearable />,
      itemProps: {
        rules: [
          { required: true, message: t('Member.rules.phone_required'), trigger: 'blur' },
          { pattern: /^[6-9]\d{9}$/, message: t('Member.rules.phone_pattern'), trigger: 'blur' },
        ],
      },
    },
    {
      label: () => t('Member.email'),
      prop: 'email',
      render: () => <el-input v-model={model.email} placeholder={t('Member.placeholder.email')} clearable />,
      itemProps: {
        rules: [
          { type: 'email', message: t('Member.rules.email_pattern'), trigger: 'blur' },
        ],
      },
    },
    {
      label: () => t('Member.avatar'),
      prop: 'avatar',
      render: () => (
        <ma-upload-image
          v-model={model.avatar}
          uploadOptions={{
            action: '/admin/file/upload/image',
          }}
        />
      ),
    },
    {
      label: () => t('Member.signed'),
      prop: 'signed',
      render: () => (
        <el-input
          v-model={model.signed}
          type="textarea"
          rows={3}
          placeholder={t('Member.placeholder.signed')}
          maxlength={200}
          show-word-limit
        />
      ),
    },
    {
      label: () => t('Member.status'),
      prop: 'status',
      render: () => (
        <el-radio-group v-model={model.status}>
          <el-radio value="1">{t('Member.status_options.normal')}</el-radio>
          <el-radio value="0">{t('Member.status_options.disabled')}</el-radio>
        </el-radio-group>
      ),
      itemProps: {
        rules: [
          { required: true, message: t('Member.rules.status_required'), trigger: 'change' },
        ],
      },
    },
    {
      label: () => t('Member.in_sell'),
      prop: 'in_sell',
      render: () => (
        <el-radio-group v-model={model.in_sell}>
          <el-radio value="1">{t('Member.yes_no.yes')}</el-radio>
          <el-radio value="0">{t('Member.yes_no.no')}</el-radio>
        </el-radio-group>
      ),
    },
    {
      label: () => t('Member.remark'),
      prop: 'remark',
      render: () => (
        <el-input
          v-model={model.remark}
          type="textarea"
          rows={4}
          placeholder={t('Member.placeholder.remark')}
          maxlength={500}
          show-word-limit
        />
      ),
    },
  ]
}
