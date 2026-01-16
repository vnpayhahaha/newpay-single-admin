declare namespace Common {
  type StatusOption = StatusOptionItem[]

  interface StatusOptionItem {
    label: string
    value: number | string
  }

}
