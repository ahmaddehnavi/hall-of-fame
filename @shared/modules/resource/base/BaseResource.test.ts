import {BaseResource} from './BaseResource';

describe('BaseResource Tests', () => {
    it('should success state work correctly', async () => {
        let res = new BaseResource<{ req: string }, string, any, any>(
            req => Promise.resolve(req.req)
        );
        expect(res.isNone).toBe(true);
        expect(res.isError).toBe(false);
        expect(res.isLoading).toBe(false);
        expect(res.isSuccess).toBe(false);

        await res.load({req: 'test'}, {});

        expect(res.isNone).toBe(false);
        expect(res.isError).toBe(false);
        expect(res.isLoading).toBe(false);

        expect(res.isSuccess).toBe(true);
        expect(res.response).toBe('test');
    });

    it('should error state work correctly', async () => {
        let res = new BaseResource<{ req: string }, string, any, any>(
            req => Promise.reject(req.req)
        );
        expect(res.isNone).toBe(true);
        expect(res.isError).toBe(false);
        expect(res.isLoading).toBe(false);
        expect(res.isSuccess).toBe(false);

        await res.load({req: 'test'}, {});

        expect(res.isNone).toBe(false);
        expect(res.isSuccess).toBe(false);
        expect(res.isLoading).toBe(false);

        expect(res.isError).toBe(true);
        expect(res.error).toBe('test');
        expect(res.response).toBeUndefined();
    });


    it('should notifyError work correctly', async () => {
        let res = new BaseResource<{ req: string }, string, any, any>(
            req => Promise.resolve(req.req)
        );
        expect(res.isNone).toBe(true);
        expect(res.isError).toBe(false);
        expect(res.isLoading).toBe(false);
        expect(res.isSuccess).toBe(false);

        res.notifyError('test');

        expect(res.isNone).toBe(false);
        expect(res.isSuccess).toBe(false);
        expect(res.isLoading).toBe(false);

        expect(res.isError).toBe(true);
        expect(res.error).toBe('test');
        expect(res.response).toBeUndefined();
    });
    it('should notifySuccess work correctly', async () => {
        let res = new BaseResource<{ req: string }, string, any, any>(
            req => Promise.reject(req.req)
        );
        expect(res.isNone).toBe(true);
        expect(res.isError).toBe(false);
        expect(res.isLoading).toBe(false);
        expect(res.isSuccess).toBe(false);

        res.notifySuccess('test');

        expect(res.isNone).toBe(false);
        expect(res.isLoading).toBe(false);
        expect(res.isError).toBe(false);

        expect(res.isSuccess).toBe(true);
        expect(res.response).toBe('test');
        expect(res.error).toBeUndefined();
    });


    it('should notifyLoading work correctly', async () => {
        let res = new BaseResource<{ req: string }, string, any, any>(
            req => Promise.reject(req.req)
        );
        expect(res.isNone).toBe(true);
        expect(res.isError).toBe(false);
        expect(res.isLoading).toBe(false);
        expect(res.isSuccess).toBe(false);

        res.notifyLoading();

        expect(res.isNone).toBe(false);
        expect(res.isError).toBe(false);
        expect(res.isSuccess).toBe(false);

        expect(res.isLoading).toBe(true);
        expect(res.response).toBeUndefined();
        expect(res.error).toBeUndefined();


    });


    it('should notifyNone work correctly', async () => {
        let res = new BaseResource<{ req: string }, string, any, any>(
            req => Promise.reject(req.req)
        );
        expect(res.isNone).toBe(true);
        expect(res.isError).toBe(false);
        expect(res.isLoading).toBe(false);
        expect(res.isSuccess).toBe(false);
        expect(res.response).toBeUndefined();
        expect(res.error).toBeUndefined();

        res.notifySuccess('test');

        expect(res.isNone).toBe(false);
        expect(res.isError).toBe(false);
        expect(res.isLoading).toBe(false);
        expect(res.isSuccess).toBe(true);
        expect(res.response).toBe('test');
        expect(res.error).toBeUndefined();

        res.reset();

        expect(res.isNone).toBe(true);
        expect(res.isError).toBe(false);
        expect(res.isLoading).toBe(false);
        expect(res.isSuccess).toBe(false);
        expect(res.response).toBeUndefined();
        expect(res.error).toBeUndefined();

    });


    it('should notifyError to be called', async () => {
        let res = new BaseResource<string, string, any, any>(
            req => Promise.reject(req)
        );
        let notifyErrorSpy = jest.spyOn(BaseResource.prototype, 'notifyError');
        let notifySuccessSpy = jest.spyOn(BaseResource.prototype, 'notifySuccess');
        let notifyLoadingSpy = jest.spyOn(BaseResource.prototype, 'notifyLoading');

        await res.load('test', '');
        expect(notifyErrorSpy).toBeCalledWith('test');
        expect(notifyLoadingSpy).toBeCalled();
        expect(notifySuccessSpy).not.toBeCalled();

        notifyErrorSpy.mockClear();
        notifySuccessSpy.mockClear();
        notifyLoadingSpy.mockClear()

    });

    it('should notifySuccess to be called', async () => {
        let res = new BaseResource<string, string, any, any>(
            req => Promise.resolve(req)
        );
        let notifyErrorSpy = jest.spyOn(BaseResource.prototype, 'notifyError');
        let notifySuccessSpy = jest.spyOn(BaseResource.prototype, 'notifySuccess');
        let notifyLoadingSpy = jest.spyOn(BaseResource.prototype, 'notifyLoading');

        await res.load('test', '');
        expect(notifySuccessSpy).toBeCalledWith('test');
        expect(notifyLoadingSpy).toBeCalled();
        expect(notifyErrorSpy).not.toBeCalled();

        notifyErrorSpy.mockClear();
        notifySuccessSpy.mockClear();
        notifyLoadingSpy.mockClear()

    });
});