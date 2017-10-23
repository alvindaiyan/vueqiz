<template>
  <div id="app" v-loading="loading">
    <el-row :gutter="20">
      <el-col :span="24" >
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'app',
  computed: {
    ...mapGetters([
      'loading',
    ]),
  },
  methods: {
    ...mapMutations(['load', 'setQuestions']),
  },
  created() {
    this.load(true);
    // load questions from firebase
    this.$http.get('https://vue-questions.firebaseio.com/.json')
    .then((resp) => {
      this.setQuestions(resp.data);
      this.load(false);
    })
    .catch((err) => {
      this.load(false);
      console.log(err);
    });
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Open+Sans');

#app {
  font-family: 'Open Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
