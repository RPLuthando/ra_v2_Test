<template>
  <div>
    <b-row class="match-height">
      <b-col lg="12">
        <b-card-code
          title="Edit Group"
        >
          <b-form @submit.prevent="updateGroup">
            <b-row>
              <b-col md="6">
                <b-form-group
                  label="Group Name"
                  label-for="mc-group-name"
                >
                  <b-form-input
                    id="mc-group-name"
                    v-model="group.group_name"
                    placeholder="Group Name"
                  />
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group
                  label="Creator"
                  label-for="mc-created"
                >
                  <b-form-input
                    id="mc-created"
                    v-model="group.created_by_id"
                    type="number"
                    placeholder="Creator ID"
                    disabled="disabled"
                    :value="group.created_by_id"
                  />
                </b-form-group>
              </b-col>

              <!-- submit and reset -->
              <b-col>
                <b-button
                  v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                  type="submit"
                  variant="primary"
                  class="mr-1"
                >
                  Submit
                </b-button>
                <b-button
                  v-ripple.400="'rgba(186, 191, 199, 0.15)'"
                  type="reset"
                  variant="outline-secondary"
                >
                  Reset
                </b-button>
              </b-col>
            </b-row>
          </b-form>
        </b-card-code>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import BCardCode from '@core/components/b-card-code'
import {
  BRow, BCol, BFormGroup, BFormInput, BForm, BButton,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import ToastificationContent from '@core/components/toastification/ToastificationContent'
import $http from '../../libs/axios'

export default {
  name: 'EditGroup',
  components: {
    BCardCode,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    // BFormCheckbox,
    BForm,
    BButton,
  },
  directives: {
    Ripple,
  },
  metaInfo: {
    title: 'Rapid Assurance',
    titleTemplate: '%s | Edit Group',
    htmlAttrs: {
      lang: 'en',
      amp: true,
    },
  },
  data() {
    return {
      group: [],
    }
  },
  created() {
    const groupId = this.$route.params.id
    $http.get(`api/view_group/${groupId}`)
      .then(response => {
        console.log(response)
        this.group = response.data
      })
      .catch(e => {
        this.errors.push(e)
      })
  },
  methods: {
    updateGroup() {
      this.$store.dispatch('updateGroup', this.group)
        .then(resp => {
          if (resp.data.status === 201) {
            this.$toast({
              component: ToastificationContent,
              props: {
                title: resp.data.message,
                icon: 'MehIcon',
                variant: 'success',
              },
            })
          } else if (resp.data.message === 422) {
            this.$toast({
              component: ToastificationContent,
              props: {
                title: resp.data.message,
                icon: 'AlertOctagonIcon',
                variant: 'error',
              },
            })
          }
        })
    },
  },
}
</script>

<style scoped>

</style>
