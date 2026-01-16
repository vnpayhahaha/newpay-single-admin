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
      label: () => t("bank_disbursement_bill_yesmsme.record_ref_no"),
      prop: "record_ref_no",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("bank_disbursement_bill_yesmsme.record_ref_no"),
        clearable: true,
      },
    },
    {
      label: () => t("bank_disbursement_bill_yesmsme.file_ref_no"),
      prop: "file_ref_no",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("bank_disbursement_bill_yesmsme.file_ref_no"),
        clearable: true,
      },
    },
    {
      label: () => t("bank_disbursement_bill_yesmsme.ebanking_ref_no"),
      prop: "ebanking_ref_no",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("bank_disbursement_bill_yesmsme.ebanking_ref_no"),
        clearable: true,
      },
    },
    {
      label: () => t("bank_disbursement_bill_yesmsme.contract_ref_no"),
      prop: "contract_ref_no",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("bank_disbursement_bill_yesmsme.contract_ref_no"),
        clearable: true,
      },
    },
    {
      label: () => t("bank_disbursement_bill_yesmsme.record_status"),
      prop: "record_status",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("bank_disbursement_bill_yesmsme.record_status"),
        clearable: true,
      },
    },
    {
      label: () => t("bank_disbursement_bill_yesmsme.status_code"),
      prop: "status_code",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("bank_disbursement_bill_yesmsme.status_code"),
        clearable: true,
      },
    },
    {
      label: () => t("bank_disbursement_bill_yesmsme.status_description"),
      prop: "status_description",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("bank_disbursement_bill_yesmsme.status_description"),
        clearable: true,
      },
    },
    {
      label: () => t("bank_disbursement_bill_yesmsme.created_at"),
      prop: "created_at",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("bank_disbursement_bill_yesmsme.created_at"),
        clearable: true,
      },
    },
    {
      label: () => t("bank_disbursement_bill_yesmsme.order_no"),
      prop: "order_no",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("bank_disbursement_bill_yesmsme.order_no"),
        clearable: true,
      },
    },
    {
      label: () => t("bank_disbursement_bill_yesmsme.file_hash"),
      prop: "file_hash",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("bank_disbursement_bill_yesmsme.file_hash"),
        clearable: true,
      },
    },
  ];
}
