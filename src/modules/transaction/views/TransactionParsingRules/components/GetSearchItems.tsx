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
import { selectStatus } from "@/modules/Common";
export default function getSearchItems(t: any): MaSearchItem[] {
  return [
    {
      label: () => t("TransactionParsingRules.channel_id"),
      prop: "channel_id",
      render: () => <el-input />,
    },
    {
      label: () => t("TransactionParsingRules.variable_name"),
      prop: "variable_name",
      render: () => <el-input />,
    },
    {
      label: () => t("TransactionParsingRules.status"),
      prop: "status",
      render: () => <ma-remote-select filterable />,
      renderProps: {
        api: () => new Promise(resolve => resolve(selectStatus('transaction_parsing_rules', 'status_list'))),
        dataHandle: (response: any) => {
          return response.data?.map((item: Common.StatusOptionItem) => {
            return { label: `${item.label}`, value: item.value }
          })
        },
        placeholder: t('TransactionParsingRules.status'),
      },
    },
        {
      label: () => t("TransactionParsingRules.variable_name"),
      prop: "variable_name",
      render: () => <ma-remote-select filterable />,
      renderProps: {
        api: () => new Promise(resolve => resolve(selectStatus('transaction_parsing_rules', 'variable_name_list'))),
        dataHandle: (response: any) => {
          return response.data?.map((item: Common.StatusOptionItem) => {
            return { label: `${item.label}`, value: item.value }
          })
        },
        placeholder: t('TransactionParsingRules.variable_name'),
      },
    },
  ];
}
