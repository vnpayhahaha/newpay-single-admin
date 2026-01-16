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
import type { DisbursementOrderVo } from "~/transaction/api/DisbursementOrder.ts";

import { ChannelDictVo, remote } from "~/channel/api/Channel.ts";
import {
  BankAccountDictVo,
  remote as remoteBankAccount,
} from "~/channel/api/BankAccount.ts";
import { unset } from "lodash-es";

const bankAccountFormRef = ref();
export default function getFormItems(
  t: any,
  model: DisbursementOrderVo
): MaFormItem[] {
  if (model.disbursement_channel_id === 0) {
    unset(model, "disbursement_channel_id");
  }

  if (model.channel_account_id === 0) {
    unset(model, "channel_account_id");
  }

  if (model.bank_account_id === 0) {
    unset(model, "bank_account_id");
  }

  const channelArray = reactive<ChannelDictVo[]>([]);
  const channelChange = (val: string) => {
    unset(model, "bank_account_id");
    bankAccountFormRef.value?.refresh();
  };
  return [
    {
      label: t("transaction_voucher.channel_id"),
      prop: "disbursement_channel_id",
      itemProps: { required: true },
      render: () => {
        return <ma-remote-select onChange={channelChange} filterable />;
      },
      renderSlots: {
        default: ({
          item,
        }: {
          item: { label: string; value: string; extend: ChannelDictVo };
        }) => {
          return (
            <>
              <span style="float: left">
                {item.extend.support_collection &&
                item.extend.support_disbursement ? (
                  <ma-svg-icon
                    name="i-lucide:refresh-ccw-dot"
                    size="1.2em"
                    color="blue"
                  />
                ) : item.extend.support_collection ? (
                  <ma-svg-icon
                    name="i-lucide:redo-dot"
                    size="1.2em"
                    color="green"
                  />
                ) : item.extend.support_disbursement ? (
                  <ma-svg-icon
                    name="i-lucide:undo-dot"
                    size="1.2em"
                    color="red"
                  />
                ) : null}{" "}
                {item.extend.channel_type === 1 ? (
                  <ma-svg-icon
                    name="i-streamline:money-atm-card-1-credit-pay-payment-debit-card-finance-plastic-money"
                    size="1.2em"
                  />
                ) : item.extend.channel_type === 2 ? (
                  <ma-svg-icon
                    name="i-streamline:computer-logo-paypal-payment-paypal"
                    size="1.2em"
                  />
                ) : null}{" "}
                {item.label}
              </span>
              <span
                style="
           float: right;
           color: var(--el-text-color-secondary);
           font-size: 13px;
         "
              >
                {item.extend.channel_code}
              </span>
            </>
          );
        },
      },
      renderProps: {
        api: () =>
          new Promise((resolve) =>
            resolve(remote({ support_disbursement: 1, channel_type: 1 }))
          ),
        dataHandle: (response: any) => {
          channelArray.splice(0, channelArray.length, ...response.data);
          return response.data?.map((item: ChannelDictVo) => {
            return {
              label: `${item.channel_name}`,
              value: item.id,
              extend: item,
            };
          });
        },
      },
    },
    {
      label: t("transaction_voucher.bank_account_id"),
      prop: "bank_account_id",
      render: () => {
        return <ma-remote-select ref={bankAccountFormRef} filterable />;
      },
      renderSlots: {
        default: ({
          item,
        }: {
          item: { label: string; value: string; extend: BankAccountDictVo };
        }) => {
          return (
            <>
              <span style="float: left">
                {item.extend.support_collection &&
                item.extend.support_disbursement ? (
                  <ma-svg-icon
                    name="i-lucide:refresh-ccw-dot"
                    size="1.2em"
                    color="blue"
                  />
                ) : item.extend.support_collection ? (
                  <ma-svg-icon
                    name="i-lucide:redo-dot"
                    size="1.2em"
                    color="green"
                  />
                ) : item.extend.support_disbursement ? (
                  <ma-svg-icon
                    name="i-lucide:undo-dot"
                    size="1.2em"
                    color="red"
                  />
                ) : null}{" "}
                <ma-svg-icon
                  name="i-streamline:money-atm-card-1-credit-pay-payment-debit-card-finance-plastic-money"
                  size="1.2em"
                />{" "}
                {item.label}
              </span>
              <span
                style="
           float: right;
           color: var(--el-text-color-secondary);
           font-size: 13px;
         "
              >
                {item.extend.account_number}
              </span>
            </>
          );
        },
      },
      renderProps: {
        api: () =>
          new Promise((resolve) =>
            resolve(
              remoteBankAccount({
                status: 1,
                support_disbursement: 1,
                channel_id: model.disbursement_channel_id,
              })
            )
          ),
        dataHandle: (response: any) => {
          return response.data?.map((item: BankAccountDictVo) => {
            return {
              label: `${item.account_holder}`,
              value: item.id,
              extend: item,
            };
          });
        },
      },
      itemProps: {
        rules: [
          {
            required: true, // 保持基础必填规则
            validator: (_, value, callback) => {
              if (!value) {
                callback(new Error("bank_account_id is required"));
              } else {
                callback();
              }
            },
          },
        ],
      },
    },
  ];
}
