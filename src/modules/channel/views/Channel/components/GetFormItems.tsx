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
import type { ChannelVo } from '~/channel/api/Channel.ts'
import MaKeyValue from '@/components/ma-key-value/index.vue'

export default function getFormItems(formType: 'add' | 'edit' = 'add', t: any, model: ChannelVo): MaFormItem[] {
  // 新增默认值
  if (formType === 'add') {
    model.status = true
    model.support_collection = false
    model.support_disbursement = false
    model.config = []
    model.country_code = 'IND'
    model.currency = 'INR'
  }

  // 编辑默认值
  if (formType === 'edit') {
    // todo...
  }

  return [
    {
      label: t('channel.channel_icon'),
      prop: 'channel_icon',
      cols: { md: 12, xs: 24 },
      render: () => <ma-upload-image />,
    },
    {
      label: t('channel.status'),
      prop: 'status',
      cols: { md: 12, xs: 24 },
      render: () => <el-switch />,
    },
    {
      label: t('channel.channel_code'),
      prop: 'channel_code',
      cols: { md: 12, xs: 24 },
      itemProps: { required: true },
      render: () => <el-input />,
    },
    {
      label: t('channel.channel_name'),
      prop: 'channel_name',
      cols: { md: 12, xs: 24 },
      itemProps: { required: true },
      render: () => <el-input />,
    },
    {
      label: t('channel.country_code'),
      prop: 'country_code',
      cols: { md: 12, xs: 24 },
      itemProps: { required: true },
      render: () => <el-input />,
    },
    {
      label: t('channel.currency'),
      prop: 'currency',
      cols: { md: 12, xs: 24 },
      itemProps: { required: true },
      render: () => <el-input />,
    },
    {
      label: t('channel.support_collection'),
      prop: 'support_collection',
      cols: { md: 12, xs: 24 },
      render: () => <el-switch />,
    },
    {
      label: t('channel.support_disbursement'),
      prop: 'support_disbursement',
      cols: { md: 12, xs: 24 },
      render: () => <el-switch />,
    },
    {
      label: t('channel.api_base_url'),
      prop: 'api_base_url',
      render: () => <el-input />,
    },
    {
      label: t('channel.doc_url'),
      prop: 'doc_url',
      render: () => <el-input type="textarea" />,
    },
    {
      label: t('channel.config'),
      prop: 'config',
      render: () => MaKeyValue,
    },
  ]
}
