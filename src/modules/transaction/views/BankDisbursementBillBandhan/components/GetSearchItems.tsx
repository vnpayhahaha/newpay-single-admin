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
      label: () => t("bank_disbursement_bill_bandhan.core_ref_number"),
      prop: "core_ref_number",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("bank_disbursement_bill_bandhan.core_ref_number"),
        clearable: true,
      },
    },
    {
      label: () => t("bank_disbursement_bill_bandhan.status"),
      prop: "status",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("bank_disbursement_bill_bandhan.status"),
        clearable: true,
      },
    },
    {
      label: () => t("bank_disbursement_bill_bandhan.payment_date"),
      prop: "payment_date",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("bank_disbursement_bill_bandhan.payment_date"),
        clearable: true,
      },
    },
    {
      label: () => t("bank_disbursement_bill_bandhan.payment_type"),
      prop: "payment_type",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("bank_disbursement_bill_bandhan.payment_type"),
        clearable: true,
      },
    },
    {
      label: () => t("bank_disbursement_bill_bandhan.source_account_number"),
      prop: "source_account_number",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("bank_disbursement_bill_bandhan.source_account_number"),
        clearable: true,
      },
    },
    {
      label: () =>
        t("bank_disbursement_bill_bandhan.destination_account_number"),
      prop: "destination_account_number",
      render: () => <el-input />,
      renderProps: {
        placeholder: t(
          "bank_disbursement_bill_bandhan.destination_account_number"
        ),
        clearable: true,
      },
    },
    {
      label: () => t("bank_disbursement_bill_bandhan.beneficiary_name"),
      prop: "beneficiary_name",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("bank_disbursement_bill_bandhan.beneficiary_name"),
        clearable: true,
      },
    },
    {
      label: () => t("bank_disbursement_bill_bandhan.beneficiary_code"),
      prop: "beneficiary_code",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("bank_disbursement_bill_bandhan.beneficiary_code"),
        clearable: true,
      },
    },
    {
      label: () => t("bank_disbursement_bill_bandhan.beneficiary_account_type"),
      prop: "beneficiary_account_type",
      render: () => <el-input />,
      renderProps: {
        placeholder: t(
          "bank_disbursement_bill_bandhan.beneficiary_account_type"
        ),
        clearable: true,
      },
    },
    {
      label: () => t("bank_disbursement_bill_bandhan.created_at"),
      prop: "created_at",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("bank_disbursement_bill_bandhan.created_at"),
        clearable: true,
      },
    },
    {
      label: () => t("bank_disbursement_bill_bandhan.order_no"),
      prop: "order_no",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("bank_disbursement_bill_bandhan.order_no"),
        clearable: true,
      },
    },
    {
      label: () => t("bank_disbursement_bill_bandhan.file_hash"),
      prop: "file_hash",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("bank_disbursement_bill_bandhan.file_hash"),
        clearable: true,
      },
    },
    {
      label: () => t("bank_disbursement_bill_bandhan.rejection_reason"),
      prop: "rejection_reason",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("bank_disbursement_bill_bandhan.rejection_reason"),
        clearable: true,
      },
    },
  ];
}
