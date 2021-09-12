<template>
	<view>
		<view class="top"></view>
		<view class="search">
			<image src="../../../static/search.png"></image>
			 <input placeholder="搜索目的地" v-model="name" @input="getListByQuery()"/>
			<image src="../../../static/close.png" @click="empty"></image> 
		</view>
		<view class="site" v-for="item in list" @click="openParkingDetails(item)">
			<image src="../../../static/location.png" mode=""></image>
			<view class="right">
				<view class="name">{{item.name}}</view>
				<view class="">{{item.address}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name:"",
				list:[]
			}
		},
		onLoad() {
			this.token = uni.getStorageSync("token");
			
			this.getListByQuery();
		},
		methods: {
			empty(){
				this.name = ""
				this.getListByQuery();
			},
			openParkingDetails(item){
				
				uni.setStorageSync("parkingInformation",item)
				
				uni.navigateTo({
					url:"../parkingDetails/parkingDetails"
				})
			},
			getListByQuery(){
				uni.showLoading({
					title: '请稍等',
					mask: true
				});

	
				uni.request({
					url:this.serviceUrl + "carpark/getListByQuery",
					method: "GET",
					data:{
						name:"%"+this.name+"%"
					},
					header: {
					    'Content-type': 'application/x-www-form-urlencoded',
					    "Authorization": this.token
					},
					success: (res) => {
						uni.hideLoading()
						console.log(res.data.data)
						this.list = res.data.data;
						if(res.statusCode==200){
							
						
							
							 
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
					}
					
					
				})
						
			},
			
			
			
			
			
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
.search{
	display: flex;
	flex-direction: row;
	align-items: center;
	padding: 16upx ;
	border-bottom: 1px solid #F1F1F1;
	>input{
		width:650upx;
		
		margin-left: 10upx;
		
	}
	>image{
		height: 28upx;
		width: 28upx;
	}
}
.site{
	display: flex;
	flex-direction: row;
	align-items: center;
	padding: 16upx 0upx;
	border-bottom: 1px solid #F1F1F1;
	>image{
		width: 39upx;
		height: 39upx;
		margin: 0upx 16upx;
	}
	
	.right{
		>.name{
			font-size: 32upx;
			color: #000000;
		}
		font-size: 28upx;
		color: #999999;
	}
}
</style>
