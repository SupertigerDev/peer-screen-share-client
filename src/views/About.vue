<template>
  <div class="about">
    <h1>{{ connected }}</h1>
    <UserTemplate v-for="user in connectedUsers" :key="user.id" :user="user" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { room } from "@/api";
import router from "@/router";
import useSocket from "@/api/socketStore";
import UserTemplate from "@/components/UserTemplate.vue";
export default defineComponent({
  components: { UserTemplate },
  setup() {
    const { connect, connected, connectedUsers } = useSocket();

    onMounted(() => {
      connect();
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
</style>
