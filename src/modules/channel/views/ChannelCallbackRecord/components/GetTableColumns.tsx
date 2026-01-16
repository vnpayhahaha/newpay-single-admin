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
import type { ChannelCallbackRecordVo } from '~/channel/api/ChannelCallbackRecord.ts'
import type { UseDialogExpose } from '@/hooks/useDialog.ts'

import { h } from 'vue'
import { useMessage } from '@/hooks/useMessage.ts'
import { deleteByIds } from '~/channel/api/ChannelCallbackRecord.ts'
import { ResultCode } from '@/utils/ResultCode.ts'
import hasAuth from '@/utils/permission/hasAuth.ts'
import { selectStatus } from "@/modules/Common"

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
                   {t('channel_callback_record.callback_params')}
                  </h4>
                  <el-input
                    type="textarea"
                    readonly
                    rows={6}
                    value={formatJson(row.callback_params)}
                    style={{ marginBottom: '16px' }}
                  />
                </div>

                <div class="expand-section">
                  <h4 style={{ margin: '0 0 12px 0', color: '#409eff', borderBottom: '1px solid #e4e7ed', paddingBottom: '8px' }}>
                        {t('channel_callback_record.callback_headers')}
                  </h4>
                  <el-input
                    type="textarea"
                    readonly
                    rows={4}
                    value={formatJson(row.callback_headers)}
                    style={{ marginBottom: '16px' }}
                  />
                </div>
              </el-col>

              <el-col span={12}>
                <div class="expand-section">
                  <h4 style={{ margin: '0 0 12px 0', color: '#67c23a', borderBottom: '1px solid #e4e7ed', paddingBottom: '8px' }}>
                       {t('channel_callback_record.callback_body')}
                  </h4>
                  <el-input
                    type="textarea"
                    readonly
                    rows={6}
                    value={formatJson(row.callback_body)}
                    style={{ marginBottom: '16px' }}
                  />
                </div>

                <div class="expand-section">
                  <h4 style={{ margin: '0 0 12px 0', color: '#67c23a', borderBottom: '1px solid #e4e7ed', paddingBottom: '8px' }}>
                       {t('channel_callback_record.response_content')}
                  </h4>
                  <el-input
                    type="textarea"
                    readonly
                    rows={4}
                    value={row.response_content || '-'}
                    style={{ marginBottom: '16px' }}
                  />
                </div>
              </el-col>
            </el-row>

            {row.process_result && (
              <div class="expand-section">
                <h4 style={{ margin: '0 0 12px 0', color: '#e6a23c', borderBottom: '1px solid #e4e7ed', paddingBottom: '8px' }}>
                   {t('channel_callback_record.process_result')}
                </h4>
                <el-alert
                  type="info"
                  show-icon={false}
                  closable={false}
                  style={{ marginBottom: '16px' }}
                >
                  <span style={{ whiteSpace: 'pre-wrap' }}>{row.process_result}</span>
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
      label: () => t('channel_callback_record.callback_id'),
      prop: 'callback_id',
      width: '180px',
      showOverflowTooltip: true
    },
    {
      label: () => t('channel_callback_record.channel_id'),
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
      label: () => t('channel_callback_record.original_request_id'),
      prop: 'original_request_id',
      width: '180px',
      showOverflowTooltip: true
    },
    {
      label: () => t('channel_callback_record.callback_type'),
      prop: 'callback_type',
      width: '120px',
      cellRender: ({ row }) => {
        return h('el-tag', { type: 'info', size: 'small' }, row.callback_type)
      }
    },
    {
      label: () => t('channel_callback_record.callback_url'),
      prop: 'callback_url',
      width: '200px',
      showOverflowTooltip: true,
      cellRender: ({ row }) => {
        if (!row.callback_url) return '-'
        try {
          const url = new URL(row.callback_url)
          return h('div', [
            h('div', { style: { fontWeight: '600' } }, url.hostname),
            h('div', { style: { fontSize: '12px', color: '#909399' } }, url.pathname)
          ])
        } catch {
          // 如果URL无效，直接显示原始字符串
          return h('span', { style: { color: '#f56c6c' } }, row.callback_url)
        }
      }
    },
    {
      label: () => t('channel_callback_record.callback_http_method'),
      prop: 'callback_http_method',
      width: '100px',
      cellRender: ({ row }) => {
        const colors = {
          'GET': 'success',
          'POST': 'primary',
          'PUT': 'warning',
          'DELETE': 'danger'
        }
        return h('el-tag', {
          type: colors[row.callback_http_method] || 'info',
          size: 'small'
        }, row.callback_http_method)
      }
    },
    {
      label: () => t('channel_callback_record.callback_time'),
      prop: 'callback_time',
      width: '180px',
      showOverflowTooltip: true
    },
    {
      label: () => t('channel_callback_record.client_ip'),
      prop: 'client_ip',
      width: '180px',
      cellRender: ({ row }) => {
        return h('el-tag', { type: 'info', size: 'small', effect: 'plain' }, row.client_ip)
      }
    },
    {
      label: () => t('channel_callback_record.status'),
      prop: 'status',
      width: '120px',
      cellRenderTo: {
        name: "nmCellEnhance",
        props: {
          type: "tag",
          api: () =>
            new Promise((resolve) =>
              resolve(selectStatus("channel_callback_record", "status_list"))
            ),
          dataHandle: (response: any) => {
            return response.data?.map((item: Common.StatusOptionItem) => {
              return { label: `${item.label}`, value: item.value };
            });
          },
          props: {
            effect: "dark",
          },
        },
      },
    },
    {
      label: () => t('channel_callback_record.elapsed_time'),
      prop: 'elapsed_time',
      width: '100px',
      cellRender: ({ row }) => {
        const time = formatElapsedTime(row.elapsed_time)
        const color = Number(row.elapsed_time) > 5000 ? '#f56c6c' : '#67c23a'
        return h('span', { style: { color, fontWeight: '600' } }, time)
      }
    },
    {
      label: () => t('channel_callback_record.created_at'),
      prop: 'created_at',
      width: '180px',
      showOverflowTooltip: true
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
            show: () => showBtn('channel:channel_callback_record:update'),
            text: () => t('crud.edit'),
            onClick: ({ row }) => {
              dialog.setTitle(t('crud.edit'))
              dialog.open({ formType: 'edit', data: row })
            },
          },
          {
            name: 'del',
            show: () => showBtn('channel:channel_callback_record:delete'),
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
