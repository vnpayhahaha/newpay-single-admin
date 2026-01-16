/**
 * 会员通知管理搜索项配置
 */
import type { MaSearchItem } from '@mineadmin/search'
import { MemberNoticeTypeEnum } from '~/member/enums'

export default function getSearchItems(t: any, local: any): MaSearchItem[] {
  // 生成通知类型选项
  const typeOptions = Object.values(MemberNoticeTypeEnum).map(item => ({
    label: local(`MemberNotice.type_${item.labelKey}`),
    value: item.value,
  }))

  return [
    {
      label: () => local('MemberNotice.title'),
      prop: 'title',
      render: () => <el-input placeholder={local('MemberNotice.placeholder.title')} clearable />,
    },
    {
      label: () => local('MemberNotice.type'),
      prop: 'type',
      render: () => (
        <el-select placeholder={`${t('crud.select')}${local('MemberNotice.type')}`} clearable>
          {typeOptions.map(option => (
            <el-option key={option.value} label={option.label} value={option.value} />
          ))}
        </el-select>
      ),
    },
    {
      label: () => local('MemberNotice.member_id'),
      prop: 'member_id',
      render: () => <el-input-number placeholder={`${t('crud.input')}${local('MemberNotice.member_id')}`} clearable controls={false} style={{ width: '100%' }} />,
    },
    {
      label: () => local('MemberNotice.created_at'),
      prop: 'created_at',
      render: () => (
        <el-date-picker
          type="datetimerange"
          range-separator="至"
          start-placeholder={t('crud.startTime')}
          end-placeholder={t('crud.endTime')}
          value-format="YYYY-MM-DD HH:mm:ss"
        />
      ),
    },
  ]
}
