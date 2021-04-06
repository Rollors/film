<template>
  <div>
    <div class="left">
      <div class="movie"><p>屏幕</p></div>
      <ul>
        <li v-for="(item, index) in seatflag" :key="index" class="seat"
            :class="{'noSeat' : seatflag[index]===-1,'seatSpace' : seatflag[index]===0,'seatActive' : seatflag[index]===1,'seatNoUse' : seatflag[index]===2}"
            @click="handleClick(index)" >
        </li>
      </ul>
      <ul class="seat_info">
        <li class="seatNotice seatActive"></li><span class="notice">已选座位</span>
        <li class="seatNotice seatNoUse"></li><span class="notice">售出座位</span>
        <li class="seatNotice seatSpace"></li><span class="notice">可选座位</span>
      </ul>
    </div>
    <div class="right">
      <ul>
        <li class="film"></li>
      </ul>
      <div class="filmInfo">
        <ul>
          <li ><strong>中文名：{{filmInfo.name}}</strong></li>
          <li><strong>英文名：{{filmInfo.nameEnglish}}</strong></li>
          <li>剧情：{{filmInfo.storyType}}</li>
          <li>版本：{{filmInfo.copyRight}}</li>
          <li>{{filmInfo.place}}/{{filmInfo.timeLength}}</li>
          <li>{{filmInfo.timeShow}}</li>
        </ul>
      </div>
      <div class="chooseAdr">
        <ul>
          <li>影院：{{filmInfo.cinema}}</li>
          <li>影厅：{{filmInfo.room}}</li>
          <li>场次：{{filmInfo.time}}</li>
          <li >座位：<span v-for="(item,index) in curSeatDisp" :key="index">{{item}}</span></li>
          <li><p>已选择了：<strong style="color: red">{{count}}</strong>个座位，<strong style="color: red">再次点击可取消。
            <span v-if="maxFlag">您一次最多买5张票！</span>
          </strong></p>
          </li>
          <li class="price">单价：<span><strong>{{filmInfo.unitPrice}}</strong></span></li>
          <li>总价：<span style="color: red"><strong>{{totalPrice}}</strong></span></li>
        </ul>
      </div>
      <div class="submit">
        <button type="button">确认信息，下单</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'film',
  data () {
    return {
      curSeat: [],
      curSeatDisp: [],
      maxChoose: 5,
      count: 0,
      maxFlag: false,
      setCol: 10,
      seatflag: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 2, 2, 0, 0, 0, 0,
        0, 0, 0, 2, 2, 0, 2, 2, 0, 0,
        -1, 0, 0, 0, 0, 0, 0, 0, 0, -1,
        -1, -1, 0, 0, 0, 0, 0, 0, -1, -1
      ],
      filmInfo: {
        name: '囧妈', // 影片中文名
        nameEnglish: 'Lost in Russia', // 影片英文名
        copyRight: '中文2D', // 版本
        filmImg: 'img/film1.png', // 影片海报文件名
        storyType: '喜剧', // 影片类型
        place: '中国大陆', // 影片产地
        timeLength: '126分钟', // 影片时长
        timeShow: '2020.02', // 影片上映时间
        cinema: '万达影城', // 电影院
        room: '8号影厅', // 放映影厅
        time: '2020.05.18(周一）20:00', // 放映时间
        unitPrice: 38 // 单价
      }
    }
  },
  computed: {
    totalPrice: function () {
      return this.count * this.filmInfo.unitPrice
    }
  },
  methods: {
    handleClick: function (index) {
      if (this.seatflag[index] === 0 && this.count < 5) {
        this.$set(this.seatflag, index, 1)
        this.count++
        this.curSeat.push(index)
      } else if (this.seatflag[index] === 1) {
        this.$set(this.seatflag, index, 0)
        this.count--
        this.curSeat.splice(this.curSeat.findIndex(item => item === index), 1)
      } else if (this.seatflag[index] === 2) {
        alert('座位已经被选！！！')
      }
      this.curSeatDisp = []
      for (let item in this.curSeat) {
        this.curSeatDisp.push((Math.floor(this.curSeat[item] / this.setCol) + 1) + '行' + (Math.floor(this.curSeat[item] % this.setCol + 1)) + '列')
      }
      this.maxFlag = this.count >= 5
    }
  }
}
</script>

<style scoped>
*{
  padding: 0;
  margin: 0;
}
ul,li{
  list-style: none;
}
body{
  width: 1100px;
  height: 600px;
}
/*左边内容*/
.left{
  float: left;
  width:500px;
  height: 600px;
  margin-left: 50px;
  margin-top: 50px;
}

/*电影屏幕*/
.movie p{
  font-size: 22px;
  font-weight: bolder;
  margin-left: 200px;
}
/*电影屏幕*/

/*座位选择区域*/
.seat{
  list-style: none;
  float: left;
  width: 30px;
  height: 30px;
  background-color: bisque;
  margin: 5px 10px;
  cursor: pointer;
}

.seatSpace {
  background: url("../img/bg.png") no-repeat 1px -29px;
}

.seatActive {
  background: url("../img/bg.png") 1px 0;
}

.seatNoUse {
  background: url("../img/bg.png") 1px -56px;
}

.noSeat {
  background: url("../img/bg.png") 1px -84px;
}
/*座位选择区域*/

/*座位信息提示*/
.seat_info .seatNotice{
  float: left;
  margin-top: 10px;
  margin-left: 50px;
  width: 30px;
  height: 30px;
}
.notice{
  float: left;
  margin-top: 10px;
  height: 30px;
  line-height: 30px;
}
/*座位信息提示*/

/*左边内容*/

/*右边电影信息*/
.right{
  float: left;
  margin-top: 50px;
  width: 500px;
  height: 550px;
  background-color: #faf2cc;
}

.right .film{
  background: url("../img/film1.png") no-repeat 1px;
  background-size: 130px 200px;
  width: 130px;
  height: 200px;
  margin: 15px 0 0 10px;
  float: left;
}
.right .filmInfo{
  float: left;
  margin-left: 10px;
}
.right .filmInfo li{
  margin-top: 5px;
}
.right .chooseAdr{
  width: 200px;
}
.right .chooseAdr li{
  margin-left: 10px;
  width: 400px;
  float: left;
  margin-top: 10px;
}
.right .chooseAdr li span{
  margin-left: 5px;
}
.right .chooseAdr .price{
  margin-top: 20px;
}
.right .submit{
  width: 120px;
  height: 30px;
  float: none;
}
.right .submit button{
  width: 120px;
  height: 30px;
  margin-top: 60px;
  margin-left: 200px;
}
/*右边电影信息*/
</style>
