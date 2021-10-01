module.exports = {
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = "Trouver une gare par son code TVS";
                return args;
            })
    }
}
