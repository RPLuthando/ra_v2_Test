<template>
  <div>
    <b-row class="match-height">
      <b-col lg="12">
        <b-card-code
          title="Create New User"
        >
          <b-form @submit.prevent="createUser">
            <b-row>
              <b-col md="6">
                <b-form-group
                  label="First Name"
                  label-for="mc-first-name"
                >
                  <b-form-input
                    id="mc-first-name"
                    v-model="form.user_name"
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
                    v-model="form.user_surname"
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
                    v-model="form.entity_id"
                    type="number"
                    placeholder="Entity ID"
                    disabled="disabled"
                    :value="form.entity_id"
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
                    v-model="form.created_by_id"
                    type="number"
                    placeholder="Creator ID"
                    disabled="disabled"
                    :value="form.created_by_id"
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
                      v-model="form.group_name"
                      type="number"
                      placeholder="Group Name"
                      disabled="disabled"
                      :value="form.group_name"
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
                      v-model="form.user_email"
                      type="email"
                      placeholder="Email"
                    />
                  </div>
                </b-form-group>
              </b-col>

              <!--              <b-col cols="12">
                <b-form-group>
                  <b-form-checkbox
                    id="checkbox-10"
                    name="checkbox-10"
                    value="Remember_me"
                  >
                    Remember me
                  </b-form-checkbox>
                </b-form-group>
              </b-col>-->

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
import $http from '@/libs/axios'

export default {
  name: 'CreateUser',
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
    titleTemplate: '%s | Create User',
    htmlAttrs: {
      lang: 'en',
      amp: true,
    },
  },
  data() {
    return {
      form: {
        user_name: '',
        user_surname: '',
        user_email: '',
        entity_id: this.$store.state.auth.initialState.user.entity_id,
        created_by_id: this.$store.state.auth.initialState.user.created_by_id,
        group_name: this.$store.state.auth.initialState.user.group_name,
        active: 1,
      },
    }
  },
  created() {
    console.log('User', this.$store.state.auth.initialState.user)
    console.log('Token', localStorage.getItem('token'))
  },

  methods: {
    createUser() {
      const data = this.form
      console.log(data)
      $http.post('api/register', data)
        .then(resp => {
          if (resp.data.status) {
            this.$toast({
              component: ToastificationContent,
              props: {
                title: resp.data.message,
                icon: 'MehIcon',
                variant: 'success',
              },
            })
            // this.$router.push('/users')
          }
        })
    },
  },
}
</script>

<style scoped>

</style>
