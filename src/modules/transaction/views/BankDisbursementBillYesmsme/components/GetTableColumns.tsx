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
import type { BankDisbursementBillYesmsmeVo } from '~/transaction/api/BankDisbursementBillYesmsme.ts'
import type { UseDialogExpose } from '@/hooks/useDialog.ts'

import { useMessage } from '@/hooks/useMessage.ts'
import { deleteByIds } from '~/transaction/api/BankDisbursementBillYesmsme.ts'
import { ResultCode } from '@/utils/ResultCode.ts'
import hasAuth from '@/utils/permission/hasAuth.ts'

export default function getTableColumns(dialog: UseDialogExpose, formRef: any, t: any): MaProTableColumns[] {
  const dictStore = useDictStore()
  const msg = useMessage()

  const showBtn = (auth: string | string[], row: BankDisbursementBillYesmsmeVo) => {
    return hasAuth(auth)
  }

  return [
    // 多选列
    { type: 'selection', showOverflowTooltip: false, label: () => t('crud.selection') },
    // 索引序号列
    { type: 'index' },
    // 普通列
                  { label: () =>  t('bank_disbursement_bill_yesmsme.bill_id') , prop: 'bill_id' },
                        { label: () =>  t('bank_disbursement_bill_yesmsme.record') , prop: 'record' },
                        { label: () =>  t('bank_disbursement_bill_yesmsme.record_ref_no') , prop: 'record_ref_no' },
                        { label: () =>  t('bank_disbursement_bill_yesmsme.file_ref_no') , prop: 'file_ref_no' },
                        { label: () =>  t('bank_disbursement_bill_yesmsme.ebanking_ref_no') , prop: 'ebanking_ref_no' },
                        { label: () =>  t('bank_disbursement_bill_yesmsme.contract_ref_no') , prop: 'contract_ref_no' },
                        { label: () =>  t('bank_disbursement_bill_yesmsme.record_status') , prop: 'record_status' },
                        { label: () =>  t('bank_disbursement_bill_yesmsme.status_code') , prop: 'status_code' },
                        { label: () =>  t('bank_disbursement_bill_yesmsme.status_description') , prop: 'status_description' },
                        { label: () =>  t('bank_disbursement_bill_yesmsme.created_at') , prop: 'created_at' },
                        { label: () =>  t('bank_disbursement_bill_yesmsme.created_by') , prop: 'created_by' },
                        { label: () =>  t('bank_disbursement_bill_yesmsme.order_no') , prop: 'order_no' },
                        { label: () =>  t('bank_disbursement_bill_yesmsme.upload_id') , prop: 'upload_id' },
                        { label: () =>  t('bank_disbursement_bill_yesmsme.file_hash') , prop: 'file_hash' },
          
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
            show: ({ row }) => showBtn('transaction:bank_disbursement_bill_yesmsme:update', row),
            text: () => t('crud.edit'),
            onClick: ({ row }) => {
              dialog.setTitle(t('crud.edit'))
              dialog.open({ formType: 'edit', data: row })
            },
          },
          {
            name: 'del',
            show: ({ row }) => showBtn('transaction:bank_disbursement_bill_yesmsme:delete', row),
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
