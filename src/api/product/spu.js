import request from '@/utils/request'

// 获取SPU列表      /admin/product/{page}/{limit}       get         page limit category3Id
export const reqSpuList = (page,limit,category3Id) => request({url:`/admin/product/${page}/${limit}`,method:'get',params:{category3Id}})

// 获取Spu 信息     /admin/product/getSpuById/{spuId}       get
export const reqSpu = (spuId) => request({url:`/admin/product/getSpuById/${spuId}`,method:'get'})
// 获取品牌信息     /admin/product/baseTrademark/getTrademarkList       get
export const reqTradeMarkList = () => request({url:'/admin/product/baseTrademark/getTrademarkList',method:'get'})
// 获取图片信息     /admin/product/spuImageList/{spuId}     get
export const reqSpuImageList = (spuId) => request({url:`/admin/product/spuImageList/${spuId}`,method:'get'})
// 获取销售信息     /admin/product/baseSaleAttrList     get
export const reqBaseSaleAttrList = () => request({url:'/admin/product/baseSaleAttrList',method:'get'})

// 修改 添加 spu 
export const reqAddOrUpdateSpu = (spuInfo) =>{
    // 有id  修改spu
    if(spuInfo.id){
        return request({url:`/admin/product/updateSpuInfo`,method:'post',data:spuInfo})
    }else{  // 无ID  添加spu
        return request({url:`/admin/product/saveSpuInfo`,method:'post',data:spuInfo})
    }
}

// 删除spu
export const reqDeleteSpu = (spuId) => request({url:`admin/product/deleteSpu/${spuId}`,method:'delete'})

// 获取销售属性     /admin/product/spuSaleAttrList/{spuId}  get
export const reqSpuSaleAttrList = (spuId)=>request({url:`/admin/product/spuSaleAttrList/${spuId}`,method:'get'})
// 获取平台属性     /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}       get
export const reqAttrInfoList = (category1Id,category2Id,category3Id)=>request({url:`/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,method:'get'})

// 添加sku      /admin/product/saveSkuInfo      post
export const reqAddSku  = (skuInfo) =>request({url:`/admin/product/saveSkuInfo`,method:'post',data:skuInfo})

// 查看sku      /admin/product/findBySpuId/{spuId}      get
export const reqSkuList = (spuId) =>request({url:`/admin/product/findBySpuId/${spuId}`,method:'get'})

