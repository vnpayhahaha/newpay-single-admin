/**
 * MineAdmin is committed to providing solutions for quickly building web applications
 * Please view the LICENSE file that was distributed with this source code,
 * For the full copyright and license information.
 * Thank you very much for using MineAdmin.
 *
 * @Author X.Mo<root@imoi.cn>
 * @Link   https://github.com/mineadmin
 */
import type { MaProTableColumns, MaProTableExpose } from '@mineadmin/pro-table'
import type { TenantNotificationRecordVo } from '~/tenant/api/TenantNotificationRecord.ts'
import type { UseDialogExpose } from '@/hooks/useDialog.ts'

import { h } from 'vue'
import { useMessage } from '@/hooks/useMessage.ts'
import { deleteByIds } from '~/tenant/api/TenantNotificationRecord.ts'
import { ResultCode } from '@/utils/ResultCode.ts'
import hasAuth from '@/utils/permission/hasAuth.ts'

export default function getTableColumns(dialog: UseDialogExpose, formRef: any, t: any): MaProTableColumns[] {
  const msg = useMessage()

  const showBtn = (auth: string | string[]) => {
    return hasAuth(auth)
  }

  // 格式化JSON显示
  const formatJson = (jsonString: string) => {
    if (!jsonString) return '-'
    try {
      const parsed = JSON.parse(jsonString)
      return JSON.stringify(parsed, null, 2)
    } catch {
      return jsonString
    }
  }

  // 格式化通知状态颜色
  const getStatusType = (status: string) => {
    switch (status) {
      case 'success':
      case '1':
        return 'success'
      case 'failed':
      case '0':
        return 'danger'
      case 'pending':
        return 'warning'
      default:
        return 'info'
    }
  }

  // 格式化HTTP状态码颜色
  const getResponseStatusColor = (status: string | number) => {
    if (!status && status !== 0) return '#909399'
    const statusStr = String(status).toLowerCase()
    if (statusStr.includes('200') || statusStr.includes('success')) return '#67c23a'
    if (statusStr.includes('4') || statusStr.includes('5') || statusStr.includes('error')) return '#f56c6c'
    return '#e6a23c'
  }

  return [
    // 多选列
    { type: 'selection', showOverflowTooltip: false, label: () => t('crud.selection'), width: '55px' },

    // 展开行
    {
      label: () => t('crud.details'),
      prop: 'expand',
      type: 'expand',
      width: '60px',
      cellRender: ({ row }) => {
        return (
          <div style={{ padding: '20px' }}>
            <el-row gutter={20}>
              <el-col span={12}>
                <div class="expand-section">
                  <h4 style={{ margin: '0 0 12px 0', color: '#409eff', borderBottom: '1px solid #e4e7ed', paddingBottom: '8px' }}>
                    {t('tenant_notification_record.request_data')}
                  </h4>
                  <el-input
                    type="textarea"
                    readonly
                    rows={6}
                    value={formatJson(row.request_data)}
                    style={{ marginBottom: '16px' }}
                  />
                </div>

                <div class="expand-section">
                  <h4 style={{ margin: '0 0 12px 0', color: '#409eff', borderBottom: '1px solid #e4e7ed', paddingBottom: '8px' }}>
                    {t('tenant_notification_record.notification_url')}
                  </h4>
                  <el-input
                    readonly
                    value={row.notification_url}
                    style={{ marginBottom: '16px' }}
                  />
                </div>

                <div class="expand-section">
                  <h4 style={{ margin: '0 0 12px 0', color: '#409eff', borderBottom: '1px solid #e4e7ed', paddingBottom: '8px' }}>
                    {t('tenant_notification_record.basic_info')}
                  </h4>
                  <el-descriptions column={2} border>
                    <el-descriptions-item label={t('tenant_notification_record.tenant_company')}>{row.tenant?.company_name || '-'}</el-descriptions-item>
                    <el-descriptions-item label={t('tenant_notification_record.app_name')}>{row.app?.app_name || '-'}</el-descriptions-item>
                    <el-descriptions-item label={t('tenant_notification_record.app_key')}>{row.app?.app_key || '-'}</el-descriptions-item>
                    <el-descriptions-item label={t('tenant_notification_record.queue_id')}>{row.queue_id || '-'}</el-descriptions-item>
                    <el-descriptions-item label={t('tenant_notification_record.request_method')}>{row.request_method || '-'}</el-descriptions-item>
                    <el-descriptions-item label={t('tenant_notification_record.execute_count')}>{row.execute_count || 0}</el-descriptions-item>
                  </el-descriptions>
                </div>
              </el-col>

              <el-col span={12}>
                <div class="expand-section">
                  <h4 style={{ margin: '0 0 12px 0', color: '#67c23a', borderBottom: '1px solid #e4e7ed', paddingBottom: '8px' }}>
                    {t('tenant_notification_record.response_data')}
                  </h4>
                  <el-input
                    type="textarea"
                    readonly
                    rows={8}
                    value={formatJson(row.response_data)}
                    style={{ marginBottom: '16px' }}
                  />
                </div>

                <div class="expand-section">
                  <h4 style={{ margin: '0 0 12px 0', color: '#67c23a', borderBottom: '1px solid #e4e7ed', paddingBottom: '8px' }}>
                    {t('tenant_notification_record.order_info')}
                  </h4>
                  {(row.collection_order || row.disbursement_order) ? (
                    <el-descriptions column={1} border>
                      <el-descriptions-item label={t('tenant_notification_record.order_type')}>
                        {row.collection_order ? t('tenant_notification_record.collection_order') : t('tenant_notification_record.disbursement_order')}
                      </el-descriptions-item>
                      <el-descriptions-item label={t('tenant_notification_record.platform_order_no')}>
                        {(row.collection_order || row.disbursement_order)?.platform_order_no}
                      </el-descriptions-item>
                      <el-descriptions-item label={t('tenant_notification_record.merchant_order_no')}>
                        {(row.collection_order || row.disbursement_order)?.tenant_order_no}
                      </el-descriptions-item>
                    </el-descriptions>
                  ) : (
                    <el-empty description={t('tenant_notification_record.no_related_order')} />
                  )}
                </div>
              </el-col>
            </el-row>
          </div>
        )
      }
    },

    // 索引序号列
    { type: 'index', width: '65px' },

    // 基础信息列
    {
      label: () => t('tenant_notification_record.tenant_id'),
      prop: 'tenant_id',
      width: '200px',
      cellRender: ({ row }) => {
        return (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontWeight: '600', color: '#409eff' }}>{row.tenant?.company_name || '-'}</span>
            <span style={{ fontSize: '12px', color: '#909399' }}>{row.tenant_id}</span>
          </div>
        )
      }
    },
    {
      label: () => t('tenant_notification_record.app_id'),
      prop: 'app_id',
      width: '180px',
      cellRender: ({ row }) => {
        return (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontWeight: '600' }}>{row.app?.app_name || '-'}</span>
            <span style={{ fontSize: '12px', color: '#909399' }}>ID: {row.app_id}</span>
          </div>
        )
      }
    },
    {
      label: () => t('tenant_notification_record.account_type'),
      prop: 'account_type',
      width: '120px',
      cellRender: ({ row }) => {
        if (!row.account_type) return '-'
        const isCollection = row.account_type === '1' || row.account_type === 'collection'
        return h('el-tag', {
          type: isCollection ? 'primary' : 'success',
          size: 'small'
        }, isCollection ? t('tenant_notification_record.collection') : t('tenant_notification_record.disbursement'))
      }
    },
    {
      label: () => t('tenant_notification_record.associated_order'),
      prop: 'order_info',
      minWidth: '280px',
      cellRender: ({ row }) => {
        const order = row.collection_order || row.disbursement_order
        if (!order) return '-'

        const orderType = row.collection_order ? t('tenant_notification_record.collection_order') : t('tenant_notification_record.disbursement_order')
        const tagType = row.collection_order ? 'primary' : 'success'

        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <el-tag type={tagType} size="small">{orderType}</el-tag>
            </div>
            <div style={{ fontSize: '12px' }}>
              <div style={{ color: '#409eff', fontWeight: '600' }}>
                {t('tenant_notification_record.platform_order_no')}: {order.platform_order_no}
              </div>
              <div style={{ color: '#909399' }}>
                {t('tenant_notification_record.merchant_order_no')}: {order.tenant_order_no}
              </div>
            </div>
          </div>
        )
      }
    },
    {
      label: () => t('tenant_notification_record.notification_type'),
      prop: 'notification_type',
      width: '120px',
      cellRender: ({ row }) => {
        if (!row.notification_type) return '-'
        const typeMap = {
          '1': { text: t('tenant_notification_record.system_notification'), type: 'info' },
          '2': { text: t('tenant_notification_record.order_notification'), type: 'primary' },
          '3': { text: t('tenant_notification_record.bill_notification'), type: 'warning' }
        }
        const config = typeMap[row.notification_type] || { text: row.notification_type, type: 'info' }
        return h('el-tag', { type: config.type, size: 'small' }, config.text)
      }
    },
    {
      label: () => t('tenant_notification_record.request_method'),
      prop: 'request_method',
      width: '100px',
      cellRender: ({ row }) => {
        const colors = {
          'GET': 'success',
          'POST': 'primary',
          'PUT': 'warning',
          'DELETE': 'danger'
        }
        return h('el-tag', {
          type: colors[row.request_method] || 'info',
          size: 'small'
        }, row.request_method)
      }
    },
    {
      label: () => t('tenant_notification_record.response_status'),
      prop: 'response_status',
      width: '120px',
      cellRender: ({ row }) => {
        if (!row.response_status) return '-'
        const color = getResponseStatusColor(row.response_status)
        return h('el-tag', {
          style: { backgroundColor: color, borderColor: color, color: '#fff' },
          size: 'small'
        }, row.response_status)
      }
    },
    {
      label: () => t('tenant_notification_record.execute_count'),
      prop: 'execute_count',
      width: '100px',
      cellRender: ({ row }) => {
        const count = row.execute_count || 0
        const color = count > 3 ? '#f56c6c' : count > 1 ? '#e6a23c' : '#67c23a'
        return h('span', {
          style: {
            color,
            fontWeight: '600',
            padding: '2px 8px',
            borderRadius: '4px',
            backgroundColor: `${color}15`,
            border: `1px solid ${color}30`
          }
        }, count)
      }
    },
    {
      label: () => t('tenant_notification_record.status'),
      prop: 'status',
      width: '100px',
      cellRender: ({ row }) => {
        if (!row.status && row.status !== 0) return '-'
        return h('el-tag', {
          type: getStatusType(String(row.status)),
          size: 'small'
        }, row.status === 1 || row.status === '1' ? t('crud.success') : row.status === 0 || row.status === '0' ? t('crud.failed') : String(row.status))
      }
    },
    {
      label: () => t('tenant_notification_record.created_at'),
      prop: 'created_at',
      width: '180px',
      showOverflowTooltip: true
    },
    {
      label: () => t('tenant_notification_record.updated_at'),
      prop: 'updated_at',
      width: '180px',
      showOverflowTooltip: true,
      hide: true
    },

    // 操作列
    {
      type: 'operation',
      hide: true,
      label: () => t('crud.operation'),
      width: '260px',
      operationConfigure: {
        type: 'tile',
        actions: [
          {
            name: 'edit',
            icon: 'i-heroicons:pencil',
            show: () => showBtn('tenant:tenant_notification_record:update'),
            text: () => t('crud.edit'),
            onClick: ({ row }) => {
              dialog.setTitle(t('crud.edit'))
              dialog.open({ formType: 'edit', data: row })
            },
          },
          {
            name: 'del',
            show: () => showBtn('tenant:tenant_notification_record:delete'),
            icon: 'i-heroicons:trash',
            text: () => t('crud.delete'),
            onClick: ({ row }, proxy: MaProTableExpose) => {
              msg.delConfirm(t('crud.delDataMessage')).then(async () => {
                const response = await deleteByIds([row.id])
                if (response.code === ResultCode.SUCCESS) {
                  msg.success(t('crud.delSuccess'))
                  await proxy.refresh()
                }
              })
            },
          },
        ],
      },
    },
  ]
}
