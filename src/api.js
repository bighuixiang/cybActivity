const API_IP  = 'http://192.168.1.17:1800/em?action=' // 记得打包项目时更换外网地址 
 
//   ===>许愿
export const WishApi              =  `${API_IP}wish` 

//   ===>获取红包数量
export const QueryRedCountApi     =  `${API_IP}query_red_count` 

//   ===>抽奖
export const OpenRedApi           =  `${API_IP}open_red` 

//   ===>查看是否已许愿
export const QueryWishStateApi    =  `${API_IP}query_wish_state` 

//   ===>设置收货信息
export const UpdateAddressApi     =  `${API_IP}update_address` 

//   ===>查看当前许愿总数
export const QueryTotalWishApi    =  `${API_IP}query_total_wish` 

//   ===>查看他人愿望
export const QueryOtherWishApi    =  `${API_IP}query_other_wish` 

//   ===>查看我的祝福(分享者的祝福)
export const QueryBlessApi        =  `${API_IP}query_bless` 

//   ===>给分享者发送祝福
export const BlessApi             =  `${API_IP}bless` 

//   ===>给分享者发送祝福
export const QueryBlessStateApi   =  `${API_IP}query_bless_state` 


 



