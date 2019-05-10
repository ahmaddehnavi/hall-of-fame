export interface PXIService<Config extends { [key: string]: PXIService<any> } = any> {
    $init(config: Config)

    $onStart()

    $onStop()
}

export default PXIService;