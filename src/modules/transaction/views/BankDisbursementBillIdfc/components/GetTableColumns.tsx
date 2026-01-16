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
import type { BankDisbursementBillIdfcVo } from '~/transaction/api/BankDisbursementBillIdfc.ts'
import type { UseDialogExpose } from '@/hooks/useDialog.ts'

import { useMessage } from '@/hooks/useMessage.ts'
import { deleteByIds } from '~/transaction/api/BankDisbursementBillIdfc.ts'
import { ResultCode } from '@/utils/ResultCode.ts'
import hasAuth from '@/utils/permission/hasAuth.ts'

export default function getTableColumns(dialog: UseDialogExpose, formRef: any, t: any): MaProTableColumns[] {
  const dictStore = useDictStore()
  const msg = useMessage()

  const showBtn = (auth: string | string[], row: BankDisbursementBillIdfcVo) => {
    return hasAuth(auth)
  }

  return [
    // 多选列
    { type: 'selection', showOverflowTooltip: false, label: () => t('crud.selection') },
    // 索引序号列
    { type: 'index' },
    // 普通列
                  { label: () =>  t('bank_disbursement_bill_idfc.bill_id') , prop: 'bill_id' },
                        { label: () =>  t('bank_disbursement_bill_idfc.beneficiary_name') , prop: 'beneficiary_name' },
                        { label: () =>  t('bank_disbursement_bill_idfc.beneficiary_account_number') , prop: 'beneficiary_account_number' },
                        { label: () =>  t('bank_disbursement_bill_idfc.ifsc') , prop: 'ifsc' },
                        { label: () =>  t('bank_disbursement_bill_idfc.transaction_type') , prop: 'transaction_type' },
                        { label: () =>  t('bank_disbursement_bill_idfc.debit_account_no') , prop: 'debit_account_no' },
                        { label: () =>  t('bank_disbursement_bill_idfc.transaction_date') , prop: 'transaction_date' },
                        { label: () =>  t('bank_disbursement_bill_idfc.amount') , prop: 'amount' },
                        { label: () =>  t('bank_disbursement_bill_idfc.currency') , prop: 'currency' },
                        { label: () =>  t('bank_disbursement_bill_idfc.beneficiary_email_id') , prop: 'beneficiary_email_id' },
                        { label: () =>  t('bank_disbursement_bill_idfc.remarks') , prop: 'remarks' },
                        { label: () =>  t('bank_disbursement_bill_idfc.utr_number') , prop: 'utr_number' },
                        { label: () =>  t('bank_disbursement_bill_idfc.status') , prop: 'status' },
                        { label: () =>  t('bank_disbursement_bill_idfc.errors') , prop: 'errors' },
                        { label: () =>  t('bank_disbursement_bill_idfc.created_at') , prop: 'created_at' },
                        { label: () =>  t('bank_disbursement_bill_idfc.created_by') , prop: 'created_by' },
                        { label: () =>  t('bank_disbursement_bill_idfc.order_no') , prop: 'order_no' },
                        { label: () =>  t('bank_disbursement_bill_idfc.upload_id') , prop: 'upload_id' },
                        { label: () =>  t('bank_disbursement_bill_idfc.file_hash') , prop: 'file_hash' },
          
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
            show: ({ row }) => showBtn('transaction:bank_disbursement_bill_idfc:update', row),
            text: () => t('crud.edit'),
            onClick: ({ row }) => {
              dialog.setTitle(t('crud.edit'))
              dialog.open({ formType: 'edit', data: row })
            },
          },
          {
            name: 'del',
            show: ({ row }) => showBtn('transaction:bank_disbursement_bill_idfc:delete', row),
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
