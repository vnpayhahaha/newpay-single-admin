import type { MaSearchItem } from '@mineadmin/search'

export default function getSearchItems(t: any): MaSearchItem[] {
  const local = useTrans().localTrans

  return [
    {
      label: () => local('UpiChannel.channel_code'),
      prop: 'channel_code',
      render: () => <el-input clearable placeholder={local('UpiChannel.placeholder.channel_code')} />,
    },
    {
      label: () => local('UpiChannel.channel_name'),
      prop: 'channel_name',
      render: () => <el-input clearable placeholder={local('UpiChannel.placeholder.channel_name')} />,
    },
    {
      label: () => local('UpiChannel.country_code'),
      prop: 'country_code',
      render: () => <el-input clearable placeholder={local('UpiChannel.placeholder.country_code')} />,
    },
    {
      label: () => local('UpiChannel.status'),
      prop: 'status',
      render: () => (
        <el-select clearable placeholder={local('UpiChannel.status')}>
          <el-option label={local('UpiChannel.status_enum.enable')} value={1} />
          <el-option label={local('UpiChannel.status_enum.disable')} value={0} />
        </el-select>
      ),
    },
  ]
}
