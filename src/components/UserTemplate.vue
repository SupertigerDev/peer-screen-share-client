<template>
  <div class="user" v-if="user">
    <video class="video" controls autoplay ref="videoEl"></video>
    <div class="details">
      <div class="name">{{ user.name }}</div>
      <div class="id">({{ user.id }})</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, ref, watch } from "vue";
import { User } from "@/api/socketStore";

export default defineComponent({
  name: "UserTemplate",
  props: {
    user: Object as PropType<User>,
  },
  setup(props) {
    const videoEl = ref<HTMLVideoElement | null>(null);
    onMounted(() => {
      watch(
        () => props.user?.peer,
        (peer) => {
          peer?.on("stream", (stream) => {
            console.log("set stream");
            if (!videoEl.value) return;
            console.log("set streamx2");
            videoEl.value.srcObject = stream;
          });
        },
        { immediate: true }
      );
    });
    return { videoEl };
  },
});
</script>

<style scoped lang="scss">
.user {
  background: rgb(43, 43, 43);
  border-radius: 4px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-content: flex-start;
  margin: 5px;
}
.video {
  height: 170px;
  width: 250px;
}
.details {
  display: flex;
  align-items: center;
  align-content: center;
  margin-top: 5px;
  .id {
    opacity: 0.6;
    font-size: 12px;
    margin-left: 5px;
  }
}
</style>
