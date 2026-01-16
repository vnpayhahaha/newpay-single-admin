/**
 * Member 模块枚举配置
 * 集中管理状态、类型等枚举值的映射关系
 */

import type { Component } from 'vue'

/**
 * 枚举项配置
 */
export interface EnumItem {
  value: number
  labelKey: string // 国际化 key
  color?: 'success' | 'warning' | 'danger' | 'info' | 'primary'
  icon?: Component | string
}

/**
 * 会员账号记录类型枚举
 */
export const MemberAccountRecordTypeEnum: Record<number, EnumItem> = {
  11: { value: 11, labelKey: 'deposit', color: 'success' },
  12: { value: 12, labelKey: 'withdraw', color: 'warning' },
  21: { value: 21, labelKey: 'payout', color: 'danger' },
  22: { value: 22, labelKey: 'collection', color: 'primary' },
  30: { value: 30, labelKey: 'direct_reward', color: 'success' },
  31: { value: 31, labelKey: 'superior_reward', color: 'success' },
  32: { value: 32, labelKey: 'indirect_reward', color: 'success' },
  41: { value: 41, labelKey: 'admin_add', color: 'primary' },
  42: { value: 42, labelKey: 'admin_deduct', color: 'danger' },
  50: { value: 50, labelKey: 'other_fees', color: 'warning' },
}

/**
 * 会员登录状态枚举
 */
export const MemberLoginStatusEnum: Record<number, EnumItem> = {
  0: { value: 0, labelKey: 'failed', color: 'danger' },
  1: { value: 1, labelKey: 'success', color: 'success' },
}

/**
 * 会员操作日志成功状态枚举
 */
export const MemberOperationSuccessEnum: Record<number, EnumItem> = {
  0: { value: 0, labelKey: 'failed', color: 'danger' },
  1: { value: 1, labelKey: 'success', color: 'success' },
}

/**
 * 会员 Tron 申请状态枚举
 */
export const MemberTronApplyStatusEnum: Record<number, EnumItem> = {
  1: { value: 1, labelKey: 'pending', color: 'warning' },
  2: { value: 2, labelKey: 'confirmed', color: 'success' },
  3: { value: 3, labelKey: 'cancelled', color: 'danger' },
  4: { value: 4, labelKey: 'expired', color: 'info' },
}

/**
 * 会员 Tron 申请类型枚举
 */
export const MemberTronApplyTypeEnum: Record<number, EnumItem> = {
  11: { value: 11, labelKey: 'deposit', color: 'success' },
  12: { value: 12, labelKey: 'withdraw', color: 'warning' },
}

/**
 * 会员 Tron 交易记录状态枚举
 */
export const MemberTronTransactionStatusEnum: Record<number, EnumItem> = {
  1: { value: 1, labelKey: 'pending_verification', color: 'warning' },
  2: { value: 2, labelKey: 'verified', color: 'success' },
  3: { value: 3, labelKey: 'cancelled', color: 'danger' },
  4: { value: 4, labelKey: 'timeout', color: 'info' },
}

/**
 * 会员通知类型枚举
 */
export const MemberNoticeTypeEnum: Record<number, EnumItem> = {
  1: { value: 1, labelKey: 'notice', color: 'primary' },
  2: { value: 2, labelKey: 'announcement', color: 'warning' },
}

/**
 * 获取枚举标签的国际化 key
 */
export function getEnumLabelKey(enumMap: Record<number, EnumItem>, value: number, prefix: string): string {
  const item = enumMap[value]
  return item ? `${prefix}.${item.labelKey}` : ''
}

/**
 * 获取枚举配置
 */
export function getEnumItem(enumMap: Record<number, EnumItem>, value: number): EnumItem | undefined {
  return enumMap[value]
}
