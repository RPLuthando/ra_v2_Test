export default [
  {
    title: 'Dashboard',
    route: 'home',
    icon: 'HomeIcon',
  },
  /* {
    title: 'Second Page',
    route: 'second-page',
    icon: 'FileIcon',
  }, */
  {
    title: 'Survey Admin',
    route: 'survey-admin',
    icon: 'FilePlusIcon',
  },
  {
    title: 'Survey',
    route: 'survey',
    icon: 'ClipboardIcon',
  },
  {
    title: 'User',
    icon: 'UserIcon',
    children: [
      {
        title: 'User Management',
        children: [
          {
            title: 'Create User',
            route: 'create-user',
          },
          {
            title: 'Edit User',
            route: 'edit-user',
          },
          {
            title: 'List User',
            route: 'users',
          },
        ],
      },
      {
        title: 'Group Management',
        children: [
          {
            title: 'Create Group',
            route: 'create-group',
          },
          {
            title: 'Edit Group',
            route: 'edit-group',
          },
          {
            title: 'List Groups',
            route: 'groups',
          },
        ],
      },
      {
        title: 'Permissions',
        children: [
          {
            title: 'Group Permissions',
            route: 'group-permissions',
          },
          {
            title: 'User Permissions',
            route: 'user-permissions',
          },
        ],
      },
      {
        title: 'Organogram',
        route: 'organogram',
      },
    ],
  },
]
