import {ListResource} from './ListResource';

describe('ListResource Tests', () => {

    let listLoader = async (req, {page}) => {
        let items = new Array(10).map((_, index) => (page - 1) * 10 + index);
        return ({
            // generate [page * 10 ,page * 10 +1 ,...]
            items,
            page,
            isFinished: false,
            message: ''
        });
    };

    it('should load 10 item per page', async () => {
        let res = new ListResource(listLoader);
        expect(res.items).toHaveLength(0);

        await res.loadFirstPage();
        expect(res.items).toHaveLength(10);

        await res.loadNextPage();
        expect(res.items).toHaveLength(20);

        await res.loadNextPage();
        expect(res.items).toHaveLength(30);

    });

    it('should loadFirstPage clear list', async () => {
        let res = new ListResource(listLoader);
        expect(res.items).toHaveLength(0);

        await res.loadFirstPage();
        expect(res.items).toHaveLength(10);

        await res.loadNextPage();
        expect(res.items).toHaveLength(20);

        await res.loadFirstPage();
        expect(res.items).toHaveLength(10);

    });

});