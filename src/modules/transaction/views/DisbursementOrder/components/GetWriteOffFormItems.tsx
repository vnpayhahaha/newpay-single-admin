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
import { on } from "ace-builds-internal/config";
import type { DisbursementOrderVo } from "~/transaction/api/DisbursementOrder.ts";
import type { TransactionVoucherWriteOffOptionVo } from "~/transaction/api/TransactionVoucher.ts";

import { getWriteOffOptions } from "~/transaction/api/TransactionVoucher";

const options = ref<Array<TransactionVoucherWriteOffOptionVo>>([]);
const transaction_voucher_id = ref<number>(0);

export default function getFormItems(
  t: any,
  model: DisbursementOrderVo
): MaFormItem[] {
  getWriteOffOptions({ transaction_type: 2 }).then((res) => {
    options.value = res.data;
  });

  const formatGroupLabel = (transaction_voucher_type: number) => {
    switch (transaction_voucher_type) {
      case 1:
        return t("enums.transaction_voucher_type.order_no");
      case 2:
        return t("enums.transaction_voucher_type.utr");
      case 3:
        return t("enums.transaction_voucher_type.amount");
      default:
    }
  };

  return [
    {
      label: t("collection_order.transaction_voucher"),
      prop: "transaction_voucher_id",
      render: () => {
        return (
          <el-select
            v-model={model.transaction_voucher_id}
            clearable
            filterable
            style="width: 100%"
          >
            {options.value.map((group) => (
              <el-option-group key={group.transaction_voucher_type}>
                <el-divider content-position="left">
                  {formatGroupLabel(group.transaction_voucher_type)}
                </el-divider>
                {group.children.map((item) => (
                  <el-option
                    key={item.id}
                    label={item.collection_amount}
                    value={item.id}
                  >
                    <span style="float: left">
                      <ma-svg-icon name="i-prime:indian-rupee" size="1.2em" />{" "}
                      {item.collection_amount}
                    </span>
                    <span style="float: right; color: #8492a6; font-size: 13px">
                      {item.transaction_voucher}
                    </span>
                  </el-option>
                ))}
              </el-option-group>
            ))}
          </el-select>
        );
      },
      renderProps: {},
      itemProps: {
        required: true,
      },
      renderSlots: {
        prefix: () => <span style="margin-left: 8px">INR</span>,
      },
      cols: {
        span: 20,
      },
    },
  ];
}
