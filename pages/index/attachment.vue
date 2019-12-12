<template>
	<view class="content">
	<view style="width:700rpx;height:100rpx;display:flex; flex-direction: row;">
		<a href="#" @click="goBack()" style="color:#007AFF;font-size:36rpx">返回</a>
	</view>
	<view style="width:700rpx;">
        <web-view :webview-styles="webviewStyles" v-bind:src="url"></web-view>
    </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url: '',
				backUrl: '',
				webviewStyles: {
                    progress: {
                        color: '#FF3333'
                    }
                }
			}
		},
		onLoad(option) {
			if (option) {
			    this.url = option.url;
				this.backUrl = option.backUrl;
			}
		},
		methods: {
            goBack() {
				console.log(1);
				console.log(this.backUrl);
				uni.redirectTo({
				    url: this.backUrl
				});
            }
		}
	}
</script>

<style>
    .content {
    	display: flex;
    	flex-direction: column;
    	align-items:center;
    	justify-content:center;
    	font-size: 24rpx;		
    }
</style>
