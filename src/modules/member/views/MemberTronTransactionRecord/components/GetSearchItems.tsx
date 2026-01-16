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
import { MemberTronTransactionStatusEnum } from '~/member/enums'

export default function getSearchItems(t: any): MaSearchItem[] {
  const i18n = useTrans()
  const local = i18n.localTrans

  // 生成状态选项
  const statusOptions = Object.values(MemberTronTransactionStatusEnum).map(item => ({
    label: local(`MemberTronTransactionRecord.status_enum.${item.labelKey}`),
    value: item.value,
  }))

  return [
    {
      label: () => local('MemberTronTransactionRecord.transaction_id'),
      prop: 'transaction_id',
      render: () => <el-input clearable placeholder={local('MemberTronTransactionRecord.transaction_id')} />,
    },
    {
      label: () => local('MemberTronTransactionRecord.transaction_type'),
      prop: 'transaction_type',
      render: () => <el-input clearable placeholder={local('MemberTronTransactionRecord.transaction_type')} />,
    },
    {
      label: () => local('MemberTronTransactionRecord.status'),
      prop: 'status',
      render: () => (
        <el-select clearable placeholder={local('MemberTronTransactionRecord.status')}>
          {statusOptions.map(option => (
            <el-option key={option.value} label={option.label} value={option.value} />
          ))}
        </el-select>
      ),
    },
    {
      label: () => local('MemberTronTransactionRecord.created_at'),
      prop: 'created_at',
      render: () => <el-date-picker type="daterange" range-separator="-" style="width: 100%" />,
    },
  ]
}
