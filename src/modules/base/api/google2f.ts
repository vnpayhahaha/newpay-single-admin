import type { PageList, ResponseStruct } from "#/global";

export interface SecretVo {
  secret: string;
}
export function generate(): Promise<ResponseStruct<SecretVo>> {
  return useHttp().get("/v1/common/google2f/generate");
}

export interface QrCodeVo {
  qr_code: string;
}
export function getQRCode(secret: string): Promise<ResponseStruct<QrCodeVo>> {
  return useHttp().get(`/admin/google2f/getQRCode/${secret}`);
}

export interface VerifyVo {
  is_pass: boolean;
}
export function verify(
  code: string,
  secret_key: string
): Promise<ResponseStruct<VerifyVo>> {
  return useHttp().get(`/admin/google2f/verify/${code}`, {
    params: { secret_key },
  });
}
