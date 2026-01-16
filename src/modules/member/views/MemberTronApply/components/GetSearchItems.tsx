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
import { MemberTronApplyStatusEnum, MemberTronApplyTypeEnum } from '~/member/enums'

export default function getSearchItems(t: any): MaSearchItem[] {
  const i18n = useTrans()
  const local = i18n.localTrans

  // 生成状态选项
  const statusOptions = Object.values(MemberTronApplyStatusEnum).map(item => ({
    label: local(`MemberTronApply.status_enum.${item.labelKey}`),
    value: item.value,
  }))

  // 生成类型选项
  const typeOptions = Object.values(MemberTronApplyTypeEnum).map(item => ({
    label: local(`MemberTronApply.type_enum.${item.labelKey}`),
    value: item.value,
  }))

  return [
    {
      label: () => local('MemberTronApply.tron_address'),
      prop: 'tron_address',
      render: () => <el-input clearable placeholder={local('MemberTronApply.tron_address')} />,
    },
    {
      label: () => local('MemberTronApply.status'),
      prop: 'status',
      render: () => (
        <el-select clearable placeholder={local('MemberTronApply.status')}>
          {statusOptions.map(option => (
            <el-option key={option.value} label={option.label} value={option.value} />
          ))}
        </el-select>
      ),
    },
    {
      label: () => local('MemberTronApply.type'),
      prop: 'type',
      render: () => (
        <el-select clearable placeholder={local('MemberTronApply.type')}>
          {typeOptions.map(option => (
            <el-option key={option.value} label={option.label} value={option.value} />
          ))}
        </el-select>
      ),
    },
    {
      label: () => local('MemberTronApply.confirm_time'),
      prop: 'confirm_time',
      render: () => <el-date-picker type="daterange" range-separator="-" style="width: 100%" />,
    },
  ]
}
