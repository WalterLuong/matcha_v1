<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'
import { IDiscussion, IMessage } from '../types'
import { useRoute } from 'vue-router'

const route = useRoute()
const store = useStore();

const chatId = route.params.id;
const data = computed(() => store.getters.getDiscussionByChatId(chatId))
const messages: IMessage[] = data.value.discussion;


</script>

<template>
	<div class="plop">
		
		<div class="chat_container">
			<div>
				<div v-for="(message, index) in messages" :key="index" :message="message">
					<p>{{message.message}}</p>
				</div>
			</div>
		</div>

	</div>
</template>

<style>
.plop {
	background-color: green;
	height: 100%;
	width: 100%;
}
</style>