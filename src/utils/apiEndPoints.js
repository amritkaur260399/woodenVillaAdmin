const defaults = {
  methods: {
    GET: {
      method: 'GET',
    },
    POST: {
      method: 'POST',
    },
    PUT: {
      method: 'PUT',
    },
    DELETE: {
      method: 'DELETE',
    },
  },
  versions: {
    v1: {
      version: '',
    },
  },
};

const apiEndPoints = {
  user: {
    checkUniqueness: {
      v1: {
        ...defaults.methods.GET,
        ...defaults.versions.v1,
        uri: '/auth/checkuniqueness/:email',
      },
    },
    offlineSubscription: {
      v1: {
        ...defaults.methods.POST,
        ...defaults.versions.v1,
        uri: '/user/offlinesubscription',
      },
    },
    forgotPassword: {
      v1: {
        ...defaults.methods.POST,
        ...defaults.versions.v1,
        uri: '/user/forgotPassword',
      },
    },
    verifyOtp: {
      v1: {
        ...defaults.methods.POST,
        ...defaults.versions.v1,
        uri: '/user/verifyOtp/:token',
      },
    },
    resetPassword: {
      v1: {
        ...defaults.methods.POST,
        ...defaults.versions.v1,
        uri: '/user/resetPassword/:token',
      },
    },
    addPartner: {
      v1: {
        ...defaults.methods.POST,
        ...defaults.versions.v1,
        uri: '/user/invite',
      },
    },
    addLicense: {
      v1: {
        ...defaults.methods.POST,
        ...defaults.versions.v1,
        uri: '/user/subscription/license',
      },
    },
    fetchCurrent: {
      v1: {
        ...defaults.methods.GET,
        ...defaults.versions.v1,
        uri: '/user/admin/me',
      },
    },
    updateCurrent: {
      v1: {
        ...defaults.methods.PUT,
        ...defaults.versions.v1,
        uri: '/me',
      },
    },
    uploadAvatar: {
      v1: {
        ...defaults.methods.POST,
        ...defaults.versions.v1,
        uri: '/party/:partyId/profileImage',
        headerProps: {
          'Content-Type': 'multipart/form-data',
        },
      },
    },
    updateProfile: {
      v1: {
        ...defaults.methods.PUT,
        ...defaults.versions.v1,
        uri: '/user/me/:userId',
      },
    },
    updateUserProfilePassword: {
      v1: {
        ...defaults.methods.PUT,
        ...defaults.versions.v1,
        uri: '/user/updatepassword',
      },
    },

    updatePassword: {
      v1: {
        ...defaults.methods.POST,
        ...defaults.versions.v1,
        uri: '/user/verification',
      },
    },
    checkExistingUser: {
      v1: {
        ...defaults.methods.GET,
        ...defaults.versions.v1,
        uri: '/user/isExistingLoginId',
      },
    },
    addSubscription: {
      v1: {
        ...defaults.methods.POST,
        ...defaults.versions.v1,
        uri: '/user/subscription',
      },
    },
  },
  common: {
    getStateCodes: {
      v1: {
        ...defaults.methods.GET,
        ...defaults.versions.v1,
        uri: '/common/country/:countryId/provinces',
      },
    },
  },

  staff: {
    createStaff: {
      v1: {
        ...defaults.methods.POST,
        ...defaults.versions.v1,
        uri: '/user/invite/staff',
      },
    },
    getStaffList: {
      v1: {
        ...defaults.methods.GET,
        ...defaults.versions.v1,
        uri: '/user/staff/all',
      },
    },
    inviteUser: {
      v1: {
        ...defaults.methods.POST,
        ...defaults.versions.v1,
        uri: '/auth/staffSignup',
      },
    },
    updateStaffDetails: {
      v1: {
        ...defaults.methods.PUT,
        ...defaults.versions.v1,
        uri: '/user/staff/:staffId',
      },
    },
    getStaffDetails: {
      v1: {
        ...defaults.methods.GET,
        ...defaults.versions.v1,
        uri: '/user/staff/:staffId',
      },
    },
    getStaffTasks: {
      v1: {
        ...defaults.methods.GET,
        ...defaults.versions.v1,
        uri: '/tasks/user/:staffId',
      },
    },
    changeTaskStatus: {
      v1: {
        ...defaults.methods.PUT,
        ...defaults.versions.v1,
        uri: '/tasks/:taskId',
      },
    },
  },
  students: {
    getStudents: {
      v1: {
        ...defaults.methods.GET,
        ...defaults.versions.v1,
        uri: '/:type',
      },
    },
    setApproval: {
      v1: {
        ...defaults.methods.PUT,
        ...defaults.versions.v1,
        uri: '/students/:studentId/request/approve',
      },
    },
    getStudent: {
      v1: {
        ...defaults.methods.GET,
        ...defaults.versions.v1,
        uri: '/students/:studentId',
      },
    },
    updateStudentDetails: {
      v1: {
        ...defaults.methods.PUT,
        ...defaults.versions.v1,
        uri: '/students/:studentId',
      },
    },
    getStudentTaskNotes: {
      v1: {
        ...defaults.methods.GET,
        ...defaults.versions.v1,
        uri: '/students/:studentId/tasks/:taskId/notes',
      },
    },
    getStudentTaskAssignment: {
      v1: {
        ...defaults.methods.GET,
        ...defaults.versions.v1,
        uri: '/students/:studentId/tasks/:taskId/contents',
      },
    },
    getStudentTasks: {
      v1: {
        ...defaults.methods.GET,
        ...defaults.versions.v1,
        uri: '/students/:studentId/tasks',
      },
    },
    getStudentStats: {
      v1: {
        ...defaults.methods.GET,
        ...defaults.versions.v1,
        uri: '/students/:studentId/stats',
      },
    },
  },
  teachers: {
    getTeachers: {
      v1: {
        ...defaults.methods.GET,
        ...defaults.versions.v1,
        uri: '/teachers',
      },
    },
    searchTasks: {
      v1: {
        ...defaults.methods.GET,
        ...defaults.versions.v1,
        uri: '/tasks/search',
      },
    },
    getTeacherTasks: {
      v1: {
        ...defaults.methods.GET,
        ...defaults.versions.v1,
        uri: '/teachers/:teacherId/tasks',
      },
    },
    getTaskNote: {
      v1: {
        ...defaults.methods.GET,
        ...defaults.versions.v1,
        uri: '/teachers/:teacherId/tasks/:taskId/notes',
      },
    },
    getTaskAttachment: {
      v1: {
        ...defaults.methods.GET,
        ...defaults.versions.v1,
        uri: '/teachers/:teacherId/tasks/:taskId/contents',
      },
    },
  },
};

export default apiEndPoints;
