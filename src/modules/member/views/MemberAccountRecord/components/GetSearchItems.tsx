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
import { MemberAccountRecordTypeEnum } from '~/member/enums'

export default function getSearchItems(t: any): MaSearchItem[] {
  const i18n = useTrans()
  const local = i18n.localTrans

  // 生成类型选项
  const typeOptions = Object.values(MemberAccountRecordTypeEnum).map(item => ({
    label: local(`MemberAccountRecord.type_enum.${item.labelKey}`),
    value: item.value,
  }))

  return [
    {
      label: () => local('MemberAccountRecord.member_id'),
      prop: 'member_id',
      render: () => <el-input clearable placeholder={local('MemberAccountRecord.member_id')} />,
    },
    {
      label: () => local('MemberAccountRecord.type'),
      prop: 'type',
      render: () => (
        <el-select clearable placeholder={local('MemberAccountRecord.type')}>
          {typeOptions.map(option => (
            <el-option key={option.value} label={option.label} value={option.value} />
          ))}
        </el-select>
      ),
    },
    {
      label: () => local('MemberAccountRecord.transaction_no'),
      prop: 'transaction_no',
      render: () => <el-input clearable placeholder={local('MemberAccountRecord.transaction_no')} />,
    },
    {
      label: () => local('MemberAccountRecord.created_at'),
      prop: 'created_at',
      render: () => <el-date-picker type="daterange" range-separator="-" style="width: 100%" />,
    },
  ]
}
