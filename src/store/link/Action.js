/*
 * 根据用户的点击控制侧导航的高亮部分
 */

export const DO_LINK = "DO_LINK";
export const doLink = currentLink => ({
	type : DO_LINK,
	currentLink
})

/*
 * 在主页面的分页列表内,用户本人点击后会记录该数值
 * 回退后从该页开始渲染
 */

export const DO_PAGINATION = 'showPagination';
export const doPagination = currentPagination => ({
	type : DO_PAGINATION,
	currentPagination
})
