<template>
  <FlowEditor />
</template>

<script >
import FlowEditor from "./components/FlowEditor.vue";
export default {
  components: { FlowEditor },
};
</script>

<style>
body {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 0;
  margin: 0;
}
#app {
  height: 100%;
  width: 100%;
}
</style>
