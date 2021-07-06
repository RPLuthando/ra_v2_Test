<template>
  <div>
    <div>
      <!-- Filters -->
      <!--      <users-list-filters
        :role-filter.sync="roleFilter"
        :plan-filter.sync="planFilter"
        :status-filter.sync="statusFilter"
        :role-options="roleOptions"
        :plan-options="planOptions"
        :status-options="statusOptions"
      />-->

      <!-- Table Container Card -->
      <b-card
        no-body
        class="mb-0"
      >

        <div class="m-2">

          <!-- Table Top -->
          <b-row>

            <!-- Per Page -->
            <b-col
              cols="12"
              md="6"
              class="d-flex align-items-center justify-content-start mb-1 mb-md-0"
            >
              <label>Show</label>
              <v-select
                v-model="perPage"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="perPageOptions"
                :clearable="false"
                class="per-page-selector d-inline-block mx-50"
              />
              <label>entries</label>
            </b-col>

            <!-- Search -->
            <b-col
              cols="12"
              md="6"
            >
              <div class="d-flex align-items-center justify-content-end">
                <b-form-input
                  class="d-inline-block mr-1"
                  placeholder="Search..."
                />
                <b-button
                  variant="primary"
                  :to="{ name: 'create-user' }"
                >
                  <span class="text-nowrap">Add User</span>
                </b-button>
              </div>
            </b-col>
          </b-row>

        </div>

        <b-table
          ref="refUserListTable"
          class="position-relative"
          :items="users"
          responsive
          :fields="tableColumns"
          primary-key="id"
          show-empty
          empty-text="No matching records found"
          :sort-desc.sync="isSortDirDesc"
        >

          <!-- Column: User -->
          <template #cell(user)="users">
            <b-media vertical-align="center">
              <template #aside>
                <b-avatar
                  size="32"
                  :src="users.item.user_name"
                  :text="avatarText(users.item.user_name)"
                  :to="{ name: 'edit-user', params: { id: users.item.id } }"
                />
              </template>
              <b-link
                :to="{ name: 'edit-user', params: { id: users.item.id } }"
                class="font-weight-bold d-block text-nowrap"
              >
                {{ users.item.user_name }} {{ users.item.user_surname }}
              </b-link>
              <small class="text-muted">@{{ users.item.user_name }}{{ users.item.user_surname }}</small>
            </b-media>
          </template>

          <!-- Column: Role -->
          <template #cell(email)="users">
            <span class="align-text-top">{{ users.item.user_email }}</span>
          </template>

          <!-- Column: Group -->
          <template #cell(group)="users">
            <span class="align-text-top text-capitalize">{{ users.item.group_name }}</span>
          </template>

          <!-- Column: Entity -->
          <template #cell(entity)="users">
            <span class="align-text-top text-capitalize">{{ users.item.entity_id }}</span>
          </template>

          <!-- Column: Status -->
          <template #cell(active)="users">
            <b-badge
              pill
              class="text-capitalize"
            >
              {{ users.item.active }}
            </b-badge>
          </template>

          <!-- Column: Actions -->
          <template #cell(actions)="users">
            <b-dropdown
              variant="link"
              no-caret
              :right="$store.state.appConfig.isRTL"
            >

              <template #button-content>
                <feather-icon
                  icon="MoreVerticalIcon"
                  size="16"
                  class="align-middle text-body"
                />
              </template>

              <b-dropdown-item :to="{ name: 'edit-user', params: { id: users.item.id } }">
                <feather-icon icon="EditIcon" />
                <span class="align-middle ml-50">Edit</span>
              </b-dropdown-item>

              <b-dropdown-item
                @click.prevent="deleteUser(users.item.id)"
              >
                <feather-icon icon="TrashIcon" />
                <span class="align-middle ml-50">Delete</span>
              </b-dropdown-item>
            </b-dropdown>
          </template>

        </b-table>
        <div class="mx-2 mb-2">
          <b-row>

            <b-col
              cols="12"
              sm="6"
              class="d-flex align-items-center justify-content-center justify-content-sm-start"
            >
              <span class="text-muted">Showing
                <!--                  {{ dataMeta.from }} to {{ dataMeta.to }} of {{ dataMeta.of }} -->
                entries</span>
            </b-col>
            <!-- Pagination -->
            <b-col
              cols="12"
              sm="6"
              class="d-flex align-items-center justify-content-center justify-content-sm-end"
            >

              <b-pagination
                v-model="currentPage"
                :per-page="perPage"
                first-number
                last-number
                class="mb-0 mt-1 mt-sm-0"
                prev-class="prev-item"
                next-class="next-item"
              >
                <template #prev-text>
                  <feather-icon
                    icon="ChevronLeftIcon"
                    size="18"
                  />
                </template>
                <template #next-text>
                  <feather-icon
                    icon="ChevronRightIcon"
                    size="18"
                  />
                </template>
              </b-pagination>

            </b-col>

          </b-row>
        </div>
      </b-card>
    </div>
  </div>
</template>

<script>
import {
  BCard, BRow, BCol,
  BFormInput, BButton, BTable, BMedia, BAvatar, BLink,
  BBadge, BDropdown, BDropdownItem, BPagination,
} from 'bootstrap-vue'

import vSelect from 'vue-select'
import { avatarText } from '@core/utils/filter'
import $http from '@/libs/axios'
import ToastificationContent from '@core/components/toastification/ToastificationContent'

export default {
  name: 'UserList',
  components: {
    // UsersListFilters,

    BCard,
    BRow,
    BCol,
    BFormInput,
    BButton,
    BTable,
    BMedia,
    BAvatar,
    BLink,
    BBadge,
    BDropdown,
    BDropdownItem,
    BPagination,

    vSelect,
  },
  metaInfo: {
    title: 'Rapid Assurance',
    titleTemplate: '%s | User List',
    htmlAttrs: {
      lang: 'en',
      amp: true,
    },
  },
  data() {
    return {
      avatarText,
      perPage: 10,
      perPageOptions: [10, 25, 50, 100],
      tableColumns: [
        { key: 'user', sortable: true },
        { key: 'email', sortable: true },
        { key: 'group', sortable: true },
        { key: 'entity', sortable: true },
        { key: 'active', sortable: true },
        { key: 'actions' },
      ],
      isSortDirDesc: true,
      currentPage: 1,
      users: [],
    }
  },
  created() {
    $http.get('api/users')
      .then(response => {
        console.log(response.data)
        this.users = response.data
      })
      .catch(e => {
        this.errors.push(e)
      })
  },
  methods: {
    deleteUser(userId) {
      this.$store.dispatch('deleteUser', userId)
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

<style lang="scss" scoped>
.per-page-selector {
    width: 90px;
}
</style>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
