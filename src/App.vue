<template>
  <div id="app">
    <main>
      <div id="map_box">
        <div id="map">
          <div class="icon_box" v-for="(item, index) in mapData" :key="index" @mouseover="hoverEnter(index)" @mouseleave="hoverOut(index)" @click="changeCounty(index)" :style="item.coordinate" :class="{active:item.active, current: currentCounty == index}">
            <div v-if="allCounties" class="icon">
              <img :src="require(`./assets/img/${allCounties[index].weatherElement[0].time[0].parameter.parameterValue}.svg`)" alt="">
            </div>
            <div class="place">{{item.place}}</div>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 525.012 688.923">
            <g id="taiwan_map">
              <path v-for="(item, index) in mapData" :key="index" @mouseover="hoverEnter(index)" @mouseleave="hoverOut(index)"  @click="changeCounty(index)" :id="item.apiId" :data-place="item.place" :d="item.pathD" :class="{active:item.active, current: currentCounty == index}"/>
            </g>
          </svg>
        </div>
      </div>
      <div id="weather_info">
        <div class="current">
          <div v-if="allCounties" class="info_box">
            <div class="top_box">
              <div class="text_box">
                <div class="place">{{allCounties[currentCounty].locationName}}</div>
                <div class="temperature">{{currentTemperature}}</div>
              </div>
              <div class="icon">
                <img :src="require(`./assets/img/${allCounties[currentCounty].weatherElement[0].time[0].parameter.parameterValue}.svg`)" alt="">
              </div>
            </div>
            <div class="bottom_box">
              <div class="lable" :class="{text_shrink}">{{allCounties[currentCounty].weatherElement[0].time[0].parameter.parameterName}}</div>
              <div class="temperature">{{allTemperature[0]}} - {{allTemperature[allTemperature.length-1]}}</div>
            </div>
          </div>
          <div class="description_box">
            <div v-if="description" class="description">
              <div class="title">{{ description[mapData[currentCounty].countyId].Title }}</div>
              <div class="con">
                <div v-for="(item, index) in description[mapData[currentCounty].countyId].Content" :key="index">
                  {{item}}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="allCounties" class="these_two_days">
          <div class="row">
            <div class="row_l">
              <div class="time">{{timeLabel[0]}}</div>
              <div class="temperature">{{allCounties[currentCounty].weatherElement[2].time[0].parameter.parameterName}} - {{allCounties[currentCounty].weatherElement[4].time[0].parameter.parameterName}}</div>
              <div class="description">{{allCounties[currentCounty].weatherElement[0].time[0].parameter.parameterName}}</div>
            </div>
            <div class="row_r">
              <div class="icon">
                <img :src="require(`./assets/img/${allCounties[currentCounty].weatherElement[0].time[0].parameter.parameterValue}.svg`)" alt="">
              </div>
              <div class="chance_of_rain">{{allCounties[currentCounty].weatherElement[1].time[0].parameter.parameterName}}%</div>
            </div>
          </div>
          <div class="row">
            <div class="row_l">
              <div class="time">{{timeLabel[1]}}</div>
              <div class="temperature">{{allCounties[currentCounty].weatherElement[2].time[1].parameter.parameterName}} - {{allCounties[currentCounty].weatherElement[4].time[1].parameter.parameterName}}</div>
              <div class="description">{{allCounties[currentCounty].weatherElement[0].time[1].parameter.parameterName}}</div>
            </div>
            <div class="row_r">
              <div class="icon">
                <img :src="require(`./assets/img/${allCounties[currentCounty].weatherElement[0].time[1].parameter.parameterValue}.svg`)" alt="">
              </div>
              <div class="chance_of_rain">{{allCounties[currentCounty].weatherElement[1].time[1].parameter.parameterName}}%</div>
            </div>
          </div>
          <div class="row">
            <div class="row_l">
              <div class="time">{{timeLabel[2]}}</div>
              <div class="temperature">{{allCounties[currentCounty].weatherElement[2].time[2].parameter.parameterName}} - {{allCounties[currentCounty].weatherElement[4].time[2].parameter.parameterName}}</div>
              <div class="description">{{allCounties[currentCounty].weatherElement[0].time[2].parameter.parameterName}}</div>
            </div>
            <div class="row_r">
              <div class="icon">
                <img :src="require(`./assets/img/${allCounties[currentCounty].weatherElement[0].time[2].parameter.parameterValue}.svg`)" alt="">
              </div>
              <div class="chance_of_rain">{{allCounties[currentCounty].weatherElement[1].time[2].parameter.parameterName}}%</div>
            </div>
          </div>
        </div>
        <div class="a_week_box">
          <div class="a_week">
            <div class="day_box">
              <div class="date">12/17(今天)</div>
              <div class="icon">
                <img src="./assets/img/8.svg" alt="">
              </div>
              <div class="temperature">16 - 17°C</div>
            </div>
            <div class="day_box">
              <div class="date">12/18(六)</div>
              <div class="icon">
                <img src="./assets/img/8.svg" alt="">
              </div>
              <div class="temperature">16 - 17°C</div>
            </div>
            <div class="day_box">
              <div class="date">1/9(日)</div>
              <div class="icon">
                <img src="./assets/img/8.svg" alt="">
              </div>
              <div class="temperature">16 - 17°C</div>
            </div>
            <div class="day_box">
              <div class="date">1/10(一)</div>
              <div class="icon">
                <img src="./assets/img/8.svg" alt="">
              </div>
              <div class="temperature">16 - 17°C</div>
            </div>
            <div class="day_box">
              <div class="date">1/11(二)</div>
              <div class="icon">
                <img src="./assets/img/8.svg" alt="">
              </div>
              <div class="temperature">16 - 17°C</div>
            </div>
            <div class="day_box">
              <div class="date">1/12(三)</div>
              <div class="icon">
                <img src="./assets/img/8.svg" alt="">
              </div>
              <div class="temperature">16 - 17°C</div>
            </div>
            <div class="day_box">
              <div class="date">1/13(四)</div>
              <div class="icon">
                <img src="./assets/img/8.svg" alt="">
              </div>
              <div class="temperature">16 - 17°C</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import map_data from './assets/data/mapData.js'
