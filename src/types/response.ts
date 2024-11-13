export type PaginationType = {
    Total: number;
    Limit: number;
    PageCurrent: number;
    PageTotal: number;
};

export type ResponseMeta<T> = {
    Message: string;
    Results: {
        Status: boolean;
        Data: T;
        Pagination?: PaginationType;
    };
};