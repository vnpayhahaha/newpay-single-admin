import type { ResponseStruct } from "#/global";

export interface BankDisbursementUploadVo {
  // 主键ID
  id: number;
  // 资源ID
  attachment_id: number;
  // 文件名
  file_name: string;
  // 下载地址
  path: string;
  // 文件hash
  hash: string;
  // 数据大小（M）
  file_size: number;
  // 条数
  record_count: number;
  // 创建者
  created_by: string;
  // 创建时间
  created_at: string;
  suffix: string;
  channel_id: number;
  upload_bill_template_id: string;
  parsing_status: number;
  success_count: number;
  failure_count: number;
}

// bank_disbursement_upload查询
export function page(
  params: BankDisbursementUploadVo
): Promise<ResponseStruct<BankDisbursementUploadVo[]>> {
  return useHttp().get("/admin/transaction/bank_disbursement_upload/list", {
    params,
  });
}

// bank_disbursement_upload新增
export function create(
  data: BankDisbursementUploadVo
): Promise<ResponseStruct<null>> {
  return useHttp().post("/admin/transaction/bank_disbursement_upload", data);
}

// bank_disbursement_upload编辑
export function save(
  id: number,
  data: BankDisbursementUploadVo
): Promise<ResponseStruct<null>> {
  return useHttp().put(
    `/admin/transaction/bank_disbursement_upload/${id}`,
    data
  );
}

// bank_disbursement_upload删除
export function deleteByIds(ids: number[]): Promise<ResponseStruct<null>> {
  return useHttp().delete("/admin/transaction/bank_disbursement_upload", {
    data: ids,
  });
}

export function downloadById(id: number): Promise<ResponseStruct<Blob>> {
  return useHttp().request({
    url: `/admin/transaction/bank_disbursement_upload/download/${id}`,
    method: "post",
    timeout: 60 * 1000,
    responseType: "blob",
  });
}

export function upload(data: FormData): Promise<ResponseStruct<any>> {
  return useHttp().post(
    "/admin/transaction/bank_disbursement_upload/upload",
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      timeout: 60 * 1000,
    }
  );
}
