<script setup lang="ts">
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Main } from './components/Main'
import { Logo } from './components/Logo'
</script>

<template>
  <div>
    <Header />
    <Main>
      <Logo />
      <router-view />
    </Main>
    <Footer />
  </div>
</template>

<style scoped>

</style>
