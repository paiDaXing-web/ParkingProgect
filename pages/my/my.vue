<template>
	<view>
		<view class="headline" v-if="userInfo!=undefined">


			<view class="img_name">
				
				<!-- <image :src="userInfo.avatar"></image> -->
				<image src="../../static/logo.png"></image>
				<!-- <open-data type="userAvatarUrl" style="width: 180upx;height: 180upx; border-radius: 90upx;margin-right: 60upx;"></open-data> -->
				<open-data type="userNickName"></open-data>
				<!-- <view class="name">
					{{userInfo.nickName}}
				</view> -->
			</view>
<!-- 			<view class="img_name">
				
				<image src="../../static/logo.png"></image>
				<view class="name">
					用户昵称
				</view>
			</view> -->
			<view class="right">
				<i class="iconfont">&#xe631;</i>
			</view>
			
			
		</view>
		
	
		
		<view class="my_car_order">
			
			<view @click="openMyCar()">
				<image src="../../static/images/icon_me_car.png"></image>
				<view>我的爱车</view>
			</view>
			<view @click="openPayment">
				<image src="../../static/images/icon_me_order.png"></image>
				<view>我的订单</view>
			</view>
			<view @click="openSetMealList">
				<image src="../../static/images/icon_wallet.png"></image>
				<view>我的套餐</view>
			</view>
		</view>
		
		<view class="hint">
			<image src="../../static/bad.png"></image>
			<view>更多功能,请下载app体验</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo:undefined
			}
		},
		onLoad() {
			
			this.userInfo = uni.getStorageSync("userInfo");
			
			
		},
		methods: {
			openMyCar(){
				uni.navigateTo({
					url:"../myCar/myCar"
				})
				
			},
			openSetMealList(){
				uni.navigateTo({
					url:"../newUI/setMealList/setMealList"
				})
			},
			openMyCoupon(){
				uni.navigateTo({
					url:"../myCoupon/myCoupon"
				})
				
			},
			openPayment(){
				
				uni.navigateTo({
					url:"../payment/payment"
				})
				
			}
		}
	}
</script>

<style lang="less">
	page{
		background-color: #F8F8F8;
	}
	.headline{
		background-image: url(http://dk5800.com/bg_me.png);
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 100upx 30upx;
		color: #FFFFFF;
		
		.img_name{
			
			display: flex;
			flex-direction: row;
			align-items: center;
			>image{
				width: 160upx;
				height: 160upx;
				border-radius: 100upx;
				margin-right: 20upx;
			}
		}
	}
	
	.my_car_order{
		background-color: #FFFFFF;
		width: 90vw;
		margin: 0upx 5vw;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		text-align: center;
		padding: 40upx 0upx;
		font-size: 32upx;
		box-shadow:0px 8px 8px #d8d8d8;
		border-radius: 20upx;
		position: absolute;
		top: 310upx;
		>view{
			
			>image{
				width: 90upx;
				height: 90upx;
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
