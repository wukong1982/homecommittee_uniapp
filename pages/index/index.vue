<template>
	<view class="content">
		<image class="logo" src="/static/logo.jpg"></image>
		<text class="title">{{title}}</text>
		<view>
		    <navigator url="/pages/index/task" hover-class="navigator-hover" style="width:300rpx">
		        <button type="primary">作业</button>
		    </navigator>
		    <navigator url="/pages/index/announcement" hover-class="navigator-hover" style="width:300rpx">
		        <button type="primary">公告</button>
		    </navigator>
			<navigator url="/pages/index/taskmanage" hover-class="navigator-hover" style="width:300rpx">
			    <button type="primary">作业管理</button>
			</navigator>
			<navigator url="/pages/index/announcementmanage" hover-class="navigator-hover" style="width:300rpx">
			    <button type="primary">公告管理</button>
			</navigator>
			<navigator url="/pages/index/login" hover-class="navigator-hover" style="width:300rpx">
			    <button type="primary">重新登陆</button>
			</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: ''
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 750rpx;
	}

	.logo {
		height: 200rpx;
		width: 750rpx;
		margin-top: 1rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 1rpx;
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
