import create from "zustand";
import { getList } from "./api/application";
import { getInfo } from "./api/user";

export const useStore = create((set) => ({
  applications: {},
  user: null,
  loading: false,
  error: null,
  setLoading: (status) => {
    set({ loading: status });
  },
  setError: (error) => {
    set({ error: error });
  },
  fetchUserInfo: async () => {
    set({ loading: true });
    try {
      const data = await getInfo();
      set({ loading: false });
      set({ user: data });
    } catch (error) {
      set({ loading: false });
      set({ user: null });
    }
  },
  fetchApplications: async () => {
    set({ loading: true });
    try {
      const data = await getList();
      set({ loading: false });
      let newApps = {};
      data.map((item) => (newApps[item.id] = item));
      set({ applications: newApps });
    } catch (error) {
      set({ loading: false });
      set({ applications: {} });
    }
  },
  setApplications: (data) => set({ applications: data }),
  setUser: (data) => set({ user: data }),
}));
