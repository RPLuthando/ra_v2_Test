<template>
  <b-card title="Create Awesome 🙌">
    <b-card-text>This is your second page.</b-card-text>
    <b-card-text>Chocolate sesame snaps pie carrot cake pastry pie lollipop muffin. Carrot cake dragée chupa chups jujubes. Macaroon liquorice cookie wafer tart marzipan bonbon. Gingerbread jelly-o dragée chocolate.</b-card-text>
  </b-card>
</template>

<script>
import { BCard, BCardText } from 'bootstrap-vue'

export default {
  components: {
    BCard,
    BCardText,
  },
  metaInfo: {
    title: 'Rapid Assurance',
    titleTemplate: '%s | Second Page',
    htmlAttrs: {
      lang: 'en',
      amp: true,
    },
  },
}
</script>

<style>

</style>
