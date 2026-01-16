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
import { MemberLoginStatusEnum } from '~/member/enums'

export default function getSearchItems(t: any): MaSearchItem[] {
  const i18n = useTrans()
  const local = i18n.localTrans

  // 生成登录状态选项
  const statusOptions = Object.values(MemberLoginStatusEnum).map(item => ({
    label: local(`MemberLoginLog.status_enum.${item.labelKey}`),
    value: item.value,
  }))

  return [
    {
      label: () => local('MemberLoginLog.member_id'),
      prop: 'member_id',
      render: () => <el-input clearable placeholder={local('MemberLoginLog.member_id')} />,
    },
    {
      label: () => local('MemberLoginLog.username'),
      prop: 'username',
      render: () => <el-input clearable placeholder={local('MemberLoginLog.username')} />,
    },
    {
      label: () => local('MemberLoginLog.status'),
      prop: 'status',
      render: () => (
        <el-select clearable placeholder={local('MemberLoginLog.status')}>
          {statusOptions.map(option => (
            <el-option key={option.value} label={option.label} value={option.value} />
          ))}
        </el-select>
      ),
    },
  ]
}
