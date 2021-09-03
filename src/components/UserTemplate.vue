<template>
  <div class="user" v-if="user">
    <div class="details">
      <div class="name">{{ user.name }}</div>
      <div class="id">({{ user.id }})</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { User } from "@/api/socketStore";

export default defineComponent({
  name: "UserTemplate",
  props: {
    user: Object as PropType<User>,
  },
});
</script>

<style scoped lang="scss">
.user {
  background: rgb(43, 43, 43);
  border-radius: 4px;
  padding: 10px;
  display: flex;
  align-content: flex-start;
  margin: 5px;
}
.details {
  display: flex;
  align-items: center;
  align-content: center;
  .id {
    opacity: 0.6;
    font-size: 12px;
    margin-left: 5px;
  }
}
</style>
