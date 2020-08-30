<template>
	<div class="plate">
		<div class="plate-nav">
      <div class="wrapper plate-nav-wrapper">
        <div class="platenav-title">
        	<span>全部商品导购<i class="fa fa-angle-down"></i></span>
					<div class="platenav-block">
	          <div class="platenav-block-variety">
	            <div class="title">鲜花品种</div>
	            <ul>
                <li><router-link to='/plate/overview?key=玫瑰'>玫瑰</router-link></li>
                <li><router-link to='/plate/overview?key=百合'>百合</router-link></li>
                <li><router-link to='/plate/overview?key=紫罗兰'>紫罗兰</router-link></li>
                <li><router-link to='/plate/overview?key=向日葵'>向日葵</router-link></li>
                <li><router-link to='/plate/overview?key=康乃馨'>康乃馨</router-link></li>
                <li><router-link to='/plate/overview?key=郁金香'>郁金香</router-link></li>
                <li><router-link to='/plate/overview?key=马蹄莲'>马蹄莲</router-link></li>
              </ul>
	          </div>
	          <div class="platenav-block-purpose">
	            <div class="title">鲜花用途</div>
	            <ul>
                <li><router-link to='/plate/overview?type=3'>爱情鲜花</router-link></li>
                <li><router-link to='/plate/overview?type=4'>送长辈鲜花</router-link></li>
                <li><router-link to='/plate/overview?key=永恒'>婚庆鲜花</router-link></li>
                <li><router-link to='/plate/overview?key=海洋之心'>商务鲜花</router-link></li>
              </ul>
	          </div>
	          <div class="platenav-block-type">
	            <div class="title">鲜花类别</div>
	            <ul>
                <li><router-link to='/plate/overview?key=开业'>开业花篮</router-link></li>
                <li><router-link to='/plate/overview?type=5'>永生花</router-link></li>
                <li><router-link to='/plate/overview?type=6'>办公室盆栽</router-link></li>
              </ul>
	          </div>
	      	</div>
        </div>
        <router-link to='/plate/overview?key=鲜花'>鲜花</router-link>
        <router-link to='/plate/overview?type=5'>永生花</router-link>
        <router-link to='/plate/overview?key=玫瑰'>玫瑰花</router-link>
        <router-link to='/plate/overview?type=6'>绿植盆栽</router-link>
        <router-link to='/plate/overview?type=3'>七夕情人节鲜花</router-link>
      </div>
    </div>
    <router-view></router-view>
	</div>
</template>

<script>
export default {
	data () {
		return {}
	},
	methods: {}
}
</script>

<style>
	.plate-nav {
    min-width: 1200px;
    height: 40px;
    background-color: rgba(247,99,114,0.8);
  }
  .plate-nav-wrapper > a {
    display: inline-block;
    line-height: 40px;
    font-size: 17px;
    font-weight: bold;
    margin-left: 20px;
    padding: 0 15px;
    color: #fff;
  }
  .plate-nav-wrapper > .platenav-title{
    width: 280px;
    color: #fff;
    font-size: 17px;
    background-color: #f76372;
    position: relative;
    float: left;
  }
  .platenav-title > span {
  	display: inline-block;
  	width: 100%;
  	line-height: 40px;
  	font-weight: bold;
  	text-align: center;
  }
  .platenav-title > span .fa-angle-down {
  	position: absolute;
  	top: .8em;
  	right: 2em;
  }
  .plate-nav-wrapper > a:hover {
    background-color: rgba(247,99,114,1);
  }
  .platenav-title > .platenav-block {
  	width: 280px;
    height: 329px;
    background-color: #fff;
    /* border-bottom: 2px solid #f76372; */
    box-shadow: 0 2px 2px rgba(0,0,0,0.175);
    position: absolute;
    top: 40px;
    display: none;
    z-index: 20;
  }
  .platenav-title:hover .platenav-block {
  	display: block;
  }
  .platenav-block > * > .title {
    font-size: 16px;
    font-weight: 600;
    color: #f76372;
    text-align: center;
  }
  .platenav-block > * > ul {
    width: 230px;
    margin: 15px auto;
  }
  .platenav-block > * > ul > * {
    display: inline-block;
  }
  .platenav-block > * > ul > * > a {
    font-size: 13px;
  }
  .platenav-block > * > ul > * > a:hover {
    color: #f76372;
  }
  .platenav-block .platenav-block-variety a {
    margin-right: 28px;
  }
  .platenav-block-variety .title {
    padding-top: 8px;
  }
  .platenav-block-variety ul,
  .platenav-block-purpose ul {
    padding-bottom: 1.5em;
    border-bottom: 1px solid rgba(247,99,114,0.3);
  }
  .platenav-block .platenav-block-purpose a {
    margin-right: 25px;
  }
  .platenav-block .platenav-block-type a {
    margin-right: 31px;
  }
  .platenav-block-type ul > li:nth-child(4) a {
    margin-right: 49px;
  }
  .platenav-block-type ul > li:nth-child(5) a {
    margin-right: 32px;
  }
  .platenav-block-variety ul > li:nth-child(4) a,
  .platenav-block-purpose ul > li:nth-child(3) a,
  .platenav-block-purpose ul > li:nth-child(6) a,
  .platenav-block-type ul > li:nth-child(3) a,
  .platenav-block-type ul > li:nth-child(6) a {
    margin: 0;
  }
  .platenav-block-variety ul > li:nth-child(5) a,
  .platenav-block-variety ul > li:nth-child(6) a {
    margin-right: 15px;
  }



  .content {
		margin-top: 60px;
	}
  .content .plate-content-wrapper ul > * {
    float: left;
    width: 285px;
    height: 360px;
    box-sizing: border-box;
    border: 1px solid rgba(247,99,114,0.3);
    margin-right: 20px;
    margin-bottom: 30px;
  }
  .plate-content-wrapper ul > *:nth-child(4n) {
  	margin: 0;
  }
  .plate-content-wrapper ul > *:hover {
    border: 1px solid rgba(247,99,114,1);
  }
  .plate-content-wrapper ul > li .plate-img {
    height: 300px;
    overflow: hidden;
    border-bottom: 1px solid rgba(247,99,114,0.2);
  }
  .plate-content-wrapper ul > li .plate-img img{
    width: 100%;
    height: 100%;
    transition: transform 1s;
  }
  .plate-content-wrapper ul::after {
  	content: '';
  	display: block;
  	clear: both;
  }
</style>