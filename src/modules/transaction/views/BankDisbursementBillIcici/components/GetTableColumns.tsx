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
import type { BankDisbursementBillIciciVo } from '~/transaction/api/BankDisbursementBillIcici.ts'
import type { UseDialogExpose } from '@/hooks/useDialog.ts'

import { useMessage } from '@/hooks/useMessage.ts'
import { deleteByIds } from '~/transaction/api/BankDisbursementBillIcici.ts'
import { ResultCode } from '@/utils/ResultCode.ts'
import hasAuth from '@/utils/permission/hasAuth.ts'

export default function getTableColumns(dialog: UseDialogExpose, formRef: any, t: any): MaProTableColumns[] {
  const dictStore = useDictStore()
  const msg = useMessage()

  const showBtn = (auth: string | string[], row: BankDisbursementBillIciciVo) => {
    return hasAuth(auth)
  }

  return [
    // 多选列
    { type: 'selection', showOverflowTooltip: false, label: () => t('crud.selection') },
    // 索引序号列
    { type: 'index' },
    // 普通列
                  { label: () =>  t('bank_disbursement_bill_icici.bill_id') , prop: 'bill_id' },
                        { label: () =>  t('bank_disbursement_bill_icici.pymt_mode') , prop: 'pymt_mode' },
                        { label: () =>  t('bank_disbursement_bill_icici.file_sequence_num') , prop: 'file_sequence_num' },
                        { label: () =>  t('bank_disbursement_bill_icici.debit_acct_no') , prop: 'debit_acct_no' },
                        { label: () =>  t('bank_disbursement_bill_icici.beneficiary_name') , prop: 'beneficiary_name' },
                        { label: () =>  t('bank_disbursement_bill_icici.beneficiary_account_no') , prop: 'beneficiary_account_no' },
                        { label: () =>  t('bank_disbursement_bill_icici.bene_ifsc_code') , prop: 'bene_ifsc_code' },
                        { label: () =>  t('bank_disbursement_bill_icici.amount') , prop: 'amount' },
                        { label: () =>  t('bank_disbursement_bill_icici.remark') , prop: 'remark' },
                        { label: () =>  t('bank_disbursement_bill_icici.pymt_date') , prop: 'pymt_date' },
                        { label: () =>  t('bank_disbursement_bill_icici.status') , prop: 'status' },
                        { label: () =>  t('bank_disbursement_bill_icici.rejection_reason') , prop: 'rejection_reason' },
                        { label: () =>  t('bank_disbursement_bill_icici.customer_ref_no') , prop: 'customer_ref_no' },
                        { label: () =>  t('bank_disbursement_bill_icici.utr_no') , prop: 'utr_no' },
                        { label: () =>  t('bank_disbursement_bill_icici.order_no') , prop: 'order_no' },
                        { label: () =>  t('bank_disbursement_bill_icici.upload_id') , prop: 'upload_id' },
                        { label: () =>  t('bank_disbursement_bill_icici.file_hash') , prop: 'file_hash' },
                        { label: () =>  t('bank_disbursement_bill_icici.created_at') , prop: 'created_at' },
                    
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
            show: ({ row }) => showBtn('transaction:bank_disbursement_bill_icici:update', row),
            text: () => t('crud.edit'),
            onClick: ({ row }) => {
              dialog.setTitle(t('crud.edit'))
              dialog.open({ formType: 'edit', data: row })
            },
          },
          {
            name: 'del',
            show: ({ row }) => showBtn('transaction:bank_disbursement_bill_icici:delete', row),
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
