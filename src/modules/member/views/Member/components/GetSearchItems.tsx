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
  const i18n = useTrans()
  const local = i18n.localTrans

  return [
    {
      label: () => local('Member.username'),
      prop: 'username',
      render: () => <el-input clearable placeholder={local('Member.placeholder.username')} />,
    },
    {
      label: () => local('Member.nickname'),
      prop: 'nickname',
      render: () => <el-input clearable placeholder={local('Member.placeholder.nickname')} />,
    },
    {
      label: () => local('Member.phone'),
      prop: 'phone',
      render: () => <el-input clearable placeholder={local('Member.placeholder.phone')} />,
    },
    {
      label: () => local('Member.email'),
      prop: 'email',
      render: () => <el-input clearable placeholder={local('Member.placeholder.email')} />,
    },
  ]
}
