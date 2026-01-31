/**
 * 设备指令队列搜索项
 */

import type { MaSearchItem } from '@mineadmin/search'
import { getCommandTypeOptions, getBusinessTypeOptions, getStatusOptions } from '~/device/api/DeviceCommand.ts'

export default function getSearchItems(t: any): MaSearchItem[] {
  return [
    {
      label: () => t('device_command.command_no'),
      prop: 'command_no',
      render: () => <el-input clearable />,
      renderProps: {
        placeholder: t('device_command.command_no'),
      },
    },
    {
      label: () => t('device_command.order_no'),
      prop: 'order_no',
      render: () => <el-input clearable />,
      renderProps: {
        placeholder: t('device_command.order_no'),
      },
    },
    {
      label: () => t('device_command.device_id'),
      prop: 'device_id',
      render: () => <el-input type="number" clearable />,
      renderProps: {
        placeholder: t('device_command.device_id'),
      },
    },
    {
      label: () => t('device_command.command_type'),
      prop: 'command_type',
      render: () => <ma-remote-select filterable clearable />,
      renderProps: {
        api: getCommandTypeOptions,
        dataHandle: (response: any) => {
          return response.data?.map((item: any) => ({
            label: item.label,
            value: item.value,
          }))
        },
      },
    },
    {
      label: () => t('device_command.business_type'),
      prop: 'business_type',
      render: () => <ma-remote-select filterable clearable />,
      renderProps: {
        api: getBusinessTypeOptions,
        dataHandle: (response: any) => {
          return response.data?.map((item: any) => ({
            label: item.label,
            value: item.value,
          }))
        },
      },
    },
    {
      label: () => t('device_command.status'),
      prop: 'status',
      render: () => <ma-remote-select filterable clearable />,
      renderProps: {
        api: getStatusOptions,
        dataHandle: (response: any) => {
          return response.data?.map((item: any) => ({
            label: item.label,
            value: item.value,
          }))
        },
      },
    },
    {
      label: () => t('device_command.created_at'),
      prop: 'created_at',
      render: () => <el-date-picker />,
      renderProps: {
        type: 'datetimerange',
        rangeSeparator: '~',
        startPlaceholder: t('common.startTime'),
        endPlaceholder: t('common.endTime'),
        valueFormat: 'YYYY-MM-DD HH:mm:ss',
      },
    },
  ]
}
