import type { MaSearchItem } from '@mineadmin/search'

export default function getSearchItems(t: any): MaSearchItem[] {
  const local = useTrans().localTrans

  return [
    {
      label: () => local('MemberUpiChannel.channel_code'),
      prop: 'channel_code',
      render: () => <el-input clearable placeholder={local('MemberUpiChannel.placeholder.channel_code')} />,
    },
    {
      label: () => local('MemberUpiChannel.member_id'),
      prop: 'member_id',
      render: () => <el-input clearable placeholder={local('MemberUpiChannel.member_id')} />,
    },
    {
      label: () => local('MemberUpiChannel.upi_channel_id'),
      prop: 'upi_channel_id',
      render: () => <el-input clearable placeholder={local('MemberUpiChannel.upi_channel_id')} />,
    },
  ]
}
