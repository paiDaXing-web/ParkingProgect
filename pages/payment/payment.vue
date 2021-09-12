<template>
	<view>
		<view class="headline">
			<view class="back" @click="back"><i class="iconfont">&#xe641;</i></view>
			<view class="title">{{current.numberPlate}}</view>
			<view class="right" @click="rDrawer"><i class="iconfont">&#xe602;</i></view>
		</view>
		
		<view class="content">
			<view class="hint" v-if="orderList==null">
				<image src="../../static/images/icon_empty_data.png" ></image>
				<view class="">暂无数据</view>
			</view>
			
			<view>
				<view class="order"  v-for="item in orderList" @click="openOrderDetails(item)">
					
					<view class="top">
						
						<view class="left">{{item.cfCarPark.name}}</view>
						
						<view class="right">未支付<i class="iconfont">&#xe631;</i></view>
					</view>
					
					<view class="bottom">
						<view class="number_plate">{{item.numberPlate}}</view>
						<view class="time"><text>入场时间:{{getDate(item.inTime)}}</text><text>自动抬杆</text></view>
						<view class="time"><text>出场时间:{{getDate(item.outTime)}}</text><text>未知</text></view>
					</view>
				</view>
			</view>
		</view>

		<!--右抽屉-->
		<tui-drawer mode="right" :visible="rightDrawer" @close="closeDrawer(-1)">
			<view class="title">
				我的车辆
			</view>
			<view class="list" >
				<view class="" @click="closeDrawer(index)" v-for="(item,index) in carData">{{item.numberPlate}}</view>
				
			</view>
		</tui-drawer>
	</view>
</template>

<script>
	import tuiDrawer from '../../components/tui-drawer/tui-drawer.vue';
	export default {
		components: {
			tuiDrawer
			
		},
		data() {
			return {
				rightDrawer: false,
				carData:[],//我的车辆
				current:[],//当前选择的车辆
				orderList:[],//订单记录
			
			}
		},
		onLoad() {
			this.token = uni.getStorageSync("token")
			this.getMyCarsByCondition()
			
		},
		methods: {
			openOrderDetails(item){
				
				uni.navigateTo({
					url:"../orderDetails/orderDetails?id="+item.id
				})
			},
			//获取我的车辆
			getMyCarsByCondition(){
			console.log(this.token)
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
							
							this.cutAar(0)
							
							 
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
			//切换车辆
			cutAar(index){
				
				this.current = this.carData[index];
				this.getCarParkUseLogList()
			
			},
			//获取停车记录
			getCarParkUseLogList(){
				

				
				uni.showLoading({
					title: '请稍等',
					mask: true
				})
				uni.request({
					url:this.serviceUrl+"carparklog/getCarParkUseLogList",
					method: "GET",
					data:{
						numberPlate:this.current.numberPlate
					},
					header: {
					    'Content-type': 'application/x-www-form-urlencoded',
					    "Authorization": this.token
					},
					success: (res) => {
						
						if(res.statusCode==200){
							
							
							this.orderList = res.data.data;
							
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
			back(){
				uni.navigateBack({
					
				})
			},
			rDrawer() {
				this.rightDrawer = true;
			},
			closeDrawer(index) {
				
				this.rightDrawer = false;
				
				if(index==-1){
					return;
				}else{
					
					this.cutAar(index)
				}
			},
		}
	}
</script>

<style lang="less">
	page{
		padding-top: 210upx;
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
		padding-top: 120upx;
		>view{
			padding: 0upx 20upx;
		}
	}
	.content{
		
		.hint{
			margin-top: 300upx;
			text-align: center;
			font-size: 32upx;
			>image{
				margin-bottom: 60upx;
				width: 360upx;
				height: 360upx;
			}
		}
		
		.order{
			background-color: #FFFFFF;
			width: 90vw;
			margin: 3vw;
			padding: 2vw;
			border-radius: 16upx;
			
			.top{
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				border-bottom: 1px solid #F1F1F1;
				padding-bottom: 2vw;
				align-items: center;
				.right{
					color: #dd3f20;
					font-size: 32upx;
					align-items: center;
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					.iconfont{
						color: #808080;
					}
				}
			}
		
			.bottom{
				padding-top: 20upx;
				line-height: 68upx;
				.number_plate{
					color: #007AFF;
					
				}
				.time{
					font-size: 32upx;
					color: #808080;
					display: flex;
					flex-direction: row;
					justify-content: space-between;
				}
			}
		}
	}

	.title{
		background-color: #007AFF;
		color: #FFFFFF;
		padding: 60upx 120upx;
		font-size: 32upx;
		
	}
	.list{
		color: #007AFF;
		text-align: center;
		padding: 30upx 0upx;
		>view{
			padding: 30upx 0upx;
			border-bottom: 1px solid #C8C7CC;
		}
	}

</style>
