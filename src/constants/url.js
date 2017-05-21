const getApi = (url) => '/api' + url;

export const LOGIN=getApi('/login');
//入库管理
export const GET_INSTOCK_DATA=getApi('/instock/list');
export const INSTOCK_EDIT=getApi('/instock/edit');
export const INSTOCK_DELETE=getApi('/instock/delete');
export const NEW_INSTOCK_LIST=getApi('/instock/newlist');
//统计
export const GET_STATISTICS_DATA=getApi('/statistics/data');
