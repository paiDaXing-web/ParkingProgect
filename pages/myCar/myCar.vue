<template>
	<view>
		<view class="headline">
			<view class="back" @click="back"><i class="iconfont">&#xe641;</i></view>
			<view class="title">我的爱车</view>
			<view class="right" @click="openAddCar"><i class="iconfont">&#xe642;</i></view>
		</view>
		
		<view class="myCar" v-for="(item,i) in carData" >
			<view class="board" v-if="carData[i].isBoards">
				<view class="delete" @click="deleteMyCar(carData[i].id)">删除</view>
				<view class="cancel" @click="hideBoard(i)">取消</view>
			</view>
			<view class="hm" @click="showBoard(i)">车牌号 : {{carData[i].numberPlate}}</view>
			<image @click="showBoard(i)" src="../../static/images/icon_coupon_car.png" mode=""></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
				carData:[]
			}
		},
		onShow() {
			
		},
		onLoad() {
			this.token = uni.getStorageSync("token")
			this.getMyCarsByCondition()
		},
		methods: {
			back(){
				uni.navigateBack({
					
				})
			},
			//获取我的车辆
			getMyCarsByCondition(){
				
				uni.request({
					url:this.serviceUrl+"carparkcar/getMyCarsByCondition",
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
						console.log(res)
						if(res.statusCode==200){
							
							var carData = res.data.data;
							this.carData = []
							for (var i = 0; i < carData.length; i++) {
								carData[i].isBoards = false;
								this.carData.push(carData[i])
							}
							
							 
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
			
			
			showBoard(i){
				this.carData[i].isBoards = true;

				this.$forceUpdate()
			},
			hideBoard(i){
				
				this.carData[i].isBoards = false;
				
				this.$forceUpdate()
			},
			deleteMyCar(id){
				uni.showLoading({
					title: '请稍等',
					mask: true
				})
				uni.request({
					url:this.serviceUrl+"carparkcar/delete",
					method: "DELETE",
					data:{
						id:id
					},
					header: {
					    'Content-type': 'application/x-www-form-urlencoded',
					    "Authorization": this.token
					},
					success: (res) => {
						
						if(res.statusCode==200){
							
							
							
							 uni.showToast({
							 	title: res.data.message,	
							 	icon:"none"
							 })
							 this.getMyCarsByCondition()
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
			openAddCar(){
				
				uni.navigateTo({
					url:"../addCar/addCar"
				})
			}
			
		}
	}
</script>

<style lang="less">
	page{
		padding-top: 210upx;
	}
	.headline{
		
		background-color: #007AFF;
		color: #FFFFFF;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 20upx 0upx; 
		padding-top: 120upx;
		position: fixed;
		width: 100%;
		top: 0upx;
		z-index: 10;
		>view{
			padding: 0upx 20upx;
		}
	}

	.myCar{
		background-color: #007AFF;
		width: 90vw;
		margin: 2vw 5vw;
		height: 200upx;
		position: relative;
		display: flex;
		flex-direction: row;
		
		align-items: center;
		justify-content: space-around;
		font-size: 32upx;
		color: #FFFFFF;
		border-radius: 16upx;
		.hm{
			height: 200upx;
			line-height: 200upx;
		}
		>image{
			height: 120upx;
			width: 280upx;
		}
		.board{
			
			background-image: url(../../static/40.png);
			height: 100%;
			width: 100%;
			position: absolute;
			top: 0upx;
			display: flex;
			flex-direction: row;
			
			justify-content: space-around;
			align-items: center;
			>view{
				background-color: #DD524D;
				height: 90upx;
				width: 90upx;
				text-align: center;
				line-height: 90upx;
				z-index: 5;
				font-size: 28upx;
				border-radius: 45upx;
				
			}
			.cancel{
				background-color: #C0C0C0;
			}
		}
	}
</style>
