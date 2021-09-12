<template>
	<view>
		<view class="headline">
			<view class="back" @click="back"><i class="iconfont">&#xe641;</i></view>
			<view class="title">{{current.cfCarParkUseLog.numberPlate}}</view>
			<view class="right" style="opacity: 0;" @click="rDrawer"><i class="iconfont">&#xe602;</i></view>
		</view>
		<view class="price">
			
			{{current.cfCarPark.name}}
			<text>￥{{current.cfOrder.amountsPayable}}</text>
		</view>
		<view class="content">
			<view class="title">入场信息</view>
			<view class="tui-top tui-flex-box">
				<tui-steps  :activeSteps="activeSteps" :items="items" direction="column" deactiveColor="#007AFF" activeColor="#19be6b"></tui-steps>
				
			</view>
			<view class="title">出场信息</view>
			<view class="tui-top tui-flex-box">
				<tui-steps  :activeSteps="activeSteps" :items="items1" direction="column" deactiveColor="#007AFF" activeColor="#19be6b"></tui-steps>
				
			</view>
			
			<view class="list">
				<view class="left">订单编号:</view>
				<view class="right">{{current.cfCarParkUseLog.id}}</view>
			</view>
			<view class="list">
				<view class="left">停车时长:</view>
				<view class="right">{{current.cfCarPark.freeTime/1000/60}}分钟</view>
			</view>
			<view class="list">
				<view class="left">地址:</view>
				<view class="right">{{current.cfCarPark.address}}</view>
			</view>
		</view>
		
		<view class="button" @click="getPaymentAgencyListByCarParkId">
			
			<view >立即支付</view>
		</view>
	</view>
</template>

<script>
	import tuiSteps from '../../components/tui-steps/tui-steps.vue'
	export default {
		components: {
			tuiSteps
		},
		data() {
			return {
				current:[],
				items: [{
					title: "入场时间",
					desc: "2020-04-01"
				}, {
					title: "入口关卡",
					desc: "2020-04-01"
				}, {
					title: "入场放行方式",
					desc: "自动抬杆"
				}, {
					title: "入场相机抓拍照片",
					desc: "查看大图"
				}],
				items1: [{
					title: "出场时间",
					desc: "2020-04-01"
				}, {
					title: "出口关卡",
					desc: "2020-04-01"
				}, {
					title: "出场放行方式",
					desc: "自动抬杆"
				}, {
					title: "出场相机抓拍照片",
					desc: "查看大图"
				}],
				activeSteps: -1,
				id:-1
			}
		},
		onLoad(e) {
			this.token = uni.getStorageSync("token");
			this.queryOrderByUseId(e.id)
			this.id = e.id;
			
		},
		methods: {
			
	
			//
			payForCarUseLog(id,payTypeId){
				uni.showLoading({
					title: '请稍等',
					mask: true
				});
				
				
				console.log("id:"+id)
				console.log("payTypeId:"+payTypeId)
				uni.request({
					url:"http://139.9.155.149/carparkorder/payForCarUseLog",
					method: "PUT",
					data:{
						id:id,
						payTypeId:payTypeId
					},
					header: {
					    'Content-type': 'application/x-www-form-urlencoded',
					    "Authorization": this.token
					},
					success: (res) => {
						
						
						
						if(res.statusCode==200){
							
							var data = res.data.data.data;
							
							var AtimeStamp = data.timeStamp;
							var AnonceStr = data.nonceStr;
							var Apackage = data.package;
							var ApaySign = data.sign;
	
							console.log("data")
							console.log(data)
	

			
							wx.requestPayment({
								
					
								
							'timeStamp': AtimeStamp,
							'nonceStr': AnonceStr,
							'package': Apackage,
							'signType': 'MD5',
							'paySign': ApaySign,
							
							'success':function(res){
							
								console.log("支付成功")
							},
							'fail':function(res){
								console.log(res)
								console.log("支付失败")
								
							},
							'complete':function(res){}
							
							})
							 
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
			getPaymentAgencyListByCarParkId(){
				uni.showLoading({
					title: '请稍等',
					mask: true
				});
				
				
				var carParkId = this.current.cfCarParkUseLog.carParkId;
				console.log("carParkId："+carParkId)
				uni.request({
					url:"http://139.9.155.149/pay/getPaymentAgencyListByCarParkId",
					method: "GET",
					data:{
						carParkId:carParkId,
						useScenes:"wx_mp"
					},
					header: {
					    'Content-type': 'application/x-www-form-urlencoded',
					    "Authorization": this.token
					},
					success: (res) => {
						
						
						
						console.log(res)
						
						if(res.statusCode==200){
							this.payForCarUseLog(this.current.cfCarParkUseLog.id,res.data.data[0].id)
						
							
							 
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
			//查询订单详情
			queryOrderByUseId(id){
				uni.showLoading({
					title: '请稍等',
					mask: true
				});
				uni.request({
					url:"http://139.9.155.149:8089/carparkorder/queryOrderByUseId",
					method: "GET",
					data:{
						id:id
					},
					header: {
					    'Content-type': 'application/x-www-form-urlencoded',
					    "Authorization": this.token
					},
					success: (res) => {
						console.log(id)
						console.log(123)
						console.log(res)
						if(res.statusCode==200){
							
							this.current = res.data.data;
							
							this.items[0].desc = this.getDate(this.current.cfCarParkUseLog.inTime);
							this.items[1].desc = this.current.inCheckpoint.name;
							
							this.items1[0].desc = this.getDate(this.current.cfCarParkUseLog.outTime);
							this.items1[1].desc = this.current.outCheckpoint.name;
							
							
							 
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
			
			back(){
				uni.navigateBack({
					
				})
			}
			
		}
	}
</script>

<style lang="less">
	page{
		padding-top: 180upx;
		background-color: #fafafa;
	}
	.price{
		padding: 30upx;
		padding-top: 60upx;
		font-size: 48upx;
		border-bottom: 1px solid #dedede;
		
		>text{
			font-size: 32upx;
			color: #DD524D;
			margin-left: 60upx;
		}
	}
	.button{
		width: 100vw;
		position: fixed;
		bottom: 0upx;
		background: #FFFFFF;
		padding: 3vw;
		z-index: 10;
		>view{
			width: 94vw;
			background-color: #007AFF;
			color: #FFFFFF;
			line-height: 90upx;
			text-align: center;
			border-radius: 16upx;
			
		}
	}
	.content{
		padding: 30upx;
		padding-bottom: 180upx;
		.title{
			margin-bottom: 30upx;
		}
		
		.list{
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			font-size: 36upx;
			color: #999999;
			margin: 20upx 0upx;
		}
	}
	.headline{
		z-index: 10;
		background-color: #007AFF;
		color: #FFFFFF;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 20upx 0upx; 
		position: fixed;
		width: 100%;
		top: 0upx;
		padding-top: 90upx;
		>view{
			padding: 0upx 20upx;
		}
	}
</style>
