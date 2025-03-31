<script>
	import routingIntercept from '@/server/control/permission.js'
	export default {
		onLaunch: function() {
			// console.log('App Launch')
			// 对路由进行统一拦截，实现路由导航守卫 router.beforeEach 功能
			routingIntercept()
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	@import url("static/iconfont.css");
	/*每个页面公共css */
	body{
		background-color: rgb(239,239,239);
	}
</style>
