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
      label: () => t('channel_request_record.request_id'),
      prop: 'request_id',
      render: () => <el-input />,
    },
    {
      label: () => t('channel_request_record.channel_id'),
      prop: 'channel_id',
      render: () => <el-input />,
    },
    {
      label: () => t('channel_request_record.api_method'),
      prop: 'api_method',
      render: () => <el-input />,
    },
    {
      label: () => t('channel_request_record.request_params'),
      prop: 'request_params',
      render: () => <el-input />,
    },
    {
      label: () => t('channel_request_record.request_body'),
      prop: 'request_body',
      render: () => <el-input />,
    },
    {
      label: () => t('channel_request_record.http_status_code'),
      prop: 'http_status_code',
      render: () => <el-input />,
    },
  ]
}
