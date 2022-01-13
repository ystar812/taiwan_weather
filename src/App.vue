<template>
  <div id="app">
    <main>
      <div id="map_box">
        <div id="map">
          <div class="icon_box" v-for="(item, index) in mapData" :key="index" :id="`c${item.countyId}`" @mouseover="hoverEnter(index)" @mouseleave="hoverOut(index)" @click="changeCounty(index)" :style="item.coordinate" :class="{active:item.active, current: currentCounty == index}">
            <div v-if="allCounties" class="icon">
              <img :src="require(`./assets/img/${allCounties[index].weatherElement[0].time[0].parameter.parameterValue}.svg`)" alt="">
            </div>
            <div class="place">{{item.place}}</div>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 525.012 688.923">
            <g id="taiwan_map">
              <path v-for="(item, index) in mapData" :key="index" @mouseover="hoverEnter(index)" @mouseleave="hoverOut(index)"  @click="changeCounty(index)" :data-place="item.place" :d="item.pathD" :class="{active:item.active, current: currentCounty == index}"/>
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
              <div v-if="Number(currentTemperature) > Number(allCounties[currentCounty].weatherElement[4].time[0].parameter.parameterName)" class="temperature">{{allCounties[currentCounty].weatherElement[2].time[0].parameter.parameterName}} - {{currentTemperature}}</div>
              <div v-else-if="Number(currentTemperature) < Number(allCounties[currentCounty].weatherElement[2].time[0].parameter.parameterName)" class="temperature">{{currentTemperature}} - {{allCounties[currentCounty].weatherElement[4].time[0].parameter.parameterName}}</div>
              <div v-else class="temperature">{{allCounties[currentCounty].weatherElement[2].time[0].parameter.parameterName}} - {{allCounties[currentCounty].weatherElement[4].time[0].parameter.parameterName}}</div>
            </div>
          </div>
          <div class="description_box">
            <div v-if="description" class="description" ref="des">
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
          <div v-if="aWeekWeather" class="a_week">
            <div class="day_box" v-for="(item, index) in aWeekWx" :key="index">
              <div class="date">{{item.startTime.split(' ')[0].split('-')[1]}}/{{item.startTime.split(' ')[0].split('-')[2]}}</div>
              <div  class="icon">
                <img v-if="item.elementValue[1].value.split('')[0] == '0'" :src="require(`./assets/img/${item.elementValue[1].value.split('')[1]}.svg`)" alt="">
                <img v-else :src="require(`./assets/img/${item.elementValue[1].value}.svg`)" alt="">
              </div>
              <div class="temperature">{{aWeekMinT[index].elementValue[0].value}} - {{aWeekMaxT[index].elementValue[0].value}}</div>
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
      currentCounty: 18,
      currentTemperature: '',
      aWeekWeather: '',
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
    aWeekWx(){
      if (this.aWeekWeather) {
        return this.aWeekWeather[0].time.filter(item =>{
          return item.startTime.split(' ')[1] == '06:00:00'
        })
      }else{
        return []
      }
    },
    aWeekMinT(){
      if (this.aWeekWeather) {
        return this.aWeekWeather[1].time.filter(item =>{
          return item.startTime.split(' ')[1] == '06:00:00'
        })
        // let newMinT = this.aWeekWeather[1].time.filter(item =>{
        //   return item.startTime.split(' ')[1] == '06:00:00'
        // });
        // if(newMinT.length > 7){
        //   newMinT.pop();
        //   return newMinT;
        // }else{
        //   return newMinT;
        // }
      }else{
        return []
      }
    },
    aWeekMaxT(){
      if (this.aWeekWeather) {
        return this.aWeekWeather[2].time.filter(item =>{
          return item.startTime.split(' ')[1] == '06:00:00'
        })
      }else{
        return []
      }
    }
  },
  watch:{
    
  },
  methods:{
    async getAllCounties(){
      // 中央氣象局API 預報-一般天氣預報(/v1/rest/datastore/F-C0032-001 一般天氣預報-今明 36 小時天氣預報)
      var apiUrl = 'https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-3C06B79E-E9B7-48A9-8F8C-BD4FEF915DD7';
      await this.$http.get(apiUrl).then((response) => {
        // console.log(response.data.records);
        this.allCounties = response.data.records.location;
        this.sortMapData();
        this.sortAllCounties();
        if (this.allCounties[0].weatherElement[0].time[1].startTime.split(' ')[1]  == '06:00:00') {
          this.timeLabel = ['今晚明晨','明日白天','明日晚上']
        }else{
          this.timeLabel = ['今日白天','今晚明晨','明日白天']
        }
      });
    },
    getCurrentWeather(county){
      // 中央氣象局API 觀測-現在天氣觀測報告(/v1/rest/datastore/O-A0003-001 局屬氣象站-現在天氣觀測報告)
      return this.$http.get(`https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=CWB-3C06B79E-E9B7-48A9-8F8C-BD4FEF915DD7&locationName=${county}&elementName=TEMP&parameterName=CITY`);
    },
    getAweekWeather(id,town){
      // 中央氣象局API 預報-1週天氣預報(/v1/rest/datastore/F-D0047-xxx)
      return this.$http.get(`https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-${id}?Authorization=CWB-3C06B79E-E9B7-48A9-8F8C-BD4FEF915DD7&locationName=${town}&elementName=Wx,MinT,MaxT`);
    },
    getCounty(){
      this.$http.all([this.getCurrentWeather(this.mapData[this.currentCounty].observatory),this.getAweekWeather(this.mapData[this.currentCounty].apiId,this.mapData[this.currentCounty].township)]).then((response) => {
        // console.log(response[0].data.records.location[0]);
        this.currentTemperature = Math.floor(response[0].data.records.location[0].weatherElement[0].elementValue);
        this.aWeekWeather = response[1].data.records.locations[0].location[0].weatherElement;
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
      this.$refs.des.scroll(0, 0);
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
      padding: 11.5vw 15vw 11.5vw 8vw
    #map
      position: relative
      height: 80%
      margin: 10% 0 0 0
      @include mobile
        width: 100%
        height: auto
      .icon_box
        position: absolute
        width: 56px
        text-align: center
        cursor: pointer
        transition: transform .2s
        @include laptop
          width: 45px
        &.active, &.current
          transform: scale(1.11)
        @include phone
          &#c09020
            top: -12% !important
            left: 8% !important
          &#c09020
            top: 20% !important
            left: -3% !important
          &#c10016
            top: 51% !important
            left: -5% !important
          &#c10002
            top: 13% !important
            left: 98% !important
          &#c10017
            top: -8% !important
            left: 100% !important
          &#c63
            top: -16% !important
            left: 86% !important
          &#c65
            top: -12% !important
            left: 70% !important
          &#c68
            top: -8% !important
            left: 55% !important
          &#c10018
            top: -2% !important
            left: 41% !important
          &#c10005
            top: 11% !important
            left: 41% !important
          &#c66
            top: 16% !important
            left: 27% !important
          &#c10007
            top: 30% !important
            left: 28% !important
          &#c10008
            top: 36% !important
            left: 59% !important
          &#c10009
            top: 35% !important
            left: 13% !important
          &#c10010
            top: 49% !important
            left: 17% !important
          &#c10020
            top: 51% !important
            left: 46% !important
          &#c67
            top: 64% !important
            left: 19% !important
          &#c64
            top: 78% !important
            left: 26% !important
          &#c10013
            top: 89% !important
            left: 43% !important
          &#c10014
            top: 72% !important
            left: 73% !important
          &#c10015
            top: 39% !important
            left: 90% !important
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
          padding: 2px 0 0 0
          border-radius: 14px
          background-color: $color_white
          transition: .2s
          @include laptop
            font-size: 12px
          @include mobile
            font-size: 11px
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
      padding: 0 6vmin 6vmin 6vmin
    .current
      float: left
      width: 52%
      @include mobile
        width: 100%
      .info_box
        float: left
        width: 100%
        padding: 0 0 2.1vmin 6vmin
        @include mobile
          padding: 0 0 4vmin 7vmin
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
              @include mobile
                font-size: 11.7vmin
            .temperature
              color: $color_blue
              font-size: 10vmin
              font-weight: 600
              &:after
                content: '°c'
              @include mobile
                font-size: 17vmin
          .icon
            float: left
            padding-top: 2vmin
            @include mobile
              padding-top: 1vmin
            img
              width: 18vmin
              @include mobile
                width: 32vmin
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
            @include mobile
              font-size: 5.6vmin
              min-width: 38vmin
              height: 10vmin
              line-height: 11vmin
              margin-right: 2vmin
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
            @include mobile
              font-size: 5vmin
              min-width: 33vmin
              height: 10vmin
              line-height: 11vmin
      .description_box
        float: left
        width: 100%
        padding: 4vmin 3vmin 4vmin 4vmin
        background: url(./assets/img/bg3.png) no-repeat center / 100% 100%
        @include mobile
          padding: 7vmin 6vmin 7vmin 7vmin
        .description
          float: left
          width: 100%
          height: 27vmin
          overflow: auto
          font-size: 2vmin
          line-height: 1.45
          text-align: justify
          padding-right: 12px
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
            font-size: 4vmin
            text-align: left
            padding-right: 0
          .title
            color: $color_navy_blue
            font-size: 2.1vmin
            margin-bottom: 1vmin
            @include mobile
              font-size: 4.2vmin
    .these_two_days
      float: left
      width: 36%
      padding: 5vmin 4vmin 4vmin 4vmin
      margin: 17vmin 0 0 3%
      background: url(./assets/img/bg3.png) no-repeat center / 100% 100%
      @include mobile
        width: 100%
        padding: 8vmin 8vmin 6vmin 8vmin
        margin: 4vmin 0 0 0
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
        @include mobile
          padding-bottom: 3vmin
          margin-bottom: 5vmin
        .row_l
          float: left
          width: 50%
          .time
            color: $color_navy_blue
            font-size: 2.7vmin
            margin-bottom: 0.06vmin
            @include mobile
              font-size: 5vmin
              margin-bottom: 0.5vmin
          .temperature
            font-size: 2vmin
            margin-bottom: 0.5vmin
            &:after
              content: '°C'
            @include mobile
              font-size: 4.2vmin
              margin-bottom: 1.5vmin
          .description
            font-size: 2vmin
            font-weight: 500
            @include mobile
              font-size: 4.2vmin
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
            @include mobile
              font-size: 3.6vmin
    .a_week_box
      float: left
      width: 91%
      padding: 1.6vmin 2.6vmin
      margin-top: 3vmin
      background: url(./assets/img/bg4.png) no-repeat center / 100% 100%
      @include mobile
        width: 100%
        overflow-x: auto
        padding: 3vmin 4vmin 4vmin 4vmin
        margin-top: 4vmin
      .a_week
        float: left
        width: 100%
        @include mobile
          width: 166%
        .day_box
          float: left
          width: 14.2857142857%
          font-weight: 600
          text-align: center
          padding: 2vmin 0
          *
            float: left
            width: 100%
          // &:nth-child(even)
          //   display: none
          // &:first-child
          //   .date
          //     &:after
          //       content: ' (今)'
          //       font-size: 13px
          @include mobile
            width: 12.2857142857%
            padding: 4vmin 0
            margin: 0 1%
          .date
            font-size: 2vmin
            @include mobile
              font-size: 4vmin
          .icon
            margin: 1vmin 0
            @include mobile
              margin: 2vmin 0
            img
              display: inline-block
              float: none
              width: 48%
              @include mobile
                width: 70%
          .temperature
            font-size: 1.8vmin
            &:after
              content: '°C'
            @include mobile
              font-size: 3.1vmin


</style>
