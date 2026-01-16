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
import type { DisbursementOrderVo } from "~/transaction/api/DisbursementOrder.ts";
import type { UseDialogExpose } from "@/hooks/useDialog.ts";

import { useMessage } from "@/hooks/useMessage.ts";
import { useI18n } from "vue-i18n";
import { cancel, notify } from "~/transaction/api/DisbursementOrder.ts";
import { ResultCode } from "@/utils/ResultCode.ts";
import hasAuth from "@/utils/permission/hasAuth.ts";
import MaCopy from "@/components/ma-copy/index.vue";
import tool from "@/utils/tool.ts";
import { selectStatus } from "@/modules/Common";
import { trim } from "lodash-es";
export default function getTableColumns(
  dialog: UseDialogExpose,
  distributeDialog: UseDialogExpose,
  t: any,
  isBankStatement: boolean = false
): MaProTableColumns[] {
  const dictStore = useDictStore();
  const msg = useMessage();
  const { locale } = useI18n();
  const router = useRouter();

  const showBtn = (auth: string | string[], row: DisbursementOrderVo) => {
    return hasAuth(auth);
  };

  // 定义状态活动基础信息
  // 订单状态: 0-创建中 1-已创建 10-待支付 11-待对账 20-成功 30-挂起
  // 40-失败 41-已取消 43-已失效 44-已退款
  const status_activities = {
    0: { label: "创建中", color: "#909399", icon: "i-ep:loading" },
    1: { label: "已创建", color: "#409EFF", icon: "i-ep:plus" },
    2: { label: "已分配", color: "#E6A23C", icon: "i-ep:plus" },
    10: { label: "待支付", color: "#E6A23C", icon: "i-ep:loading" },
    11: { label: "待对账", color: "#E6A23C", icon: "i-ep:document-checked" },
    20: { label: "已成功", color: "#67C23A", icon: "i-ep:success-filled" },
    30: { label: "已挂起", color: "#F56C6C", icon: "i-ep:warning-filled" },
    40: { label: "已失败", color: "#F56C6C", icon: "i-ep:close-bold" },
    41: { label: "已取消", color: "#909399", icon: "i-ep:close" },
    43: { label: "已失效", color: "#C0C4CC", icon: "i-ep:clock" },
    44: { label: "已退款", color: "#303133", icon: "i-ep:refresh-left" }
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
    { label: () => t("disbursement_order.status_records"),
      prop: "status_records",
      width: 90,
      type: "expand",
      cellRender: ({ row }) => {
        if (!row.status_records || row.status_records.length === 0) {
          return <el-tag type="info">{t("disbursement_order.no_status_records")}</el-tag>;
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
                              activity?.color === "#409EFF" ? "primary" :
                              activity?.color === "#67C23A" ? "success" :
                              activity?.color === "#F56C6C" ? "danger" :
                              activity?.color === "#E6A23C" ? "warning" : "info"}
                        size="small"
                      >
                        {t(`disbursement_order.status_labels.${record.status}`) || activity?.label || `status：${record.status}`}
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
                        {t("disbursement_order.remark_label")}: {record.remark}
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
      label: () => t("disbursement_order.channel"),
      prop: "channel",
      width: 220,
      cellRender: ({ row }) => {
        return (
          <div
            class="text-align-left"
            style={{ display: "flex", alignItems: "center" }}
          >
            <el-avatar shape="square" src={row.channel?.channel_icon || ""} />
            {row.disbursement_channel_id > 0 ? (
              <div class="ml-5" style={{ flex: 1, minWidth: 0 }}>
                <p>
                  <el-text
                    class="mx-1"
                    type={row.channel_type === 1 ? "primary" : "danger"}
                  >
                    {row.channel?.channel_code || ""}
                  </el-text>
                </p>
                <p>
                  <el-text class="mx-1" truncated>
                    {row.channel?.channel_name || ""}
                  </el-text>
                </p>
                {row.channel_account?.member_id && (
                  <p>
                    <el-text class="mx-1" truncated>
                      {row.channel_account?.member_id || ""}
                    </el-text>
                  </p>
                )}
              </div>
            ) : (
              <div class="ml-5" style={{ flex: 1, minWidth: 0 }}>
                <p>
                  <el-text class="mx-1" type="primary">
                    {t("disbursement_order.undistributed")}
                  </el-text>
                </p>
              </div>
            )}
          </div>
        );
      },
    },
    {
      label: () => t("disbursement_order.channel_type"),
      prop: "channel_type",
      minWidth: "100px",
      hide: true,
    },
    {
      label: () => t("disbursement_order.disbursement_channel_id"),
      prop: "disbursement_channel_id",
      minWidth: "120px",
      hide: true,
    },
    {
      label: () => t("disbursement_order.bank_account_id"),
      prop: "bank_account_id",
      minWidth: "120px",
      hide: true,
    },
    {
      label: () => t("disbursement_order.order_no"),
      prop: "order_no",
      type: "merge",
      minWidth: "260px",
      cellRender: ({ row }) => {
        return (
          <div
            class="text-align-left"
            style={{ display: "flex", alignItems: "center" }}
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              <p>{t("disbursement_order.platform_order_no")}:</p>
              <p class="ml-2">
                <MaCopy class="color-blue" content={row.platform_order_no} />
              </p>
              <p>{t("disbursement_order.tenant_order_no")}:</p>
              <p class="ml-2">
                <MaCopy class="color-green" content={row.tenant_order_no} />
              </p>
              <p>{t("disbursement_order.upstream_order_no")}:</p>
              <p class="ml-2">
                <MaCopy class="color-red" content={row.upstream_order_no} />
              </p>
            </div>
          </div>
        );
      },
    },
    {
      label: () => t("disbursement_order.platform_order_no"),
      prop: "platform_order_no",
      minWidth: "260px",
      hide: true,
    },
    {
      label: () => t("disbursement_order.tenant_order_no"),
      prop: "tenant_order_no",
      minWidth: "220px",
      hide: true,
    },
    {
      label: () => t("disbursement_order.upstream_order_no"),
      prop: "upstream_order_no",
      minWidth: "220px",
      hide: true,
    },
    {
      label: () => t("disbursement_order.status"),
      prop: "status",
      minWidth: 120,
      cellRenderTo: {
        name: "nmCellEnhance",
        props: {
          type: "tag",
          api: () =>
            new Promise((resolve) =>
              resolve(selectStatus("disbursement_order", "status_list"))
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
      label: () => t("disbursement_order.amount"),
      prop: "amount",
      minWidth: "100px",
    },
    {
      label: () => t("disbursement_order.fee"),
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
                {t("disbursement_order.fixed_fee")}:{" "}
                <MaCopy content={tool.formatMoney(row.fixed_fee)} />
              </p>
              <p>
                {t("disbursement_order.rate_fee")}:{" "}
                <MaCopy content={tool.formatMoney(row.rate_fee) + "%"} /> *{" "}
                <MaCopy
                  class="color-red"
                  content={tool.formatMoney(row.amount)}
                />
              </p>
              <p>
                {t("disbursement_order.total_fee")}:{" "}
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
      label: () => t("disbursement_order.fixed_fee"),
      prop: "fixed_fee",
      width: "120px",
      hide: true,
    },
    {
      label: () => t("disbursement_order.rate_fee"),
      prop: "rate_fee",
      width: "120px",
      hide: true,
    },
    {
      label: () => t("disbursement_order.total_fee"),
      prop: "total_fee",
      width: "120px",
      hide: true,
    },
    {
      label: () => t("disbursement_order.settlement_amount"),
      prop: "settlement_amount",
      minWidth: "120px",
      cellRender: ({ row }) => {
        return tool.formatMoney(row.settlement_amount);
      },
    },
    {
      label: () => t("disbursement_order.settlement_status"),
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
      label: () => t("disbursement_order.settlement_status_info"),
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
      label: () => t("disbursement_order.upstream_settlement_info"),
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
              {trim(row.upstream_fee) && (
                <p>
                  {t("disbursement_order.fee")}:
                  {tool.formatMoney(row.upstream_fee)}
                </p>
              )}
            </div>
          </div>
        );
      },
    },
    {
      label: () => t("disbursement_order.upstream_settlement_amount"),
      prop: "upstream_settlement_amount",
      width: "120px",
      hide: true,
    },
    {
      label: () => t("disbursement_order.upstream_fee"),
      prop: "upstream_fee",
      width: "120px",
      hide: true,
    },
    {
      label: () => t("disbursement_order.paid_info"),
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
      label: () => t("disbursement_order.pay_time"),
      prop: "pay_time",
      width: "180px",
      hide: true,
    },
    {
      label: () => t("disbursement_order.utr"),
      prop: "utr",
      minWidth: 120,
      hide: true,
    },
    {
      label: () => t("disbursement_order.cancel_info"),
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
                  {row.cancel_operator?.nickname}:{" "}
                  <MaCopy
                    content={row.cancel_operator?.username}
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
      label: () => t("disbursement_order.cancelled_at"),
      prop: "cancelled_at",
      width: "180px",
      hide: true,
    },
    {
      label: () => t("disbursement_order.cancelled_by"),
      prop: "cancelled_by",
      minWidth: 100,
      hide: true,
    },
    {
      label: () => t("disbursement_order.expire_time"),
      prop: "expire_time",
      width: "180px",
    },
    {
      label: () => t("disbursement_order.order_source"),
      prop: "order_source",
      width: "120px",
      cellRender: ({ row }) => {
        return (
          <div
            class="text-align-left"
            style={{ display: "flex", alignItems: "center" }}
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              <p>
                <MaCopy content={row.order_source} />
                {row.created_customer?.username && (
                  <>[{row.created_customer.username}]</>
                )}
              </p>
              <p>
                <MaCopy content={row.tenant_id} />
              </p>
            </div>
          </div>
        );
      },
    },
    {
      label: () => t("disbursement_order.tenant_id"),
      prop: "tenant_id",
      width: 100,
      hide: true,
    },
    {
      label: () => t("disbursement_order.app_id"),
      prop: "app_id",
      width: 100,
      hide: true,
    },
    {
      label: () => t("disbursement_order.payment_type"),
      prop: "payment_type",
      minWidth: "120px",
      cellRenderTo: {
        name: "nmCellEnhance",
        props: {
          type: "tag",
          api: () =>
            new Promise((resolve) =>
              resolve(selectStatus("disbursement_order", "payment_type_list"))
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
      label: () => t("disbursement_order.notify_url"),
      prop: "notify_url",
      minWidth: 150,
      hide: true,
    },
    {
      label: () => t("disbursement_order.notify_count"),
      prop: "notify_count",
      width: 100,
    },
    {
      label: () => t("disbursement_order.notify_status"),
      prop: "notify_status",
      minWidth: "120px",
      cellRenderTo: {
        name: "nmCellEnhance",
        props: {
          type: "tag",
          api: () =>
            new Promise((resolve) =>
              resolve(selectStatus("disbursement_order", "notify_status_list"))
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
      label: () => t("disbursement_order.payee_info"),
      prop: "payee_info",
      minWidth: 240,
      cellRender: ({ row }) => {
        return (
          <div
            class="text-align-left"
            style={{ display: "flex", alignItems: "center" }}
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              <p>
                {t("disbursement_order.payee_bank_name")}:{" "}
                <MaCopy content={row.payee_bank_name} />
              </p>
              <p>
                {t("disbursement_order.payee_bank_code")}:{" "}
                <MaCopy content={row.payee_bank_code} />
              </p>
              <p>
                {t("disbursement_order.payee_account_name")}:{" "}
                <MaCopy content={row.payee_account_name} />
              </p>
              <p>
                {t("disbursement_order.payee_account_no")}:{" "}
                <MaCopy content={row.payee_account_no} />
              </p>
              <p>
                {t("disbursement_order.payee_upi")}:{" "}
                <MaCopy content={row.payee_upi} />
              </p>
            </div>
          </div>
        );
      },
    },
    {
      label: () => t("disbursement_order.payee_bank_name"),
      prop: "payee_bank_name",
      minWidth: 150,
      hide: true,
    },
    {
      label: () => t("disbursement_order.payee_bank_code"),
      prop: "payee_bank_code",
      minWidth: 150,
      hide: true,
    },
    {
      label: () => t("disbursement_order.payee_account_name"),
      minWidth: 150,
      hide: true,
      prop: "payee_account_name",
    },
    {
      label: () => t("disbursement_order.payee_account_no"),
      prop: "payee_account_no",
      minWidth: 150,
      hide: true,
    },
    {
      label: () => t("disbursement_order.payee_upi"),
      prop: "payee_upi",
      minWidth: 150,
      hide: true,
    },
    {
      label: () => t("disbursement_order.description"),
      prop: "description",
      minWidth: 150,
      hide: true,
    },
    {
      label: () => t("disbursement_order.channel_transaction_no"),
      prop: "channel_transaction_no",
      minWidth: 150,
      hide: true,
    },
    {
      label: () => t("disbursement_order.error_code"),
      prop: "error_code",
      minWidth: 100,
      hide: true,
    },
    {
      label: () => t("disbursement_order.error_message"),
      prop: "error_message",
      minWidth: 150,
      hide: true,
    },
    {
      label: () => t("disbursement_order.request_id"),
      prop: "request_id",
      minWidth: 200,
      hide: true,
    },
    {
      label: () => t("disbursement_order.created_at"),
      prop: "created_at",
      minWidth: 180,
      hide: true,
    },
    {
      label: () => t("disbursement_order.bank_disbursement_download"),
      prop: "bank_disbursement_download",
      width: 300,
      cellRender: ({ row }) => {
        return (
          <div
            class="text-align-left"
            style={{ display: "flex", alignItems: "center" }}
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              {row.bank_disbursement_download && (
                <>
                  {" "}
                  <p style={{ wordBreak: "break-all", whiteSpace: "normal" }}>
                    <span
                      class="cursor-pointer text-blue-600 hover:text-blue-800"
                      onClick={() =>
                        router.push({
                          path: "/transaction/BankDisbursementDownload",
                          query: { hash: row.bank_disbursement_download.hash },
                        })
                      }
                    >
                      {row.bank_disbursement_download.hash}
                    </span>
                  </p>
                  <p style={{ wordBreak: "break-all", whiteSpace: "normal" }}>
                    <MaCopy
                      content={
                        row.bank_disbursement_download.file_name +
                        "." +
                        row.bank_disbursement_download.suffix
                      }
                    />
                  </p>
                </>
              )}
            </div>
          </div>
        );
      },
    },
    // 操作列
    {
      type: "operation",
      label: () => t("crud.operation"),
      hide: isBankStatement,
      width: "200px",
      fixed: "right",
      operationConfigure: {
        type: "auto",
        fold: 2,
        actions: [
          {
            name: "distribute",
            icon: "i-material-symbols:account-tree-outline",
            show: ({ row }) =>
              showBtn("transaction:disbursement_order:update", row),
            disabled: ({ row }) =>
              (row.status >= 10 && row.status !== 30 && row.status !== 43) ||
              row.disbursement_channel_id > 0,
            text: () => t("disbursement_order.distribute"),
            onClick: ({ row }) => {
              distributeDialog.setTitle(t("disbursement_order.distribute"));
              distributeDialog.open({ data: row });
            },
          },
          {
            name: "write_off",
            icon: "i-heroicons:qr-code",
            show: ({ row }) =>
              showBtn("transaction:disbursement_order:update", row),
            disabled: ({ row }) =>
              (row.status !== 2 && row.status !== 11 && row.status !== 30 && row.status !== 43) ||
              row.disbursement_channel_id == 0,
            text: () => t("disbursement_order.write_off"),
            onClick: ({ row }) => {
              dialog.setTitle(t("disbursement_order.write_off"));
              dialog.open({ data: row });
            },
          },
          {
            name: "cancel",
            show: ({ row }) =>
              showBtn("transaction:disbursement_order:update", row),
            disabled: ({ row }) => row.status > 10 && row.status !== 30,
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
