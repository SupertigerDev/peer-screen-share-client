<template>
  <div class="create">
    <div class="center-box">
      <input class="input" type="text" v-model="roomName" placeholder="Room Name" />
      <button class="button" @click="onCreateClick">Create</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { room } from "@/api";

export default defineComponent({
  setup() {
    const roomName = ref("");
    const onCreateClick = () => {
      if (!roomName.value.trim()) {
        roomName.value = "Unnamed Room";
      }
      room.create({
        roomName: roomName.value,
        username: "Fishie",
      });
    };
    return { onCreateClick, roomName };
  },
});
</script>

<style scoped lang="scss">
.create {
  height: 100%;
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;
}
.center-box {
  display: flex;
  flex-direction: column;
}
.input {
  background: rgb(32, 32, 32);
  border-radius: 6px;
  padding: 10px;
  font-size: 18px;
  color: white;
  outline: none;
  border: none;
}
.button {
  border-radius: 8px;
  margin-top: 10px;
  padding: 10px;
  color: white;
  background: rgb(46, 119, 255);
  font-size: 18px;
  border: none;
  outline: none;
  cursor: pointer;
}
</style>
