const fetchPost = (url, params) => {
  return fetch(url, {
    method: 'POST',
    header: {
      'Content-Type': 'application/x-www-form-urlencode'
    },
    credentials: 'include',
    params
  }).then(res => {
    if (!res.ok) throw Error(res.statusText)
    return res.json()
  })
}

export {
  fetchPost
}