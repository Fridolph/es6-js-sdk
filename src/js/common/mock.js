import regionData from './data/region-data.js';
import FetchMock from 'fetch-mock';

// 配置需要mock的路由
FetchMock.mock('/login', (url, opts) => {
    const params = opts.params;
    if (params.account === '18512345678') {
        if (params.password === '123456') {
            return {code: 200, message: 'success'};
        }
        else {
            return {code: 401, message: '密码错误'};
        }
    }
    else {
        return {code: 400, message: '用户名错误'};
    }
});

// 获取验证token
FetchMock.mock('/getMobileVerifyToken', (url, opts) => {
    return {code: 200, message: 'success', mobileVerifyToken: 'abc123456'};
});
FetchMock.mock('/register/getVerifyCode', (url, opts) => {
    const params = opts.params;
    return {code: 200, message: 'success', mobile: params.mobile };
});

FetchMock.mock('/register/mobile', (url, opts) => {
    const params = opts.params;
    if (params.verifyCode === '123456') {
        return {code: 200, message: 'success'}
    }
    else {
        return {code: 400, message: 'invalid verifyCode'}
    }
});
FetchMock.mock('/register/info', {code: 200, message: 'success'});
FetchMock.mock('/save-delivery', {code: 200, message: 'success'});
FetchMock.mock('/del-delivery', {code: 200, message: 'success'});

// 获取省市区数据
FetchMock.mock('/region-data', (url, opts) => {
    return { code: 200, message: 'success', data: regionData }
});

FetchMock.mock('/delivery-address', {
    code: 200,
    message: 'success',
    data: [{
        name: '张三',
        regionSting: '北京市东城区',
        regionCode: '1,1,1',
        detailAddress: '和平北街334号',
        postalcode: '100000',
        mobile: 18512567389,
        telephone: '',
        addrId: 345
    },
    {
        name: '张三',
        regionSting: '北京市西城区',
        regionCode: '1,1,2',
        detailAddress: '和平西街234号',
        postalcode: '100000',
        mobile: 18512567389,
        telephone: '',
        addrId: 346
    },
    {
        name: '李四',
        regionSting: '上海市静安区',
        regionCode: '9,73,723',
        detailAddress: '和平北街334号',
        postalcode: '100000',
        mobile: 18517384387,
        telephone: '',
        addrId: 347
    }]
})

FetchMock.mock('/profile', {
    code: 200,
    message: 'success',
    data: {
        nickname: 'xiaoming',
        regionSting: '上海市静安区',
        regionCode: '9,73,723',
        mobile: '18567286637',
        email: 'xiaomong@163.com',
        birthday: '2017-09-06',
        realname: '李明',
        sex: 1
    }
});

FetchMock.mock('/security-info', {
    code: 200,
    message: 'success',
    data: {
        nickname: 'xiaoming',
        mobile: '18567286637',
        email: 'xiaomong@163.com',
        password: 1,
        identity: 1,
        secretQuestion: 0
    }
});

FetchMock.mock('/forget', (url, opts) => {
    const params = opts.params;
    if (params.verifyCode === '123456') {
        return {code: 200, message: 'success'}
    }
    else {
        return {code: 400, message: 'invalid verifyCode'}
    }
});

FetchMock.mock('/send-forget-verifycode', {
    code: 200,
    message: 'success'
});



// // 其他路由使用原生fetch，这段代码必须放最后
FetchMock.mock('*', (url, options) => {
  FetchMock.restore();
  return fetch(url, options);
});
