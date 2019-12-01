<template>
	<view class="content">		
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
		
		<view style="width:700rpx;display:flex; flex-direction: row;">	
		<a href="#" @click="goIndex()" style="color:#007AFF;font-size:36rpx">返回首页</a>
		<a href="#" @click="addTask()" style="margin-left:10rpx;color:#007AFF;font-size:36rpx">添加</a>
		</view>
			
		<view style="width:700rpx;border-bottom:5rpx #00FF00 solid;" v-for="task in tasks">
		  <view style="display:flex; flex-direction: row;">	
		  <text>{{task.task_subject + "  " + getTaskDate(task.task_date)}}</text>
		  <a href="#" @click="editTask(task.objectId)" style="margin-left:10rpx;color:#007AFF">修改</a>
		  <a href="#" @click="deleteTask(task.objectId)" style="margin-left:10rpx;color:#007AFF">删除</a>
		  </view>
		  <text>{{task.task_desc}}</text>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '作业管理',
				tasks: [
				]
			}
		},
		onLoad() {
			var classname = uni.getStorageSync('classname');
			uni.setNavigationBarTitle({
			    title: classname
			});
            this.getData();
		},
		methods: {
            getData() {
				var classid = uni.getStorageSync('classid');
				uni.request({
				    url: 'https://api2.bmob.cn/1/classes/task?order=-task_date&limit=50',
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
				        this.tasks = res.data.results;
				    }
				});
			},
			goIndex() {
				uni.redirectTo({
				    url: '/pages/index/index'
				});
			},
			addTask() {
				uni.redirectTo({
				    url: '/pages/index/taskedit'
				});
			},
			editTask(objectId) {
				uni.redirectTo({
				    url: '/pages/index/taskedit?objectId=' + objectId
				});
			},
			deleteTask(objectId) {
				uni.request({
				    url: 'https://api2.bmob.cn/1/classes/task/' + objectId,
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
			getTaskDate(task_date) {
				return (task_date ? (task_date.iso ? task_date.iso.substring(0, 10) : "") : "");
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
