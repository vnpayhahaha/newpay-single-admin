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
      label: () => t("bank_disbursement_bill_axis_neo.srl_no"),
      prop: "srl_no",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("bank_disbursement_bill_axis_neo.srl_no"),
        clearable: true,
      },
    },
    {
      label: () => t("bank_disbursement_bill_axis_neo.tran_date"),
      prop: "tran_date",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("bank_disbursement_bill_axis_neo.tran_date"),
        clearable: true,
      },
    },
    {
      label: () => t("bank_disbursement_bill_axis_neo.chq_no"),
      prop: "chq_no",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("bank_disbursement_bill_axis_neo.chq_no"),
        clearable: true,
      },
    },
    {
      label: () => t("bank_disbursement_bill_axis_neo.dr_cr"),
      prop: "dr_cr",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("bank_disbursement_bill_axis_neo.dr_cr"),
        clearable: true,
      },
    },
    {
      label: () => t("bank_disbursement_bill_axis_neo.created_at"),
      prop: "created_at",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("bank_disbursement_bill_axis_neo.created_at"),
        clearable: true,
      },
    },
    {
      label: () => t("bank_disbursement_bill_axis_neo.order_no"),
      prop: "order_no",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("bank_disbursement_bill_axis_neo.order_no"),
        clearable: true,
      },
    },
    {
      label: () => t("bank_disbursement_bill_axis_neo.file_hash"),
      prop: "file_hash",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("bank_disbursement_bill_axis_neo.file_hash"),
        clearable: true,
      },
    },
  ];
}
