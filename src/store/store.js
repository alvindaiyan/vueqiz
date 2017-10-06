import Vue from 'vue';
import Vuex from 'vuex';
import data from '../../static/data.json';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentId: 0,
    history: [],
    questions: data,
    correctCount: 0,
  },
  getters: {
    current: ({ currentId, questions }) => questions.find(q => q.id === `${currentId}`),
    canNext: ({ currentId, questions }) => currentId === questions.length - 1,
    canPrev: ({ currentId }) => currentId === 0,
    score: ({ correctCount, questions }) => `${correctCount} / ${questions.length}`,
    scoreInPercentage: ({ correctCount, questions }) =>
    Number(((correctCount / questions.length) * 100).toFixed(2)),
  },
  mutations: {
    prev(state) {
      if (state.currentId === 0) {
        return state.questions[0];
      }
      state.currentId -= 1;
      return state.history[state.history.length - 1];
    },
    next(state) {
      if (state.currentId === state.questions.length - 1) {
        return state.currentId;
      }
      state.currentId += 1;
      return state.currentId;
    },
    submit(state, payload) {
      state.history.push(payload);
      if (payload.correct) {
        state.correctCount += 1;
      }
    },
  },
});
