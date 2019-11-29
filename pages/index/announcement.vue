<template>
	<view class="content">		
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
		
		<a href="#" @click="goIndex()" style="color:#007AFF">首页</a>

		<view style="width:500rpx" v-for="announcement in announcements">
			<text>{{announcement.title + "(" + getUpdatedDate(announcement.updatedAt) + ")"}}</text>
			<br>
			<text class="flex-item uni-bg-green">{{announcement.content}}</text>
			<hr>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '公告',
				announcements: [				    
				]
			}
		},
		onLoad() {
			var classid = uni.getStorageSync('classid');
            uni.request({
                url: 'https://api2.bmob.cn/1/classes/announcement?order=-updatedDate&limit=50',
                data: {
                	where:{"classid": classid}
                },
                header: {
                    'X-Bmob-Application-Id':'3bea17a55823d07e2487d6db68a04ba0', 
		            'X-Bmob-REST-API-Key':'c8069787cb4ff2c10d99dae927667233', 
		            'Content-Type':'application/json'
                },
                success: (res) => {
                    console.log(res.data.results);        
		            this.announcements = res.data.results;
                }
            });
		},
		methods: {
			goIndex() {
				uni.redirectTo({
				    url: '/pages/index/index'
				});
			},
            getUpdatedDate(updatedDate) {
				return (updatedDate ? updatedDate.substring(0, 10) : "");
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
		font-size: 24rpx;
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
