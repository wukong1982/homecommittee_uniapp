<template>
	<view class="content">		
		<view class="text-area">
			<text class="title">{{page_title}}</text>
		</view>
		
		<form @submit="formSubmit">
			<view style="width:700rpx">
				<view style="background-color:#C0C0C0;">标题</view>
				<input placeholder-style="color:#F76260" v-model="title" placeholder="请输入标题" />
			</view>
			<view style="width:700rpx;height:600rpx">
				<view style="background-color:#C0C0C0;">内容</view>				    
				<textarea placeholder-style="color:#F76260" style="width:700rpx;height:500rpx" v-model="content" placeholder="请输入内容" maxlength="5000"/>
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
			<view>
				<button type="primary" form-type="submit">提交</button>
				<button type="primary" @click="formReset()">取消</button>
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
				page_title: '公告编辑',
				content: '',
				objectId: '',
				title:''
			}
		},
		onLoad(option) {
			var classname = uni.getStorageSync('classname');
			uni.setNavigationBarTitle({
			    title: classname
			});
			
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
            	    url: 'https://api2.bmob.cn/1/classes/announcement/' + this.objectId, 
            	    data: {
            	    },
            	    header: {
            	        'X-Bmob-Application-Id':'3bea17a55823d07e2487d6db68a04ba0',
            	        'X-Bmob-REST-API-Key':'c8069787cb4ff2c10d99dae927667233',
            	        'Content-Type':'application/json'
            	    },
            	    success: (res) => {
            	        console.log(res.data);        
            	        this.title = res.data.title;
						this.content = res.data.content;
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
				if(!this.title || this.title.length <=0 || !this.content || this.content.length <=0) {
					return;
				}
				
				var url = 'https://api2.bmob.cn/1/classes/announcement/';
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
						title: this.title,
						content: this.content,
						classid: classid
				    },
				    header: {
				        'X-Bmob-Application-Id':'3bea17a55823d07e2487d6db68a04ba0',
				        'X-Bmob-REST-API-Key':'c8069787cb4ff2c10d99dae927667233',
				        'Content-Type':'application/json'
				    },
				    success: (res) => {
				        console.log(res.data.results);
				        uni.redirectTo({
				            url: '/pages/index/announcementmanage'
				        });
				    }
				});
			},
			formReset() {
				uni.redirectTo({
				    url: '/pages/index/announcementmanage'
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
