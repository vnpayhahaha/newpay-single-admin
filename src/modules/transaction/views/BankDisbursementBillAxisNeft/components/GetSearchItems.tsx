/**
 * MineAdmin is committed to providing solutions for quickly building web applications
 * Please view the LICENSE file that was distributed with this source code,
 * For the full copyright and license information.
 * Thank you very much for using MineAdmin.
 *
 * @Author X.Mo <root@imoi.cn>
 * @Link   https://github.com/mineadmin
 */

import type { MaSearchItem } from "@mineadmin/search";

export default function getSearchItems(t: any): MaSearchItem[] {
  return [
    {
      label: () => t("bank_disbursement_bill_axis_neft.receipient_name"),
      prop: "receipient_name",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("bank_disbursement_bill_axis_neft.receipient_name"),
        clearable: true,
      },
    },
    {
      label: () => t("bank_disbursement_bill_axis_neft.account_number"),
      prop: "account_number",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("bank_disbursement_bill_axis_neft.account_number"),
        clearable: true,
      },
    },
    {
      label: () => t("bank_disbursement_bill_axis_neft.ifsc_code"),
      prop: "ifsc_code",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("bank_disbursement_bill_axis_neft.ifsc_code"),
        clearable: true,
      },
    },
    {
      label: () => t("bank_disbursement_bill_axis_neft.status"),
      prop: "status",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("bank_disbursement_bill_axis_neft.status"),
        clearable: true,
      },
    },
    {
      label: () => t("bank_disbursement_bill_axis_neft.failure_reason"),
      prop: "failure_reason",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("bank_disbursement_bill_axis_neft.failure_reason"),
        clearable: true,
      },
    },
    {
      label: () => t("bank_disbursement_bill_axis_neft.created_by"),
      prop: "created_by",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("bank_disbursement_bill_axis_neft.created_by"),
        clearable: true,
      },
    },
    {
      label: () => t("bank_disbursement_bill_axis_neft.order_no"),
      prop: "order_no",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("bank_disbursement_bill_axis_neft.order_no"),
        clearable: true,
      },
    },
    {
      label: () => t("bank_disbursement_bill_axis_neft.file_hash"),
      prop: "file_hash",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("bank_disbursement_bill_axis_neft.file_hash"),
        clearable: true,
      },
    },
  ];
}
