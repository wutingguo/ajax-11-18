// ------------------------------- 切换登录注册两个盒子 ------------------------------------
$('.mb-3').on('click', 'a', function () {
  $(this)
    .parents('.login')
    .css('display', 'none')
    .siblings()
    .css('display', 'block')
  $(this)
    .parents('.register')
    .css('display', 'none')
    .siblings()
    .css('display', 'block')
})

// -------------------------------     注册功能      ------------------------------------
$('.register .btn').on('click', function (e) {
  e.preventDefault()
  //   console.log(1)
  let username = $('.register [name=username]').val()
  let password = $('.register [name=password]').val()
  //   console.log(username)
  axios({
    method: 'POST',
    url: '/api/register',
    data: {
      username,
      password,
    },
  }).then(({ data: res }) => {
    console.log(res)
    if (res.code === 0) {
      alert(res.message + '进入登录页面,请登录')
      $('.form-box .login')
        .css('display', 'block')
        .siblings()
        .css('display', 'none')
    } else {
      alert(res.message)
    }
  })
})
// -------------------------------     登录功能      ------------------------------------
$('.login .btn').on('click', function (e) {
  e.preventDefault()
  //   console.log(1)
  let username = $('.login [name=username]').val()
  let password = $('.login [name=password]').val()
  console.log(username)
  axios({
    method: 'POST',
    url: '/api/login',
    data: {
      username,
      password,
    },
  }).then(({ data: res }) => {
    console.log(res)
    if (res.code === 0) {
      alert(res.message)
      localStorage.setItem('token', res.token)
      location.href = './index.html'
    } else {
      alert(res.message)
    }
  })
  console.log(111)
})
// 注意点: 登录成功后, 接口数据会返回一个token字段, 需要将token存储到本地localStorage中
