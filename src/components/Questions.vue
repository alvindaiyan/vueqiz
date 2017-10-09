<template>
<div class="questions">
  <el-row class="result">
    <el-col :span="24">
      <el-alert
        :title="correct ? 'well done!' : 'no no no!!! you dumbass:)'"
        :type="correct ? 'success' : 'error'" v-if="submitted" :closable="false">
      </el-alert>
    </el-col>
  </el-row>
  <el-row class="result">
    <el-col :span="24">
      <yan-score :present="score" :score="percentage"></yan-score>
    </el-col>
  </el-row>

  <el-row>
    <el-col :span="24">
      <yan-question :question="q" :submitted="submitted" :selected="selected" @selected="select" ></yan-question>
    </el-col>
  </el-row>
  <el-row class="control">
    <el-button-group>
      <el-col :span="24">
        <el-button type="primary" icon="arrow-left" @click="prev"> Previous</el-button>
        <el-button type="primary" v-if="submitted" @click="next" :disabled="canNext">Next <i class="el-icon-arrow-right el-icon-right"></i></el-button>
        <el-button type="success" v-if="!submitted" @click="submit">Check <i class="el-icon-arrow-right el-icon-check"></i></el-button>
      </el-col>
    </el-button-group>
  </el-row>
  <el-row class="hint" v-if="submitted">
    <el-col :span="24">
      <el-collapse v-model="activeNames" v-if="question.explanations && question.explanations.length > 0">
        <el-collapse-item title="Explanation" name="1">
          <p v-html="explanation"></p>
        </el-collapse-item>
        <el-collapse-item title="Links" name="2" v-if="question.links && question.links.length > 0">
          <div v-for="(link, id) in question.links" :key="id" >
            <a :href="link">{{link}}</a>
          </div>
        </el-collapse-item>
      </el-collapse>
    </el-col>
  </el-row>

</div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex';
import Question from './Question';
import Score from './Score';

export default {
  name: 'yan-questions',
  components: {
    'yan-question': Question,
    'yan-score': Score,
  },
  computed: {
    ...mapGetters({
      question: 'current',
      canNext: 'canNext',
      canPrev: 'canPrev',
      score: 'score',
      percentage: 'scoreInPercentage',
    }),
    q() {
      this.submitted = false;
      this.selected = [];
      const shuffle = (a) => {
        for (let i = a.length; i; i -= 1) {
          const j = Math.floor(Math.random() * i);
          [a[i - 1], a[j]] = [a[j], a[i - 1]];
        }
      };

      const topic = this.question.question.join('\n');
      const options = [];

      this.question.options.forEach((content) => {
        options.push({
          content,
          correct: false,
        });
      });
      this.question.answers.forEach((content) => {
        options.push({
          content,
          correct: true,
        });
      });


      shuffle(options);
      return {
        topic,
        options,
      };
    },
    correct() {
      let sizeOfCorrect = 0;
      let isCorrect = true;
      this.q.options.forEach((opt, index) => {
        if (opt.correct && !this.selected.includes(index)) {
          isCorrect = false;
        } else if (opt.correct) {
          sizeOfCorrect += 1;
        }
      });

      return isCorrect && sizeOfCorrect === this.selected.length;
    },
    explanation() {
      return this.question.explanations.join('<br/>');
    },
  },
  data() {
    return {
      submitted: false,
      activeNames: ['1', '2'],
      selected: [],
    };
  },
  methods: {
    ...mapMutations([
      'prev',
      'next',
    ]),
    ...mapMutations({
      push: 'submit',
    }),
    submit() {
      this.push(
        {
          question: this.q,
          selected: this.selected,
          correct: this.correct,
        },
      );
      this.submitted = true;
    },
    select(event) {
      this.selected = event;
    },
  },
};
</script>

<style scoped>
  .control {
    margin-top: 20px;
    float: right;
    display: block;
  }

  .hint {
    margin-top: 100px;
    text-align: left;
    display: block;
  }

  .result {
    margin-bottom: 15px;
  }
</style>


