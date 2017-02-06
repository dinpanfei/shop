//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
   bannerImages:[],
   moudleImages:[
     'http://m.ipinbb.com/ipbb/static/images/home-01.png',
'http://m.ipinbb.com/ipbb/static/images/home-02.png',
'http://m.ipinbb.com/ipbb/static/images/home-03.png',
'http://m.ipinbb.com/ipbb/static/images/home-04.png'
   ],
   scrollNavbar:[],
   autoplay:true,
   interval:3000,
   duration:1000,
   currentIndex:-1,
   lst:[]
  },
  //事件处理函数
  navLink: function(e){
    console.log(e)
  var ti=e.currentTarget.dataset.ti;
  var fi=e.currentTarget.dataset.fi;
   var that=this;
   wx.request({
     url:'http://m.ipinbb.com/ipbb/home/load',
     data:{
       ti:ti,
       ft:fi
     },
         method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    // header: {}, // 设置请求的 header
    success: function(res){
     console.log(res.data.lst)
     that.setData({
       lst:res.data.lst
     })
     },
   })
     that.setData({
     currentIndex:e.currentTarget.dataset.tabindex
   })
  },
  onLoad: function () {
   //顶部swiper  
   this.bannerSwiper();
   this.scrollNavbar1();
   this.list();
  },
  //swiper
  bannerSwiper:function (param)
  {
    var that=this;
     wx.request({
    url: 'http://service.ipinbb.com:8080/goodsService/getHomeBanner',
    data: {},
    method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    // header: {}, // 设置请求的 header
    success: function(res){
      var bannerArr=[];
      var bannerData=res.data.lst;
      console.log(bannerData)
      bannerData.forEach(function(item)
      {
        var bannerObj={};
        bannerObj.goodId=item.banner_goodsId;
        bannerObj.imgUrl=item.banner_img;
        bannerObj.platformId=item.banner_platformId;
        bannerArr.push(bannerObj)
      });
      console.log(bannerArr)
      that.setData({
         bannerImages:bannerArr
      })
    },
    fail: function() {
      wx.showTosat({title:'网络开小差..',icon:'loading'})
    },
    complete: function() {
      // complete
    }
  })
 },
 list:function (param) { 
   var that=this;
   wx.request({
     url:'http://m.ipinbb.com/ipbb/home/load',
     data:{
       ti:'-1',
       ft:'Home'
     },
         method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    // header: {}, // 设置请求的 header
    success: function(res){
     console.log(res.data.lst)
     that.setData({
       lst:res.data.lst
     })
     },
   })
  },
  //scrollNavbar
  scrollNavbar1:function (param)
   { 
   var that=this;
   wx.request({
    url: 'http://service.ipinbb.com:8080/goodsService/getHomeTabs',
    data: {},
    method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    // header: {}, // 设置请求的 header
    success: function(res){
      console.log(res)
      var scrollArr=[];
      var scrollData=res.data;
      scrollData.forEach(function(item)
       {
        var scrollObj={};
        scrollObj.tabIndex=item.tabId;
        scrollObj.text=item.tabName;
        scrollObj.category=item.tabFilterType;
        scrollObj.className=!item.tabSortType? '':'curNavigator';
        scrollArr.push(scrollObj)
         });
       that.setData({
        scrollNavbar:scrollArr
       })  
       },
      fail: function() {wx.showTosat({title:'网络开小差..',icon:'loading'})}
     })
   }
   })

