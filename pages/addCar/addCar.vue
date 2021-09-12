<template>
	<view>
		<view class="headline">
			<view class="back" @click="back"><i class="iconfont">&#xe641;</i></view>
			<view class="title">添加车辆</view>
			<view class="back" style="opacity: 0;"><i class="iconfont">&#xe641;</i></view>
		</view>
		<view class="content">
			<!-- <image src="../../static/images/icon_charges.png"></image> -->
			<view class="input" @tap="plateShow=true">
				<text>车辆号码</text>
				<view class="">{{plateNo}}</view>
				<i class="iconfont">&#xe631;</i>
			</view>
			
			<view class="button" @click="add">添加</view>
		</view>
		
		<plate-input v-if="plateShow" :plate="plateNo" @export="setPlate" @close="plateShow=false"></plate-input>
	</view>
</template>

<script>
	import plateInput from '@/components/uni-plate-input/uni-plate-input.vue'
	export default {
		components: {
			plateInput
		},
		data() {
			return {
				plateNo:'请输入车牌号',
				plateShow:false
			}
		},
		onLoad() {
			this.token = uni.getStorageSync("token");
			console.log(this.token)
		},
		methods: {
			
			add(){
				
				if(this.plateNo.length!=7){
					
					uni.showToast({
						title: '请输入车牌号',	
						icon:"none"
					})
					return
				}
				
				uni.showLoading({
					title: '请稍等',
					mask: true
				})
				uni.request({
					url:this.serviceUrl+"carparkcar/add",
					method: "POST",
					data:{
						numberPlate:this.plateNo
					},
					header: {
					    'Content-type': 'application/x-www-form-urlencoded',
					    "Authorization": this.token
					},
					success: (res) => {
						console.log( res.data)
						if(res.statusCode==200){
							
							uni.showModal({
							    title: '提示',
							    content: res.data.message,
							    success: function (res) {
							        if (res.confirm) {
										uni.navigateBack({
											
										})
							        } else if (res.cancel) {
							            console.log('用户点击取消');
							        }
							    }
							});
							
							 
						}else{
							uni.showToast({
								title: '网络错误',	
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
			setPlate(plate){
				console.log(plate)
				if(plate.length >= 7) this.plateNo = plate
				this.plateShow = false
			},
			back(){
				uni.navigateBack({
					
				})
			},
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
		top: 90upx;
		
		>view{
			padding: 0upx 20upx;
		}
	}

	.content{
		margin-top: 10upx;
		padding: 0upx 40upx;
		text-align: center;
		>image{
			width: 120upx;
			height: 120upx;
		}
		
		.input{
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			font-size: 32upx;
			margin: 120upx 0upx;
			>view{
				color: #C0C0C0;
				border-bottom: 1px solid #C0C0C0;
				width: 420upx;
				padding: 20upx;
				text-align: left;
			}
			.iconfont{
				color: #808080;
			}
		}
		.button{
			background-color: #007AFF;
			color: #FFFFFF;
			font-size: 32upx;
			padding: 20upx 0upx;
			border-radius: 60upx;
		}
	}

</style>
