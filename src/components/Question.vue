<template>
  <div class="question">
    <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span style="line-height: 36px; text-align: left;">{{question.id}}. {{ question.topic }}</span>
          <el-button style="float: right;" type="primary" @click="reset" :disabled="submitted">Reset</el-button>
        </div>
        <!-- @change="select(index, o)" -->

        <el-checkbox-group v-for="(o, index) in question.options" :key="index" class="option item" v-model="userChosen">
          <el-checkbox :label="index"
          :class="{'item-correct': varify(index, o) && submitted && used(index), 'item-incorrect': !varify(index, o) && submitted, 'item-unknown': submitted && !used(index) && !o.correct}"
          @change="select"
          :disabled="submitted">{{o.content}}</el-checkbox>
        </el-checkbox-group>
    </el-card>
  </div>
</template>

<script>

export default {
  name: 'question',
  props: {
    question: Object,
    submitted: Boolean,
    selected: Array,
  },
  computed: {
    userChosen: {
      get() {
        return this.cache;
      },
      set(newValue) {
        this.cache = newValue;
      },
    },
  },
  data() {
    return {
      cache: this.selected,
    };
  },
  watch: {
    question() {
      this.cache = [];
    },
  },
  methods: {
    reset() {
      this.selected = [];
      this.$emit('selected', this.userChosen);
    },
    select() {
      this.$emit('selected', this.userChosen);
    },
    varify(id, opt) {
      return opt.correct === (this.selected.indexOf(id) !== -1);
    },
    used(id) {
      return this.selected.indexOf(id) !== -1;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .option {
    font-size: 14px;
    width: 100%;
    text-align: left;
  }

  .item {
    padding: 18px 0;
  }

  .item-correct {
    border-left: 6px solid #13ce66;
    color:#1F2D3D !important;
    padding-left: 10px
  }

  .item-incorrect {
    border-left: 6px solid #FF4949;
    color:#1F2D3D !important;
    padding-left: 10px
  }

  .item-unknown {
    border-left: 6px solid #FFFFFF;
    color:#1F2D3D !important;
    padding-left: 10px
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  .clearfix:after {
      clear: both
  }


</style>
