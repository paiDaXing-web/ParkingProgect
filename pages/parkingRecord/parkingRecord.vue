<template>
	<view>
<!-- 		<view class="headline">
			<view class="back" @click="back"><i class="iconfont">&#xe641;</i></view>
			<view class="title">停车记录</view>
			<view class="back" style="opacity: 0;"><i class="iconfont">&#xe641;</i></view>
		</view> -->
<!-- 		<view class="date" >
			
			<view @click="topBubble">本月<i class="iconfont">&#xe62f;</i></view>
			
			<tui-bubble-popup :show="show" :mask="false" position="absolute" direction="top" @close="topBubble" width="200rpx"
			 left="20rpx" top="80rpx" translateY="0%" triangleRight="100rpx" triangleBottom="300rpx">
				<view class="tui-menu-item" @tap="topBubble">本月</view>
				<view class="tui-menu-item" @tap="topBubble">本周</view>
				<view class="tui-menu-item" @tap="topBubble">本日</view>
				<view class="tui-menu-item" @tap="topBubble">所有</view>
			</tui-bubble-popup>
		</view> -->
		
		<view class="list" >
			<view class="li" v-for="item in list">
				<view class="cat">
					<view class="left">
						<view style="font-size: 32upx;">{{item.cfCarPark.name}}</view>
						<view>{{item.numberPlate}}</view>
					</view>
					<view class="right" v-if="item.payTime==0">
						待支付
					</view>
					<view v-else class="right" style="color: #999999;border: #999999 solid 2upx;">
						已完成
					</view>
					
					
				</view>
				<view class="time1">
					<view></view>
					入场时间：{{getDate(item.inTime)}}
				</view>
				<view class="time2">
					<view></view>
					出场时间：{{getDate(item.outTime)}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import tuiBubblePopup from '../../components/tui-bubble-popup/tui-bubble-popup.vue';
	export default {
		components: {
			tuiBubblePopup
			
		},
		data() {
			return {
				show: true,
				index:0,
				list:[]
			}
		},
		onLoad() {
			this.token = uni.getStorageSync("token");
			
			uni.request({
				url:this.serviceUrl+"carparklog/getCarParkUseLogList",
				method: "GET",
			
				header: {
				    'Content-type': 'application/x-www-form-urlencoded',
				    "Authorization": this.token
				},
				success: (res) => {
					console.log(res.data.data)
					if(res.statusCode==200){
						
						this.list = res.data.data;
						 
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
		methods: {
			back(){
				uni.navigateBack({
					
				})
			},
			topBubble() {
				this.show = !this.show;
			},
		}
	}
</script>

<style lang="less">
	page{
		background-color: #F1F1F1;
	}

	
	.list{
		
		.li{
			width: 88vw;
			background-color: #FFFFFF;
			margin: 3vw;
			padding: 3vw;
			border-radius: 20upx;
			line-height: 56upx;
			
			.cat{
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				color: #0A2463;
				font-size: 28upx;
				font-weight: 600;
				.right{
					color: #EF3864;
					border:2upx #EF3864 solid ;
					padding: 0upx 20upx;
					border-radius: 60upx;
					font-weight: 500;
				}
			}
			.time1{
				color: #0A2463;
				font-size: 28upx;
				display: flex;
				flex-direction: row;
				align-items: center;
				>view{
					background-color: #0A2463;
					width: 16upx;
					height: 16upx;
					border-radius: 16upx;
					margin-right: 10upx;
				}
			}
			.time2{
				color: #0A2463;
				font-size: 28upx;
				display: flex;
				flex-direction: row;
				align-items: center;
				>view{
					background-color: #F0AC35;
					width: 16upx;
					height: 16upx;
					border-radius: 16upx;
					margin-right: 10upx;
				}
			}
			
		}
	}
	
	
	
	
	
	
	
	
	
	
	
	
	// page{
	// 	padding-top: 210upx;
	// 	background-color: #fafafa;
	// }
	// .headline{
	// 	background-color: #007AFF;
	// 	color: #FFFFFF;
	// 	display: flex;
	// 	flex-direction: row;
	// 	justify-content: space-between;
	// 	padding: 20upx 0upx; 
	// 	position: fixed;
	// 	width: 100%;
	// 	top: 0upx;
	// 	padding-top: 120upx;
	// 	>view{
	// 		padding: 0upx 20upx;
	// 	}
	// }
	// .date{
	// 	background-color: #FFFFFF;
	// 	position: fixed;
	// 	width: 92vw;
	// 	padding: 3vw 4vw;
	// 	.iconfont{
	// 		font-size: 32upx;
	// 		color: #555555;
	// 		margin-left: 10upx;
	// 	}
	// 	.tui-menu-item{
	// 		text-align: center;
	// 		margin: 50upx 0upx;
			
	// 	}
	// }
</style>
