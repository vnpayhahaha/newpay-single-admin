interface Tool {
  formatMoney: (num?: string | number, fixed?: number) => string;
  download: (res: any, downName?: string) => void; 
}

const tool:Tool = {
    formatMoney: (num, fixed = 2) => {
       if (!num) return '0.00'
        // 如果num是字符串，则先转为数字
        num = typeof num === 'string' ? Number(num) : num
        return num.toFixed(fixed)
    },
    download: (res, downName = '') => {
      const aLink = document.createElement('a')
      let fileName = downName
      let blob = res

      if (res.headers && res.data) {
        blob = new Blob([res.data], { type: res.headers['content-type']?.replace(';charset=utf8', '') })
        if (!downName && res.headers['content-disposition']) {
          const contentDisposition = decodeURI(res.headers['content-disposition'])
          const result = contentDisposition.match(/filename\*=utf-8\'\'(.+)/gi)
          if (result?.[0]) {
            fileName = result[0].replace(/filename\*=utf-8\'\'/gi, '')
          }
        }
      }

      aLink.href = URL.createObjectURL(blob)
      aLink.setAttribute('download', fileName)
      document.body.appendChild(aLink)
      aLink.click()
      document.body.removeChild(aLink)
      URL.revokeObjectURL(aLink.href)
    }
}

export default tool
