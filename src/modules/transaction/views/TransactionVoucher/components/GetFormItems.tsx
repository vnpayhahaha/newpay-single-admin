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
import type { TransactionVoucherVo } from "~/transaction/api/TransactionVoucher.ts";
import { ChannelDictVo, remote } from "~/channel/api/Channel.ts";
import {
  ChannelAccountDictVo,
  remote as remoteChannelAccount,
} from "~/channel/api/ChannelAccount.ts";
import {
  BankAccountDictVo,
  remote as remoteBankAccount,
} from "~/channel/api/BankAccount.ts";
import MaDictRadio from "@/components/ma-dict-picker/ma-dict-radio.vue";
import { Label } from "radix-vue";
import { tr } from "element-plus/es/locale/index.mjs";

export default function getFormItems(
  formType: "add" | "edit" = "add",
  t: any,
  model: TransactionVoucherVo
): MaFormItem[] {
  // 新增默认值
  if (formType === "add") {
    model.transaction_type = 1;
    model.transaction_voucher_type = 1;
    // todo...
  }

  // 编辑默认值
  if (formType === "edit") {
    // todo...
  }
  const channelArray = reactive<ChannelDictVo[]>([]);

  // 当前选中的渠道类型、
  const channelType = ref<number>(0);

  const channelChange = (val: string) => {
    // console.log('channelArray', channelArray)
    // console.log('channelChange', val)
    // model.api_config 赋值等于 遍历channelArray 中id === val 的 channelArray[i].config
    // model.channel_id = channelArray.find(item => item.id === val)?.config || []
    const newChannelType = channelArray.find((item) => item.id === val)?.channel_type || 0;

    // 如果渠道类型变为1且当前选中的是最后一个选项(upstream_order_no)，则取消选中
    if (newChannelType === 1 && model.transaction_voucher_type === 5) {
      model.transaction_voucher_type = 1; // 重置为第一个选项
    }

    channelType.value = newChannelType;
  };
  return [
    {
      label: t("transaction_voucher.channel_id"),
      prop: "channel_id",
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
        api: () => new Promise((resolve) => resolve(remote({ status: 1 }))),
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
      hide: () => channelType.value !== 1,
      render: () => {
        return <ma-remote-select filterable />;
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
          new Promise((resolve) => resolve(remoteBankAccount({ status: 1 }))),
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
              if (channelType.value === 1 && !value) {
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
      label: t("transaction_voucher.channel_account_id"),
      prop: "channel_account_id",
      hide: () => channelType.value !== 2,
      render: () => {
        return <ma-remote-select filterable />;
      },
      renderSlots: {
        default: ({
          item,
        }: {
          item: { label: string; value: string; extend: ChannelAccountDictVo };
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
                  name="i-streamline:computer-logo-paypal-payment-paypal"
                  size="1.2em"
                />{" "}
                {item.label}
              </span>
            </>
          );
        },
      },
      renderProps: {
        api: () =>
          new Promise((resolve) =>
            resolve(remoteChannelAccount({ status: 1 }))
          ),
        dataHandle: (response: any) => {
          return response.data?.map((item: ChannelAccountDictVo) => {
            return {
              label: `${item.merchant_id}`,
              value: item.id,
              extend: item,
            };
          });
        },
      },
      itemProps: {
        rules: [
          // 当channelType.value === 2， required: true
          {
            required: true, // 保持基础必填规则
            validator: (_, value, callback) => {
              if (channelType.value === 2 && !value) {
                callback(new Error("channel_account_id is required"));
              } else {
                callback();
              }
            },
          },
        ],
      },
    },
    {
      label: t("transaction_voucher.transaction_type"),
      prop: "transaction_type",
      cols: { md: 12, xs: 24 },
      render: () => MaDictRadio,
      itemProps: {
        required: true,
      },
      renderProps: {
        data: [
          { label: t("enums.transaction_type.collection"), value: 1 },
          { label: t("enums.transaction_type.disbursement"), value: 2 },
        ],
        // disabled: true,
      },
    },
    {
      label: t("transaction_voucher.collection_amount"),
      prop: "collection_amount",
      render: () => <el-input-number class="w-full" />,
      itemProps: {
        required: true,
      },
      renderProps: {
        min: 0,
        max: 999999,
        precision: 2,
      },
      cols: {
        span: 12,
      },
      renderSlots: {
        prefix: () => <span style="margin-left: 8px">INR</span>,
      },
    },
    {
      label: t("transaction_voucher.transaction_voucher_type"),
      prop: "transaction_voucher_type",
      cols: { span: 24 },
      render: () => MaDictRadio,
      itemProps: {
        required: true,
      },
      renderProps: {
        data: computed(() => [
          { label: t("enums.transaction_voucher_type.utr"), value: 1 },
          { label: t("enums.transaction_voucher_type.order_id"), value: 2 },
          { label: t("enums.transaction_voucher_type.platform_order_no"), value: 3 },
          { label: t("enums.transaction_voucher_type.amount"), value: 4 },
          { label: t("enums.transaction_voucher_type.upstream_order_no"), value: 5, disabled: channelType.value === 1 },
        ]),
        // disabled: true,
      },
    },
    {
      label: t("transaction_voucher.transaction_voucher"),
      prop: "transaction_voucher",
      hide: () => model.transaction_voucher_type === 4,
      render: () => <el-input class="w-full" />,
      itemProps: {
        rules: [
          {
            required: true, // 保持基础必填规则
            validator: (_, value, callback) => {
              if (model.transaction_voucher_type !== 4 && !value) {
                callback(new Error("transaction_voucher is required"));
              } else {
                callback();
              }
            },
          },
        ],
      },
      cols: {
        span: 24,
      },
      renderSlots: {
        prefix: () => (
          <span style="margin-left: 8px">
            {model.transaction_voucher_type === 1
              ? t("enums.transaction_voucher_type.utr")
              : model.transaction_voucher_type === 2
              ? t("enums.transaction_voucher_type.order_id")
              : model.transaction_voucher_type === 3
              ? t("enums.transaction_voucher_type.platform_order_no")
              : model.transaction_voucher_type === 4
              ? t("enums.transaction_voucher_type.amount")
              : model.transaction_voucher_type === 5
              ? t("enums.transaction_voucher_type.upstream_order_no")
              : t("enums.transaction_voucher_type.amount")}
          </span>
        ),
      },
    },
  ];
}
