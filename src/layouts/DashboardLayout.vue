<template>
  <q-layout view="hHh lpR lFf">
    <q-header class="bg-dark text-white">
      <q-toolbar>
        <q-btn
          color="grey-3"
          dense
          flat
          round
          icon="menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title class="text-grey-3"> Roomy </q-toolbar-title>
        <q-btn color="grey-3" dense flat round icon="settings" />
        <q-btn dense flat round icon="logout" to="auth" />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :mini="miniState"
      mini-to-overlay
      :width="200"
      :breakpoint="500"
      class="bg-dark full-height"
      @mouseover="miniState = false"
      @mouseout="miniState = true"
    >
      <q-scroll-area class="fit q-pt-xl">
        <q-list padding class="text-grey-5 full-height">
          <q-item v-ripple clickable to="/" exact>
            <q-item-section avatar>
              <q-icon name="home" />
            </q-item-section>
            <q-item-section> Home </q-item-section>
          </q-item>
          <q-item v-ripple clickable exact to="/day">
            <q-item-section avatar>
              <q-icon name="videocam" />
            </q-item-section>
            <q-item-section> Day </q-item-section>
          </q-item>
          <q-space />

          <q-item v-ripple clickable exact to="/hour">
            <q-item-section avatar> <q-icon name="people" /> </q-item-section>
            <q-item-section> Hour </q-item-section>
          </q-item>
          <q-item v-ripple clickable exact to="/wallet">
            <q-item-section avatar>
              <q-icon name="account_balance_wallet" />
            </q-item-section>
            <q-item-section> Wallet </q-item-section>
          </q-item>
          <q-item v-ripple clickable exact to="/bridge">
            <q-item-section avatar>
              <q-icon name="calendar_month" />
            </q-item-section>
            <q-item-section> Bridge </q-item-section>
          </q-item>
          <q-item v-ripple clickable to="/chart">
            <q-item-section avatar>
              <q-icon name="dynamic_form" />
            </q-item-section>
            <q-item-section> Chart </q-item-section>
          </q-item>
          <q-separator vertical />
          <q-space />

          <q-item v-ripple clickable>
            <q-item-section avatar>
              <q-icon name="settings" />
            </q-item-section>

            <q-item-section> Settings </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const leftDrawerOpen = ref(false);

    return {
      miniState: ref(true),
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
};
</script>
