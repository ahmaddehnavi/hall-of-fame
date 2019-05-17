import {Resource} from './Resource';

describe('Resource Tests', () => {

    let data = {test: 'test'};
    let loader = async (req) => {
        return ({
            data,
            message: ''
        });
    };

    it('should load data correctly', async () => {
        let res = new Resource(loader);
        expect(res.response).toBeUndefined();
        expect(res.data).toBeUndefined();
        expect(res.isNone).toBe(true);
        expect(res.isLoading).toBe(false);
        expect(res.isSuccess).toBe(false);
        expect(res.isError).toBe(false);
        await res.load();
        expect(res.response).toBeDefined();
        expect(res.data).toBeDefined();
        expect(res.isNone).toBe(false);
        expect(res.isLoading).toBe(false);
        expect(res.isSuccess).toBe(true);
        expect(res.isError).toBe(false);
        expect(res.data).toBe(data);

    });


});