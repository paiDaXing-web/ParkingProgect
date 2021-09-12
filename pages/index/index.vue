<template>
	<view class="content">
		<view class="headline">
			
			<view class="" @click="openPayment">
				<image src="../../static/images/icon_sf.png"></image>
				<view class="">停车缴费</view>
			</view>
			<view class="" @click="openParkingRecord">
				<image src="../../static/images/icon_record.png"></image>
				<view class="">停车记录</view>
			</view>
			<view class="" @click="paymentOnBehalf">
				<image src="../../static/images/icon_charges.png"></image>
				<view class="">他人代缴</view>
			</view>
			<view class="" @click="parkingSearch">
				<image src="../../static/make.png"></image>
				<view class="">预约车位</view>
			</view>
		</view>
		
		<view class="hint">
			<image src="../../static/bad.png"></image>
			<view>更多功能,请下载app体验</view>
			<button open-type="getUserInfo">点我进行授权</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				userInfo: null
			}
		},
		onShow() {
			uni.setStorageSync("token","Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb21wYW55SWQiOm51bGwsInVzZXJwaWMiOiJncm91cDEvTTAwLzAwLzAxL3dLZ0FKRjhZV25TQUhwd1RBQUZDU0FnVVZZWTQ3Ni5qcGciLCJ1c2VyX25hbWUiOiJsYW93YW5nIiwic2NvcGUiOlsiYXBwIl0sIm5hbWUiOiJsYW93YW5nIiwidXR5cGUiOiIwIiwiaWQiOiIxMjEwODA1MjgwMjQwOTMwODE2IiwiZXhwIjoxNTk4NzU2MzcwLCJhdXRob3JpdGllcyI6WyJjYXJwYXJrLUNmQ2FyUGFya0NoZWNrcG9pbnRDb250cm9sbGVyLWdldExpc3RCeVF1ZXJ5IiwicGF5LUNmUGF5bWVudEFnZW5jeUNvbnRyb2xsZXItYWRkIiwicGF5LUNmUGF5bWVudEFnZW5jeUNvbnRyb2xsZXItZGVsZXRlIiwiY2FycGFyay1DZkNhclBhcmtQYWNrYWdlQ29udHJvbGxlci1nZXRQYWNrYWdlUHJpY2VMaXN0QnlRdWVyeSIsInBheS1DZkNvdXBvbkNvbnRyb2xsZXItdXBkYXRlIiwiY2FycGFyay1DZkNhclBhcmtQYWNrYWdlQ29udHJvbGxlci1hZGQiLCJwYXktQ2ZDb3Vwb25Db250cm9sbGVyLWFkZCIsImNhcnBhcmstQ2FyUGFya0NvbnRyb2xsZXItYWRkQ2hhcmdpbmdSdWxlcyIsImNhcnBhcmstQ2ZDYXJQYXJrUmVsZWFzZUxvZ0NvbnRyb2xsZXItYWRkIiwiY2FycGFyay1DZkNhclBhcmtVc2VMb2dDb250cm9sbGVyLXVwZGF0ZSIsInVjZW50ZXItRGVwYXJ0bWVudENvbnRyb2xsZXItYWRkIiwiY2FycGFyay1DYXJQYXJrQ29udHJvbGxlci1hZGQiLCJwYXktQ2ZQYXltZW50QWdlbmN5Q29udHJvbGxlci11cGRhdGUiLCJ1Y2VudGVyLVJvbGVDb250cm9sbGVyLWFkZCIsInVjZW50ZXItRGVwYXJ0bWVudENvbnRyb2xsZXItdXBkYXRlIiwicGF5LUNmQ291cG9uQ29udHJvbGxlci1zZWxlY3RMaXN0QnlDb25kaXRpb24iLCJwYXktQ2ZPcmRlckNvbnRyb2xsZXItYWRkIiwiY2FycGFyay1DZkNhclBhcmtSZWxlYXNlTG9nQ29udHJvbGxlci1kZWxldGUiLCJjYXJwYXJrLUNhclBhcmtDb250cm9sbGVyLWdldENoYXJnaW5nUnVsZXNCeUNhclBhcmtJZCIsInBheS1DZkNvdXBvbkNvbnRyb2xsZXItZGVsZXRlIiwiY2FycGFyay1DYXJQYXJrQ29udHJvbGxlci1kZWxldGVDaGFyZ2luZ1J1bGVzIiwicGF5LUNmVXNlclBheW1lbnRBZ2VuY3lDb250cm9sbGVyLWFkZCIsInVjZW50ZXItVWNlbnRlckNvbnRyb2xsZXItYWRkIiwicGF5LUNmT3JkZXJDb250cm9sbGVyLXNlbGVjdExpc3RCeUNvbmRpdGlvbiIsInBheS1DZk9yZGVyQ29udHJvbGxlci11cGRhdGUiLCJjYXJwYXJrLUNmQ2FyUGFya0NoZWNrcG9pbnRDb250cm9sbGVyLWRlbGV0ZSIsImNhcnBhcmstQ2FyUGFya0NvbnRyb2xsZXItdXBkYXRlIiwiY2FycGFyay1DZkNhclBhcmtQYWNrYWdlQ29udHJvbGxlci1kZWxldGUiLCJwYXktQ2ZVc2VyUGF5bWVudEFnZW5jeUNvbnRyb2xsZXItc2VsZWN0TGlzdEJ5Q29uZGl0aW9uIiwidWNlbnRlci1BdXRoU3dhZ2dlckNvbnRyb2xsZXItZ2V0QXV0aHMiLCJjYXJwYXJrLUNmQ2FyUGFya1BhY2thZ2VDb250cm9sbGVyLXVwZGF0ZVBhY2thZ2VQcmljZSIsInBheS1DZlVzZXJQYXltZW50QWdlbmN5Q29udHJvbGxlci11cGRhdGUiLCJjYXJwYXJrLUNmQ2FyUGFya0RldmljZUNvbnRyb2xsZXItc2VsZWN0TGlzdEJ5Q29uZGl0aW9uIiwiY2FycGFyay1DZkNhclBhcmtDYXJUeXBlQ29udHJvbGxlci11cGRhdGUiLCJjYXJwYXJrLUNmQ2FyUGFya1BhY2thZ2VDb250cm9sbGVyLXNlbGVjdENhclBhY2thZ2VMaXN0QnlDb25kaXRpb24iLCJjYXJwYXJrLUNmQ2FyUGFya1VzZUxvZ0NvbnRyb2xsZXItYWRkIiwiY2FycGFyay1DZkNhclBhcmtEZXZpY2VDb250cm9sbGVyLWRlbGV0ZSIsImNhcnBhcmstQ2ZDYXJQYXJrQ2FyVHlwZUNvbnRyb2xsZXItZ2V0QWxsTGlzdCIsInVjZW50ZXItVWNlbnRlckNvbnRyb2xsZXItZmluZEJ5SWQiLCJjYXJwYXJrLUNhclBhcmtDb250cm9sbGVyLXVwZGF0ZUNoYXJnaW5nUnVsZXMiLCJwYXktQ2ZVc2VyUGF5bWVudEFnZW5jeUNvbnRyb2xsZXItZGVsZXRlIiwiY2FycGFyay1DZkNhclBhcmtQYWNrYWdlQ29udHJvbGxlci1hZGRQYWNrYWdlUHJpY2UiLCJwYXktQ2ZQYXltZW50QWdlbmN5Q29udHJvbGxlci1zZWxlY3RMaXN0QnlDb25kaXRpb24iLCJjYXJwYXJrLUNhclBhcmtDb250cm9sbGVyLXNlbGVjdExpc3RCeUNvbmRpdGlvbiIsImNhcnBhcmstQ2ZDYXJQYXJrRGV2aWNlQ29udHJvbGxlci11cGRhdGUiLCJ1Y2VudGVyLVJvbGVDb250cm9sbGVyLWxpc3QiLCJ1Y2VudGVyLVJvbGVDb250cm9sbGVyLXVwZGF0ZSIsInVjZW50ZXItQXV0aFN3YWdnZXJDb250cm9sbGVyLWFkZEF1dGgiLCJ1Y2VudGVyLUF1dGhTd2FnZ2VyQ29udHJvbGxlci1kZWxldGVBdXRoIiwidWNlbnRlci1Sb2xlQ29udHJvbGxlci1kZWxldGUiLCJjYXJwYXJrLUNmQ2FyUGFya0RldmljZUNvbnRyb2xsZXItYWRkIiwiY2hhdC1mcmllbmRzLWxpc3QiLCJjYXJwYXJrLUNmQ2FyUGFya0NoZWNrcG9pbnRDb250cm9sbGVyLWFkZCIsInBheS1DZlBheW1lbnRBZ2VuY3lDb250cm9sbGVyLXNlbGVjdExpc3RCeVF1ZXJ5IiwiY2FycGFyay1DZkNhclBhcmtSZWxlYXNlTG9nQ29udHJvbGxlci1zZWxlY3RMaXN0QnlDb25kaXRpb24iLCJjYXJwYXJrLUNmQ2FyUGFya1JlbGVhc2VMb2dDb250cm9sbGVyLXVwZGF0ZSIsImNhcnBhcmstQ2ZDYXJQYXJrUGFja2FnZUNvbnRyb2xsZXItZGVsZXRlUGFja2FnZVByaWNlIiwidWNlbnRlci1EZXBhcnRtZW50Q29udHJvbGxlci1saXN0IiwidWNlbnRlci1EZXBhcnRtZW50Q29udHJvbGxlci1kZWxldGUiLCJjYXJwYXJrLUNmQ2FyUGFya1VzZUxvZ0NvbnRyb2xsZXItc2VsZWN0TGlzdEJ5Q29uZGl0aW9uIiwidWNlbnRlci1BdXRoU3dhZ2dlckNvbnRyb2xsZXItdXBkYXRlQXV0aCIsInVjZW50ZXItVWNlbnRlckNvbnRyb2xsZXItc2VsZWN0TGlzdEJ5Q29uZGl0aW9uIiwiY2FycGFyay1DZkNhclBhcmtQYWNrYWdlQ29udHJvbGxlci11cGRhdGUiLCJ1Y2VudGVyLVVjZW50ZXJDb250cm9sbGVyLXVwZGF0ZSIsImNhcnBhcmstQ2ZDYXJQYXJrQ2hlY2twb2ludENvbnRyb2xsZXItdXBkYXRlIiwiY2FycGFyay1DZkNhclBhcmtDYXJUeXBlQ29udHJvbGxlci1hZGQiLCJjYXJwYXJrLUNmQ2FyUGFya0NhclR5cGVDb250cm9sbGVyLWRlbGV0ZSJdLCJqdGkiOiI5MTQzN2M4Yy1iZjIwLTQ1M2EtODJkZi1iOGJkOTVjY2YxNjUiLCJjbGllbnRfaWQiOiJYY1dlYkFwcCJ9.LVlyFiYvTKPTpRRA2s3YuGdCgZjJgsUYJzRJ9I3_xCGYVoyuqqowWio58JDObWKQkNy12Id28DTgOFyJZqpjqpYr8h9S-yz_QVJrtzUeZH5un-6Hh5ykQpPBMcOd6VqReoO0xQ5AgqVSNo-SSz41KhVp5Q5DdHvAW69X--3ANbuFkGKR-awIIOvQja3vtaRsrwH6rGD_qPN72Sh4clkyehN-MrpF2KTcXx0HX4a-gPmPy5ewV7AgF-QvV8g0qs0RIVSC5mLw5HjZjRxAK9uZ52-mePLk-KX3ShhfxSPQ07TBR7D-DeN35g8WDgyg_lv9QmWKzk9Ga_BNpnPLGx23qA")
			
			this.token = uni.getStorageSync("token");
		},
		onLoad(e) {


			var self = this;
			wx.login({
			  success (res) {
			    if (res.code) {
			      //发起网络请求
				  const code = res.code
				  wx.getUserInfo({
				  success: res => {
					wx.request({
						url: self.serviceUrl+'auth/getWxBaseUserInfoByCodeAndLoginType',
						method:"GET",
						data: {
						code: code,
							  loginType:"mp",
							  encryptedData: res.encryptedData,
							  iv: res.iv,
						},
						success: (e) => {
							uni.setStorageSync("token","Bearer "+e.data.token.jwt_token);
						}, 
					 })
					
				  }
				})
			       
  
				   
			    } else {
			      console.log('登录失败！' + res.errMsg)
			    }
			  }
			})


	// 		var url = window.location.search;
	// 		url = decodeURIComponent(url)
	
	// 		var theRequest = new Object();
	// 		if (url.indexOf("?") != -1) {
	// 		var str = url.substr(1);
	// 		var strs = str.split("&");
	// 		for (var i = 0; i < strs.length; i++) {
	// 			theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
	// 			}
	// 		}
	
			
	// 		var userInfo = JSON.parse(theRequest.userInfo);
			
	// 		uni.setStorageSync("userInfo",userInfo)
			// var token = JSON.parse(theRequest.jwt_token).jwt_token;
			// uni.setStorageSync("token","Bearer "+token)
			
		},
		methods: {
			//获取用户信息
			getWxBaseUserInfoByCode(code){
			
				uni.request({
					url:this.serviceUrl+"auth/getWxBaseUserInfoByCode",
					method: "GET",
					data:{
						code:code,
					},
					header: {
					    'Content-type': 'application/x-www-form-urlencoded',
					    "Authorization": this.token
					},
					success: (res) => {
						console.log(res)
						if(res.statusCode==200){
							
							
							 
						}
						
						
					},
					fail(res) {
						uni.showToast({
							title: '网络错误！',	
							icon:"none"
						})
					}
					
				})
						
			},
			paymentOnBehalf(){
				
				uni.navigateTo({
					url:"../paymentOnBehalf/paymentOnBehalf"
				})
				
			},
			parkingSearch(){
				uni.navigateTo({
					url:"../newUI/parkingSearch/parkingSearch"
				})
			},
			openParkingRecord(){
				
				uni.navigateTo({
					url:"../parkingRecord/parkingRecord"
				})
				
			},
			openPayment(){
				
				uni.navigateTo({
					url:"../payment/payment"
				})
				
			},
		}
	}
</script>

<style lang="less">
	page{
		background-color: #F8F8F8;
	}
	.headline{
		background-color: #FFFFFF;
		padding: 30upx 0upx;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		>view{
			text-align: center;
			font-size: 32upx;
			
			
			>image{
				width: 78upx;
				height: 78upx;
			}
		}
	}
	
	.hint{
		text-align: center;
		margin-top: 200upx;
		font-size: 32upx;
		color: #999999;
		>image{
			width: 280upx;
			height: 280upx;
			margin-bottom: 20upx;
		}
	}
	
	
</style>
