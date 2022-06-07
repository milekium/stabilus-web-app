<template>
  <q-page class="row items-center justify-evenly bg-dark">
    <div class="col-10">
      <q-card class="col-10 bg-transparent" flat>
        <q-card-section horizontal>
          <q-card-section>
            <div
              class="q-my-xs text-h5 text-white text-bold col-11 col-md-7"
              style="z-index: 1"
            >
              Stabilus Bridge
            </div>
          </q-card-section>
          <q-space />
          <q-card-actions align="right">
            <q-btn
              rounded
              color="primary"
              icon="share"
              label="Connect Wallet"
            />
          </q-card-actions>
        </q-card-section>
      </q-card>
      <q-card class="row justify-evenly col-10 q-gutter-xs bg-grey-2" bordered>
        <q-card-section class="col-12">
          <div class="text-h6 text-center q-mb-xs">Send</div>
        </q-card-section>
        <q-card-section class="col-8" horizontal>
          <q-card-section>
            <q-btn size="xl" round> btn </q-btn>
            <q-select
              v-model="fromNetworkModel"
              label="from"
              bottom-slots
              :options="fromNetwork"
            ></q-select>
          </q-card-section>
          <q-space />
          <q-card-section>
            <q-btn size="xl" round> UST </q-btn>
            <q-select
              v-model="toNetworkModel"
              label="to"
              bottom-slots
              :options="toNetwork"
            ></q-select>
          </q-card-section>
        </q-card-section>
        <q-card-section class="col-10 q-gutter-xl">
          <q-select
            v-model="assetModel"
            label="Asset"
            bottom-slots
            :options="options"
            behavior="dialog"
            options-selected-class="text-deep-orange"
          >
            <template v-slot:hint>
              Copy Luna token address Ethereum Terra
            </template>
            <template v-slot:option="scope">
              <q-item v-bind="scope.itemProps">
                <q-item-section avatar>
                  <q-icon :name="scope.opt.icon" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ scope.opt.label }}</q-item-label>
                  <q-item-label caption>{{
                    scope.opt.description
                  }}</q-item-label>
                </q-item-section>
              </q-item>
            </template>
          </q-select>
          <q-input v-model="amountModel" label="Amount">
            <template v-slot:append>
              <q-btn>max</q-btn>
            </template>
          </q-input>
          <q-input v-model="destAddressModel" label="Destination Address">
          </q-input>
        </q-card-section>
        <q-card-section horizontal>
          <q-card-actions align="center">
            <q-btn rounded color="primary" size="lg"> Connect Wallet </q-btn>
          </q-card-actions>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script lang="ts">
import { ref } from 'vue';
const assetsList = ['uLuna', 'UST', 'aUST', 'bLuna', 'ANC'];
const options = [
  {
    label: 'uLuna',
    value: 'uLuna',
    description: 'u Luna',
    icon: 'mail',
  },
  {
    label: 'uLuna',
    value: 'uLuna',
    description: 'u Luna',
    icon: 'mail',
  },
  {
    label: 'ANC',
    value: 'anc',
    description: 'Anchor',
    icon: 'bluetooth',
  },
  {
    label: 'aUST',
    value: 'aUST',
    description: 'anchor UST',
    icon: 'mail',
  },
];
const fromNetwork = ['terra'];
const toNetwork = ['poligon', 'ethereum'];

export default {
  name: 'BridgePage',
  setup() {
    const fromNetworkModel = ref(fromNetwork[0]);
    const toNetworkModel = ref(toNetwork[0]);
    const amountModel = ref();
    const assetModel = ref();
    const destAddressModel = ref();
    return {
      amountModel,
      assetModel,
      destAddressModel,
      assetsList,
      options,
      fromNetwork,
      toNetwork,
      fromNetworkModel,
      toNetworkModel,
    };
  },
};
</script>
