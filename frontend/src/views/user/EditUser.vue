<template>
  <div>
    <b-row class="match-height">
      <b-col lg="12">
        <b-card-code
          title="Edit User"
        >
          <b-form @submit.prevent="updateUser">
            <b-row>
              <b-col md="6">
                <b-form-group
                  label="First Name"
                  label-for="mc-first-name"
                >
                  <b-form-input
                    id="mc-first-name"
                    v-model="user.user_name"
                    placeholder="First Name"
                  />
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group
                  label="Last Name"
                  label-for="mc-last-name"
                >
                  <b-form-input
                    id="mc-last-name"
                    v-model="user.user_surname"
                    placeholder="Last Name"
                  />
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group
                  label="Entity"
                  label-for="mc-entity"
                >
                  <b-form-input
                    id="mc-entity"
                    v-model="user.entity_id"
                    type="number"
                    placeholder="Entity ID"
                    disabled="disabled"
                    :value="user.entity_id"
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
                    v-model="user.created_by_id"
                    type="number"
                    placeholder="Creator ID"
                    disabled="disabled"
                    :value="user.created_by_id"
                  />
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group
                  label="Group"
                  label-for="mc-group"
                >
                  <div class="form-label-group">
                    <b-form-input
                      id="mc-group"
                      v-model="user.group_name"
                      type="number"
                      placeholder="Group Name"
                      disabled="disabled"
                      :value="user.group_name"
                    />
                  </div>
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group
                  label-for="mc-email"
                  label="Email"
                >
                  <div class="form-label-group">
                    <b-form-input
                      id="mc-email"
                      v-model="user.user_email"
                      type="email"
                      placeholder="Email"
                    />
                  </div>
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
  name: 'EditUser',
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
    titleTemplate: '%s | Edit User',
    htmlAttrs: {
      lang: 'en',
      amp: true,
    },
  },
  data() {
    return {
      user: [],
    }
  },
  created() {
    // console.log(this.$route.params.id)
    // this.$store.dispatch('getUser', this.$route.params.id)
    const userId = this.$route.params.id
    $http.get(`http://localhost:8000/api/user/${userId}`)
      .then(response => {
        // JSON responses are automatically parsed.
        this.user = response.data
      })
      .catch(e => {
        this.errors.push(e)
      })
  },

  methods: {
    updateUser() {
      this.$store.dispatch('updateUser', this.user)
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
