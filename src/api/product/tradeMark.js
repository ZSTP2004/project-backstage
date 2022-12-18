import request from '@/utils/request'

// 获取品牌列表的接口  /admin/product/baseTrademark/{page}/{limit}          get
export const reqTradeMarkList = (page, limit) => request({ url: `/admin/product/baseTrademark/${page}/${limit}`, method: 'get' })

// 修改品牌       /admin/product/baseTrademark/update         put   参数：id  品牌名称 品牌logo
// 添加品牌       /admin/product/baseTrademark/save           post  参数：品牌名称 品牌logo
export const reqAddOrUpdateTradeMark = (tradeMark) => {
// 有 id 就修改
    if (tradeMark.id) {
        return request({ url: '/admin/product/baseTrademark/update', method: 'put', data: tradeMark })
    } else {
        // 添加品牌信息
        return request({ url: '/admin/product/baseTrademark/save', method: 'post', data: tradeMark })
    }
}

// 删除品牌信息     /admin/product/baseTrademark/remove/{id}        delete
export const reqDeleteTradeMark = (Id) => request({ url: `/admin/product/baseTrademark/remove/${Id}`, method: 'delete' })