import W50_County from 'countyData';

export default {
  data(){
    return{
      mapData: map_data,
      allCounties: '',
      dataTime: '',
      countyTheseTwoDays: '',
      allTemperature: '',
      currentTemperature: '',
      currentCounty: 18,
      text_shrink: false,
      description: W50_County,
      timeLabel: ''
    }
  },
  async created(){
    await this.getAllCounties();
    this.getCounty();
  },
  mounted(){

  },
  computed:{
    
  },
  watch:{
    
  },
  methods:{
    async getAllCounties(){
      var apiUrl = 'https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-3C06B79E-E9B7-48A9-8F8C-BD4FEF915DD7';
      await this.$http.get(apiUrl).then((response) => {
        // console.log(response.data.records);
        this.allCounties = response.data.records.location;
        this.sortMapData();
        this.sortAllCounties();
        if (this.allCounties[0].weatherElement[0].time[1].startTime.split(' ')[0] == this.allCounties[0].weatherElement[0].time[1].endTime.split(' ')[0]) {
          this.timeLabel = ['今晚明晨','明日白天','明日晚上']
        }else{
          this.timeLabel = ['今日白天','今晚明晨','明日白天']
        }
        this.dataTime = this.allCounties[0].weatherElement[0].time[0].startTime.replace(' ','T').replace(/:/g,'%3A');
      });
    },
    getCountyTheseTwoDays(id,time){
      return this.$http.get(`https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-${id}?Authorization=CWB-3C06B79E-E9B7-48A9-8F8C-BD4FEF915DD7&elementName=T&dataTime=${time}`);
    },
    getCounty(){
      this.$http.all([this.getCountyTheseTwoDays(this.mapData[this.currentCounty].apiId,this.dataTime)]).then((response) => {
        // console.log(response);
        this.countyTheseTwoDays = response[0].data.records.locations[0].location;
        this.allTemperature = this.countyTheseTwoDays.map(el=>Number(el.weatherElement[0].time[0].elementValue[0].value)).sort(this.sortArray3);
        let sumTemperature = this.allTemperature.reduce((a,b)=>a+b);
        this.currentTemperature = Math.round(sumTemperature / this.countyTheseTwoDays.length);
      });
    },
    hoverEnter(n){
      this.mapData[n].active = true
    },
    hoverOut(n){
      this.mapData[n].active = false
    },
    sortArray1(x, y){
      return x.place.localeCompare(y.place);
    },
    sortArray2(x, y){
      return x.locationName.localeCompare(y.locationName);
    },
    sortArray3(x, y){
      return x-y;
    },
    sortMapData(){
      this.mapData.sort(this.sortArray1);
    },
    sortAllCounties(){
      this.allCounties.sort(this.sortArray2);
    },
    changeCounty(v){
      this.currentCounty = v;
      this.getCounty();
    }
  },
  components:{

  }
}

