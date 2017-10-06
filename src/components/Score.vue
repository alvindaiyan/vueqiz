<template>
  <div class="score">
    <span>{{present}}</span>
    <!-- percentage: {{score}} -->
  </div>
</template>
<script>
export default {
  name: 'score',
  props: {
    score: Number,
    present: String,
  },
};
</script>
<style scoped>
  .score {
    border: 2px solid #13ce66;
    display: inline-block;
    width: 100px;
    height: 100px;
    -moz-border-radius: 50px;
    -webkit-border-radius: 50px;
    border-radius: 50px;
    display: table;
    margin-left: 42%;
  }

  .score > span {
    display: table-cell;
    text-align: center;
    vertical-align: middle;
  }

    /* .score {
      background-color: #1468a8;
      border-radius: 50%;
      color:black;
      font-size: 1.6em;
      height: 150px;
      margin: 0 auto;
      width: 300px;
  } */

</style>
