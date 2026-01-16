/**
 * MineAdmin is committed to providing solutions for quickly building web applications
 * Please view the LICENSE file that was distributed with this source code,
 * For the full copyright and license information.
 * Thank you very much for using MineAdmin.
 *
 * @Author X.Mo<root@imoi.cn>
 * @Link   https://github.com/mineadmin
 */
import type { MaProTableColumns, MaProTableExpose } from "@mineadmin/pro-table";
import type { CollectionOrderVo } from "~/transaction/api/CollectionOrder.ts";
import type { UseDialogExpose } from "@/hooks/useDialog.ts";

import { useMessage } from "@/hooks/useMessage.ts";
import { useI18n } from "vue-i18n";
import { cancel, notify } from "~/transaction/api/CollectionOrder.ts";
import { ResultCode } from "@/utils/ResultCode.ts";
import hasAuth from "@/utils/permission/hasAuth.ts";
import MaCopy from "@/components/ma-copy/index.vue";
import tool from "@/utils/tool.ts";
import { selectStatus } from "@/modules/Common";
import { color } from "echarts";
import { ro } from "element-plus/es/locale/index.mjs";
import { trim } from "lodash-es";

export default function getTableColumns(
  dialog: UseDialogExpose,
  formRef: any,
  t: any
): MaProTableColumns[] {
  const dictStore = useDictStore();
  const msg = useMessage();
  const { locale } = useI18n();

  const showBtn = (auth: string | string[], row: CollectionOrderVo) => {
    return hasAuth(auth);
  };

  // 定义状态活动基础信息
  const status_activities = {
    0: { label: "已创建", color: "#909399", icon: "el-icon-apple" },
    10: { label: "待支付", color: "#E6A23C", icon: "i-el-icon-apple" },
    20: { label: "成功", color: "#67C23A", icon: "i-ep:success-filled" },
    30: { label: "挂起", color: "#F56C6C", icon: "i-ep:warning-filled" },
    40: { label: "失败", color: "#F56C6C", icon: "i-ep:close-bold" },
    41: { label: "已取消", color: "#909399", icon: "i-ep:close" },
    43: { label: "已失效", color: "#C0C4CC", icon: "i-ep:clock" },
    44: { label: "已退款", color: "#409EFF", icon: "i-ep:refresh-left" }
  } as const;

  return [
    // 多选列
    {
      type: "selection",
      showOverflowTooltip: false,
      label: () => t("crud.selection"),
    },
    // 索引序号列
    { type: "index" },
    { label: () => t("collection_order.status_records"),
      prop: "status_records",
      width: 90,
      type: "expand",
      cellRender: ({ row }) => {
        if (!row.status_records || row.status_records.length === 0) {
          return <el-tag type="info">{t("collection_order.no_status_records")}</el-tag>;
        }

        return (
          <el-timeline style={{ paddingLeft: "8px" }}>
            {row.status_records.map((record: any, index: number) => {
              const activity = status_activities[record.status as keyof typeof status_activities];
              
              return (
                <el-timeline-item
                  key={record.id}
                  color={index === 0 ? activity?.color : "#C0C4CC"}
                  size={index === 0 ? "large" : "normal"}
                  timestamp={record.created_at || row.created_at}
                  placement="bottom"
                >
                  <div style={{ paddingLeft: "8px" }}>
                    <div style={{ fontWeight: "500", marginBottom: "4px" }}>
                      <el-tag
                        type={
                              index > 0 ? "info" :
                              activity?.color === "#67C23A" ? "success" :
                              activity?.color === "#F56C6C" ? "danger" :
                              activity?.color === "#E6A23C" ? "warning" : "info"}
                        size="small"
                      >
                        {t(`collection_order.status_labels.${record.status}`) || activity?.label || `status：${record.status}`}
                      </el-tag>
                    </div>
                    <div style={{ color: "#606266", fontSize: "13px" }}>
                      {(() => {
                        // 根据当前语言环境选择合适的描述
                        const isEnglish = locale.value === 'en';

                        if (isEnglish && record.desc_en) {
                          return record.desc_en;
                        } else if (record.desc_cn) {
                          return record.desc_cn;
                        } else {
                          return record.remark;
                        }
                      })()}
                    </div>
                    {record.remark && record.desc_cn && record.remark !== record.desc_cn && (
                      <div style={{ color: "#909399", fontSize: "12px", marginTop: "2px" }}>
                        {t("collection_order.remark_label")}: {record.remark}
                      </div>
                    )}
                  </div>
                </el-timeline-item>
              );
            })}
          </el-timeline>
        );
      },
    },
    // 普通列
    {
      label: () => t("collection_order.channel"),
      prop: "channel",
      width: 220,
      cellRender: ({ row }) => {
        return (
          <div
            class="text-align-left"
            style={{ display: "flex", alignItems: "center" }}
          >
            <el-avatar shape="square" src={row.channel.channel_icon} />
            <div class="ml-5" style={{ flex: 1, minWidth: 0 }}>
              <p>
                <el-text class="mx-1" type="primary">
                  {row.channel.channel_code}
                </el-text>
              </p>
              <p>
                <el-text class="mx-1" truncated>
                  {row.channel.channel_name}
                </el-text>
              </p>
              {row.bank_account?.branch_name && (
                <p>
                  <el-text class="mx-1" truncated>
                    {row.bank_account?.branch_name}
                  </el-text>
                </p>
              )}
              {row.channel_account?.merchant_id && (
                <p>
                  <el-text class="mx-1" truncated>
                    {row.channel_account?.merchant_id}
                  </el-text>
                </p>
              )}
            </div>
          </div>
        );
      },
    },
    {
      label: () => t("collection_order.branch_name"),
      prop: "branch_name",
      width: "120px",
      hide: true,
      cellRender: ({ row }) => {
        return (
          <div
            class="text-align-left"
            style={{ display: "flex", alignItems: "center" }}
          >
            {row.bank_account?.branch_name && (
              <p>
                <el-text class="mx-1" truncated>
                  {row.bank_account?.branch_name}
                </el-text>
              </p>
            )}
          </div>
        );
      },
    },
    {
      label: () => t("collection_order.collection_type"),
      prop: "collection_type",
      minWidth: "120px",
      cellRenderTo: {
        name: "nmCellEnhance",
        props: {
          type: "tag",
          api: () =>
            new Promise((resolve) =>
              resolve(selectStatus("collection_order", "collection_type_list"))
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
      label: () => t("collection_order.order_no"),
      prop: "platform_order_no",
      type: "merge",
      minWidth: "260px",
      cellRender: ({ row }) => {
        return (
          <div
            class="text-align-left"
            style={{ display: "flex", alignItems: "center" }}
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              <p>{t("collection_order.platform_order_no")}:</p>
              <p class="ml-2">
                <MaCopy class="color-blue" content={row.platform_order_no} />
              </p>
              <p>{t("collection_order.tenant_order_no")}:</p>
              <p class="ml-2">
                <MaCopy class="color-green" content={row.tenant_order_no} />
              </p>
              <p>{t("collection_order.upstream_order_no")}:</p>
              <p class="ml-2">
                <MaCopy class="color-red" content={row.upstream_order_no} />
              </p>
            </div>
          </div>
        );
      },
    },
    {
      label: () => t("collection_order.platform_order_no"),
      prop: "platform_order_no",
      minWidth: "260px",
      hide: true,
    },
    {
      label: () => t("collection_order.tenant_order_no"),
      prop: "tenant_order_no",
      minWidth: "220px",
      hide: true,
    },
    {
      label: () => t("collection_order.upstream_order_no"),
      prop: "upstream_order_no",
      minWidth: "220px",
      hide: true,
    },
    {
      label: () => t("collection_order.status"),
      prop: "status",
      minWidth: 100,
      cellRenderTo: {
        name: "nmCellEnhance",
        props: {
          type: "tag",
          api: () =>
            new Promise((resolve) =>
              resolve(selectStatus("collection_order", "status_list"))
            ),
          dataHandle: (response: any) => {
            return response.data?.map((item: Common.StatusOptionItem) => {
              if (item.value === 20) {
                return {
                  label: `${item.label}`,
                  value: item.value,
                  color: "success",
                };
              }
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
      label: () => t("collection_order.amount_info"),
      prop: "amount",
      type: "merge",
      minWidth: "180px",
      cellRender: ({ row }) => {
        return (
          <div
            class="text-align-left"
            style={{ display: "flex", alignItems: "center" }}
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              <p>
                {t("collection_order.amount")}:{" "}
                <MaCopy
                  class="color-blue"
                  content={tool.formatMoney(row.amount)}
                />
              </p>
              <p>
                {t("collection_order.payable_amount")}:{" "}
                <MaCopy
                  class="color-green"
                  content={tool.formatMoney(row.payable_amount)}
                />
              </p>
              <p>
                {t("collection_order.paid_amount")}:{" "}
                <MaCopy
                  class="color-red"
                  content={tool.formatMoney(row.paid_amount)}
                />
              </p>
            </div>
          </div>
        );
      },
    },
    {
      label: () => t("collection_order.amount"),
      prop: "amount",
      minWidth: "120px",
      hide: true,
    },
    {
      label: () => t("collection_order.payable_amount"),
      prop: "payable_amount",
      minWidth: "120px",
      hide: true,
    },
    {
      label: () => t("collection_order.paid_amount"),
      prop: "paid_amount",
      minWidth: "120px",
      hide: true,
    },
    {
      label: () => t("collection_order.fee"),
      prop: "fee",
      minWidth: "220px",
      cellRender: ({ row }) => {
        return (
          <div
            class="text-align-left"
            style={{ display: "flex", alignItems: "center" }}
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              <p>
                {t("collection_order.fixed_fee")}:{" "}
                <MaCopy content={tool.formatMoney(row.fixed_fee)} />
              </p>
              <p>
                {t("collection_order.rate_fee")}:{" "}
                <MaCopy content={tool.formatMoney(row.rate_fee) + "%"} /> *{" "}
                <MaCopy
                  class="color-red"
                  content={tool.formatMoney(row.amount)}
                />
              </p>
              <p>
                {t("collection_order.total_fee")}:{" "}
                <MaCopy
                  class="color-blue"
                  content={tool.formatMoney(row.total_fee)}
                />
              </p>
            </div>
          </div>
        );
      },
    },
    {
      label: () => t("collection_order.fixed_fee"),
      prop: "fixed_fee",
      width: "120px",
      hide: true,
    },
    {
      label: () => t("collection_order.rate_fee"),
      prop: "rate_fee",
      width: "120px",
      hide: true,
    },
    {
      label: () => t("collection_order.total_fee"),
      prop: "total_fee",
      width: "120px",
      hide: true,
    },
    {
      label: () => t("collection_order.settlement_type"),
      prop: "settlement_type",
      minWidth: "120px",
      cellRenderTo: {
        name: "nmCellEnhance",
        props: {
          type: "tag",
          api: () =>
            new Promise((resolve) =>
              resolve(selectStatus("collection_order", "settlement_type_list"))
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
      label: () => t("collection_order.settlement_amount"),
      prop: "settlement_amount",
      minWidth: "120px",
      cellRender: ({ row }) => {
        return tool.formatMoney(row.settlement_amount);
      },
    },
    {
      label: () => t("collection_order.settlement_status"),
      prop: "settlement_status",
      minWidth: "120px",
      cellRenderTo: {
        name: "nmCellEnhance",
        props: {
          type: "tag",
          propItem: "transaction_status",
          api: () =>
            new Promise((resolve) =>
              resolve(selectStatus("transaction_record", "status_list"))
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
      label: () => t("collection_order.settlement_status_info"),
      prop: "settlement_status_info",
      type: "merge",
      minWidth: "280px",
      cellRender: ({ row }) => {
        // 判断 settlement_status 是否存在
        if (!row.settlement_status) {
          return <el-tag type="info">{t("transaction_record.no_settlement_info")}</el-tag>;
        }
        return (
          <>
            <div
              class="text-align-left"
              style={{ display: "flex", alignItems: "center" }}
            >
              <div style={{ flex: 1, minWidth: 0 }}>
                <p>
                  {t("transaction_record.transaction_no")}:{" "}
                  <MaCopy
                    class="color-blue"
                    content={row.settlement_status?.transaction_no || ''}
                  />
                </p>
                <p>
                  {row.settlement_status?.settlement_delay_mode > 2 ? "T" : "D"}:{" "}
                  <MaCopy
                    class="color-green"
                    content={row.settlement_status?.settlement_delay_days}
                  />
                </p>
                <p>
                  {t("transaction_record.expected_settlement_time")}:{" "}
                  <MaCopy
                    class="color-red"
                    content={row.settlement_status?.expected_settlement_time}
                  />
                </p>
                <p>
                  {t("transaction_record.failed_msg")}:{" "}
                  <MaCopy
                    class="color-red"
                    content={row.settlement_status?.failed_msg}
                  />
                </p>
              </div>
            </div>
          </>
        );
      },
    },
    {
      label: () => t("collection_order.upstream_settlement_info"),
      prop: "upstream_settlement_info",
      minWidth: "120px",
      cellRender: ({ row }) => {
        return (
          <div
            class="text-align-left"
            style={{ display: "flex", alignItems: "center" }}
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              <p>
                <MaCopy
                  content={tool.formatMoney(row.upstream_settlement_amount)}
                />
              </p>
              {row.upstream_fee && (
                <p>
                  ({t("collection_order.fee")}:
                  {tool.formatMoney(row.upstream_fee)})
                </p>
              )}
            </div>
          </div>
        );
      },
    },
    {
      label: () => t("collection_order.upstream_settlement_amount"),
      prop: "upstream_settlement_amount",
      width: "120px",
      hide: true,
    },
    {
      label: () => t("collection_order.upstream_fee"),
      prop: "upstream_fee",
      width: "120px",
      hide: true,
    },
    {
      label: () => t("collection_order.paid_info"),
      prop: "paid_info",
      minWidth: "180px",
      cellRender: ({ row }) => {
        return (
          <div
            class="text-align-left"
            style={{ display: "flex", alignItems: "center" }}
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              <p>{row.pay_time}</p>
              {trim(row.utr) != "" && (
                <p>
                  UTR: <MaCopy content={row.utr} class="color-blue" />
                </p>
              )}
            </div>
          </div>
        );
      },
    },
    {
      label: () => t("collection_order.pay_time"),
      prop: "pay_time",
      width: "180px",
      hide: true,
    },
    {
      label: () => t("collection_order.utr"),
      prop: "utr",
      minWidth: 120,
      hide: true,
    },
    {
      label: () => t("collection_order.cancel_info"),
      prop: "cancel_info",
      minWidth: "180px",
      cellRender: ({ row }) => {
        return (
          <div
            class="text-align-left"
            style={{ display: "flex", alignItems: "center" }}
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              <p>{row.cancelled_at}</p>
              {row.cancel_operator?.id && (
                <p>
                  platform end:{" "}
                  <MaCopy
                    content={
                      row.cancel_operator?.nickname ||
                      row.cancel_operator?.username
                    }
                    class="color-blue"
                  />
                </p>
              )}
              {row.cancel_customer?.id && (
                <p>
                  client end:{" "}
                  <MaCopy
                    content={row.cancel_customer?.username}
                    class="color-blue"
                  />
                </p>
              )}
            </div>
          </div>
        );
      },
    },
    {
      label: () => t("collection_order.cancelled_at"),
      prop: "cancelled_at",
      width: "180px",
      hide: true,
    },
    {
      label: () => t("collection_order.cancelled_by"),
      prop: "cancelled_by",
      minWidth: 100,
      hide: true,
    },
    {
      label: () => t("collection_order.customer_submitted_utr"),
      prop: "customer_submitted_utr",
      minWidth: 120,
    },
    {
      label: () => t("collection_order.expire_time"),
      prop: "expire_time",
      width: "190px",
    },
    {
      label: () => t("collection_order.order_source"),
      prop: "order_source",
      minWidth: 200,
      cellRender: ({ row }) => {
        return (
          <div
            class="text-align-left"
            style={{ display: "flex", alignItems: "center" }}
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              <p>
                <MaCopy content={row.tenant_id} />
              </p>
              <p>
                <MaCopy content={row.created_at} class="color-blue" />
              </p>
              <p>
                <MaCopy content={row.order_source} />
              </p>
              <p>
                {row.created_customer?.username && (
                  <>[{row.created_customer.username}]</>
                )}
              </p>
            </div>
          </div>
        );
      },
    },
    {
      label: () => t("collection_order.tenant_id"),
      prop: "tenant_id",
      width: 100,
      hide: true,
    },
    {
      label: () => t("collection_order.app_id"),
      prop: "app_id",
      width: 100,
      hide: true,
    },
    {
      label: () => t("collection_order.recon_type"),
      prop: "recon_type",
      minWidth: "120px",
      cellRenderTo: {
        name: "nmCellEnhance",
        props: {
          type: "tag",
          api: () =>
            new Promise((resolve) =>
              resolve(selectStatus("collection_order", "recon_type_list"))
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
      label: () => t("collection_order.notify_url"),
      prop: "notify_url",
      minWidth: 150,
      hide: true,
    },
    {
      label: () => t("collection_order.notify_count"),
      prop: "notify_count",
      width: 100,
    },
    {
      label: () => t("collection_order.notify_status"),
      prop: "notify_status",
      minWidth: "120px",
      cellRenderTo: {
        name: "nmCellEnhance",
        props: {
          type: "tag",
          api: () =>
            new Promise((resolve) =>
              resolve(selectStatus("collection_order", "notify_status_list"))
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
      label: () => t("collection_order.pay_url"),
      prop: "pay_url",
      minWidth: 150,
      hide: true,
    },
    {
      label: () => t("collection_order.return_url"),
      prop: "return_url",
      minWidth: 150,
      hide: true,
    },
    {
      label: () => t("collection_order.payer_info"),
      prop: "payer_info",
      minWidth: 240,
      cellRender: ({ row }) => {
        return (
          <div
            class="text-align-left"
            style={{ display: "flex", alignItems: "center" }}
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              <p>
                {t("collection_order.payer_name")}:{" "}
                <MaCopy content={row.payer_name} />
              </p>
              <p>
                {t("collection_order.payer_account")}:{" "}
                <MaCopy content={row.payer_account} />
              </p>
              <p>
                {t("collection_order.payer_bank")}:{" "}
                <MaCopy content={row.payer_bank} />
              </p>
              <p>
                {t("collection_order.payer_ifsc")}:{" "}
                <MaCopy content={row.payer_ifsc} />
              </p>
              <p>
                {t("collection_order.payer_upi")}:{" "}
                <MaCopy content={row.payer_upi} />
              </p>
            </div>
          </div>
        );
      },
    },
    {
      label: () => t("collection_order.payer_name"),
      prop: "payer_name",
      minWidth: 150,
      hide: true,
    },
    {
      label: () => t("collection_order.payer_account"),
      prop: "payer_account",
      minWidth: 150,
      hide: true,
    },
    {
      label: () => t("collection_order.payer_bank"),
      prop: "payer_bank",
      minWidth: 150,
      hide: true,
    },
    {
      label: () => t("collection_order.payer_ifsc"),
      prop: "payer_ifsc",
      minWidth: 100,
      hide: true,
    },
    {
      label: () => t("collection_order.payer_upi"),
      prop: "payer_upi",
      minWidth: 150,
      hide: true,
    },
    {
      label: () => t("collection_order.description"),
      prop: "description",
      minWidth: 150,
      hide: true,
    },
    {
      label: () => t("collection_order.channel_transaction_no"),
      prop: "channel_transaction_no",
      minWidth: 150,
      hide: true,
    },
    {
      label: () => t("collection_order.error_code"),
      prop: "error_code",
      minWidth: 100,
      hide: true,
    },
    {
      label: () => t("collection_order.error_message"),
      prop: "error_message",
      minWidth: 150,
      hide: true,
    },
    {
      label: () => t("collection_order.request_id"),
      prop: "request_id",
      minWidth: 200,
      hide: true,
    },
    {
      label: () => t("collection_order.created_at"),
      prop: "created_at",
      minWidth: 180,
      hide: true,
    },
    {
      label: () => t("collection_order.updated_at"),
      prop: "updated_at",
      minWidth: 180,
      hide: true,
    },
    {
      label: () => t("collection_order.payment_proof_photo"),
      prop: "payment_proof_photo",
      width: 120,
      cellRender: ({ row }) => {
        return (
          <div
            class="text-align-left"
            style={{ display: "flex", alignItems: "center" }}
          >
            <el-avatar shape="square" size={80} src={row.payment_proof_photo} />
          </div>
        );
      },
    },
    {
      label: () => t("collection_order.platform_transaction_no"),
      prop: "platform_transaction_no",
      minWidth: 220,
    },
    // 操作列
    {
      type: "operation",
      label: () => t("crud.operation"),
      width: "240px",
      fixed: "right",
      operationConfigure: {
        type: "auto",
        fold: 3,
        actions: [
          {
            name: "cashier",
            icon: "i-heroicons:qr-code",
            show: ({ row }) =>
              showBtn("transaction:collection_order:update", row),
            disabled: ({ row }) =>
              row.status > 10 || trim(row.pay_url) == "" || row.pay_url == null,
            text: () => t("collection_order.cashier"),
            onClick: ({ row }) => {
              // 判断row.pay_url是否有值，新网页打开
              window.open(row.pay_url);
            },
          },
          {
            name: "write_off",
            icon: "i-heroicons:qr-code",
            show: ({ row }) =>
              showBtn("transaction:collection_order:update", row),
            disabled: ({ row }) => row.status > 10 && row.status !== 43,
            text: () => t("collection_order.write_off"),
            onClick: ({ row }) => {
              dialog.setTitle(t("collection_order.write_off"));
              dialog.open({ data: row });
            },
          },
          {
            name: "cancel",
            show: ({ row }) =>
              showBtn("transaction:collection_order:update", row),
            disabled: ({ row }) => row.status > 10,
            icon: "i-material-symbols:cancel-outline-rounded",
            text: () => t("crud.cancel"),
            onClick: ({ row }, proxy: MaProTableExpose) => {
              msg.delConfirm(t("crud.cancelDataMessage")).then(async () => {
                const response = await cancel([row.id]);
                if (response.code === ResultCode.SUCCESS) {
                  msg.success(t("crud.cancelSuccess"));
                  await proxy.refresh();
                }
              });
            },
          },
          {
            name: "notify",
            disabled: ({ row }) => row.status < 20,
            icon: "i-fa6-solid:bullhorn",
            text: () => t("crud.callbackNotification"),
            onClick: ({ row }, proxy: MaProTableExpose) => {
              msg
                .delConfirm(t("crud.callbackNotificationDataMessage"))
                .then(async () => {
                  const response = await notify(row.id);
                  if (response.code === ResultCode.SUCCESS) {
                    msg.success(t("crud.callbackNotificationSuccess"));
                    await proxy.refresh();
                  }
                });
            },
          },
        ],
      },
    },
  ];
}