</script>

<style lang="sass">

@mixin desktop
  @media(min-width: 992px)
    @content

@mixin laptop
  @media(max-width: 1400px)
    @content

@mixin mobile
  @media(max-width: 991px)
    @content

@mixin phone
  @media(max-width: 767px)
    @content

$color_navy_blue: #004b7a
$color_blue: #0080a2
$color_light_blue: #2896af
$color_sky_blue: #bce7f4
$color_cream: #fdf7e4
$color_white: #ffffff

@font-face
  font-family: 'GenSenMaruGothic'
  font-style: normal
  font-weight: 500
  src: url('./assets/fonts/GenSenMaruGothicTW-Medium.woff2') format('woff2')

@font-face
  font-family: 'GenSenMaruGothic'
  font-style: normal
  font-weight: 600
  src: url('./assets/fonts/GenSenMaruGothicTW-Bold.woff2') format('woff2')

html
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0)

html, body
  padding: 0
  margin: 0

body
  font-family: 'GenSenMaruGothic', Arial, Helvetica, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  color: $color_blue
  font-size: 16px
  line-height: 1.3
  font-weight: 500
  background-color: $color_sky_blue

*
  &:after, &:before
  -webkit-box-sizing: border-box
  -moz-box-sizing: border-box
  box-sizing: border-box

a
  color: $color_blue
  text-decoration: none
  outline: none
  behavior: expression(this.onFocus=this.blur())
  transition: .2s
  &:focus
    text-decoration: none
    outline: none
    behavior: expression(this.onFocus=this.blur())
  &:link,  &:active,  &:visited,  &:hover
    text-decoration: none



