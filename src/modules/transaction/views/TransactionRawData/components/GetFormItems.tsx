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
import type { TransactionRawDataVo } from "~/transaction/api/TransactionRawData.ts";
import type { ChannelDictVo } from "~/channel/api/Channel.ts";
import { remote } from "~/channel/api/Channel.ts";
import {
  BankAccountDictVo,
  remote as remoteBankAccount,
} from "~/channel/api/BankAccount.ts";

const bank_account_formRef = ref();
export default function getFormItems(
  formType: "add" | "edit" = "add",
  t: any,
  model: TransactionRawDataVo
): MaFormItem[] {
  // 新增默认值
  if (formType === "add") {
    // todo...
  }

  // 编辑默认值
  if (formType === "edit") {
    // todo...
  }
  const channelChange = (val: string) => {
    // console.log("channelChange", val);
    bank_account_formRef.value.refresh();
  };
  return [
    {
      label: t("bankAccount.channel_id"),
      prop: "channel_id",
      cols: { md: 12, xs: 24 },
      itemProps: { required: true },
      render: () => (
        <ma-remote-select
          filterable
          onChange={channelChange}
          disabled={formType === "edit"}
        />
      ),
      renderProps: {
        api: () =>
          new Promise((resolve) =>
            resolve(remote({ support_disbursement: 1, channel_type: 1 }))
          ),
        dataHandle: (response: any) => {
          return response.data?.map((item: ChannelDictVo) => {
            return { label: `${item.channel_name}`, value: item.id };
          });
        },
      },
    },
    {
      label: t("TransactionRawData.source"),
      prop: "source",
      cols: { md: 12, xs: 24 },
      render: () => <el-input />,
      itemProps: { required: true },
    },
    {
      label: t("transaction_voucher.bank_account_id"),
      prop: "bank_account_id",
      render: () => {
        return <ma-remote-select ref={bank_account_formRef} filterable />;
      },
      renderSlots: {
        default: ({
          item,
        }: {
          item: { label: string; value: string; extend: BankAccountDictVo };
        }) => {
          return (
            <>
              <span style="float: left">{item.label}</span>
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
        axiosConfig: {
          autoRequest: false,
        },
        api: () =>
          new Promise((resolve) =>
            resolve(
              remoteBankAccount({
                status: 1,
                support_collection: 1,
                channel_id: model.channel_id,
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
    {
      label: t("TransactionRawData.content"),
      prop: "content",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("TransactionRawData.content"),
        type: "textarea",
      },
      itemProps: { required: true },
    },
  ];
}
