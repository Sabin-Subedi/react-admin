
import { DataProvider } from 'react-admin';
import { PaginatedResponse } from '../interface/PaginatedResponse';
import { myAxios } from '../lib/axios';


export const dataProvider: DataProvider = {
    getList: (resource, params) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;

        const query = {
            page: JSON.stringify(page),
            page_size: JSON.stringify(perPage),
            sort: JSON.stringify([field, order]),
            filter: JSON.stringify(params.filter),
        };

        return myAxios({
            url: resource,
            method: 'GET',
            params: query
        }).then(({ data }) => {
            const paginatedData = data as PaginatedResponse
            return {
                data: data?.records,
                total: paginatedData.total_records
            };
        });
    },
    getOne: (resource, params) => {
        return myAxios({
            url: `${resource}/${params.id}`,
            method: 'GET',
        }).then(({ data }) => {
            return {
                data: data
            };
        });
    },
    getMany: () => Promise.resolve({
        data: []
    }),
    getManyReference: () => Promise.resolve({
        data: []
    }),
    update: (resource, params) => {
        return myAxios({
            url: `${resource}/${params.id}`,
            method: 'PATCH',
            data: params.data
        }).then(({ data }) => {
            return {
                data: data
            };
        });
    },
    updateMany: () => Promise.resolve({
        data: []
    }),
    create: (resource, params) => {
        return myAxios({
            url: resource,
            method: 'POST',
            data: params.data
        }).then(({ data }) => {
            return {
                data: data
            };
        });
    },
    delete: (resource, params) => {
        return myAxios({
            url: `${resource}/${params.id}`,
            method: 'DELETE',
        }).then(({ data }) => {
            return {
                data: data
            };
        });
    },
    deleteMany: () => Promise.resolve({}),

}

