<template>
	<view>
		<view class="top"></view>
		<view class="list">
			
			<view class="setMeal" v-for="(item,index) in setMeals" :key="index">
				
				<view class="left">
					<view class="name">{{item.carParkName}}</view>
					<view>车牌号：{{item.numberPlate}}</view>
					<view>车辆类型：{{item.typeKey}}</view>
					<view>开始时间：{{getDatey(item.startTime)}}</view>
				</view>
				
				<view class="right">
					<image src="../../../static/images/icon_coupon_car.png"></image>
					<view>绑定时间：{{getDatey(item.createTime)}}</view>
					<view>结束时间：{{getDatey(item.endTime)}}</view>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				setMeals:[]
			}
		},
		onShow() {

		},
		onLoad() {
			this.token = uni.getStorageSync("token")
			this.getMyCarParkPackageByCondition()
		},
		methods: {
			
			//获取我的套餐
			getMyCarParkPackageByCondition(){
				
				uni.request({
					url:this.serviceUrl+"carparkpackage/getMyCarParkPackageByCondition",
					// url:"http://139.9.155.149:8089/carparkpackage/getMyCarParkPackageByCondition",
					method: "GET",
					data:{
						page:1,
						size:100
					},
					header: {
					    'Content-type': 'application/x-www-form-urlencoded',
					    "Authorization": this.token
					},
					success: (res) => {
						console.log(res.data.data)
						if(res.statusCode==200){
							
							this.setMeals = res.data.data;
							 this.$forceUpdate()
						}else{
							uni.showToast({
								title: '没有更多了...',	
								icon:"none"
							})
						}
						
						
					},
					fail(res) {
						uni.showToast({
							title: '网络错误！',	
							icon:"none"
						})
					},
					complete() {
						uni.hideLoading()
					}
					
				})
						
			},
		}
	}
</script>

<style lang="less">
.top{
	border: 1px solid #F1F1F1;
	position: fixed;
	top:0px;
	width: 100vw;
}
.list{
	
	.setMeal{
		background-color: #0055ff;
		width: 88vw;
		margin: 0upx 3vw;
		margin-top: 30upx;
		padding: 2vw 3vw;
		border-radius: 16upx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		color: #FFFFFF;
		font-size: 30upx;
		.left{
			
			
			.name{
				margin-bottom: 50upx;
			}
			>view{
				margin: 16upx 0upx;
			}
		}
		.right{
			
			
			>image{
				margin-top: 20upx;
				width: 288upx;
				height: 112upx;
			}
			>view{
				margin: 18upx 0upx;
			}
		}
	}
	
}
</style>
