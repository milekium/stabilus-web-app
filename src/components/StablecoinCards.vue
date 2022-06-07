<template>
  <div
    id="project"
    classs="row justify-evenly items-center q-gutter-lg q-ma-sm q-col-gutter no-wrap"
    class="row q-ma-lg col-md-9"
  >
    <div
      v-for="(card, index) of descriptioncards"
      :key="index"
      class="col-xs-12 col-sm-6 col-md-4 flex q-mb-md"
    >
      <q-card
        v-if="!$q.screen.sm || card.show"
        bordered
        class="q-ma-lg fit bg-graddient"
      >
        <q-card-section class="">
          <div
            class="text-grey-10 q-mx-sm q-mt-sm text-h5 text-bolt text-capitalize"
          >
            {{ card.title }}
          </div>
        </q-card-section>
        <q-card-section class="text-grey-6 q-mx-sm text-justify text-body2">
          {{ card.subtitle }}
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import JSON from './data.json';

export default {
  name: 'StablecoinCards',
  setup() {
    const maxacumulada = JSON.data.map((row) => row['Maxacumulada']);
    const acumulada = JSON.data.map((row) => row['Acumulada']);
    const descriptioncards = [
      {
        title: 'Max. Accumulated',
        subtitle: maxacumulada.slice(-1)[0],
        show: true,
      },
      {
        title: 'Fee Accumulated',
        subtitle: acumulada.slice(-1)[0],
        show: true,
      },
      {
        title: 'Fund TVL',
        subtitle: '1.000.000 USD',
        show: false,
      },
    ];
    return { descriptioncards };
  },
};
</script>
<style lang="scss" scoped>
.search-engine.q-field--filled {
  background: $grey-5;
  border-radius: 10px 10px 5px 5px;
  -moz-border-radius: 30px 30px 10px 10px;
  padding-bottom: 35px;
}
.search-engine.q-field--filled .q-field__control:before {
  opacity: 1;
}
.search-engine .q-field__counter {
  line-height: 1.5;
}
.q-card--bordered {
  border-radius: 25px;
  -moz-border-radius: 25px;
  z-index: 0;
}
.q-card--bordered:before {
  content: '';
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 4px;
  border-radius: 25px;
  background: radial-gradient(circle, $primary 0%, $dark 100%);
  -webkit-mask: linear-gradient($primary 0 0) content-box,
    linear-gradient($primary 0 0);
  mask: linear-gradient($primary 0 0) content-box, linear-gradient($primary 0 0);
  mask-composite: exclude;
}
</style>
