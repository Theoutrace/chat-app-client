import { createSlice } from "@reduxjs/toolkit";

const ChatSlice = createSlice({
  name: "chat",
  initialState: {
    AllChats: [],
    updateMsg: false,
    groups: [],
    fetchGroups: false,
    GroupChats: [],
    selectedGroup: null,
    fetchUsers: false,
    users: [],
    notifications: [],
    fetchNotifications: false,
    showMembers: false,
    chatMembers: [],
    fetchMembers: false,
    selectedGroupAdmins: [],
  },
  reducers: {
    addToAllChat(state, action) {
      state.AllChats = action.payload;
    },
    fetchData(state, action) {
      state.updateMsg = !state.updateMsg;
    },
    addGroups(state, action) {
      state.groups = action.payload;
    },
    fetchGroups(state, action) {
      state.fetchGroups = !state.fetchGroups;
    },
    selectGroup(state, action) {
      state.selectedGroup = action.payload;
    },
    addToGroupChats(state, action) {
      state.GroupChats = action.payload;
    },

    fetchUsers(state, action) {
      state.fetchUsers = !state.fetchUsers;
    },
    addUsers(state, action) {
      state.users = action.payload;
    },
    addNotifications(state, actions) {
      state.notifications = actions.payload;
    },
    fetchinvite(state, action) {
      state.fetchNotifications = !state.fetchNotifications;
    },
    showMembers(state) {
      state.showMembers = !state.showMembers;
    },
    addGroupMembers(state, action) {
      state.chatMembers = action.payload;
    },
    addGroupAdmins(state, action) {
      state.selectedGroupAdmins = action.payload;
    },
    fetchGroupMembers(state) {
      state.fetchMembers = !state.fetchMembers;
    },
  },
});

export const ChatActions = ChatSlice.actions;
export default ChatSlice.reducer;
