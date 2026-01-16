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
import type { TenantVo } from "~/tenant/api/Tenant.ts";
import { selectStatus } from "@/modules/Common";
import MaDictCheckbox from "@/components/ma-dict-picker/ma-dict-checkbox.vue";

export default function getFormItems(
  formType: "add" | "edit" = "add",
  t: any,
  model: TenantVo
): MaFormItem[] {
  // 新增默认值
  if (formType === "add") {
    // todo...
    model.is_enabled = true;
    model.user_num_limit = 1;
    model.app_num_limit = 1;
    model.safe_level = 1;
    model.receipt_settlement_type = 1;
    model.settlement_delay_days = 0;
    model.receipt_fee_type = [];
    model.auto_transfer = true;
    model.payment_fee_type = [];
  }

  // 编辑默认值
  if (formType === "edit") {
    // todo...
  }

  return [
    {
      label: t("tenant.companyName"),
      prop: "company_name",
      render: () => <el-input />,
      itemProps: {
        required: true,
      },
      cols: {
        span: 12,
      },
    },
    {
      label: t("tenant.isEnabled"),
      prop: "is_enabled",
      render: () => <el-switch />,
      itemProps: {
        required: true,
      },
      cols: {
        span: 12,
      },
    },
    {
      label: t("tenant.safeLevel"),
      prop: "safe_level",
      render: () => <el-input-number min={0} />,
      itemProps: {
        required: true,
      },
      cols: {
        span: 12,
      },
      renderProps: {
        class: "w-full",
        max: 99,
      },
    },
    {
      label: t("tenant.user_num_limit"),
      prop: "user_num_limit",
      render: ({ formData }) => {
        const showHint = formData.user_num_limit === -1;
        return (
          <div class="w-full">
            <el-input-number
              class="w-full"
              v-model={formData.user_num_limit}
              min={-1}
            />
            {showHint && (
              <div style="color: #999; font-size: 12px; margin-top: 5px;">
                {t("tenant.limitHint")}
              </div>
            )}
          </div>
        );
      },
      itemProps: {
        required: true,
        rules: [
          {
            type: "number",
            min: -1,
          },
        ],
      },
      cols: {
        span: 12,
      },
    },
    {
      label: t("tenant.app_num_limit"),
      prop: "app_num_limit",
      render: ({ formData }) => {
        const showHint = formData.app_num_limit === -1;
        return (
          <div class="w-full">
            <el-input-number
              class="w-full"
              v-model={formData.app_num_limit}
              min={-1}
            />
            {showHint && (
              <div style="color: #999; font-size: 12px; margin-top: 5px;">
                {t("tenant.limitHint")}
              </div>
            )}
          </div>
        );
      },
      itemProps: {
        required: true,
        rules: [
          {
            type: "number",
            min: -1,
          },
        ],
      },
      cols: {
        span: 12,
      },
    },
    {
      label: t("tenant.contactUserName"),
      prop: "contact_user_name",
      render: () => <el-input />,
      itemProps: {
        required: true,
      },
      cols: {
        span: 12,
      },
    },
    {
      label: t("tenant.contactPhone"),
      prop: "contact_phone",
      render: () => <el-input />,
      itemProps: {
        required: true,
      },
      cols: {
        span: 12,
      },
    },
    {
      label: t("tenant.licenseNumber"),
      prop: "license_number",
      render: () => <el-input />,
      cols: {
        span: 12,
      },
    },
    {
      label: t("tenant.domain"),
      prop: "domain",
      render: () => <el-input />,
      cols: {
        span: 12,
      },
    },
    {
      label: t("tenant.address"),
      prop: "address",
      render: () => <el-input />,
    },
    {
      label: t("tenant.intro"),
      prop: "intro",
      render: () => <el-input type="textarea" />,
    },
  ];
}
