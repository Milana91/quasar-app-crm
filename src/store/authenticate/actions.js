import { getAuth, signOut, signInWithEmailAndPassword } from "firebase/auth";
import { error } from "src/utils/error";
import { Quasar } from "quasar";
import { Notify } from "quasar";

export function getToken({ commit }) {
  const auth = getAuth();
  const user = auth.currentUser;
  if (user !== null) {
    user
      .getIdToken(true)
      .then(function (idToken) {
        console.log(idToken);
        commit("setToken", idToken);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}

export function logout({ commit }) {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      commit("removeToken");
    })
    .catch((e) => {
      Notify.create({
        message: error(e),
      });
      console.log(e);
      Notify.create(e);
    });
}

export function signIn({ commit, dispatch }, payload) {
  const auth = getAuth()
  signInWithEmailAndPassword(auth, payload.email, payload.password)
    .then(async (userCredential) => {
      commit("loadingActive")
      const user = userCredential.user
      await dispatch("getToken").then(() => {
        setTimeout(() => {
          commit("loaded")
        }, 4000);
      });
    })
    .catch((e) => {
      Notify.create({
        message: error(e.code),
      });
    });
}

export function registerUser({ commit, dispatch }, userData) {
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, userData.email, userData.password)
    .then(async (userCredential) => {
      commit("loadingActive");
      const user = userCredential.user;
      setTimeout(() => {
        commit("loaded");
        Notify.create({
          message: "Пользователь зарегистрирован",
        });
      }, 2000);
    })
    .catch((e) => {
      Notify.create({
        message: error(e.code),
      });
    });
}
