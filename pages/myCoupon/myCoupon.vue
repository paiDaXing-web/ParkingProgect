<template>
	<view>
		<view class="headline">
			<view class="back" @click="back"><i class="iconfont">&#xe641;</i></view>
			<view class="title">我的优惠券</view>
			<view class="back" style="opacity: 0;"><i class="iconfont">&#xe641;</i></view>
		</view>
		<view class="switch" >
			<view @click="switchStatus(0)" :class="{'active':status==0}">未使用</view>
			<view @click="switchStatus(1)" :class="{'active':status==1}">已使用</view>
			<view @click="switchStatus(2)" :class="{'active':status==2}">已过期</view>
		</view>
		
		<view class="hint">
			<image src="../../static/images/icon_empty_data.png"></image>
			<view >暂无数据</view>
		</view>
	</view>
</template>

<script>
	
	export default {

		data() {
			return {
				status:0
			}
		},
		methods: {
			back(){
				uni.navigateBack({
					
				})
			},
			topBubble() {
				this.show = !this.show;
			},
			switchStatus(i){
				this.status = i;
			}
		}
	}
</script>

<style lang="less">
	page{
		padding-top: 90upx;
		background-color: #fafafa;
	}
	.headline{
		background-color: #007AFF;
		color: #FFFFFF;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 20upx 0upx; 
		position: fixed;
		width: 100%;
		top: 0upx;
		
		>view{
			padding: 0upx 20upx;
		}
	}
	.switch{
		background-color: #FFFFFF;
		position: fixed;
		width: 100vw;
		padding: 0vw 0vw;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		font-size: 34upx;
		color: #555555;
		top: 90upx;
		>view{
			height: 80upx;
			line-height: 80upx;
			border-bottom: 6upx solid  #FFFFFF;
		}
		.active{
			color: #007AFF;
			border-bottom: 6upx solid  #007AFF;
		}
	}	
	.hint{
		font-size: 32upx;
		text-align: center;
		margin-top: 400upx;
		>image{
			width: 300upx;
			height: 350upx;
		}
	}
</style>
