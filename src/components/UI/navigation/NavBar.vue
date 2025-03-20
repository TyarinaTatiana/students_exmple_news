<template>
  <v-app-bar app color="#01579B">
    <v-btn icon="mdi-menu"/>
    <v-icon>$logoIcon</v-icon>
    <user-panel/>
  </v-app-bar>
</template>

<script setup>


import UserPanel from "@/components/UI/navigation/UserPanel.vue";
</script>


<style lang="scss" scoped>

</style>