/**
 * 设备指令队列表格列
 */
import type { MaProTableColumns, MaProTableExpose } from "@mineadmin/pro-table";
import type { DeviceCommandVo } from "~/device/api/DeviceCommand.ts";
import type { UseDialogExpose } from "@/hooks/useDialog.ts";

import { useMessage } from "@/hooks/useMessage.ts";
import { retry, cancel, getCommandTypeOptions, getBusinessTypeOptions, getStatusOptions } from "~/device/api/DeviceCommand.ts";
import { ResultCode } from "@/utils/ResultCode.ts";
import hasAuth from "@/utils/permission/hasAuth.ts";

// 状态颜色映射
const statusColorMap: Record<number, string> = {
  1: "info",     // 待处理
  2: "warning",  // 已发送
  3: "primary",  // 执行中
  4: "success",  // 成功
  5: "danger",   // 失败
  6: "warning",  // 超时
  7: "info",     // 已取消
};

export default function getTableColumns(
  dialog: UseDialogExpose,
  t: any
): MaProTableColumns[] {
  const msg = useMessage();

  const showBtn = (auth: string | string[], row: DeviceCommandVo) => {
    return hasAuth(auth);
  };

  // 是否可以重试
  const canRetry = (row: DeviceCommandVo) => {
    return [5, 6].includes(row.status) && row.retry_count < row.max_retry;
  };

  // 是否可以取消
  const canCancel = (row: DeviceCommandVo) => {
    return [1, 2].includes(row.status);
  };

  return [
    // 索引序号列
    { type: "index", width: 60 },
    // 指令编号
    {
      label: () => t("device_command.command_no"),
      prop: "command_no",
      width: 220,
      cellRender: ({ row }) => (
        <el-text class="mx-1" type="primary" truncated>
          {row.command_no}
        </el-text>
      ),
    },
    // 设备ID
    {
      label: () => t("device_command.device_id"),
      prop: "device_id",
      width: 100,
      cellRender: ({ row }) => (
        <span>{row.device_id || "-"}</span>
      ),
    },
    // 指令类型
    {
      label: () => t("device_command.command_type"),
      prop: "command_type",
      width: 120,
      cellRenderTo: {
        name: "nmCellEnhance",
        props: {
          type: "tag",
          api: getCommandTypeOptions,
          dataHandle: (response: any) => {
            return response.data?.map((item: any) => ({
              label: item.label,
              value: item.value,
            }));
          },
          props: { effect: "dark" },
        },
      },
    },
    // 业务类型
    {
      label: () => t("device_command.business_type"),
      prop: "business_type",
      width: 100,
      cellRenderTo: {
        name: "nmCellEnhance",
        props: {
          type: "tag",
          api: getBusinessTypeOptions,
          dataHandle: (response: any) => {
            return response.data?.map((item: any) => ({
              label: item.label,
              value: item.value,
            }));
          },
        },
      },
    },
    // 订单号
    {
      label: () => t("device_command.order_no"),
      prop: "order_no",
      width: 220,
      cellRender: ({ row }) => (
        <el-text truncated>{row.order_no || "-"}</el-text>
      ),
    },
    // 状态
    {
      label: () => t("device_command.status"),
      prop: "status",
      width: 100,
      cellRenderTo: {
        name: "nmCellEnhance",
        props: {
          type: "tag",
          api: getStatusOptions,
          dataHandle: (response: any) => {
            return response.data?.map((item: any) => ({
              label: item.label,
              value: item.value,
            }));
          },
          props: { effect: "dark" },
        },
      },
    },
    // 重试次数
    {
      label: () => t("device_command.retry_count"),
      prop: "retry_count",
      width: 100,
      cellRender: ({ row }) => (
        <span>{row.retry_count} / {row.max_retry}</span>
      ),
    },
    // 错误信息
    {
      label: () => t("device_command.error_message"),
      prop: "error_message",
      width: 200,
      cellRender: ({ row }) => (
        row.error_message ? (
          <el-tooltip content={row.error_message} placement="top">
            <el-text type="danger" truncated>{row.error_code}: {row.error_message}</el-text>
          </el-tooltip>
        ) : <span>-</span>
      ),
    },
    // 创建时间
    {
      label: () => t("device_command.created_at"),
      prop: "created_at",
      width: 180,
    },
    // 完成时间
    {
      label: () => t("device_command.completed_at"),
      prop: "completed_at",
      width: 180,
      cellRender: ({ row }) => (
        <span>{row.completed_at || "-"}</span>
      ),
    },
    // 操作列
    {
      type: "operation",
      label: () => t("crud.operation"),
      width: "200px",
      operationConfigure: {
        type: "tile",
        actions: [
          {
            name: "detail",
            icon: "i-heroicons:eye",
            show: ({ row }) => showBtn("device:command:list", row),
            text: () => t("device_command.detail"),
            onClick: ({ row }) => {
              dialog.setTitle(t("device_command.detail"));
              dialog.open({ formType: "detail", data: row });
            },
          },
          {
            name: "retry",
            icon: "i-heroicons:arrow-path",
            show: ({ row }) => showBtn("device:command:update", row) && canRetry(row),
            text: () => t("device_command.retry"),
            onClick: async ({ row }, proxy: MaProTableExpose) => {
              msg.confirm(t("device_command.retry_confirm")).then(async () => {
                const response = await retry(row.id);
                if (response.code === ResultCode.SUCCESS) {
                  msg.success(t("device_command.retry_success"));
                  await proxy.refresh();
                } else {
                  msg.error(response.message);
                }
              });
            },
          },
          {
            name: "cancel",
            icon: "i-heroicons:x-circle",
            show: ({ row }) => showBtn("device:command:update", row) && canCancel(row),
            text: () => t("device_command.cancel"),
            onClick: async ({ row }, proxy: MaProTableExpose) => {
              msg.confirm(t("device_command.cancel_confirm")).then(async () => {
                const response = await cancel(row.id);
                if (response.code === ResultCode.SUCCESS) {
                  msg.success(t("device_command.cancel_success"));
                  await proxy.refresh();
                } else {
                  msg.error(response.message);
                }
              });
            },
          },
        ],
      },
    },
  ];
}
