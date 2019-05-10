export class PXAsyncUtil {
    static wait(time: number) {
        return new Promise(resolve => {
            setTimeout(resolve, time)
        })
    }

    /**
     * should be only use in test
     */
    static waitForAllAsync(extraTime = 0) {
        return new Promise(resolve => {
            setImmediate(() => setTimeout(resolve, extraTime))
        })
    }

}