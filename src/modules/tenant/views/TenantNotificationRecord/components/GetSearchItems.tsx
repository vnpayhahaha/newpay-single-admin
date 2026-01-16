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
      label: () => t('tenant_notification_record.tenant_id'),
      prop: 'tenant_id',
      render: () => <el-input />,
          },
                {
      label: () => t('tenant_notification_record.app_id'),
      prop: 'app_id',
      render: () => <el-input />,
          },
                {
      label: () => t('tenant_notification_record.account_type'),
      prop: 'account_type',
      render: () => <el-input />,
          },
                                {
      label: () => t('tenant_notification_record.notification_type'),
      prop: 'notification_type',
      render: () => <el-input />,
          },
                                {
      label: () => t('tenant_notification_record.request_data'),
      prop: 'request_data',
      render: () => <el-input />,
          },
                                        {
      label: () => t('tenant_notification_record.status'),
      prop: 'status',
      render: () => <el-input />,
          },
                          ]
}
