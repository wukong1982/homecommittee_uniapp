<template>
	<view class="content">		
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
		
		<view style="width:700rpx">
		<a href="#" @click="goIndex()" style="position:relative;color:#007AFF;font-size:36rpx">返回首页</a>
		</view>

		<view style="width:700rpx;border-bottom:5rpx #00FF00 solid;" v-for="announcement in announcements">
			<text>{{announcement.title + "(" + getUpdatedDate(announcement.updatedAt) + ")"}}</text>
			<br>
			<text class="flex-item uni-bg-green">{{announcement.content}}</text>
			<view v-if="announcement.image_url_array && announcement.image_url_array.length > 0">
			    <a href="javascript:void(0)" @click="displayImageM(announcement)" style="margin-left:10rpx;color:#007AFF">{{announcement.displayImageL}}图片</a>
			    <view v-bind:style="'display:' + announcement.displayImageV" v-for="url in announcement.image_url_array">
				      <image class="logo" width="700rpx" :src="url"></image>
			    </view>
			</view>
			
			<view v-if="announcement.video_url_array && announcement.video_url_array.length > 0">
			    <a href="javascript:void(0)" @click="displayVideoM(announcement)" style="margin-left:10rpx;color:#007AFF">{{announcement.displayVideoL}}视频</a>
			    <view v-bind:style="'display:' + announcement.displayVideoV" v-for="url in announcement.video_url_array">
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
				title: '公告',
				announcements: [				    
				]
			}
		},
		onLoad() {
			var classname = uni.getStorageSync('classname');
			uni.setNavigationBarTitle({
			    title: classname
			});
			
			var classid = uni.getStorageSync('classid');
            uni.request({
                url: 'https://api2.bmob.cn/1/classes/announcement?order=-updatedAt&limit=50',
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
		            let announcements = res.data.results;
		            for (let i = 0; i < announcements.length; i++) {
		            	let image_url = announcements[i].image_url;
		            	let image_url_array = [];
		            	if (image_url && image_url.length > 0) {
		            		image_url_array = image_url.split("---");
		            	}
		            	for (let j = 0; j < image_url_array.length; j++) {
		            		image_url_array[j] = image_url_array[j].trim();
		            	}
		            	announcements[i].image_url_array = image_url_array;
		            	announcements[i].displayImageV = "none";
		            	announcements[i].displayImageL = "显示";
		            	
		            	let video_url = announcements[i].video_url;
		            	let video_url_array = [];
		            	if (video_url && video_url.length > 0) {
		            		video_url_array = video_url.split("---");
		            	}
		            	for (let j = 0; j < video_url_array.length; j++) {
		            		video_url_array[j] = video_url_array[j].trim();
		            	}
		            	announcements[i].video_url_array = video_url_array;
		            	announcements[i].displayVideoV = "none";
		            	announcements[i].displayVideoL = "显示";
		            }
		            
		            this.announcements = announcements;
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
			},
			displayImageM(announcement) {
				if (announcement.displayImageV == 'none') {
					announcement.displayImageV = 'block';
					announcement.displayImageL = '隐藏';
				} else {
					announcement.displayImageV = 'none';
					announcement.displayImageL = '显示';
				}
			},
			displayVideoM(announcement) {
				if (announcement.displayVideoV == 'none') {
					announcement.displayVideoV = 'block';
					announcement.displayVideoL = '隐藏';
				} else {
					announcement.displayVideoV = 'none';
					announcement.displayVideoL = '显示';
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
