export interface IService<Config extends { [key: string]: IService<any> } = any> {
    $init(config: Config)

    $onStart()

    $onStop()
}

export default IService;