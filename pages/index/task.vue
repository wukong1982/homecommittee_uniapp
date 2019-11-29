<template>
	<view class="content uni-padding-wrap uni-common-mt">		
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
		
		<view style="width:500rpx" v-for="task in tasks">
		  <text>{{task.task_subject + "  " + getTaskDate(task.task_date)}}</text>
		  <br>
		  <text>{{task.task_desc}}</text>
		  <hr>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '作业',
				tasks: [
				]
			}
		},
		onLoad() {
            this.getData();
		},
		methods: {
            getData() {
            	uni.request({
            	    url: 'https://api2.bmob.cn/1/classes/task?order=-task_date&limit=50', //仅为示例，并非真实接口地址。
            	    data: {
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
