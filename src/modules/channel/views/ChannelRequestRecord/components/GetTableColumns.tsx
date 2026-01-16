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
import type { ChannelRequestRecordVo } from '~/channel/api/ChannelRequestRecord.ts'
import type { UseDialogExpose } from '@/hooks/useDialog.ts'

import { h } from 'vue'
import { useMessage } from '@/hooks/useMessage.ts'
import { deleteByIds } from '~/channel/api/ChannelRequestRecord.ts'
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

  // 格式化耗时显示
  const formatElapsedTime = (time: string) => {
    if (!time) return '-'
    const ms = Number(time)
    if (ms < 1000) return `${ms}ms`
    return `${(ms / 1000).toFixed(2)}s`
  }

  // 格式化HTTP状态码颜色
  const getStatusColor = (code: number) => {
    if (code >= 200 && code < 300) return '#67c23a' // 绿色
    if (code >= 300 && code < 400) return '#e6a23c' // 橙色
    if (code >= 400) return '#f56c6c' // 红色
    return '#909399' // 灰色
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
                    {t('channel_request_record.request_params')}
                  </h4>
                  <el-input
                    type="textarea"
                    readonly
                    rows={6}
                    value={formatJson(row.request_params)}
                    style={{ marginBottom: '16px' }}
                  />
                </div>

                <div class="expand-section">
                  <h4 style={{ margin: '0 0 12px 0', color: '#409eff', borderBottom: '1px solid #e4e7ed', paddingBottom: '8px' }}>
                    {t('channel_request_record.request_headers')}
                  </h4>
                  <el-input
                    type="textarea"
                    readonly
                    rows={4}
                    value={formatJson(row.request_headers)}
                    style={{ marginBottom: '16px' }}
                  />
                </div>

                <div class="expand-section">
                  <h4 style={{ margin: '0 0 12px 0', color: '#409eff', borderBottom: '1px solid #e4e7ed', paddingBottom: '8px' }}>
                    {t('channel_request_record.request_body')}
                  </h4>
                  <el-input
                    type="textarea"
                    readonly
                    rows={6}
                    value={formatJson(row.request_body)}
                    style={{ marginBottom: '16px' }}
                  />
                </div>
              </el-col>

              <el-col span={12}>
                <div class="expand-section">
                  <h4 style={{ margin: '0 0 12px 0', color: '#67c23a', borderBottom: '1px solid #e4e7ed', paddingBottom: '8px' }}>
                    {t('channel_request_record.response_headers')}
                  </h4>
                  <el-input
                    type="textarea"
                    readonly
                    rows={4}
                    value={formatJson(row.response_headers)}
                    style={{ marginBottom: '16px' }}
                  />
                </div>

                <div class="expand-section">
                  <h4 style={{ margin: '0 0 12px 0', color: '#67c23a', borderBottom: '1px solid #e4e7ed', paddingBottom: '8px' }}>
                    {t('channel_request_record.response_body')}
                  </h4>
                  <el-input
                    type="textarea"
                    readonly
                    rows={8}
                    value={formatJson(row.response_body)}
                    style={{ marginBottom: '16px' }}
                  />
                </div>
              </el-col>
            </el-row>

            {row.error_message && (
              <div class="expand-section">
                <h4 style={{ margin: '0 0 12px 0', color: '#f56c6c', borderBottom: '1px solid #e4e7ed', paddingBottom: '8px' }}>
                  {t('channel_request_record.error_message')}
                </h4>
                <el-alert
                  type="error"
                  show-icon={true}
                  closable={false}
                  style={{ marginBottom: '16px' }}
                >
                  <span style={{ whiteSpace: 'pre-wrap' }}>{row.error_message}</span>
                </el-alert>
              </div>
            )}
          </div>
        )
      }
    },

    // 索引序号列
    { type: 'index', width: '65px' },

    // 基础信息列
    {
      label: () => t('channel_request_record.request_id'),
      prop: 'request_id',
      width: '180px',
      showOverflowTooltip: true
    },
    {
      label: () => t('channel_request_record.channel_id'),
      prop: 'channel_id',
      width: 220,
      cellRender: ({ row }) => {
        return (
          <div class="text-align-left" style={{ display: 'flex', alignItems: 'center' }}>
            <el-avatar shape="square" src={row.channel.channel_icon} />
            <div class="ml-5" style={{ flex: 1, minWidth: 0 }}>
              <p>
                <el-text class="mx-1" type="primary">{row.channel.channel_code}</el-text>
              </p>
              <p>
                <el-text class="mx-1" truncated>{row.channel.channel_name}</el-text>
              </p>
            </div>
          </div>
        )
      },
    },
    {
      label: () => t('channel_request_record.api_method'),
      prop: 'api_method',
      width: '150px',
      cellRender: ({ row }) => {
        return h('el-tag', { type: 'primary', size: 'small' }, row.api_method)
      }
    },
    {
      label: () => t('channel_request_record.request_url'),
      prop: 'request_url',
      width: '200px',
      showOverflowTooltip: true,
      cellRender: ({ row }) => {
        if (!row.request_url) return '-'
        try {
          const url = new URL(row.request_url)
          return h('div', [
            h('div', { style: { fontWeight: '600' } }, url.hostname),
            h('div', { style: { fontSize: '12px', color: '#909399' } }, url.pathname)
          ])
        } catch {
          return h('span', { style: { color: '#f56c6c' } }, row.request_url)
        }
      }
    },
    {
      label: () => t('channel_request_record.http_method'),
      prop: 'http_method',
      width: '100px',
      cellRender: ({ row }) => {
        const colors = {
          'GET': 'success',
          'POST': 'primary',
          'PUT': 'warning',
          'DELETE': 'danger'
        }
        return h('el-tag', {
          type: colors[row.http_method] || 'info',
          size: 'small'
        }, row.http_method)
      }
    },
    {
      label: () => t('channel_request_record.request_time'),
      prop: 'request_time',
      width: '160px',
      showOverflowTooltip: true
    },
    {
      label: () => t('channel_request_record.http_status_code'),
      prop: 'http_status_code',
      width: '120px',
      cellRender: ({ row }) => {
        const color = getStatusColor(row.http_status_code)
        return h('el-tag', {
          style: { backgroundColor: color, borderColor: color, color: '#fff' },
          size: 'small'
        }, row.http_status_code)
      }
    },
    {
      label: () => t('channel_request_record.response_status'),
      prop: 'response_status',
      width: '120px',
      cellRender: ({ row }) => {
        if (!row.response_status) return '-'
        const isSuccess = row.response_status.toLowerCase().includes('success') ||
                         row.response_status === '0' ||
                         row.response_status === 'ok'
        return h('el-tag', {
          type: isSuccess ? 'success' : 'danger',
          size: 'small'
        }, row.response_status)
      }
    },
    {
      label: () => t('channel_request_record.response_time'),
      prop: 'response_time',
      width: '180px',
      showOverflowTooltip: true
    },
    {
      label: () => t('channel_request_record.elapsed_time'),
      prop: 'elapsed_time',
      width: '100px',
      cellRender: ({ row }) => {
        const time = formatElapsedTime(row.elapsed_time)
        const color = Number(row.elapsed_time) > 5000 ? '#f56c6c' : '#67c23a'
        return h('span', { style: { color, fontWeight: '600' } }, time)
      }
    },
    {
      label: () => t('channel_request_record.created_at'),
      prop: 'created_at',
      width: '180px',
      showOverflowTooltip: true
    },
    {
      label: () => t('channel_request_record.updated_at'),
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
            show: () => showBtn('channel:channel_request_record:update'),
            text: () => t('crud.edit'),
            onClick: ({ row }) => {
              dialog.setTitle(t('crud.edit'))
              dialog.open({ formType: 'edit', data: row })
            },
          },
          {
            name: 'del',
            show: () => showBtn('channel:channel_request_record:delete'),
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
