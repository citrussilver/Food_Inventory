const path = require('path');

module.exports = {
    outputDir: path.resolve(__dirname, '../server/public'),
    configureWebpack: {
        devServer: {
            proxy: {
                '/api': {
                    target: 'http://localhost:9000/'
                }
            }
        }
    }
}