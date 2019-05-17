export interface IService<Config extends { [key: string]: IService<any> } = any> {
    /**
     * should be call before start to provide required configs (other service instance)
     * @param config
     */
    init(config: Config)

    onStart()

    onStop()
}

export default IService;