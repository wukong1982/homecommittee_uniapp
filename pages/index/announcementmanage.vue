<template>
	<view class="content uni-padding-wrap uni-common-mt">		
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
		
		<view>
		<a href="#" @click="goIndex()" style="color:#007AFF">首页</a>{{"  "}}
		<a href="#" @click="addAnnouncement()" style="color:#007AFF">添加</a>
		</view>
		
		<view style="width:500rpx" v-for="announcement in announcements">
		  <text>{{announcement.title + "  " + getUpdatedDate(announcement.updatedAt)}}</text>
		  {{"  "}}<a href="#" @click="editAnnouncement(announcement.objectId)" style="color:#007AFF">修改</a>
		  {{"  "}}<a href="#" @click="deleteAnnouncement(announcement.objectId)" style="color:#007AFF">删除</a>
		  <br>
		  <text>{{announcement.content}}</text>
		  <hr>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '公告管理',
				announcements: [
				]
			}
		},
		onLoad() {
            this.getData();
		},
		methods: {
            getData() {
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
			goIndex() {
				uni.redirectTo({
				    url: '/pages/index/index'
				});
			},
			addAnnouncement() {
				uni.redirectTo({
				    url: '/pages/index/announcementedit'
				});
			},
			editAnnouncement(objectId) {
				uni.redirectTo({
				    url: '/pages/index/announcementedit?objectId=' + objectId
				});
			},
			deleteAnnouncement(objectId) {
				uni.request({
				    url: 'https://api2.bmob.cn/1/classes/announcement/' + objectId,
					method: 'DELETE',
				    data: {
				    },
				    header: {
				        'X-Bmob-Application-Id':'3bea17a55823d07e2487d6db68a04ba0', 
				        'X-Bmob-REST-API-Key':'c8069787cb4ff2c10d99dae927667233', 
				        'Content-Type':'application/json'
				    },
				    success: (res) => {
				        console.log(res.data.results);        
				        this.getData();
				    }
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
