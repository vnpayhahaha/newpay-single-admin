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
import type { BankDisbursementBillIobOtherVo } from '~/transaction/api/BankDisbursementBillIobOther.ts'
import type { UseDialogExpose } from '@/hooks/useDialog.ts'

import { useMessage } from '@/hooks/useMessage.ts'
import { deleteByIds } from '~/transaction/api/BankDisbursementBillIobOther.ts'
import { ResultCode } from '@/utils/ResultCode.ts'
import hasAuth from '@/utils/permission/hasAuth.ts'

export default function getTableColumns(dialog: UseDialogExpose, formRef: any, t: any): MaProTableColumns[] {
  const dictStore = useDictStore()
  const msg = useMessage()

  const showBtn = (auth: string | string[], row: BankDisbursementBillIobOtherVo) => {
    return hasAuth(auth)
  }

  return [
    // 多选列
    { type: 'selection', showOverflowTooltip: false, label: () => t('crud.selection') },
    // 索引序号列
    { type: 'index' },
    // 普通列
                  { label: () =>  t('bank_disbursement_bill_iob_other.bill_id') , prop: 'bill_id' },
                        { label: () =>  t('bank_disbursement_bill_iob_other.s_no') , prop: 's_no' },
                        { label: () =>  t('bank_disbursement_bill_iob_other.name') , prop: 'name' },
                        { label: () =>  t('bank_disbursement_bill_iob_other.ifsc_code') , prop: 'ifsc_code' },
                        { label: () =>  t('bank_disbursement_bill_iob_other.type') , prop: 'type' },
                        { label: () =>  t('bank_disbursement_bill_iob_other.number') , prop: 'number' },
                        { label: () =>  t('bank_disbursement_bill_iob_other.amount') , prop: 'amount' },
                        { label: () =>  t('bank_disbursement_bill_iob_other.charges') , prop: 'charges' },
                        { label: () =>  t('bank_disbursement_bill_iob_other.status') , prop: 'status' },
                        { label: () =>  t('bank_disbursement_bill_iob_other.remarks') , prop: 'remarks' },
                        { label: () =>  t('bank_disbursement_bill_iob_other.narration') , prop: 'narration' },
                        { label: () =>  t('bank_disbursement_bill_iob_other.utr_no') , prop: 'utr_no' },
                        { label: () =>  t('bank_disbursement_bill_iob_other.reason') , prop: 'reason' },
                        { label: () =>  t('bank_disbursement_bill_iob_other.created_at') , prop: 'created_at' },
                        { label: () =>  t('bank_disbursement_bill_iob_other.created_by') , prop: 'created_by' },
                        { label: () =>  t('bank_disbursement_bill_iob_other.order_no') , prop: 'order_no' },
                        { label: () =>  t('bank_disbursement_bill_iob_other.upload_id') , prop: 'upload_id' },
                        { label: () =>  t('bank_disbursement_bill_iob_other.file_hash') , prop: 'file_hash' },
                        { label: () =>  t('bank_disbursement_bill_iob_other.rejection_reason') , prop: 'rejection_reason' },
          
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
            show: ({ row }) => showBtn('transaction:bank_disbursement_bill_iob_other:update', row),
            text: () => t('crud.edit'),
            onClick: ({ row }) => {
              dialog.setTitle(t('crud.edit'))
              dialog.open({ formType: 'edit', data: row })
            },
          },
          {
            name: 'del',
            show: ({ row }) => showBtn('transaction:bank_disbursement_bill_iob_other:delete', row),
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
