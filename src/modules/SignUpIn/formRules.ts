
const usernameRules = [
    {
        required: true,
        message: 'Vui lòng nhập tên người dùng!'
    },
    {
        pattern: new RegExp("^[a-z]([a-z]|[0-9])*$"),
        whitespace: true,
        message: 'Tên tài khoản bắt đầu bằng 1 chữ cái, không được chứa dấu, khoảng trắng và kí tự đặc biệt!'
    },
    {
        min: 4,
        message: 'Cần ít nhất 4 kí tự'
    },
    {
        max: 20,
        message: 'Tối đa 20 kí tự'
    }
]
const passwordRules = [
    {
        required: true,
        message: 'Vui lòng nhập mật khẩu!'
    },
    {
        min: 6,
        message: 'Cần ít nhất 6 kí tự'
    },
    {
        max: 30,
        message: 'Tối đa 30 kí tự'
    }
]
const passwordRules2 = [
    ...passwordRules,
    ({ getFieldValue }) => ({
        validator(rule, value) {
            if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
            }
            return Promise.reject('Mật khẩu bạn nhập không trùng khớp, vui lòng nhập lại!');
        },
    }),
]

export {
    usernameRules,
    passwordRules,
    passwordRules2
}