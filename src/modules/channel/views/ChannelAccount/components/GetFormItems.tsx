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
import type { ChannelAccountVo } from '~/channel/api/ChannelAccount.ts'
import type { ChannelDictVo } from '~/channel/api/Channel.ts'
import { remote } from '~/channel/api/Channel.ts'
import MaKeyValue from '@/components/ma-key-value/index.vue'

export default function getFormItems(formType: 'add' | 'edit' = 'add', t: any, model: ChannelAccountVo): MaFormItem[] {
  // 新增默认值
  if (formType === 'add') {
    model.status = true
    model.support_collection = false
    model.support_disbursement = false
    model.balance = 0
    model.limit_quota = 0

    model.daily_max_receipt = 0
    model.daily_max_payment = 0
    model.daily_max_receipt_count = 0
    model.daily_max_payment_count = 0
    model.max_receipt_per_txn = 0
    model.max_payment_per_txn = 0
    model.min_receipt_per_txn = 0
    model.min_payment_per_txn = 0

    model.api_config = []
    model.used_quota = 0
  }

  // 编辑默认值
  if (formType === 'edit') {
    // todo...
  }
  const channelArray = reactive<ChannelDictVo[]>([])
  const channelChange = (val: string) => {
    console.log('channelArray', channelArray)
    console.log('channelChange', val)
    // model.api_config 赋值等于 遍历channelArray 中id === val 的 channelArray[i].config
    model.api_config = channelArray.find(item => item.id === val)?.config || []
  }

  return [
    {
      label: t('channelAccount.channel_id'),
      prop: 'channel_id',
      cols: { md: 12, xs: 24 },
      itemProps: { required: true },
      render: () => <ma-remote-select onChange={channelChange} filterable disabled={formType === 'edit'} />,
      renderProps: {
        api: () => new Promise(resolve => resolve(remote({ channel_type: 2 }))),
        dataHandle: (response: any) => {
          channelArray.splice(0, channelArray.length, ...response.data)
          return response.data?.map((item: ChannelDictVo) => {
            return { label: `${item.channel_name}`, value: item.id }
          })
        },
      },
    },
    {
      label: t('channelAccount.merchant_id'),
      prop: 'merchant_id',
      cols: { md: 12, xs: 24 },
      itemProps: { required: true },
      render: () => <el-input />,
    },
    {
      label: t('channelAccount.api_version'),
      prop: 'api_version',
      cols: { md: 12, xs: 24 },
      render: () => <el-input />,
    },
    {
      label: t('channelAccount.status'),
      prop: 'status',
      cols: { md: 12, xs: 24 },
      render: () => <el-switch />,
    },
    {
      label: t('channelAccount.daily_max_receipt'),
      prop: 'daily_max_receipt',
      cols: { md: 12, xs: 24 },
      itemProps: { required: true },
      render: () => <el-input-number min={0} max={9999999999} precision={2} />,
      renderProps: {
        class: 'w-full',
      },
    },
    {
      label: t('channelAccount.daily_max_payment'),
      prop: 'daily_max_payment',
      cols: { md: 12, xs: 24 },
      itemProps: { required: true },
      render: () => <el-input-number min={0} max={9999999999} precision={2} />,
      renderProps: {
        class: 'w-full',
      },
    },
    {
      label: t('channelAccount.daily_max_receipt_count'),
      prop: 'daily_max_receipt_count',
      cols: { md: 12, xs: 24 },
      itemProps: { required: true },
      render: () => <el-input-number min={0} max={9999999999} />,
      renderProps: {
        class: 'w-full',
      },
    },
    {
      label: t('channelAccount.daily_max_payment_count'),
      prop: 'daily_max_payment_count',
      cols: { md: 12, xs: 24 },
      itemProps: { required: true },
      render: () => <el-input-number min={0} max={9999999999} />,
      renderProps: {
        class: 'w-full',
      },
    },
    {
      label: t('channelAccount.max_receipt_per_txn'),
      prop: 'max_receipt_per_txn',
      cols: { md: 12, xs: 24 },
      itemProps: { required: true },
      render: () => <el-input-number min={0} max={9999999999} precision={2} />,
      renderProps: {
        class: 'w-full',
      },
    },
    {
      label: t('channelAccount.max_payment_per_txn'),
      prop: 'max_payment_per_txn',
      cols: { md: 12, xs: 24 },
      itemProps: { required: true },
      render: () => <el-input-number min={0} max={9999999999} precision={2} />,
      renderProps: {
        class: 'w-full',
      },
    },
    {
      label: t('channelAccount.min_receipt_per_txn'),
      prop: 'min_receipt_per_txn',
      cols: { md: 12, xs: 24 },
      itemProps: { required: true },
      render: () => <el-input-number min={0} max={9999999999} precision={2} />,
      renderProps: {
        class: 'w-full',
      },
    },
    {
      label: t('channelAccount.min_payment_per_txn'),
      prop: 'min_payment_per_txn',
      cols: { md: 12, xs: 24 },
      itemProps: { required: true },
      render: () => <el-input-number min={0} max={9999999999} precision={2} />,
      renderProps: {
        class: 'w-full',
      },
    },
    {
      label: t('channelAccount.support_collection'),
      prop: 'support_collection',
      cols: { md: 12, xs: 24 },
      render: () => <el-switch />,
    },
    {
      label: t('channelAccount.support_disbursement'),
      prop: 'support_disbursement',
      cols: { md: 12, xs: 24 },
      render: () => <el-switch />,
    },
    {
      label: t('channelAccount.api_config'),
      prop: 'api_config',
      render: () => MaKeyValue,
      renderProps: {
        fixedKey: true,
      },
    },
    {
      label: t('channelAccount.document_info'),
      prop: 'document_info',
      render: () => <el-input type="textarea" />,
    },
    {
      label: t('channelAccount.callback_url'),
      prop: 'callback_url',
      render: () => <el-input />,
    },
    {
      label: t('channelAccount.ip_whitelist'),
      prop: 'ip_whitelist',
      render: () => <el-input type="textarea" />,
    },
    {
      label: t('channelAccount.currency'),
      prop: 'currency',
      cols: { md: 12, xs: 24 },
      render: () => <el-input />,
    },
    {
      label: t('channelAccount.balance'),
      prop: 'balance',
      cols: { md: 12, xs: 24 },
      render: () => <el-input-number min={0} max={9999999999} precision={2} />,
      renderProps: {
        class: 'w-full',
      },
    },
    {
      label: t('channelAccount.limit_quota'),
      prop: 'limit_quota',
      cols: { md: 12, xs: 24 },
      itemProps: { required: true },
      render: () => <el-input-number min={0} max={99999999999} precision={2} />,
      renderProps: {
        class: 'w-full',
      },
    },
    {
      label: t('channelAccount.used_quota'),
      prop: 'used_quota',
      cols: { md: 12, xs: 24 },
      render: () => <el-input-number min={0} max={99999999999} precision={2} />,
      renderProps: {
        class: 'w-full',
      },
    },
  ]
}
