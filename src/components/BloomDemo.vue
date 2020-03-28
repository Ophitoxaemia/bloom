<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <div>
      <input type="text" v-model="listitem" placeholder='item'>
        <button @click="addClicked">Add</button>
    </div>

    <div>
      <input type="text" v-model="testitem" placeholder='item'>
      <button @click="testClicked">Test</button>
      {{ testText }}
    </div>

    <div>
      <input type="text" v-model="removeitem" placeholder='item'>
      <button @click="removeClicked">Remove Item</button>
      {{ removeText }}
    </div>

    <div>
      <button @click="statesClicked">Populate with States</button>
      States added: {{ statesRet }}
    </div>    

  </div>
</template>

<script>
const bfilter = require('./bfilter');

export default {
  name: 'BloomDemo',
  data: function() {
    return {
      listitem: String,
      testitem: String,
      testRet: Boolean,
      testText: String,
      removeitem: String,
      removeRet: Boolean,
      removeText: String,
      statesRet: Number,
      states: [
        "Alabama",
        "Alaska",
        "American Samoa",
        "Arizona",
        "Arkansas",
        "California",
        "Colorado",
        "Connecticut",
        "Delaware",
        "District Of Columbia",
        "Federated States Of Micronesia",
        "Florida",
        "Georgia",
        "Guam",
        "Hawaii",
        "Idaho",
        "Illinois",
        "Indiana",
        "Iowa",
        "Kansas",
        "Kentucky",
        "Louisiana",
        "Maine",
        "Marshall Islands",
        "Maryland",
        "Massachusetts",
        "Michigan",
        "Minnesota",
        "Mississippi",
        "Missouri",
        "Montana",
        "Nebraska",
        "Nevada",
        "New Hampshire",
        "New Jersey",
        "New Mexico",
        "New York",
        "North Carolina",
        "North Dakota",
        "Northern Mariana Islands",
        "Ohio",
        "Oklahoma",
        "Oregon",
        "Palau",
        "Pennsylvania",
        "Puerto Rico",
        "Rhode Island",
        "South Carolina",
        "South Dakota",
        "Tennessee",
        "Texas",
        "Utah",
        "Vermont",
        "Virgin Islands",
        "Virginia",
        "Washington",
        "West Virginia",
        "Wisconsin",
        "Wyoming"
      ],
    }
  },
  props: {
    msg: String,
  },
  methods: {
    addClicked () {
      bfilter.AddToFilter(this.listitem);
      this.listitem = '';
    },
    testClicked () {
      this.testRet = bfilter.IsInSet(this.testitem);
      if (this.testRet)
        this.testText = 'Probably in set';
      else
        this.testText = "Not in set";
    },
    removeClicked () {
      this.removeRet = bfilter.RemoveFromFilter(this.removeitem);
      if (this.removeRet)
        this.removeText = 'Removed item';
      else
        this.removeText = 'Item not in list';
    },
    statesClicked () {
      for (const state of this.states){
        bfilter.AddToFilter(state);
      }
      this.statesRet = this.states.length;
    }
  },
  mounted () {
    this.listitem = '';
    this.testitem = '';
    this.removeitem = '';
    this.removeText = '';
    this.testRet = undefined;
    this.testText = undefined;
    this.removeRet = undefined;
    this.statesRet = undefined;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
