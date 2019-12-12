<template>
	<view class="content">
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>

		<form @submit="formSubmit">
			<view style="width:700rpx">
				<view style="background-color:#C0C0C0;">科目</view>
				<input placeholder-style="color:#F76260" v-model="task_subject" placeholder="请输入科目" />
			</view>
			<view style="width:700rpx;height:600rpx">
				<view style="background-color:#C0C0C0;">描述</view>
				<textarea placeholder-style="color:#F76260" style="width:700rpx;height:500rpx" v-model="task_desc" placeholder="请输入描述"
				 maxlength="5000" />
			</view>
			<view style="width:700rpx;height:300rpx">
				<view style="background-color:#C0C0C0;">图片链接</view>
				<textarea placeholder-style="color:#F76260" style="width:700rpx;height:200rpx" v-model="task_url" placeholder="请输入图片链接,多个链接以---分割"
				 maxlength="2000" />
			</view>
			<view style="width:700rpx;height:300rpx">
				<view style="background-color:#C0C0C0;">视频链接</view>
				<textarea placeholder-style="color:#F76260" style="width:700rpx;height:200rpx" v-model="video_url" placeholder="请输入视频链接,多个链接以---分割"
				 maxlength="2000" />
			</view>
			
			<!--
			<view style="width:700rpx;display:flex;flex-direction:row;justify-content:flex-start;flex-wrap:wrap">
				<view><button type="primary" style="width:100rpx" @click="choosePic">选择照片</button></view>
				
				<view style="width:200rpx;height:200rpx;border:1px solid;" v-for="url in task_url">
					<image v-bind:src="url" style="width:200rpx;height:200rpx;"/>
				</view>
				<view style="width:200rpx;height:200rpx;border:1px solid;" v-for="filepath in filepaths">
					<image v-bind:src="filepath" style="width:200rpx;height:200rpx;"/>
				</view>
			</view>
			-->
			
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
			<view style="width:700rpx;">
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
				title: '作业编辑',
				task_subject: '',
				task_desc: '',
				task_url: '',
				video_url: '',
				objectId: ''
				//filepaths: [],
				//files:[]
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
						this.task_url = res.data.task_url;
						this.video_url = res.data.video_url;
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
				
				/*if (this.filepaths && this.filepaths.length > 0) {
					for (var i = 0; i < this.filepaths.length; i++) {
						var filepath = this.filepaths[i];
						var fileNameIndex = filepath.lastIndexOf("/") + 1;
						var fileName = filepath.substring(fileNameIndex);						
						console.log("file upload: " + filepath);
						
						uni.uploadFile({
						    url: 'https://api2.bmob.cn/2/files/myPicture.jpg', 
						    filePath: filepath,
							header: {
							    'X-Bmob-Application-Id':'3bea17a55823d07e2487d6db68a04ba0',
							    'X-Bmob-REST-API-Key':'c8069787cb4ff2c10d99dae927667233',
							    'Content-Type':'image/jpeg'
							},
						    name: 'file',
						    formData: {},
						    success: (uploadFileRes) => {
						        console.log(uploadFileRes.data);
						    }
						});
					}
				}
				return;*/
					
				var url = 'https://api2.bmob.cn/1/classes/task/';
				var method = 'POST';
				var classid = uni.getStorageSync('classid');
				var now = new Date();
				var date = this.formatDate(now) + " 00:00:00";
				
				var data = {
						task_subject: this.task_subject,
						task_desc: this.task_desc,						
						task_url: this.task_url,
						video_url: this.video_url,
						classid:classid
				};
				
				if (this.objectId && this.objectId.length > 0) {
					url = url + this.objectId;
					method = 'PUT';
				} else {
					data.task_date = {
						__type:'DATE',
						iso: date
					};
				}
				
				uni.request({
				    url: url, 
					method: method,
				    data: data,
				    header: {
				        'X-Bmob-Application-Id':'3bea17a55823d07e2487d6db68a04ba0',
				        'X-Bmob-REST-API-Key':'c8069787cb4ff2c10d99dae927667233',
				        'Content-Type':'application/json'
				    },
				    success: (res) => {
				        console.log(res.data.results);
				        uni.redirectTo({
				            url: '/pages/index/taskmanage'
				        });
				    }
				});
			},
			formReset() {
				uni.redirectTo({
				    url: '/pages/index/taskmanage'
				});
			},
			choosePic() {
				var _self = this;
				uni.chooseImage({
				    count: 1,
				    sizeType: ['original', 'compressed'],
				    success: function (res) {
						_self.files = res.tempFiles;
				        var tempFilePaths = res.tempFilePaths;
						
						var tempPaths = [];
						for (var i = 0; i < _self.filepaths.length; i++) {							
							tempPaths.push(_self.filepaths[i]);
						}
						for (var i = 0; i < tempFilePaths.length; i++) {
							tempPaths.push(tempFilePaths[i]);
						}
						
						_self.filepaths = tempPaths;
						console.log("File choosed: ");
						console.log(_self.filepaths);
				    },
				    error: function(e) {
				        console.log(e);
				    }
				});
			},			
			choosePic1(fileE) {
				var tempPaths = [];
				for (var i = 0; i < fileE.files.length; i++) {
					tempPaths.push(fileE.files[i].file);
				}
				
				this.filepaths = tempPaths;
				this.files = fileE.files;
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
