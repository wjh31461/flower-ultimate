s<template>
  <div class="first">
    <div class="nav">
      <div class="wrapper nav-wrapper">
        <span>全部商品导购</span>
        <router-link :to='{ path: "/plate/overview", query: { key: "鲜花" }}'>鲜花</router-link>
        <router-link :to='{ path: "/plate/overview", query: { type: "5" }}'>永生花</router-link>
        <router-link :to='{ path: "/plate/overview", query: { key: "玫瑰" }}'>玫瑰花</router-link>
        <router-link :to='{ path: "/plate/overview", query: { type: "6" }}'>绿植盆栽</router-link>
        <router-link :to='{ path: "/plate/overview", query: { type: "3" }}'>七夕情人节鲜花</router-link>
      </div>
    </div>
    
    <div class="carousel">
      <el-carousel type='card'>
        <div class="left-nav">
          <div class="left-nav-variety">
            <div class="title">鲜花品种</div>
            <ul>
              <li><router-link :to='{ path: "/plate/overview", query: { key: "玫瑰" }}'>玫瑰</router-link></li>
              <li><router-link :to='{ path: "/plate/overview", query: { key: "百合" }}'>百合</router-link></li>
              <li><router-link :to='{ path: "/plate/overview", query: { key: "紫罗兰" }}'>紫罗兰</router-link></li>
              <li><router-link :to='{ path: "/plate/overview", query: { key: "向日葵" }}'>向日葵</router-link></li>
              <li><router-link :to='{ path: "/plate/overview", query: { key: "康乃馨" }}'>康乃馨</router-link></li>
              <li><router-link :to='{ path: "/plate/overview", query: { key: "郁金香" }}'>郁金香</router-link></li>
              <li><router-link :to='{ path: "/plate/overview", query: { key: "马蹄莲" }}'>马蹄莲</router-link></li>
            </ul>
          </div>
          <div class="left-nav-purpose">
            <div class="title">鲜花用途</div>
            <ul>
              <li><router-link :to='{ path: "/plate/overview", query: { type: "3" }}'>爱情鲜花</router-link></li>
              <li><router-link :to='{ path: "/plate/overview", query: { type: "4" }}'>送长辈鲜花</router-link></li>
              <li><router-link :to='{ path: "/plate/overview", query: { key: "永恒" }}'>婚庆鲜花</router-link></li>
              <li><router-link :to='{ path: "/plate/overview", query: { key: "海洋之心" }}'>商务鲜花</router-link></li>
            </ul>
          </div>
          <div class="left-nav-type">
            <div class="title">鲜花类别</div>
            <ul>
              <li><router-link :to='{ path: "/plate/overview", query: { key: "开业" }}'>开业花篮</router-link></li>
              <li><router-link :to='{ path: "/plate/overview", query: { type: "5" }}'>永生花</router-link></li>
              <li><router-link :to='{ path: "/plate/overview", query: { type: "6" }}'>办公室盆栽</router-link></li>
            </ul>
          </div>
        </div>
        <el-carousel-item v-for="item in items" :key="item.id">
          <router-link :to='item.href'><img :src="item.src"></router-link>
        </el-carousel-item>
      </el-carousel>
    </div>
    
    <div class="top-server">
      <ul class="wrapper top-server-wrapper">
        <li>
          <p>品质保证</p>
          <p>真实口碑</p>
        </li>
        <li>
          <p>实拍展示</p>
          <p>发货前实拍鲜花</p>
        </li>
        <li>
          <p>急速发货</p>
          <p>2小时之内发货</p>
        </li>
      </ul>
    </div>

    <div class="hot">
      <div class="wrapper hot-wrapper">
        <div class="hot-wrapper-title">人气推荐<i class="fa fa-fire"></i></div>
        <ul>
          <li v-for='msg in hotmsg' :key='msg.id'>
            <div class="hot-img">
              <router-link :to='{ path: "/plate/commodity", query: { id: msg.id }}'>
                <img :src="msg.src" alt="">
              </router-link>
            </div>
            <div class="hot-msg">
              <div class="hot-msg-head"><span>{{msg.hotmsghead}}</span></div>
              <div class="hot-msg-title">
                <router-link :to='{ path:"/plate/commodity", query: { id: msg.id }}'>{{msg.name}}</router-link>
              </div>
              <p class="hot-msg-price">
                <span>￥{{msg.pricel}}</span>
                <span>￥{{msg.priceh}}</span>
                <span class="hot-msg-down">
                  <i class="fa fa-long-arrow-down"></i>
                  <span>直降{{msg.priceh - msg.pricel}}</span>
                </span>
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div class="time-limit">
      <div class="wrapper time-limit-wrapper">
        <div class="time-limit-title">限时推荐<i class="fa fa-clock-o"></i></div>
        <ul>
          <li v-for='msg in timelimit'>
            <div class="time-img">
              <router-link :to="{ path:'/plate/commodity', query: {id: msg.id }}">
                <img :src="msg.src" alt="">
              </router-link>
            </div>
            <div class="timelimit">
              <div class="timelimit-head"><span>{{msg.timelimithead}}</span></div>
              <div class="timelimit-title">
                <router-link :to='{ path:"/plate/commodity", query: { id: msg.id }}'>{{msg.name}}</router-link>
              </div>
              <p class="timelimit-price">
                <span>￥{{msg.pricel}}</span>
                <span>￥{{msg.priceh}}</span>
                <span class="timelimit-down">
                  <i class="fa fa-long-arrow-down"></i>
                  <span>直降{{msg.priceh - msg.pricel}}</span>
                </span>
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    
    <div class="love">
      <div class="wrapper love-wrapper">
        <div class="love-title">爱情鲜花<i class="fa fa-heart"></i></div>
        <div class="love-content">
          <ul>
            <li>
              <router-link :to="{ path:'/plate/overview', query: { type: 3 }}">
                <div class="love-left-img">
                  <img src="static/love.jpg" alt="">
                </div>
                <div class="love-to">
                  <div class="love-to-title">爱情鲜花专区>></div>
                </div>
              </router-link>
            </li>
            <li v-for='msg in lovemsg'>
              <div class="love-img">
                <router-link :to="{ path: '/plate/commodity', query: { id: msg.id }}">
                  <img :src="msg.src" alt="">
                </router-link>
              </div>
              <div class="love-msg">
                <div class="love-msg-title">
                  <router-link :to='{ path: "/plate/commodity", query: { id: msg.id }}'>{{msg.name}}</router-link>
                </div>
                <div class="love-msg-price">
                  <span>￥{{msg.pricel}}</span>
                  <span>￥{{msg.priceh}}</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="thanks">
      <div class="wrapper thanks-wrapper">
        <div class="thanks-title">感恩鲜花<i class="fa fa-smile-o"></i></div>
        <div class="thanks-content">
          <ul>
            <li>
              <router-link :to="{ path: '/plate/overview', query: { type: '4' } }">
                <div class="thanks-left-img">
                  <img src="static/thanks.jpeg" alt="">
                </div>
                <div class="thanks-to">
                  <div class="thanks-to-title">感恩鲜花专区>></div>
                </div>
              </router-link>
            </li>
            <li v-for='msg in thanksmsg'>
              <div class="thanks-img">
                <router-link :to='{ path: "/plate/commodity", query: { id: msg.id } }'>
                  <img :src="msg.src" alt="">
                </router-link>
              </div>
              <div class="thanks-msg">
                <div class="thanks-msg-title">
                  <router-link :to='{ path: "/plate/commodity", query: { id: msg.id }}'>{{msg.name}}</router-link>
                </div>
                <div class="thanks-msg-price">
                  <span>￥{{msg.pricel}}</span>
                  <span>￥{{msg.priceh}}</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="immortal">
      <div class="wrapper immortal-wrapper">
        <div class="immortal-title">永生花<i class="fa fa-pagelines"></i></div>
        <div class="immortal-content">
          <ul>
            <li>
              <router-link :to="{ path: '/plate/overview', query: { type: '5' }}">
                <div class="immortal-left-img">
                  <img src="static/immortal.jpeg" alt="">
                </div>
                <div class="immortal-to">
                  <div class="immortal-to-title">永生花专区>></div>
                </div>
              </router-link>
            </li>
            <li v-for='msg in immortalmsg'>
              <div class="immortal-img">
                <router-link :to='{ path: "/plate/commodity", query: { id: msg.id }}'>
                  <img :src="msg.src" alt="">
                </router-link>
              </div>
              <div class="immortal-msg">
                <div class="immortal-msg-title">
                  <router-link :to='{ path: "/plate/commodity", query: { id: msg.id }}'>{{msg.name}}</router-link>
                </div>
                <div class="immortal-msg-price">
                  <span>￥{{msg.pricel}}</span>
                  <span>￥{{msg.priceh}}</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '@/http/axios'
