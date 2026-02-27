import type { MaFormItem } from '@mineadmin/form'
import type { UpiChannelVo } from '~/member/api/UpiChannel.ts'

export default function getFormItems(formType: 'add' | 'edit' = 'add', t: any, model: UpiChannelVo, local?: any): MaFormItem[] {
  if (!local) {
    local = t
  }

  // 新增默认值
  if (formType === 'add') {
    model.status = 1
  }

  return [
    // 渠道编码
    {
      label: () => local('UpiChannel.channel_code'),
      prop: 'channel_code',
      render: ({ formData }: any) => (
        <el-input
          v-model={formData.channel_code}
          placeholder={local('UpiChannel.placeholder.channel_code')}
          clearable
        />
      ),
      itemProps: {
        rules: [
          { required: true, message: local('UpiChannel.rules.channel_code_required'), trigger: 'blur' },
        ],
      },
    },
    // 渠道名称
    {
      label: () => local('UpiChannel.channel_name'),
      prop: 'channel_name',
      render: ({ formData }: any) => (
        <el-input
          v-model={formData.channel_name}
          placeholder={local('UpiChannel.placeholder.channel_name')}
          clearable
        />
      ),
      itemProps: {
        rules: [
          { required: true, message: local('UpiChannel.rules.channel_name_required'), trigger: 'blur' },
        ],
      },
    },
    // 渠道图标
    {
      label: () => local('UpiChannel.channel_icon'),
      prop: 'channel_icon',
      render: () => (
        <ma-upload-image
          v-model={model.channel_icon}
          uploadOptions={{
            action: '/admin/file/upload/image',
          }}
        />
      ),
    },
    // 国家代码
    {
      label: () => local('UpiChannel.country_code'),
      prop: 'country_code',
      render: ({ formData }: any) => (
        <el-input
          v-model={formData.country_code}
          placeholder={local('UpiChannel.placeholder.country_code')}
          clearable
        />
      ),
    },
    // 状态
    {
      label: () => local('UpiChannel.status'),
      prop: 'status',
      render: ({ formData }: any) => (
        <el-radio-group v-model={formData.status}>
          <el-radio value={1}>{local('UpiChannel.status_enum.enable')}</el-radio>
          <el-radio value={0}>{local('UpiChannel.status_enum.disable')}</el-radio>
        </el-radio-group>
      ),
      itemProps: {
        rules: [
          { required: true, message: local('UpiChannel.rules.status_required'), trigger: 'change' },
        ],
      },
    },
  ]
}
