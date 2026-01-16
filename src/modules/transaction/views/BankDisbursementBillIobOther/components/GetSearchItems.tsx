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
      label: () => t("bank_disbursement_bill_iob_other.s_no"),
      prop: "s_no",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("bank_disbursement_bill_iob_other.s_no"),
        clearable: true,
      },
    },
    {
      label: () => t("bank_disbursement_bill_iob_other.name"),
      prop: "name",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("bank_disbursement_bill_iob_other.name"),
        clearable: true,
      },
    },
    {
      label: () => t("bank_disbursement_bill_iob_other.ifsc_code"),
      prop: "ifsc_code",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("bank_disbursement_bill_iob_other.ifsc_code"),
        clearable: true,
      },
    },
    {
      label: () => t("bank_disbursement_bill_iob_other.number"),
      prop: "number",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("bank_disbursement_bill_iob_other.number"),
        clearable: true,
      },
    },
    {
      label: () => t("bank_disbursement_bill_iob_other.status"),
      prop: "status",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("bank_disbursement_bill_iob_other.status"),
        clearable: true,
      },
    },
    {
      label: () => t("bank_disbursement_bill_iob_other.utr_no"),
      prop: "utr_no",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("bank_disbursement_bill_iob_other.utr_no"),
        clearable: true,
      },
    },
    {
      label: () => t("bank_disbursement_bill_iob_other.created_at"),
      prop: "created_at",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("bank_disbursement_bill_iob_other.created_at"),
        clearable: true,
      },
    },
    {
      label: () => t("bank_disbursement_bill_iob_other.order_no"),
      prop: "order_no",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("bank_disbursement_bill_iob_other.order_no"),
        clearable: true,
      },
    },
    {
      label: () => t("bank_disbursement_bill_iob_other.file_hash"),
      prop: "file_hash",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("bank_disbursement_bill_iob_other.file_hash"),
        clearable: true,
      },
    },
    {
      label: () => t("bank_disbursement_bill_iob_other.rejection_reason"),
      prop: "rejection_reason",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("bank_disbursement_bill_iob_other.rejection_reason"),
        clearable: true,
      },
    },
  ];
}
