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
      label: () => t("bank_disbursement_bill_icici.pymt_mode"),
      prop: "pymt_mode",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("bank_disbursement_bill_icici.pymt_mode"),
        clearable: true,
      },
    },
    {
      label: () => t("bank_disbursement_bill_icici.file_sequence_num"),
      prop: "file_sequence_num",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("bank_disbursement_bill_icici.file_sequence_num"),
        clearable: true,
      },
    },
    {
      label: () => t("bank_disbursement_bill_icici.debit_acct_no"),
      prop: "debit_acct_no",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("bank_disbursement_bill_icici.debit_acct_no"),
        clearable: true,
      },
    },
    {
      label: () => t("bank_disbursement_bill_icici.beneficiary_name"),
      prop: "beneficiary_name",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("bank_disbursement_bill_icici.beneficiary_name"),
        clearable: true,
      },
    },
    {
      label: () => t("bank_disbursement_bill_icici.beneficiary_account_no"),
      prop: "beneficiary_account_no",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("bank_disbursement_bill_icici.beneficiary_account_no"),
        clearable: true,
      },
    },
    {
      label: () => t("bank_disbursement_bill_icici.bene_ifsc_code"),
      prop: "bene_ifsc_code",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("bank_disbursement_bill_icici.bene_ifsc_code"),
        clearable: true,
      },
    },
    {
      label: () => t("bank_disbursement_bill_icici.remark"),
      prop: "remark",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("bank_disbursement_bill_icici.remark"),
        clearable: true,
      },
    },
    {
      label: () => t("bank_disbursement_bill_icici.pymt_date"),
      prop: "pymt_date",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("bank_disbursement_bill_icici.pymt_date"),
        clearable: true,
      },
    },
    {
      label: () => t("bank_disbursement_bill_icici.status"),
      prop: "status",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("bank_disbursement_bill_icici.status"),
        clearable: true,
      },
    },
    {
      label: () => t("bank_disbursement_bill_icici.customer_ref_no"),
      prop: "customer_ref_no",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("bank_disbursement_bill_icici.customer_ref_no"),
        clearable: true,
      },
    },
    {
      label: () => t("bank_disbursement_bill_icici.utr_no"),
      prop: "utr_no",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("bank_disbursement_bill_icici.utr_no"),
        clearable: true,
      },
    },
    {
      label: () => t("bank_disbursement_bill_icici.order_no"),
      prop: "order_no",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("bank_disbursement_bill_icici.order_no"),
        clearable: true,
      },
    },
    {
      label: () => t("bank_disbursement_bill_icici.file_hash"),
      prop: "file_hash",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("bank_disbursement_bill_icici.file_hash"),
        clearable: true,
      },
    },
    {
      label: () => t("bank_disbursement_bill_icici.created_at"),
      prop: "created_at",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("bank_disbursement_bill_icici.created_at"),
        clearable: true,
      },
    },
  ];
}
