/**
 * 会员通知管理表单项配置
 */
import type { MaFormItem } from '@mineadmin/form'
import { remote as memberRemote } from '~/member/api/Member.ts'

/**
 * 单个/批量通知表单（合并）
 */
export function getSingleFormItems(local?: any): MaFormItem[] {
  return [
    {
      label: local('MemberNotice.title'),
      prop: 'title',
      itemProps: { required: true },
      render: () => <el-input placeholder={local('MemberNotice.placeholder.title')} maxlength={200} show-word-limit />,
    },
    {
      label: local('MemberNotice.type'),
      prop: 'type',
      itemProps: { required: true },
      render: () => (
        <el-radio-group>
          <el-radio value={1}>{local('MemberNotice.type_notice')}</el-radio>
          <el-radio value={2}>{local('MemberNotice.type_announcement')}</el-radio>
        </el-radio-group>
      ),
    },
    {
      label: local('MemberNotice.receiver'),
      prop: 'member_ids',
      render: ({ formData }: any) => {
        const api = () => new Promise(resolve => resolve(memberRemote()))
        const dataHandle = (response: any) => {
          return response.data?.map((item: any) => {
            return { label: `${item.username} (ID: ${item.id})`, value: item.id }
          })
        }

        return (
          <div>
            <ma-remote-select
              v-model={formData.member_ids}
              multiple
              filterable
              clearable
              placeholder={local('MemberNotice.placeholder.select_members')}
              style={{ width: '100%' }}
              api={api}
              dataHandle={dataHandle}
            />
            <el-text size="small" type="info" style={{ marginTop: '8px', display: 'block' }}>
              {local('MemberNotice.help.member_selection')}
            </el-text>
          </div>
        )
      },
    },
    {
      label: local('MemberNotice.content'),
      prop: 'content',
      itemProps: { required: true },
      render: () => (
        <el-input
          type="textarea"
          placeholder={local('MemberNotice.placeholder.content')}
          rows={6}
          maxlength={1000}
          show-word-limit
        />
      ),
    },
    {
      label: local ? local('crud.remark') : '备注',
      prop: 'remark',
      render: () => (
        <el-input
          type="textarea"
          placeholder={local ? local('crud.remark') : '请输入备注信息'}
          rows={3}
          maxlength={500}
          show-word-limit
        />
      ),
    },
  ]
}

/**
 * 广播通知表单（全体会员）
 */
export function getBroadcastFormItems(local?: any): MaFormItem[] {
  return [
    {
      label: local('MemberNotice.title'),
      prop: 'title',
      itemProps: { required: true },
      render: () => <el-input placeholder={local('MemberNotice.placeholder.title')} maxlength={200} show-word-limit />,
    },
    {
      label: local('MemberNotice.type'),
      prop: 'type',
      itemProps: { required: true },
      render: () => (
        <el-radio-group>
          <el-radio value={1}>{local('MemberNotice.type_notice')}</el-radio>
          <el-radio value={2}>{local('MemberNotice.type_announcement')}</el-radio>
        </el-radio-group>
      ),
    },
    {
      render: () => (
        <el-alert
          title={local('MemberNotice.broadcast_alert')}
          type="warning"
          show-icon
          closable={false}
          style={{ marginBottom: '16px' }}
        />
      ),
    },
    {
      label: local('MemberNotice.content'),
      prop: 'content',
      itemProps: { required: true },
      render: () => (
        <el-input
          type="textarea"
          placeholder={local('MemberNotice.placeholder.content')}
          rows={6}
          maxlength={1000}
          show-word-limit
        />
      ),
    },
    {
      label: local ? local('crud.remark') : '备注',
      prop: 'remark',
      render: () => (
        <el-input
          type="textarea"
          placeholder={local ? local('crud.remark') : '请输入备注信息'}
          rows={3}
          maxlength={500}
          show-word-limit
        />
      ),
    },
  ]
}
