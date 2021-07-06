<template>
  <div>
    <div>
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
                  :to="{ name: 'create-group' }"
                >
                  <span class="text-nowrap">Add Group</span>
                </b-button>
              </div>
            </b-col>
          </b-row>

        </div>

        <b-table
          ref="refUserListTable"
          class="position-relative"
          :items="groups"
          responsive
          :fields="tableColumns"
          primary-key="id"
          show-empty
          empty-text="No matching records found"
          :sort-desc.sync="isSortDirDesc"
        >

          <!-- Column: User -->
          <template #cell(group)="groups">
            <b-media vertical-align="center">
              <template #aside>
                <b-avatar
                  size="32"
                  :src="groups.item.group_name"
                  :text="avatarText(groups.item.group_name)"
                  :to="{ name: 'edit-group', params: { id: groups.item.id } }"
                />
              </template>
              <b-link
                :to="{ name: 'edit-group', params: { id: groups.item.id } }"
                class="font-weight-bold d-block text-nowrap"
              >
                {{ groups.item.group_name }}
              </b-link>
              <small class="text-muted">@{{ groups.item.group_name }}</small>
            </b-media>
          </template>

          <!-- Column: Role -->
          <template #cell(created)="groups">
            <span class="align-text-top">{{ groups.item.created_by_id }}</span>
          </template>

          <!-- Column: Actions -->
          <template #cell(actions)="groups">
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

              <b-dropdown-item :to="{ name: 'edit-group', params: { id: groups.item.id } }">
                <feather-icon icon="EditIcon" />
                <span class="align-middle ml-50">Edit</span>
              </b-dropdown-item>

              <b-dropdown-item
                @click.prevent="deleteGroup(groups.item.id)"
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
  name: 'ListGroups',
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
    titleTemplate: '%s | Groups List',
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
        { key: 'id', sortable: true },
        { key: 'group_name', sortable: true },
        { key: 'created_by_id', sortable: true },
        { key: 'actions' },
      ],
      isSortDirDesc: true,
      currentPage: 1,
      groups: [],
    }
  },
  created() {
    $http.get('api/view_group')
      .then(response => {
        console.log('Group', response.data)
        this.groups = response.data
      })
      .catch(e => {
        this.errors.push(e)
      })
  },
  methods: {
    deleteGroup(groupId) {
      this.$store.dispatch('deleteGroup', groupId)
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