export default {
  data () {
    return {
      items: [{
        id: '00',
        src: 'static/carousel-1.jpg',
        href: '/plate/overview?type=3'
      }, {
        id: '01',
        src: 'static/carousel-2.jpg',
        href: '/plate/overview?type=5'
      }, {
        id: '02',
        src: 'static/carousel-3.jpg',
        href: '/plate/overview?type=6'
      }],

      hotmsg: [],
      timelimit: [],
      lovemsg: [],
      thanksmsg: [],
      immortalmsg: []
    }
  },
  methods: {
    getMsg () {
      this.getHotMsg()
      this.getTimeLimit()
      this.getLoveMsg()
      this.getThanksMsg()
      this.getImmortalMsg()
    },
    getHotMsg () {
      let params = {
        ids: JSON.stringify(['500', '302', '405', '501', '400'])
      }
      axios({
        url: '/commodity/findCommodityByIds',
        method: 'POST',
        data: params
      }).then(res => {
        if (!res.data.success) {
          this.$message.error(res.data.desc)
          return false
        }
        this.hotmsg = res.data.data
        this.hotmsg.forEach((item, index) => {
          switch (index) {
            case 0:
              item.hotmsghead = '特惠'
              break
            case 1:
              item.hotmsghead = '限时购'
              break
            case 2:
              item.hotmsghead = '满折'
              break
            case 3:
              item.hotmsghead = '满减'
              break
            case 4:
              item.hotmsghead = '满减'
              break
          }
        })
      })
    },
    getTimeLimit () {
      let params = {
        ids: JSON.stringify(['20', '506', '308', '401', '309'])
      }
      axios({
        url: '/commodity/findCommodityByIds',
        method: 'POST',
        data: params
      }).then(res => {
        if (!res.data.success) {
          this.$message.error(res.data.desc)
          return false
        }
        this.timelimit = res.data.data
        this.timelimit.forEach((item, index) => {
          switch (index) {
            case 0:
              item.timelimithead = '限时购'
              break
            case 1:
              item.timelimithead = '限时购'
              break
            case 2:
              item.timelimithead = '满折'
              break
            case 3:
              item.timelimithead = '满减'
              break
            case 4:
              item.timelimithead = '满减'
              break
          }
        })
      })
    },
    getLoveMsg () {
      let params = {
        ids: JSON.stringify(['300', '301', '302', '303', '304', '305', '306', '307'])
      }
      axios({
        url: '/commodity/findCommodityByIds',
        method: 'POST',
        data: params
      }).then(res => {
        if (!res.data.success) {
          this.$message.error(res.data.desc)
          return false
        }
        this.lovemsg = res.data.data
      })
    },
    getThanksMsg () {
      let params = {
        ids: JSON.stringify(['400', '401', '402', '403', '404', '405', '406', '407'])
      }
      axios({
        url: '/commodity/findCommodityByIds',
        method: 'POST',
        data: params
      }).then(res => {
        if (!res.data.success) {
          this.$message.error(res.data.desc)
          return false
        }
        this.thanksmsg = res.data.data
      })
    },
    getImmortalMsg () {
      let params = {
        ids: JSON.stringify(['500', '501', '502', '503', '504', '505', '506', '507'])
      }
      axios({
        url: '/commodity/findCommodityByIds',
        method: 'POST',
        data: params
      }).then(res => {
        if (!res.data.success) {
          this.$message.error(res.data.desc)
          return false
        }
        this.immortalmsg = res.data.data
      })
    }
  },
  mounted () {
    this.getMsg()
  }
}
</script>

