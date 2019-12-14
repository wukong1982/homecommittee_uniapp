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
		  <view v-if="task.task_url_array && task.task_url_array.length > 0">
		      <a href="javascript:void(0)" @click="displayM(task)" style="margin-left:10rpx;color:#007AFF">{{task.displayL}}图片</a>
		      
		      <view v-bind:style="'display:' + task.displayV" v-for="url in task.task_url_array">
			      <image class="logo" width="700rpx" mode="widthFix" :src="url"></image>
	          </view>
		  </view>
		  
		  <view v-if="task.video_url_array && task.video_url_array.length > 0">
		      <a href="javascript:void(0)" @click="displayVideoM(task)" style="margin-left:10rpx;color:#007AFF">{{task.displayVideoL}}视频</a>
		  
		      <view v-bind:style="'display:' + task.displayVideoV" v-for="url in task.video_url_array">
		  	      <video class="logo" width="700rpx" :src="url"></video>
		      </view>
		  </view>
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
				        let tasks = res.data.results;
						for (let i = 0; i < tasks.length; i++) {
							let task_url = tasks[i].task_url;
							let task_url_array = [];
							if (task_url && task_url.length > 0) {
								task_url_array = task_url.split("---");
							}
							for (let j = 0; j < task_url_array.length; j++) {
								task_url_array[j] = task_url_array[j].trim();
							}
							tasks[i].task_url_array = task_url_array;
							tasks[i].displayV = "none";
							tasks[i].displayL = "显示";
							
							let video_url = tasks[i].video_url;
							let video_url_array = [];
							if (video_url && video_url.length > 0) {
								video_url_array = video_url.split("---");
							}
							for (let j = 0; j < video_url_array.length; j++) {
								video_url_array[j] = video_url_array[j].trim();
							}
							tasks[i].video_url_array = video_url_array;
							tasks[i].displayVideoV = "none";
							tasks[i].displayVideoL = "显示";
						}
						
						this.tasks = tasks;
				    }
				});
			},
			goIndex() {
				uni.redirectTo({
				    url: '/pages/index/index'
				});
			},
			goAttachment(url) {
			    uni.redirectTo({
				    url: '/pages/index/attachment?url=' + url + '&backUrl=/pages/index/taskmanage'
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
			},
			displayM(task) {
				if (task.displayV == 'none') {
					task.displayV = 'block';
					task.displayL = '隐藏';
				} else {
					task.displayV = 'none';
					task.displayL = '显示';
				}
			},
			displayVideoM(task) {
				if (task.displayVideoV == 'none') {
					task.displayVideoV = 'block';
					task.displayVideoL = '隐藏';
				} else {
					task.displayVideoV = 'none';
					task.displayVideoL = '显示';
				}
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
