/**
 * MineAdmin is committed to providing solutions for quickly building web applications
 * Please view the LICENSE file that was distributed with this source code,
 * For the full copyright and license information.
 * Thank you very much for using MineAdmin.
 *
 * @Author X.Mo<root@imoi.cn>
 * @Link   https://github.com/mineadmin
 */
import type { MaProTableColumns, MaProTableExpose } from '@mineadmin/pro-table'
import type { BankDisbursementBillBandhanVo } from '~/transaction/api/BankDisbursementBillBandhan.ts'
import type { UseDialogExpose } from '@/hooks/useDialog.ts'

import { useMessage } from '@/hooks/useMessage.ts'
import { deleteByIds } from '~/transaction/api/BankDisbursementBillBandhan.ts'
import { ResultCode } from '@/utils/ResultCode.ts'
import hasAuth from '@/utils/permission/hasAuth.ts'

export default function getTableColumns(dialog: UseDialogExpose, formRef: any, t: any): MaProTableColumns[] {
  const dictStore = useDictStore()
  const msg = useMessage()

  const showBtn = (auth: string | string[], row: BankDisbursementBillBandhanVo) => {
    return hasAuth(auth)
  }

  return [
    // 多选列
    { type: 'selection', showOverflowTooltip: false, label: () => t('crud.selection') },
    // 索引序号列
    { type: 'index' },
    // 普通列
                  { label: () =>  t('bank_disbursement_bill_bandhan.bill_id') , prop: 'bill_id' },
                        { label: () =>  t('bank_disbursement_bill_bandhan.core_ref_number') , prop: 'core_ref_number' },
                        { label: () =>  t('bank_disbursement_bill_bandhan.status') , prop: 'status' },
                        { label: () =>  t('bank_disbursement_bill_bandhan.execution_time') , prop: 'execution_time' },
                        { label: () =>  t('bank_disbursement_bill_bandhan.error_code') , prop: 'error_code' },
                        { label: () =>  t('bank_disbursement_bill_bandhan.payment_date') , prop: 'payment_date' },
                        { label: () =>  t('bank_disbursement_bill_bandhan.payment_type') , prop: 'payment_type' },
                        { label: () =>  t('bank_disbursement_bill_bandhan.customer_ref_number') , prop: 'customer_ref_number' },
                        { label: () =>  t('bank_disbursement_bill_bandhan.source_account_number') , prop: 'source_account_number' },
                        { label: () =>  t('bank_disbursement_bill_bandhan.source_narration') , prop: 'source_narration' },
                        { label: () =>  t('bank_disbursement_bill_bandhan.destination_account_number') , prop: 'destination_account_number' },
                        { label: () =>  t('bank_disbursement_bill_bandhan.currency') , prop: 'currency' },
                        { label: () =>  t('bank_disbursement_bill_bandhan.amount') , prop: 'amount' },
                        { label: () =>  t('bank_disbursement_bill_bandhan.destination_narration') , prop: 'destination_narration' },
                        { label: () =>  t('bank_disbursement_bill_bandhan.destination_bank') , prop: 'destination_bank' },
                        { label: () =>  t('bank_disbursement_bill_bandhan.destination_bank_routing_code') , prop: 'destination_bank_routing_code' },
                        { label: () =>  t('bank_disbursement_bill_bandhan.beneficiary_name') , prop: 'beneficiary_name' },
                        { label: () =>  t('bank_disbursement_bill_bandhan.beneficiary_code') , prop: 'beneficiary_code' },
                        { label: () =>  t('bank_disbursement_bill_bandhan.beneficiary_account_type') , prop: 'beneficiary_account_type' },
                        { label: () =>  t('bank_disbursement_bill_bandhan.created_at') , prop: 'created_at' },
                        { label: () =>  t('bank_disbursement_bill_bandhan.created_by') , prop: 'created_by' },
                        { label: () =>  t('bank_disbursement_bill_bandhan.order_no') , prop: 'order_no' },
                        { label: () =>  t('bank_disbursement_bill_bandhan.upload_id') , prop: 'upload_id' },
                        { label: () =>  t('bank_disbursement_bill_bandhan.file_hash') , prop: 'file_hash' },
                        { label: () =>  t('bank_disbursement_bill_bandhan.rejection_reason') , prop: 'rejection_reason' },
          
    // 操作列
    {
      type: 'operation',
      label: () => t('crud.operation'),
      width: '260px',
      operationConfigure: {
        type: 'tile',
        actions: [
          {
            name: 'edit',
            icon: 'i-heroicons:pencil',
            show: ({ row }) => showBtn('transaction:bank_disbursement_bill_bandhan:update', row),
            text: () => t('crud.edit'),
            onClick: ({ row }) => {
              dialog.setTitle(t('crud.edit'))
              dialog.open({ formType: 'edit', data: row })
            },
          },
          {
            name: 'del',
            show: ({ row }) => showBtn('transaction:bank_disbursement_bill_bandhan:delete', row),
            icon: 'i-heroicons:trash',
            text: () => t('crud.delete'),
            onClick: ({ row }, proxy: MaProTableExpose) => {
              msg.delConfirm(t('crud.delDataMessage')).then(async () => {
                const response = await deleteByIds([row.id])
                if (response.code === ResultCode.SUCCESS) {
                  msg.success(t('crud.delSuccess'))
                  await proxy.refresh()
                }
              })
            },
          },
        ],
      },
    },
  ]
}
