import type { ResponseStruct } from '#/global'

export function selectStatus(tableName: string, fieldList: string): Promise<ResponseStruct<Common.StatusOption[]>> {
  return useHttp().get(`/public/selectOption?table_name=${tableName}&field_list=${fieldList}`)
}
