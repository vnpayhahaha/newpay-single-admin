import type { MaSearchItem } from '@mineadmin/search'

export default function getSearchItems(t: any): MaSearchItem[] {
  const local = useTrans().localTrans

  return [
    {
      label: () => local('MemberUpiAccount.upi_id'),
      prop: 'upi_id',
      render: () => <el-input clearable placeholder={local('MemberUpiAccount.placeholder.upi_id')} />,
    },
    {
      label: () => local('MemberUpiAccount.upi_name'),
      prop: 'upi_name',
      render: () => <el-input clearable placeholder={local('MemberUpiAccount.placeholder.upi_name')} />,
    },
    {
      label: () => local('MemberUpiAccount.phone'),
      prop: 'phone',
      render: () => <el-input clearable placeholder={local('MemberUpiAccount.placeholder.phone')} />,
    },
    {
      label: () => local('MemberUpiAccount.status'),
      prop: 'status',
      render: () => (
        <el-select clearable placeholder={local('MemberUpiAccount.status')}>
          <el-option label={local('MemberUpiAccount.status_enum.enable')} value={1} />
          <el-option label={local('MemberUpiAccount.status_enum.disable')} value={0} />
        </el-select>
      ),
    },
    {
      label: () => local('MemberUpiAccount.is_default'),
      prop: 'is_default',
      render: () => (
        <el-select clearable placeholder={local('MemberUpiAccount.is_default')}>
          <el-option label={local('MemberUpiAccount.yes_no.yes')} value={1} />
          <el-option label={local('MemberUpiAccount.yes_no.no')} value={0} />
        </el-select>
      ),
    },
    {
      label: () => local('MemberUpiAccount.member_id'),
      prop: 'member_id',
      render: () => <el-input clearable placeholder={local('MemberUpiAccount.member_id')} />,
    },
  ]
}
