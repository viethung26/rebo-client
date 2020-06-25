
const ErrorMessage = {
    800: "Sai tên người dùng hoặc mật khẩu"
}

const getErrorMessage = (code: number) => {
    if (ErrorMessage.hasOwnProperty(code)) {
        return ErrorMessage[code]
    }
    return "Đã có lỗi xảy ra"
}
export default getErrorMessage