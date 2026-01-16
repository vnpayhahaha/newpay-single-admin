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
      label: () => t("TransactionParsingLog.raw_data_id"),
      prop: "raw_data_id",
      render: () => <el-input />,
    },
    {
      label: () => t("TransactionParsingLog.rule_id"),
      prop: "rule_id",
      render: () => <el-input />,
    },
    {
      label: () => t("TransactionParsingLog.variable_name"),
      prop: "variable_name",
      render: () => <el-input />,
    },
    {
      label: () => t("TransactionParsingLog.status"),
      prop: "status",
      render: () => <el-input />,
    },
    {
      label: () => t("TransactionParsingLog.desc"),
      prop: "desc",
      render: () => <el-input />,
    },
  ];
}
