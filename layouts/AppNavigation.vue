<template>
  <div>
  <v-app-bar>
    <!--App title-->
    <v-toolbar-title class="headline text-uppercase">
      <span class="mr-4">Nuture Technology</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <!--Menu-->
    <v-btn text to="/">
      <span class="mr-2">Home</span>
    </v-btn>
    <v-btn text to="/staff">
      <span class="mr-2">Staff</span>
    </v-btn>
    <v-btn text to="/department">
      <span class="mr-2">Department</span>
    </v-btn>
  </v-app-bar>
  <nuxt/>
  </div>
</template>

<script>
export default {
  name: "AppNavigation"
};
</script>

<style scoped></style>
