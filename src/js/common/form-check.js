// 1. design - export a function
// 2. API设计  2.1 check($input, 'mobile', cb) 
// 2.2 <input type="text" valid="mobile, present" name="mobile" />
const rules = {
  mobile: v => {
    return
  },
  email: v => {
    return
  },
  present: v => {
    if (!v.trim()) {
      return {
        type: 'present',
        message: '必填'
      }
    }    
  }
}

export const check = form => {  
  if (!form.elements) return
  
  const elements = form.elements
  let checkResults = []

  let elementsArr = Array.from(elements)
  elementsArr.filter(item => {
    return item.getAttribute('valid')
  }).map(item => {
    const valids = item.getAttribute('valid').split(', ')
    const value = item.value
    let errorArr = []
    valids.forEach(valid => {
      if (rules[valid]) {
        let result = rules[valid](value)
        result && errorArr.push(result)
      }
    })

    if (errorArr.length) {
      checkResults.push({
        dom: item,
        errorArr,
        name: item.name,
        message: errorArr[0].message,
        type: errorArr[0].type
      })
    }
  })

  return checkResults
}
