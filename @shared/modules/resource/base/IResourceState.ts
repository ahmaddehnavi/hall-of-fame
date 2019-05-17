export type ResourceStateType = 'none' | 'loading' | 'success' | 'error';

export interface IResourceState {
    readonly state: ResourceStateType

    readonly isLoading: boolean

    readonly isError: boolean

    readonly isSuccess: boolean

    readonly isNone: boolean

}