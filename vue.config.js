module.exports = {
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = "Trouver une trigramme par le nom d'une gare";
                return args;
            })
    }
}
