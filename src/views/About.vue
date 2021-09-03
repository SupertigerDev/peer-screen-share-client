<template>
  <div class="about">
    <h1>{{ connected }}</h1>
    <div class="list">
      <UserTemplate />
      <UserTemplate
        v-for="user in connectedUsers"
        :key="user.id"
        :user="user"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { room } from "@/api";
import router from "@/router";
import useSocket from "@/api/socketStore";
import UserTemplate from "@/components/UserTemplate.vue";
import Peer, { SignalData } from "simple-peer";
export default defineComponent({
  components: { UserTemplate },
  setup() {
    const { connect, connected, connectedUsers, socket } = useSocket();

    onMounted(async () => {
      connect();
      // const video = await (navigator.mediaDevices as any).getDisplayMedia({
      //   video: true,
      // });
    });

    return { connected, connectedUsers };
  },
});
</script>

<style scoped>
.about {
  display: flex;
  flex-direction: column;
  color: white;
}
.list {
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  flex-wrap: wrap;
}
</style>
