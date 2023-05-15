
<script>
import store from '../../store';

function addNotif( type ) {
	store.dispatch('addNotifType', type);
}

function clearALL() {
	store.dispatch('delNotifs');
}


export default {
	name: 'NotificationHandler',
	setup() {
		return { addNotif, clearALL }
	}

}
</script>

<template>
  <div>
	<div class="notif_btn_container">
		<div id="notif_up_btn">
			<button @click="() => addNotif(0)">MATCH</button>
			<button @click="() => addNotif(1)">VUE</button>
			<button @click="() => addNotif(2)">MES</button>
			<button @click="() => addNotif(3)">DEL</button>
		</div>
		<div id="notif_down_btn">
			<button @click="() => clearALL()">RESET</button>
			<!-- <button @click="addNotif()">NEW</button> -->
		</div>
	</div>
  </div>
</template>



<style>
.notif_btn_container {
	display: flex;
	flex-direction: column;
	background-color: aqua;
	width: 200px;
	padding: 20px;
}

#notif_down_btn {
	display: flex;
	justify-content: space-between;
}

#notif_up_btn {
	display: flex;
	justify-content: space-around;
}
</style>


