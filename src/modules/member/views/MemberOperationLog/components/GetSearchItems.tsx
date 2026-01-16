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
import { MemberOperationSuccessEnum } from '~/member/enums'

export default function getSearchItems(t: any): MaSearchItem[] {
  const i18n = useTrans()
  const local = i18n.localTrans

  // 生成操作成功状态选项
  const successOptions = Object.values(MemberOperationSuccessEnum).map(item => ({
    label: local(`MemberOperationLog.success_enum.${item.labelKey}`),
    value: item.value,
  }))

  return [
    {
      label: () => local('MemberOperationLog.username'),
      prop: 'username',
      render: () => <el-input clearable placeholder={local('MemberOperationLog.username')} />,
    },
    {
      label: () => local('MemberOperationLog.method'),
      prop: 'method',
      render: () => <el-input clearable placeholder={local('MemberOperationLog.method')} />,
    },
    {
      label: () => local('MemberOperationLog.router'),
      prop: 'router',
      render: () => <el-input clearable placeholder={local('MemberOperationLog.router')} />,
    },
    {
      label: () => local('MemberOperationLog.service_name'),
      prop: 'service_name',
      render: () => <el-input clearable placeholder={local('MemberOperationLog.service_name')} />,
    },
    {
      label: () => local('MemberOperationLog.ip'),
      prop: 'ip',
      render: () => <el-input clearable placeholder={local('MemberOperationLog.ip')} />,
    },
    {
      label: () => local('MemberOperationLog.is_success'),
      prop: 'is_success',
      render: () => (
        <el-select clearable placeholder={local('MemberOperationLog.is_success')}>
          {successOptions.map(option => (
            <el-option key={option.value} label={option.label} value={option.value} />
          ))}
        </el-select>
      ),
    },
    {
      label: () => local('MemberOperationLog.created_at'),
      prop: 'created_at',
      render: () => <el-date-picker type="daterange" range-separator="-" style="width: 100%" />,
    },
  ]
}
