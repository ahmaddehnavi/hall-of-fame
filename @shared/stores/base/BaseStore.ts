export class BaseStore<P> {
    protected readonly props: P;

    constructor(props: P) {
        this.props = props
    }
}