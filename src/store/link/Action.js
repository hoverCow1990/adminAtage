/*
 * 根据用户的点击控制侧导航的高亮部分
 */

export const DO_LINK = "DO_LINK";
export const doLink = currentLink => ({
	type : DO_LINK,
	currentLink
})
