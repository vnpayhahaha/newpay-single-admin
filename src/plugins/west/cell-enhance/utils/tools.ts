import type { UserDictVo } from '$/west/cell-enhance/api/userDict'

export function getDictionaryItem(dictName: string = '', key: string | number) {
  const dictStore = useDictStore()
  const dictionaryData = dictStore.find(dictName) || null
  const found = dictionaryData?.find(item => item.value == key)
  // 如果找到对应的字典项，则返回完整对象
  return found || { label: String(key), value: key, color: '#CCCCCC', code: '', i18n: null, i18n_scope: '' }
}

export function getDictionary(dictName: string = '', key: string | number) {
  const dictStore = useDictStore()
  const dictionaryData = dictStore.find(dictName) as UserDictVo[] || null
  const found = dictionaryData?.find(item => item.id === key)
  return found as UserDictVo | null // 使用类型断言
}
