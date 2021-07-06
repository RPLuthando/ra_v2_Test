<template>
  <div>
    <b-row class="match-height">
      <b-col lg="12">
        <b-card-code
          title="Create New Group"
        >
          <b-form @submit.prevent="createGroup">
            <b-row>
              <b-col md="6">
                <b-form-group
                  label="Group Name"
                  label-for="mc-first-name"
                >
                  <b-form-input
                    id="mc-group-name"
                    v-model="form.group_name"
                    placeholder="Group Name"
                  />
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group
                  label-for="mc-creator"
                  label="Creator ID"
                >
                  <div class="form-label-group">
                    <b-form-input
                      id="mc-email"
                      v-model="form.created_by_id"
                      placeholder="Creator ID"
                      disabled="disabled"
                    />
                  </div>
                </b-form-group>
              </b-col>
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

          <!--          <template #code>
                      {{ codeMultipleColumn }}
                    </template>-->
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

export default {
  name: 'CreateGroup',
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
    titleTemplate: '%s | Create Group',
    htmlAttrs: {
      lang: 'en',
      amp: true,
    },
  },
  data() {
    return {
      form: {
        group_name: '',
        created_by_id: this.$store.state.auth.initialState.user.created_by_id,
      },
    }
  },
  created() {
    console.log(this.$store.state.auth.user)
  },
  methods: {
    createGroup() {
      const data = this.form
      this.$store.dispatch('createGroup', data)
        .then(resp => {
          if (resp.data.status === 200) {
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
