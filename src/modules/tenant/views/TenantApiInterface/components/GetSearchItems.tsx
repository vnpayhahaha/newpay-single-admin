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
import { selectStatus } from '@/modules/Common'

export default function getSearchItems(t: any): MaSearchItem[] {
  return [
    {
      label: () => t('tenant_api_interface.api_name'),
      prop: 'api_name',
      render: () => <el-input />,
    },
    {
      label: () => t('tenant_api_interface.api_uri'),
      prop: 'api_uri',
      render: () => <el-input />,
    },
    {
      label: () => t('tenant_api_interface.http_method'),
      prop: 'http_method',
      render: () => <ma-remote-select filterable />,
      renderProps: {
        api: () => new Promise(resolve => resolve(selectStatus('tenant_api_interface', 'http_method_list'))),
        dataHandle: (response: any) => {
          return response.data?.map((item: Common.StatusOptionItem) => {
            return { label: `${item.label}`, value: item.value }
          })
        },
      },
    },
  ]
}
