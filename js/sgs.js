
var app = angular.module('sgs',['ng','ngRoute']);

app.config(function ($routeProvider) {

//  添加路由
  $routeProvider
    .when('/start',{
      templateUrl:'tpl/start.html',
      controller:'startCtrl'
    })
    .when('/main',{
      templateUrl:'tpl/main.html',
      controller:'mainCtrl'
    })
    .when('/detail',{
      templateUrl:'tpl/detail.html',
      controller:'detailCtrl'
    })
    .when('/detail/:id',{
      templateUrl:'tpl/detail.html',
      controller:'detailCtrl'
    })
    .when('/order',{
      templateUrl:'tpl/order.html',
      controller:'orderCtrl'
    })
    .when('/order/:id',{
      templateUrl:'tpl/order.html',
      controller:'orderCtrl'
    })
    .when('/myOrder',{
      templateUrl:'tpl/myOrder.html',
      controller:'myOrderCtrl'
    })
    .when('/myOrder/:id',{
      templateUrl:'tpl/myOrder.html',
      controller:'myOrderCtrl'
    })
    .otherwise({redirectTo:'/start'});
})

app.controller('sgsCtrl',
  ['$scope','$location','$interval', function ($scope,$location,$interval) {

    $scope.jump = function (arg) {
      $location.path(arg);
    }
   $scope.bgList=["bg.jpg","bg2.jpg"];
    $scope.index=0;
    $interval(function () {
      $scope.index++;
      if($scope.index > 1)
      {
        $scope.index = 0;
      }
      $('body').css('background',"url(img/"+$scope.bgList[$scope.index]+") no-repeat").fadeIn(2000,'linear');
    },8000);
}]);


app.controller('startCtrl',
  ['$scope', function ($scope) {
    //$scope.imgList=[
    //  {imgUrl:'index-6.jpg',title:'123',des:'4546'},
    //  {imgUrl:'index2-1.jpg',title:'123',des:'4546'},
    //  {imgUrl:'index3-1.jpg',title:'123',des:'4546'},
    //  {imgUrl:'index4-1.jpg',title:'123',des:'4546'},
    //  {imgUrl:'index5-1.jpg',title:'123',des:'4546'}
    //];
}]);

app.controller('mainCtrl',
  ['$scope','$http', function ($scope,$http) {
      $scope.hasMore = true;
      $http.get('data/hero_getbypage.php?start=0')
        .success(function (data) {
          console.log(data);
          $scope.heroList = data;
        })

      $scope.loadMore = function () {
        $http
          .get('data/hero_getbypage.php?start='+$scope.heroList.length)
          .success(function (data) {
            $scope.heroList = $scope.heroList.concat(data);
            if(data.length < 8)
            {
              $scope.hasMore = false;
            }
          })
      }

      $scope.$watch('kw', function () {
        if($scope.kw)
        {
          $http
            .get('data/hero_getbykw.php?kw='+$scope.kw)
            .success(function (data) {
              $scope.heroList = data;
            })
        }

      })
  }]);

app.controller('detailCtrl',
  ['$scope','$routeParams','$http',
    function ($scope,$routeParams,$http) {
      var hid = $routeParams.id;
      $http
        .get('data/hero_getbyid.php?id='+hid)
        .success(function (data) {
          console.log(data);
          $scope.hero = data[0];
        })
  }]);

app.controller('orderCtrl',
  ['$scope','$routeParams','$http',
    function ($scope,$routeParams,$http) {
      var hid = $routeParams.id;
      $scope.order = {'hid':hid};
      
      $scope.submitOrder = function () {
        //console.log($scope.order);
        var args = jQuery.param($scope.order);
        //console.log(args);
        $http
          .get('data/order_add.php?'+args)
          .success(function (data) {
            console.log(data);
            if(data[0].msg == 'succ')
            {
              sessionStorage.setItem('phone',$scope.order.phone);
              $scope.succMsg = "下单成功，订单编号为"+data[0].oid;
            }
            else
            {
              $scope.errMsg = '下单失败!';
            }
          })
      }
      

  }]);

app.controller('myOrderCtrl',
  ['$scope', '$http',function ($scope,$http) {

    $http
      .get('data/order_getbyphone.php?phone='+sessionStorage.getItem('phone'))
      .success(function (data) {
        console.log(data);
        $scope.orderList = data;
      })


  }]);