<style>
  .nav {
    min-width: 1200px;
    height: 40px;
    margin-bottom: 2px;
    /*border-bottom: 2px solid #f76372;*/
  }
  .nav-wrapper > * {
    display: inline-block;
    line-height: 40px;
    font-size: 17px;
    font-weight: bold;
  }
  .nav-wrapper span {
    width: 280px;
    color: #fff;
    background-color: #f76372;
    border-bottom: 2px solid #f76372;
    text-align: center;
  }
  .nav-wrapper a {
    margin-left: 20px;
    padding: 0 15px;
  }
  .nav-wrapper a:hover {
    color: #f76372;
    border-bottom: 2px solid #f76372;
  }
  .nav-wrapper a:last-child {
    color: #f76372;
  }
  .nav-wrapper a:last-child:hover {
    border-bottom: none;
  }


  .carousel {
    background-color: rgba(247,99,114,0.1);
  }
  .carousel .el-carousel {
    width: 1200px;
    margin: 0 auto;
  }
  .el-carousel .el-carousel__container {
    margin-left: 350px;
  }
  .el-carousel__container .el-carousel__item {
    width: 75%;
  }
  .el-carousel__item {
    top: 20px;
  }
  .el-carousel__item img {
    height: 260px;
    width: 100%;
  }
  .el-carousel__item.is-active {
    transform: translateX(120px) scale(1) !important;
  }
  .el-carousel__indicators--outside {
    position: relative;
    left: 200px;
    top: 0;
  }
  .el-carousel__indicators--outside button {
    background-color: #f76372;
  }
  .el-carousel__button {
    height: 5px;
  }

  .el-carousel__container .left-nav {
    z-index: 20;
    position: relative;
    right: 350px;
    width: 280px;
    height: 329px;
    background-color: #fff;
    border-bottom: 2px solid #f76372;
    box-shadow: 0 2px 2px rgba(0,0,0,0.175);
  }
  .left-nav > * > .title {
    font-size: 16px;
    font-weight: 600;
    color: #f76372;
    text-align: center;
  }
  .left-nav > * > ul {
    width: 230px;
    margin: 15px auto;
  }
  .left-nav > * > ul > * {
    display: inline-block;
  }
  .left-nav > * > ul > * > a {
    font-size: 13px;
  }
  .left-nav > * > ul > * > a:hover {
    color: #f76372;
  }
  .left-nav .left-nav-variety a {
    margin-right: 28px;
  }
  .left-nav-variety .title {
    padding-top: 8px;
  }
  .left-nav-variety ul,
  .left-nav-purpose ul {
    padding-bottom: 1.5em;
    border-bottom: 1px solid rgba(247,99,114,0.3);
  }
  .left-nav .left-nav-purpose a {
    margin-right: 25px;
  }
  .left-nav .left-nav-type a {
    margin-right: 32px;
  }
  .left-nav-type ul > li:nth-child(4) a {
    margin-right: 49px;
  }
  .left-nav-type ul > li:nth-child(5) a {
    margin-right: 32px;
  }
  .left-nav-variety ul > li:nth-child(4) a,
  .left-nav-purpose ul > li:nth-child(3) a,
  .left-nav-purpose ul > li:nth-child(6) a,
  .left-nav-type ul > li:nth-child(3) a,
  .left-nav-type ul > li:nth-child(6) a {
    margin: 0;
  }
  .left-nav-variety ul > li:nth-child(5) a,
  .left-nav-variety ul > li:nth-child(6) a {
    margin-right: 15px;
  }


  .top-server {
    margin-top: 25px;
  }
  .top-server .top-server-wrapper > * {
    float: left;
  }
  .top-server-wrapper > li:first-child {
    margin-left: 20px;
  }
  .top-server-wrapper > li:last-child {
    margin-right: 20px;
  }
  .top-server-wrapper > li:nth-child(2) {
    margin: 0 438px;
  }
  .top-server-wrapper > * > p:first-child {
    font-size: 20px;
  }
  .top-server-wrapper::after {
    content: '';
    display: block;
    clear: both;
  }



  .hot {
    margin-top: 60px;
    /*background-color: rgba(247,99,114,0.1);*/
  }
  .hot .hot-wrapper .hot-wrapper-title {
    font-size: 28px;
    line-height: 56px;
    font-weight: bold;
  }
  .hot-wrapper-title .fa-fire {
    margin-left: 1em;
    color: red;
  }
  .hot-wrapper ul > * {
    float: left;
    width: 232px;
    height: 360px;
    margin-right: 10px;
    box-sizing: border-box;
    border: 1px solid rgba(247,99,114,0.3);
  }
  .hot-wrapper ul > *:hover {
    border: 1px solid rgba(247,99,114,1);
  }
  .hot-wrapper ul > li:last-child {
    margin: 0
  }
  .hot-wrapper ul > * .hot-img {
    width: 100%;
    height: 260px;
    border-bottom: 1px solid rgba(247,99,114,0.2);
  }
  .hot-img a {
    display: inline-block;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .hot-img img {
    width: 100%;
    height: 100%;
    transition: transform 1s;
  }
  .hot-wrapper ul > *:hover img {
    transform: scale(1.05);
  }
  .hot-wrapper ul > * .hot-msg {
    margin-top: 5px;
  }
  .hot-msg .hot-msg-head,
  .hot-msg .hot-msg-title,
  .hot-msg .hot-msg-price {
    text-align: center;
    margin-bottom: 5px;
  }
  .hot-msg-head span{
    display: inline-block;
    color: #fff;
    background-color: #f76372;
    padding: 2px 5px;
    font-size: 12px;
  }
  .hot-msg-title a {
    font-weight: bold;
  }
  .hot-msg-title a:hover {
    color: #f76372;
  }
  .hot-msg-price > span:first-child{
    font-size: 14px;
    color: #d4282d;
  }
  .hot-msg-price > span:nth-child(2){
    font-size: 12px;
    color: grey;
    text-decoration: line-through;
  }
  .hot-msg-price .hot-msg-down {
    color: #ff6600;
    font-size: 12px;
    width: 5em;
    height: 2em;
    line-height: 2em;
    display: inline-block;
    border: 1px solid #ff6600;
    border-radius: 15px;
    position: relative;
    left: 1em;
  }
  .hot-wrapper ul::after {
    content: '';
    display: block;
    clear: both;
  }



  .time-limit {
    margin-top: 60px;
    padding-bottom: 60px;
    background-color: rgba(247,99,114,0.1);
  }
  .time-limit-title {
    font-size: 28px;
    line-height: 56px;
    padding-top: 50px;
    font-weight: bold;
  }
  .time-limit-title .fa-clock-o {
    margin-left: 1em;
    color: grey;
  }
  .time-limit ul > * {
    float: left;
    width: 232px;
    height: 360px;
    margin-right: 10px;
    box-sizing: border-box;
    border: 1px solid rgba(247,99,114,0.3);
  }
  .time-limit ul > *:hover {
    border: 1px solid rgba(247,99,114,1);
  }
  .time-limit ul > li:last-child {
    margin: 0
  }
  .time-limit ul > * .time-img {
    width: 100%;
    height: 260px;
    border-bottom: 1px solid rgba(247,99,114,0.2);
  }
  .time-img a {
    display: inline-block;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .time-img img {
    width: 100%;
    height: 100%;
    transition: transform 1s;
  }
  .time-limit-wrapper ul > *:hover img {
    transform: scale(1.05);
  }
  .time-limit-wrapper ul > * .timelimit {
    padding-top: 5px;
    height: 98px;
    background-color: #fff;
  }
  .timelimit .timelimit-head,
  .timelimit .timelimit-title,
  .timelimit .timelimit-price {
    text-align: center;
    margin-bottom: 5px;
  }
  .timelimit-head span{
    display: inline-block;
    color: #fff;
    background-color: #f76372;
    padding: 2px 5px;
    font-size: 12px;
  }
  .timelimit-title a {
    font-weight: bold;
  }
  .timelimit-title a:hover {
    color: #f76372;
  }
  .timelimit-price > span:first-child{
    font-size: 14px;
    color: #d4282d;
  }
  .timelimit-price > span:nth-child(2){
    font-size: 12px;
    color: grey;
    text-decoration: line-through;
  }
  .timelimit-price .timelimit-down {
    color: #ff6600;
    font-size: 12px;
    width: 5em;
    height: 2em;
    line-height: 2em;
    display: inline-block;
    border: 1px solid #ff6600;
    border-radius: 15px;
    position: relative;
    left: 1em;
  }
  .time-limit-wrapper ul::after {
    content: '';
    display: block;
    clear: both;
  }



  .love {
    margin-top: 60px;
    padding-bottom: 60px;
  }
  .love-title {
    font-size: 28px;
    line-height: 56px;
    font-weight: bold;
  }
  .love-title .fa-heart {
    margin-left: 1em;
    color: red;
  }
  .love ul > * {
    float: left;
    width: 240px;
    height: 320px;
    box-sizing: border-box;
    border: 1px solid rgba(247,99,114,0.3);
    margin-right: -1px;
    margin-bottom: -1px;
  }
  .love ul > *:hover {
    border: 1px solid rgba(247,99,114,1);
  }
  .love ul > li:first-child {
    border: none;
    height: 639px;
  }
  .love ul > li:first-child .love-left-img {
    width: 100%;
    height: 519px;
  }
  .love-left-img img {
    width: 100%;
    height: 100%;
  }
  .love ul > li:first-child .love-to {
    width: 100%;
    height: 120px;
    background-color: #f76372;
  }
  .love-to .love-to-title {
    color: #fff;
    font-size: 28px;
    text-align: center;
    padding-top: 40px;
  }
  .love ul > li .love-img {
    height: 260px;
    overflow: hidden;
    border-bottom: 1px solid rgba(247,99,114,0.2);
    margin-bottom: 5px;
  }
  .love ul > li .love-img img{
    width: 100%;
    height: 100%;
    transition: transform 1s;
  }
  .love ul > li:hover .love-img img {
    transform: scale(1.05);
  }
  .love ul > li .love-msg {
    height: 60px;
    text-align: center;
  }
  .love-msg .love-msg-title a {
    font-weight: bold;
  }
  .love-msg-title a:hover {
    color: #f76372;
  }
  .love-msg .love-msg-price span:first-child {
    font-size: 14px;
    color: #d4282d;
  }
  .love-msg-price > span:nth-child(2){
    font-size: 12px;
    color: grey;
    text-decoration: line-through;
  }
  .love ul::after {
    content: '';
    display: block;
    clear: both;
  }



  .thanks {
    padding-bottom: 60px;
    padding-top: 60px;
    background-color: rgba(247,99,114,0.1);
  }
  .thanks-title {
    font-size: 28px;
    line-height: 56px;
    font-weight: bold;
  }
  .thanks-title .fa-smile-o {
    margin-left: 1em;
    color: orange;
  }
  .thanks ul > * {
    float: left;
    width: 240px;
    height: 320px;
    box-sizing: border-box;
    border: 1px solid rgba(247,99,114,0.3);
    margin-right: -1px;
    margin-bottom: -1px;
  }
  .thanks ul > *:hover {
    border: 1px solid rgba(247,99,114,1);
  }
  .thanks ul > li:first-child {
    border: none;
    height: 639px;
  }
  .thanks ul > li:first-child .thanks-left-img {
    width: 100%;
    height: 519px;
  }
  .thanks-left-img img {
    width: 100%;
    height: 100%;
  }
  .thanks ul > li:first-child .thanks-to {
    width: 100%;
    height: 120px;
    background-color: #4095bf;
  }
  .thanks-to .thanks-to-title {
    color: #fff;
    font-size: 28px;
    text-align: center;
    padding-top: 40px;
  }
  .thanks ul > li .thanks-img {
    height: 260px;
    overflow: hidden;
    border-bottom: 1px solid rgba(247,99,114,0.2);
  }
  .thanks ul > li .thanks-img img{
    width: 100%;
    height: 100%;
    transition: transform 1s;
  }
  .thanks ul > li:hover .thanks-img img {
    transform: scale(1.05);
  }
  .thanks ul > li .thanks-msg {
    height: 58px;
    padding-top: 5px;
    background-color: #fff;
    text-align: center;
  }
  .thanks-msg .thanks-msg-title a {
    font-weight: bold;
  }
  .thanks-msg-title a:hover {
    color: #f76372;
  }
  .thanks-msg .thanks-msg-price span:first-child {
    font-size: 14px;
    color: #d4282d;
  }
  .thanks-msg-price > span:nth-child(2){
    font-size: 12px;
    color: grey;
    text-decoration: line-through;
  }
  .thanks ul::after {
    content: '';
    display: block;
    clear: both;
  }



  .immortal {
    margin-top: 60px;
    padding-bottom: 60px;
  }
  .immortal-title {
    font-size: 28px;
    line-height: 56px;
    font-weight: bold;
  }
  .immortal-title .fa-pagelines {
    margin-left: 1em;
    color: green;
  }
  .immortal ul > * {
    float: left;
    width: 240px;
    height: 320px;
    box-sizing: border-box;
    border: 1px solid rgba(247,99,114,0.3);
    margin-right: -1px;
    margin-bottom: -1px;
  }
  .immortal ul > *:hover {
    border: 1px solid rgba(247,99,114,1);
  }
  .immortal ul > li:first-child {
    border: none;
    height: 639px;
  }
  .immortal ul > li:first-child .immortal-left-img {
    width: 100%;
    height: 519px;
  }
  .immortal-left-img img {
    width: 100%;
    height: 100%;
  }
  .immortal ul > li:first-child .immortal-to {
    width: 100%;
    height: 120px;
    background-color: #72bc3b;
  }
  .immortal-to .immortal-to-title {
    color: #fff;
    font-size: 28px;
    text-align: center;
    padding-top: 40px;
  }
  .immortal ul > li .immortal-img {
    height: 260px;
    overflow: hidden;
    border-bottom: 1px solid rgba(247,99,114,0.2);
    margin-bottom: 5px;
  }
  .immortal ul > li .immortal-img img{
    width: 100%;
    height: 100%;
    transition: transform 1s;
  }
  .immortal ul > li:hover .immortal-img img {
    transform: scale(1.05);
  }
  .immortal ul > li .immortal-msg {
    height: 60px;
    text-align: center;
  }
  .immortal-msg .immortal-msg-title a {
    font-weight: bold;
  }
  .immortal-msg-title a:hover {
    color: #f76372;
  }
  .immortal-msg .immortal-msg-price span:first-child {
    font-size: 14px;
    color: #d4282d;
  }
  .immortal-msg-price > span:nth-child(2){
    font-size: 12px;
    color: grey;
    text-decoration: line-through;
  }
  .immortal ul::after {
    content: '';
    display: block;
    clear: both;
  }
</style>