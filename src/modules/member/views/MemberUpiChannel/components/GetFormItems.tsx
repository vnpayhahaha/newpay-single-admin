import type { MaFormItem } from '@mineadmin/form'
import type { MemberUpiChannelVo } from '~/member/api/MemberUpiChannel.ts'
import { remote } from '~/member/api/Member.ts'
import { remote as remoteUpiChannel } from '~/member/api/UpiChannel.ts'

export default function getFormItems(formType: 'add' | 'edit' = 'add', t: any, model: MemberUpiChannelVo, local?: any): MaFormItem[] {
  if (!local) {
    local = t
  }

  return [
    // 客户选择（仅新增时可选）
    {
      label: () => local('MemberUpiChannel.member_id'),
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
            placeholder={local('MemberUpiChannel.placeholder.select_member')}
            disabled={formType === 'edit'}
            style={{ width: '100%' }}
            api={api}
            dataHandle={dataHandle}
          />
        )
      },
      itemProps: {
        rules: [
          { required: true, message: local('MemberUpiChannel.rules.member_id_required'), trigger: 'change' },
        ],
      },
    },
    // UPI渠道选择
    {
      label: () => local('MemberUpiChannel.upi_channel_id'),
      prop: 'upi_channel_id',
      render: ({ formData }: any) => {
        const api = () => new Promise(resolve => resolve(remoteUpiChannel()))
        const dataHandle = (response: any) => {
          return (response.data?.list || []).map((c: any) => ({
            label: `${c.channel_name} (${c.channel_code})`,
            value: c.id,
          }))
        }
        return (
          <ma-remote-select
            v-model={formData.upi_channel_id}
            filterable
            clearable
            placeholder={local('MemberUpiChannel.placeholder.select_channel')}
            style={{ width: '100%' }}
            api={api}
            dataHandle={dataHandle}
            onChange={(val: number) => {
              // 自动填充渠道编码
              remoteUpiChannel().then((res: any) => {
                const channel = (res.data?.list || []).find((c: any) => c.id === val)
                if (channel) {
                  formData.channel_code = channel.channel_code
                }
              })
            }}
          />
        )
      },
      itemProps: {
        rules: [
          { required: true, message: local('MemberUpiChannel.rules.upi_channel_id_required'), trigger: 'change' },
        ],
      },
    },
    // 渠道编码
    {
      label: () => local('MemberUpiChannel.channel_code'),
      prop: 'channel_code',
      render: ({ formData }: any) => (
        <el-input
          v-model={formData.channel_code}
          placeholder={local('MemberUpiChannel.placeholder.channel_code')}
          clearable
        />
      ),
      itemProps: {
        rules: [
          { required: true, message: local('MemberUpiChannel.rules.channel_code_required'), trigger: 'blur' },
        ],
      },
    },
    // 渠道配置
    {
      label: () => local('MemberUpiChannel.config'),
      prop: 'config',
      render: ({ formData }: any) => (
        <el-input
          v-model={formData.config}
          type="textarea"
          rows={4}
          placeholder={local('MemberUpiChannel.placeholder.config')}
          maxlength={255}
          show-word-limit
        />
      ),
    },
  ]
}
