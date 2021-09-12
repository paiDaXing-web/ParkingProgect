<template>
	<view>
		<view class="top"></view>
		
		<view class="content">
			<image :src="parkingInformation.image"></image>
			
			
			
			
			<view class="text">
				<view class="status">
					<view class="left">
						状态：
						<text style="color: #4CD964;" v-if="parkingInformation.status==0">正常</text>
						<text style="color: #DD524D" v-if="parkingInformation.status==1">已停满</text>
						<text style="color: #999999;" v-if="parkingInformation.status==2">暂停营业</text>
					</view>
					<view class="right" @click="openPhone">
						<image src="../../../static/phone.png"></image>
						<text style="color: #007AFF;">{{parkingInformation.phone}}</text>
					</view>
				</view>
				<view class="site">
					<view class="name">
						停车场名字 
						<text>导航</text>
					</view>
					<view class="">
						停车场地址
					</view>
				</view>

				<view class="list">
					<view class="li">
						<view class="left">总车位</view>
						
						<view class="right">
							<text>{{parkingInformation.parkingSpaceNumber+parkingInformation.usedParkingSpaceNumber}}</text>个
						</view>
					</view>
					<view class="li">
						<view class="left">剩余车位</view>
						
						<view class="right">
							<text>{{parkingInformation.parkingSpaceNumber}}</text>个
						</view>
					</view>
					<view class="li">
						<view class="left">可免费停</view>
						
						<view class="right">
							{{parkingInformation.freeTime/60000}}分钟
						</view>
					</view>
					<view class="li">
						<view class="left">评分</view>
						
						<view class="right">
							{{parkingInformation.score}}
						</view>
					</view>
					<view class="li">
						<view class="left">单日封顶</view>
						
						<view class="right">
							{{parkingInformation.feeUpperLimit}}元
						</view>
					</view>
					<view class="li">
						<view class="left">计费方式</view>
						
						<view class="right">
							5元/小时
						</view>
					</view>
				</view>
				
				<view class="hint">
					<text style="color: #DD524D;">*</text>
					提示信息提示信息提示信息提示信息提示信息提示信息提示信息提示信息
					提示信息提示信息提示信息提示信息提示信息提示信息提示信息提示信息
				</view>
			</view>
		</view>
		
		<view class="button" @click="make">立即预约</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				parkingInformation:undefined
			}
		},
		onLoad() {
			this.parkingInformation = uni.getStorageSync("parkingInformation")
			
			
			this.parkingInformation.image = "http://139.9.155.149/"+this.parkingInformation.image;
			console.log(this.parkingInformation)
		},
		methods: {
			make(){
				uni.showToast({
					title: '预约成功',	
					icon:"none"
				})
			},
			openPhone(){
				uni.makePhoneCall({
				    phoneNumber: this.parkingInformation.phone //仅为示例
				});
			}
		}
	}
</script>

<style lang="less">
.top{
	border: 2upx solid #F1F1F1;
	position: fixed;
	top:0px;
	width: 100vw;
}
page{
	background-color: #F1F1F1;
	margin-bottom: 180upx;
}
.hint{
	padding-top: 20upx;
	font-size: 24upx;
	color: #999999;
}

.button{
	position: fixed;
	bottom: 0upx;
	background-color: #007AFF;
	color: #FFFFFF;
	font-size: 32upx;
	width: 100%;
	text-align: center;
	padding: 20upx 0upx;
}
.content{
	background-color: #FFFFFF;
	width: 94vw;
	margin: 3vw;
	border-radius: 16upx;
	>image{
		border-top-left-radius: 16upx;
		border-top-right-radius: 16upx;
		width: 94vw;
		
		
	}
	
	.text{
		padding: 3vw;
		
		.site{
			border-bottom: 1px solid #F1F1F1;
			padding: 20upx 0upx;
			>.name{
				font-size: 32upx;
				color: #000000;>
				
				text{
					color: #FFFFFF;
					background-color: #007AFF;
					font-size: 20upx;
					padding: 4upx 20upx;
					border-radius: 20upx;
					margin-left: 16upx;
				}
			}
			font-size: 28upx;
			color: #999999;
			
		}
		.status{
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			font-size: 28upx;
			.right{
				display: flex;
				flex-direction: row;
				align-items: center;
				>image{
					width: 30upx;
					height: 30upx;
				}
			}
		}
		.list{
			border-bottom: 1px solid #F1F1F1;
			.li{
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				padding: 16upx 0upx;
				font-size: 28upx;
				
				
				text{
					color: #007AFF;
				}
			}
			
		}
	}
}

</style>
