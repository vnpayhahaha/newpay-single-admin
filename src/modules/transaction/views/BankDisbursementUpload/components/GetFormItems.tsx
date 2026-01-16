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
import type { BankDisbursementUploadVo } from "~/transaction/api/BankDisbursementUpload.ts";
import { remote, ChannelDictVo } from "~/channel/api/Channel.ts";
import { selectStatus } from "@/modules/Common";
import { chunkUpload } from "~/base/api/attachment.ts";
import { unset } from "lodash-es";
export default function getFormItems(
  formType: "add" | "edit" = "add",
  t: any,
  model: BankDisbursementUploadVo
): MaFormItem[] {
  // 新增默认值
  if (formType === "add") {
    // todo...
  }

  // 编辑默认值
  if (formType === "edit") {
    // todo...
  }
  unset(model, "channel_id");
  unset(model, "upload_bill_template_id");
  function onUploadSuccess(file: any, result: any) {
    console.log("上传成功:11", file, result);
    model.attachment_id = result.id;
    model.file_name = result.origin_name;
    model.path = result.base_path;
    model.hash = result.hash;
    model.file_size = result.size_info;
    model.suffix = result.suffix;
  }

  function onSuccessAction(file: any, result: any) {
    console.log("成功操作:22", file, result);
  }
  return [
    {
      label: t("bank_disbursement_upload.channel_id"),
      prop: "channel_id",
      itemProps: { required: true },
      render: () => <ma-remote-select filterable />,
      renderProps: {
        api: () =>
          new Promise((resolve) => resolve(remote({ channel_type: 1 }))),
        dataHandle: (response: any) => {
          return response.data?.map((item: ChannelDictVo) => {
            return { label: `${item.channel_name}`, value: item.id };
          });
        },
      },
    },
    {
      label: t("bank_disbursement_upload.upload_bill_template_id"),
      prop: "upload_bill_template_id",
      itemProps: { required: true },
      render: () => <ma-remote-select filterable />,
      renderProps: {
        api: () =>
          new Promise((resolve) =>
            resolve(selectStatus("disbursement_order", "bill_template_list"))
          ),
        dataHandle: (response: any) => {
          return response.data?.map((item: Common.StatusOptionItem) => {
            return { label: `${item.label}`, value: item.value };
          });
        },
        multiple: false,
      },
    },
    {
      label: "",
      prop: "attachment_id",
      itemProps: { required: true, labelWidth: 1 },
      render: () => {
        return (
          <ma-upload-chunk
            ref="advancedUploadRef"
            onUploadSuccess={onUploadSuccess}
          />
        );
      },
      renderProps: {
        action: chunkUpload,
        multiple: false,
        chunkSize: 5 * 1024 * 1024,
        maxFiles: 1,
        autoUpload: true,
        maxFileSize: 100 * 1024 * 1024,
        concurrency: 2,
        retryCount: 5,
        allowedExtensions: ["csv", "xls", "xlsx"],
        tip: "支持大文件上传，最大100MB，仅支持CSV和Excel文件",
        showSuccessAction: false,
      },
    },
  ];
}
