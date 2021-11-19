// ----------------------------------- 退出登录 ------------------
$('.logout a').on('click', function () {
  $('.logout a').on('click', function () {
    if (!confirm('退出登录吗？')) {
      return
    }
    localStorage.removeItem('token')
    location.href = './login.html'
  })
})
// ----------------------------------- 获取学员数据 ---------------
function render() {
  axios.get('/student/list').then(({ data: res }) => {
    console.log(res)
    if (res.code === 0) {
      $('tbody').empty()
      res.data.forEach(function (item, index) {
        let theTr = `
      <tr>
              <th scope="row">${index + 1}</th>
              <td>${item.name}</td>
              <td>${item.age}</td>
              <td>${item.sex}</td>
              <td>${item.group}</td>
              <td>${item.phone}</td>
              <td>${item.salary}</td>
              <td>${item.truesalary}</td>
              <td>${item.province}</td>
              <td>
                <button type="button" class="btn btn-danger btn-sm" data-id="${
                  item.id
                }">删除</button>
              </td>
     </tr>
  
      `
        $('tbody').append(theTr)
      })
    }
  })
}
render()
// ----------------------------------- 删除学员 --------------------

$('tbody').on('click', '.btn-sm', function () {
  if (!confirm('确定删除吗？')) {
    return
  }
  let id = $(this).attr('data-id')
  axios({
    method: 'DELETE',
    url: '/student/delete',
    params: {
      id,
    },
  }).then(({ data: res }) => {
    console.log(res)
    if (res.code === 0) {
      alert(res.message)
      render()
    }
  })
})

// ------------------------------------ 初始化数据 (一进入页面自动执行)-------------------------------
// 此接口随机创建50名学员  ------ 不需要做任何处理
axios.get('/init/data').then(({ data: res }) => {
  if (res.code === 0) {
    alert(res.message)
  }
})

// 判断本地身份认证
if (!localStorage.getItem('token')) {
  location.href = './login.html'
}
