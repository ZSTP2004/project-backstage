// 将那4个接口统一暴露
import *as trademark from './product/tradeMark'
import *as spu from './product/spu'
import *as attr from './product/attr'
import *as sku from './product/sku'
import * as user from './acl/user'
import  role from './acl/role'
import permission from './acl/permission'

// 对外暴露
export default {
    trademark,
    spu,
    attr,
    sku,
    user,
    role,
    permission,
}