main
  display: flex
  flex-wrap: wrap
  #map_box
    display: flex
    flex: 0 0 40%
    justify-content: center
    align-items: center
    height: 100vh
    @include mobile
      flex: 0 0 100%
      height: auto
      padding: 10vmin
    #map
      position: relative
      height: 80%
      margin-top: 10%
      @include mobile
        width: 100%
        height: auto
      .icon_box
          position: absolute
          top: 60%
          left: 10%
          width: 56px
          text-align: center
          cursor: pointer
          transition: transform .2s
          @include laptop
            width: 45px
          &.active, &.current
            transform: scale(1.11)
          .icon
            float: left
            width: 100%
            line-height: 1
            img
              display: inline-block
              width: 80%
          .place
            float: left
            width: 100%
            font-size: 14px
            padding: 2px 3px
            border-radius: 3vmin
            background-color: $color_white
            transition: .2s
            @include laptop
              font-size: 12px
      svg
        height: 100%
        @include mobile
          width: 100%
          height: auto
        path
          fill: #0080a2
          opacity: 0.37
          cursor: pointer
          transition: opacity .3s
          &.active, &.current
            opacity: 1
  #weather_info
    flex: 0 0 60%
    padding: 5vmin 6vmin
    @include mobile
      flex: 0 0 100%
    .current
      float: left
      width: 52%
      @include mobile
        width: 100%
      .info_box
        float: left
        width: 100%
        margin: 0 0 2.1vmin 6vmin
        .top_box
          float: left
          width: 100%
          .text_box
            float: left
            margin-right: 3vmin
            .place
              color: $color_navy_blue
              font-size: 7vmin
              font-weight: 500
            .temperature
              color: $color_blue
              font-size: 10vmin
              font-weight: 600
              &:after
                content: '°c'
          .icon
            float: left
            padding-top: 2vmin
            img
              width: 18vmin
        .bottom_box
          float: left
          width: 100%
          .lable
            float: left
            color: $color_white
            min-width: 23.5vmin
            height: 6vmin
            font-size: 2.8vmin
            line-height: 6vmin
            text-align: center
            padding: 0 2vmin
            margin-right: 1.2vmin
            background: url(./assets/img/bg1.png) no-repeat center / 100% 100%
            &.text_shrink
              font-size: 2.2vmin
          .temperature
            float: left
            color: $color_blue
            min-width: 16.8vmin
            height: 6vmin
            font-size: 2.8vmin
            line-height: 6vmin
            font-weight: 600
            text-align: center
            background: url(./assets/img/bg2.png) no-repeat center / 100% 100%
            &:after
              content: '°C'
      .description_box
        float: left
        width: 100%
        padding: 4vmin
        background: url(./assets/img/bg3.png) no-repeat center / 100% 100%
        .description
          float: left
          width: 100%
          height: 27vmin
          overflow: auto
          font-size: 2vmin
          line-height: 1.45
          &::-webkit-scrollbar
            width: 7px
          &::-webkit-scrollbar-track
            background: transparent
          &::-webkit-scrollbar-thumb
            border-radius: 7px
            background: rgba(0,128,162,0.3)
          &::-webkit-scrollbar-thumb:hover
            background: rgba(0,128,162,0.2)
          @include mobile
            height: auto
            overflow: visible
          .title
            color: $color_navy_blue
            font-size: 2.1vmin
            margin-bottom: 1vmin
    .these_two_days
      float: left
      width: 36%
      padding: 5vmin 4vmin 4vmin 4vmin
      margin: 17vmin 0 0 3%
      background: url(./assets/img/bg3.png) no-repeat center / 100% 100%
      @include mobile
        width: 100%
        margin: 6vmin 0 0 0
      .row
        float: left
        width: 100%
        font-weight: 600
        padding-bottom: 1.5vmin
        margin-bottom: 2.5vmin
        border-bottom: 3px solid rgba(255,255,255,0.8)
        &:last-child
          padding-bottom: 0
          margin-bottom: 0
          border: none
        .row_l
          float: left
          width: 50%
          .time
            color: $color_navy_blue
            font-size: 2.7vmin
            margin-bottom: 0.06vmin
          .temperature
            font-size: 2vmin
            margin-bottom: 0.5vmin
            &:after
              content: '°C'
          .description
            font-size: 2vmin
            font-weight: 500
        .row_r
          float: left
          width: 50%
          .icon
            float: left
            width: 52%
            padding-top: 0.6vmin
            img
              width: 100%
          .chance_of_rain
            float: left
            width: 46%
            height: 10vmin
            color: $color_blue
            font-size: 1.8vmin
            text-align: center
            padding-top: 36%
            margin-left: 2%
            opacity: 0.6
            background: url(./assets/img/umbrella.svg) no-repeat center 0 / 63% auto
    .a_week_box
      float: left
      width: 91%
      padding: 1.6vmin 2.6vmin
      margin-top: 3vmin
      background: url(./assets/img/bg4.png) no-repeat center / 100% 100%
      @include mobile
        width: 100%
        overflow-x: auto
      .a_week
        float: left
        width: 100%
        @include mobile
          width: 160%
        .day_box
          float: left
          width: 14.2857142857%
          font-weight: 600
          text-align: center
          padding: 2vmin 0
          *
            float: left
            width: 100%
          .date
            font-size: 1.9vmin
          .icon
            margin: 1vmin 0
            img
              display: inline-block
              float: none
              width: 45%
          .temperature
            font-size: 1.8vmin
            &:after
              content: '°C'

</style>
