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
import type { TransactionParsingRulesVo } from "~/transaction/api/TransactionParsingRules.ts";
import type { ChannelDictVo } from "~/channel/api/Channel.ts";
import { remote } from "~/channel/api/Channel.ts";
import { selectStatus } from "@/modules/Common";
import MaKeyValue from "@/components/ma-key-value/index.vue";
import { ref } from "vue";

const resultArr = ref<{ variable_name: string; result: string | number }[]>([]);
const matchResult = ref<string[]>([]);

const runRegex = (
  newExData: string,
  newRegex: string,
  newValName: string[]
) => {
  const regex = new RegExp(newRegex);
  const match = newExData.match(regex);
  if (match) {
    // 过滤 match[0] 并过滤空值
    match.shift();
    matchResult.value = match.filter(
      (item): item is string => item !== undefined
    );

    if (newValName.length !== matchResult.value.length) {
      resultArr.value = [];
      return;
    }

    const result = Array<{ variable_name: string; result: string | number }>();
    for (let i = 0; i < newValName.length; i++) {
      result.push({
        variable_name: newValName[i],
        result: matchResult.value[i],
      });
    }
    resultArr.value = result;
  }
};
export default function getFormItems(
  formType: "add" | "edit" = "add",
  t: any,
  model: TransactionParsingRulesVo
): MaFormItem[] {
  // 新增默认值
  if (formType === "add") {
    // todo...
  }

  // 编辑默认值
  if (formType === "edit") {
    // todo...
  }

  // 初始化解析结果
  model.parse_result = [
    {
      label: "变量名",
      value: "变量值",
    },
  ];

  // 执行正则解析的函数
  const performRegexParsing = () => {
    if (
      model.example_data &&
      model.regex &&
      model.variable_name &&
      model.variable_name.length > 0
    ) {
      try {
        // 确保variable_name是数组类型
        const variableNames = Array.isArray(model.variable_name)
          ? model.variable_name
          : [model.variable_name];
        runRegex(model.example_data, model.regex, variableNames);
        // 将解析结果转换为parse_result格式
        if (resultArr.value.length > 0) {
          model.parse_result = resultArr.value.map((item) => ({
            label: item.variable_name,
            value: item.result?.toString() || "",
          }));
        } else {
          model.parse_result = [
            {
              label: "无匹配结果",
              value: "正则表达式未匹配到任何内容",
            },
          ];
        }
      } catch (error) {
        console.error("正则解析错误:", error);
        model.parse_result = [
          {
            label: "解析错误",
            value: "正则表达式格式不正确或解析失败",
          },
        ];
      }
    } else {
      // 重置为默认状态
      model.parse_result = [
        {
          label: "变量名",
          value: "变量值",
        },
      ];
    }
  };

  performRegexParsing();

  return [
    {
      label: t("TransactionParsingRules.channel_id"),
      prop: "channel_id",
      cols: { md: 12, xs: 24 },
      itemProps: { required: true },
      render: () => <ma-remote-select filterable />,
      renderProps: {
        api: () =>
          new Promise((resolve) =>
            resolve(remote({ channel_type: 1, support_collection: 1 }))
          ),
        dataHandle: (response: any) => {
          return response.data?.map((item: ChannelDictVo) => {
            return { label: `${item.channel_name}`, value: item.id };
          });
        },
      },
    },
    {
      label: t("TransactionParsingRules.status"),
      prop: "status",
      cols: { md: 12, xs: 24 },
      itemProps: { required: true },
      render: () => <el-switch />,
    },
    {
      label: t("TransactionParsingRules.example_data"),
      prop: "example_data",
      render: () => <el-input />,
      renderProps: {
        type: "textarea",
        onInput: () => {
          setTimeout(() => performRegexParsing(), 0);
        },
      },
    },
    {
      label: t("TransactionParsingRules.regex"),
      prop: "regex",
      render: () => <el-input />,
      renderProps: {
        onInput: () => {
          setTimeout(() => performRegexParsing(), 0);
        },
      },
      renderSlots: {
        prefix: () => <span style="margin-left: 8px">/</span>,
        suffix: () => <span style="margin-right: 8px">/</span>,
      },
    },
    {
      label: t("TransactionParsingRules.variable_name"),
      prop: "variable_name",
      itemProps: { required: true },
      render: () => <ma-remote-select filterable />,
      renderProps: {
        api: () =>
          new Promise((resolve) =>
            resolve(
              selectStatus("transaction_parsing_rules", "variable_name_list")
            )
          ),
        dataHandle: (response: any) => {
          return response.data?.map((item: Common.StatusOptionItem) => {
            return { label: `${item.label}`, value: item.value };
          });
        },
        placeholder: t("TransactionParsingRules.variable_name"),
        multiple: true,
        onChange: () => {
          setTimeout(() => performRegexParsing(), 0);
        },
      },
    },
    {
      label: t("TransactionParsingRules.parse_result"),
      prop: "parse_result",
      render: () => MaKeyValue,
      renderProps: {
        fixedKey: true,
        disabled: true,
      },
    },
  ];
}
