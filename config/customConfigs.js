const paths = require('./paths')

exports.customAliases = {
    "@m": paths.appModules,
    "@c": paths.appComponents,
    "@p": paths.appPlugs,
    "@test": paths.appPlugs,
    "@Lang": paths.appLang
}
exports.customProxy = {
    '/api': 'http://localhost:8080',
    '/socket.io': {
        target: 'http://localhost:8080',
        ws: true
    }
}
const antdCustomStyle = {
    'primary-color': '#1DA57A',
    'comment-padding-base': "8px 0",
    '@list-empty-text-padding': 0

}
exports.lessLoaderRule = {
    test: /\.less$/,
    use: [
        {
            loader: 'style-loader'
        }, {
            loader: 'css-loader'
        }, {
            loader: 'less-loader',
            options: {
                lessOptions: {
                    modifyVars: antdCustomStyle,
                    javascriptEnabled: true
                }
            }
        }
    ]

}