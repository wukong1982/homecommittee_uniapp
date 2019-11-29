<template>
	<view class="content">
		<image class="logo" src="/static/logo.jpg"></image>
		<text class="title">{{title}}</text>
		<view>
		    <view class="uni-form-item uni-row" style="width:500rpx">		    	
		    	<input placeholder-style="color:#F76260" v-model="username" placeholder="请输入用户名" />
		    </view>
		    <view class="uni-form-item uni-row" style="width:500rpx">
		    	<input placeholder-style="color:#F76260" password="true" v-model="password" placeholder="请输入密码" />
		    </view>
			<view class="uni-form-item uni-row" style="width:500rpx">
			    <button type="primary" @click="login()">登陆</button>
			</view>
			<view class="uni-form-item uni-row" style="width:500rpx">
			    <button type="primary" @click="access()">匿名访问</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '',
				username: '',
				password: ''
			}
		},
		onLoad() {

		},
		methods: {
            login() {
				uni.request({
				    url: 'https://api2.bmob.cn/1/classes/_User',
				    //data: 'where={"username":"' + this.username + '","password":"' + this.password + '"}',
				    data:{
						where: {"username": this.username, "password": this.password}
					},
					header: {
				        'X-Bmob-Application-Id':'3bea17a55823d07e2487d6db68a04ba0', 
				        'X-Bmob-REST-API-Key':'c8069787cb4ff2c10d99dae927667233', 
				        'Content-Type':'application/json'
				    },
				    success: (res) => {
						var users = res.data.results;
				        console.log(users);
						if (users && users.length == 1) {
							var classid = users[0].classid;
							uni.setStorageSync('classid', classid);
							uni.navigateTo({
							    url: '/pages/index/index'
							});
						}
				    }
				});
				
				
			},
			access() {
				uni.setStorageSync('classid', '');
				uni.navigateTo({
				    url: '/pages/index/index'
				});
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 750rpx;
	}

	.logo {
		height: 200rpx;
		width: 750rpx;
		margin-top: 1rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 1rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 24rpx;
		color: #8f8f94;
	}
</style>
