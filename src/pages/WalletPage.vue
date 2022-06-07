<template>
  <q-page padding>
    <h1>Connect Sample</h1>
    {{ states }}
    <pre v-if="!states">{{
      JSON.stringify(
        {
          availableConnectTypes,
          availableInstallTypes,
          availableConnections,
          states,
          supportFeatures,
        },
        null,
        2
      )
    }}</pre>
    <!-- <footer v-if="states?.status === WalletStatus.WALLET_NOT_CONNECTED">
      <q-btn
        v-for="connectType in availableInstallTypes"
        v-on:click="controller.install(connectType)"
      >
        Install {{ connectType }}
      </q-btn>
      <q-btn
        v-for="connectType in availableConnectTypes"
        v-on:click="controller.connect(connectType)"
      >
        Connect {{ connectType }}
      </q-btn>
      <br />
      <q-btn
        v-for="connection in availableConnections"
        v-on:click="controller.connect(connection.type, connection.identifier)"
      >
        <img
          v-bind:src="connection.icon"
          v-bind:alt="connection.name"
          style="width: 1em; height: 1em"
        />
        {{ connection.name }} [{{ connection.identifier }}]
      </q-btn>
    </footer> -->
    <!-- <footer v-if="subscription.states?.status === WalletStatus.WALLET_CONNECTED">
      <button v-on:click="controller.disconnect()">Disconnect</button>
    </footer> -->
  </q-page>
</template>

<script setup lang="ts">
import {
  Connection,
  ConnectType,
  WalletStates,
  WalletStatus,
} from '@terra-money/wallet-controller';
import { getController } from 'src/services/walletController';
import { onMounted, onUnmounted, ref } from 'vue';
import { Subscription, combineLatest } from 'rxjs';

const controller = getController();

const availableConnectTypes = ref<ConnectType[]>([]);
const availableInstallTypes = ref<ConnectType[]>([]);
const availableConnections = ref<Connection[]>([]);
const states = ref<WalletStates | null>(null);
const supportFeatures = ref<string[]>([]);

let subscription: Subscription | null = null;

onMounted(() => {
  subscription = combineLatest([
    controller.availableConnectTypes(),
    controller.availableInstallTypes(),
    controller.availableConnections(),
    controller.states(),
  ]).subscribe(
    ([
      _availableConnectTypes,
      _availableInstallTypes,
      _availableConnections,
      _states,
    ]) => {
      availableInstallTypes.value = _availableInstallTypes;
      availableConnectTypes.value = _availableConnectTypes;
      availableConnections.value = _availableConnections;
      states.value = _states;
      supportFeatures.value =
        _states.status === WalletStatus.WALLET_CONNECTED
          ? Array.from(_states.supportFeatures)
          : [];
    }
  );
});
onUnmounted(() => {
  subscription?.unsubscribe();
});
</script>
