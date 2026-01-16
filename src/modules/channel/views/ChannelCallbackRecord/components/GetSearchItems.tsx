/**
 * MineAdmin is committed to providing solutions for quickly building web applications
 * Please view the LICENSE file that was distributed with this source code,
 * For the full copyright and license information.
 * Thank you very much for using MineAdmin.
 *
 * @Author X.Mo <root@imoi.cn>
 * @Link   https://github.com/mineadmin
 */

import type { MaSearchItem } from '@mineadmin/search'

export default function getSearchItems(t: any): MaSearchItem[] {
  return [
    {
      label: () => t('channel_callback_record.callback_id'),
      prop: 'callback_id',
      render: () => <el-input />,
    },
    {
      label: () => t('channel_callback_record.channel_id'),
      prop: 'channel_id',
      render: () => <el-input />,
    },
    {
      label: () => t('channel_callback_record.original_request_id'),
      prop: 'original_request_id',
      render: () => <el-input />,
    },
    {
      label: () => t('channel_callback_record.callback_type'),
      prop: 'callback_type',
      render: () => <el-input />,
    },
    {
      label: () => t('channel_callback_record.callback_body'),
      prop: 'callback_body',
      render: () => <el-input />,
    },
    {
      label: () => t('channel_callback_record.status'),
      prop: 'status',
      render: () => <el-input />,
    },
  ]
}
