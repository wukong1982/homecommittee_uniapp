<template>
	<view class="content">		
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
		
		<form @submit="formSubmit">
			<view class="uni-form-item uni-row" style="width:500rpx">
				<view style="background-color:#C0C0C0;">科目</view>
				<input placeholder-style="color:#F76260" v-model="task_subject" placeholder="请输入科目" />
			</view>
			<view class="uni-form-item uni-column">
				<view style="background-color:#C0C0C0;">描述</view>				    
				<textarea placeholder-style="color:#F76260" v-model="task_desc" placeholder="请输入描述"/>
			</view>
			<!--
			<view style="width:100rpx;height:100rpx">
			    <uni-calendar 
			    ref="calendar"
			    :insert="false"
			    @confirm="confirm"
				style="width:80rpx;height:80rpx"
			     ></uni-calendar>
			     <button @click="openCalendar">打开日历</button>
			</view>
			-->
			<view class="uni-btn-v">
				<button form-type="submit">提交</button>
				<button type="default" @click="formReset()">取消</button>
			</view>
		</form>
		
	</view>
</template>

<script>
	//import uniCalendar from "@/components/uni-calendar/uni-calendar"
	export default {
		//components: {
		//    uniCalendar
		//},
		data() {
			return {
				title: '作业',
				task_subject: '',
				task_desc: '',
				objectId: ''
			}
		},
		onLoad(option) {
			if (option) {
                this.objectId = option.objectId;
			}
			
			if (this.objectId && this.objectId.length > 0) {
				this.getData();
			}
		},
		methods: {
            getData() {
            	uni.request({
            	    url: 'https://api2.bmob.cn/1/classes/task/' + this.objectId, 
            	    data: {
            	    },
            	    header: {
            	        'X-Bmob-Application-Id':'3bea17a55823d07e2487d6db68a04ba0',
            	        'X-Bmob-REST-API-Key':'c8069787cb4ff2c10d99dae927667233',
            	        'Content-Type':'application/json'
            	    },
            	    success: (res) => {
            	        console.log(res.data);        
            	        this.task_subject = res.data.task_subject;
						this.task_desc = res.data.task_desc;
            	    }
            	});
            },
			openCalendar() {
			    this.$refs.calendar.open();
			},
			formatDate(date) {
			    var myyear = date.getFullYear();
			    var mymonth = date.getMonth() + 1;
			    var day = date.getDate();
			 
			    if (mymonth < 10) {
			        mymonth = "0" + mymonth;
			    }
			    if (day < 10) {
			        day = "0" + day;
			    }
			    return (myyear + "-" + mymonth + "-" + day);
			},
			formSubmit() {
				if(!this.task_subject || this.task_subject.length <=0 || !this.task_desc || this.task_desc.length <=0) {
					return;
				}
				
				var url = 'https://api2.bmob.cn/1/classes/task/';
				var method = 'POST';
				if (this.objectId && this.objectId.length > 0) {
					url = url + this.objectId;
					method = 'PUT';
				}
				var classid = uni.getStorageSync('classid');
				var now = new Date();
				var date = this.formatDate(now) + " 00:00:00";
				uni.request({
				    url: url, 
					method: method,
				    data: {
						task_subject: this.task_subject,
						task_desc: this.task_desc,
						task_date:{
							__type:'DATE',
							iso: date
						},
						classid:classid
				    },
				    header: {
				        'X-Bmob-Application-Id':'3bea17a55823d07e2487d6db68a04ba0',
				        'X-Bmob-REST-API-Key':'c8069787cb4ff2c10d99dae927667233',
				        'Content-Type':'application/json'
				    },
				    success: (res) => {
				        console.log(res.data.results);
				        uni.navigateTo({
				            url: '/pages/index/taskmanage'
				        });
				    }
				});
			},
			formReset() {
				uni.navigateTo({
				    url: '/pages/index/taskmanage'
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
