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
import type { BankDisbursementBillIcici2Vo } from '~/transaction/api/BankDisbursementBillIcici2.ts'
import type { UseDialogExpose } from '@/hooks/useDialog.ts'

import { useMessage } from '@/hooks/useMessage.ts'
import { deleteByIds } from '~/transaction/api/BankDisbursementBillIcici2.ts'
import { ResultCode } from '@/utils/ResultCode.ts'
import hasAuth from '@/utils/permission/hasAuth.ts'

export default function getTableColumns(dialog: UseDialogExpose, formRef: any, t: any): MaProTableColumns[] {
  const dictStore = useDictStore()
  const msg = useMessage()

  const showBtn = (auth: string | string[], row: BankDisbursementBillIcici2Vo) => {
    return hasAuth(auth)
  }

  return [
    // 多选列
    { type: 'selection', showOverflowTooltip: false, label: () => t('crud.selection') },
    // 索引序号列
    { type: 'index' },
    // 普通列
                  { label: () =>  t('bank_disbursement_bill_icici_2.bill_id') , prop: 'bill_id' },
                        { label: () =>  t('bank_disbursement_bill_icici_2.network_id') , prop: 'network_id' },
                        { label: () =>  t('bank_disbursement_bill_icici_2.credit_account_number') , prop: 'credit_account_number' },
                        { label: () =>  t('bank_disbursement_bill_icici_2.debit_account_number') , prop: 'debit_account_number' },
                        { label: () =>  t('bank_disbursement_bill_icici_2.ifsc_code') , prop: 'ifsc_code' },
                        { label: () =>  t('bank_disbursement_bill_icici_2.total_amount') , prop: 'total_amount' },
                        { label: () =>  t('bank_disbursement_bill_icici_2.host_reference_number') , prop: 'host_reference_number' },
                        { label: () =>  t('bank_disbursement_bill_icici_2.transaction_remarks') , prop: 'transaction_remarks' },
                        { label: () =>  t('bank_disbursement_bill_icici_2.transaction_status') , prop: 'transaction_status' },
                        { label: () =>  t('bank_disbursement_bill_icici_2.transaction_status_remarks') , prop: 'transaction_status_remarks' },
                        { label: () =>  t('bank_disbursement_bill_icici_2.created_at') , prop: 'created_at' },
                        { label: () =>  t('bank_disbursement_bill_icici_2.created_by') , prop: 'created_by' },
                        { label: () =>  t('bank_disbursement_bill_icici_2.order_no') , prop: 'order_no' },
                        { label: () =>  t('bank_disbursement_bill_icici_2.upload_id') , prop: 'upload_id' },
                        { label: () =>  t('bank_disbursement_bill_icici_2.file_hash') , prop: 'file_hash' },
                        { label: () =>  t('bank_disbursement_bill_icici_2.rejection_reason') , prop: 'rejection_reason' },
          
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
            show: ({ row }) => showBtn('transaction:bank_disbursement_bill_icici2:update', row),
            text: () => t('crud.edit'),
            onClick: ({ row }) => {
              dialog.setTitle(t('crud.edit'))
              dialog.open({ formType: 'edit', data: row })
            },
          },
          {
            name: 'del',
            show: ({ row }) => showBtn('transaction:bank_disbursement_bill_icici2:delete', row),
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
