/**
 * MineAdmin is committed to providing solutions for quickly building web applications
 * Please view the LICENSE file that was distributed with this source code,
 * For the full copyright and license information.
 * Thank you very much for using MineAdmin.
 *
 * @Author X.Mo<root@imoi.cn>
 * @Link   https://github.com/mineadmin
 */
import type { MaFormItem } from "@mineadmin/form";
import type { TenantApiInterfaceVo } from "~/tenant/api/TenantApiInterface.ts";
import { selectStatus } from "@/modules/Common";
import { jsonValidator } from "@/utils/form";

export default function getFormItems(
  formType: "add" | "edit" = "add",
  t: any,
  model: TenantApiInterfaceVo
): MaFormItem[] {
  // 新增默认值
  if (formType === "add") {
    model.auth_mode = 1;
    model.status = true;
    model.rate_limit = 10;
    model.request_params = [];
    model.request_params_en = [];
    model.request_example = "[]";
    model.request_example_en = "[]";
    model.response_params = [];
    model.response_params_en = [];
    model.response_example = "[]";
    model.response_example_en = "[]";
  }

  // 编辑默认值
  if (formType === "edit") {
    // todo...
  }

  return [
    {
      label: t("tenant_api_interface.api_name"),
      prop: "api_name",
      cols: { md: 12, xs: 24 },
      render: () => <el-input />,
      itemProps: {
        required: true,
      },
    },
    {
      label: t("tenant_api_interface.api_uri"),
      prop: "api_uri",
      cols: { md: 12, xs: 24 },
      render: () => <el-input />,
      itemProps: {
        required: true,
      },
    },
    {
      label: t("tenant_api_interface.http_method"),
      prop: "http_method",
      cols: { md: 12, xs: 24 },
      render: () => <ma-remote-select filterable />,
      renderProps: {
        api: () =>
          new Promise((resolve) =>
            resolve(selectStatus("tenant_api_interface", "http_method_list"))
          ),
        dataHandle: (response: any) => {
          return response.data?.map((item: Common.StatusOptionItem) => {
            return { label: `${item.label}`, value: item.value };
          });
        },
      },
      itemProps: {
        required: true,
      },
    },
    {
      label: t("tenant_api_interface.status"),
      prop: "status",
      cols: { md: 12, xs: 24 },
      render: () => <el-switch />,
    },
    {
      label: t("tenant_api_interface.request_params"),
      prop: "request_params",
      cols: { md: 12, xs: 24 },
      render: () => <el-input type="textarea" />,
      itemProps: {
        rules: [jsonValidator()],
      },
    },
    {
      label: t("tenant_api_interface.request_params_en"),
      prop: "request_params_en",
      cols: { md: 12, xs: 24 },
      render: () => <el-input type="textarea" />,
      itemProps: {
        rules: [jsonValidator()],
      },
    },
    {
      label: t("tenant_api_interface.request_example"),
      prop: "request_example",
      cols: { md: 12, xs: 24 },
      render: () => <el-input type="textarea" />,
      itemProps: {
        rules: [jsonValidator()],
      },
    },
    {
      label: t("tenant_api_interface.request_example_en"),
      prop: "request_example_en",
      cols: { md: 12, xs: 24 },
      render: () => <el-input type="textarea" />,
      itemProps: {
        rules: [jsonValidator()],
      },
    },
    {
      label: t("tenant_api_interface.response_params"),
      prop: "response_params",
      cols: { md: 12, xs: 24 },
      render: () => <el-input type="textarea" />,
      itemProps: {
        rules: [jsonValidator()],
      },
    },
    {
      label: t("tenant_api_interface.response_params_en"),
      prop: "response_params_en",
      cols: { md: 12, xs: 24 },
      render: () => <el-input type="textarea" />,
      itemProps: {
        rules: [jsonValidator()],
      },
    },
    {
      label: t("tenant_api_interface.response_example"),
      prop: "response_example",
      cols: { md: 12, xs: 24 },
      render: () => <el-input type="textarea" />,
      itemProps: {
        rules: [jsonValidator()],
      },
    },
    {
      label: t("tenant_api_interface.response_example_en"),
      prop: "response_example_en",
      cols: { md: 12, xs: 24 },
      render: () => <el-input type="textarea" />,
      itemProps: {
        rules: [jsonValidator()],
      },
    },
    {
      label: t("tenant_api_interface.description"),
      prop: "description",
      render: () => <el-input type="textarea" />,
      itemProps: {
        required: true,
      },
    },
    {
      label: t("tenant_api_interface.description_en"),
      prop: "description_en",
      render: () => <el-input type="textarea" />,
      itemProps: {
        required: true,
      },
    },
    {
      label: `${t("tenant_api_interface.rate_limit")}(QPS)`,
      prop: "rate_limit",
      cols: { md: 12, xs: 24 },
      itemProps: { required: true },
      render: () => <el-input-number min={0} max={9999999999} />,
      renderProps: {
        class: "w-full",
      },
    },
    {
      label: t("tenant_api_interface.auth_mode"),
      prop: "auth_mode",
      cols: { md: 12, xs: 24 },
      render: () => <ma-remote-select filterable />,
      renderProps: {
        api: () =>
          new Promise((resolve) =>
            resolve(selectStatus("tenant_api_interface", "auth_mode_list"))
          ),
        dataHandle: (response: any) => {
          return response.data?.map((item: Common.StatusOptionItem) => {
            return { label: `${item.label}`, value: item.value };
          });
        },
      },
      itemProps: {
        required: true,
      },
    },
  ];
}
