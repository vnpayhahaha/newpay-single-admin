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
      label: () => t('recycleBin.tenantId'),
      prop: 'tenant_id',
      render: () => <el-input />,
    },
    {
      label: () => t('recycleBin.isRestored'),
      prop: 'is_restored',
      render: () => <el-switch />,
    },
    {
      label: () => t('recycleBin.operateBy'),
      prop: 'operate_by',
      render: () => <ma-remote-select />,
    },
    {
      label: () => t('recycleBin.createdAt'),
      prop: 'created_at',
      render: () => <el-date-picker />,
    },
  ]
}
