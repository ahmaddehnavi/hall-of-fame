
export interface IResourceUpdater<ResponseType, ErrorType> {

    notifyLoading()

    notifySuccess(response: ResponseType)

    notifyError(error: ErrorType)

    reset()
}