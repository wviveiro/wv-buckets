export type BulkGroupItem = {
    category: string;
    amount: number;
    description: string;
};

export type BulkGroup = {
    name: string;
    description: string;
    items: BulkGroupItem[];
};

export type BulkSetting = {
    list: BulkGroup[];
};
