var TFSApp = angular.module('TFSApp', ['ngResource','angular.filter','ngRoute']);

TFSApp.config(['$routeProvider', '$httpProvider', '$locationProvider',
    function ($routeProvider,$httpProvider, $locationProvider) {
     
        $routeProvider.
        when('/', {
            templateUrl: '/Views/Home/Resource.html',
            controller: 'Resource'
        }).
        when('/Resource', {
            templateUrl: '/Views/Home/Resource.html',
            controller: 'Resource'
        }).
        when('/Application', {
            templateUrl: '/Views/Home/Application.html',
            controller: 'Application'
        });
        $routeProvider.otherwise('/');
        $locationProvider.hashPrefix('!').html5Mode({
            enabled: true,
            requireBase: false
        });
        var spinnerFunction = function spinnerFunction(data, headersGetter) {
            $("#spinner").show();
            return data;
        };

        var spinnerFunction1 = function spinnerFunction1(data, headersGetter) {
            $("#spinner").hide();
            return data;
        };

        $httpProvider.defaults.transformRequest.push(spinnerFunction);
        $httpProvider.defaults.transformResponse.push(spinnerFunction1);
    }
]);

TFSApp.factory("callFactory", function ($http) {
    var serviceObj = {};
    serviceObj.message = function () {
        return "Result from factory";
    };
    return serviceObj;
});

TFSApp.service("callService", function ($http) {
    this.message = function () {
        return "Result from service";
    };
});

TFSApp.controller('TFSMaster', function ($scope, $location, $http) {
   
});


TFSApp.controller('Resource', function ($scope, $http, $filter) {
    var date = new Date(), y = date.getFullYear(), m = date.getMonth();
    var firstDay = new Date(y, m, 1);
    var lastDay = new Date(y, m + 1, 0);
    $scope.StartDate = firstDay;
    $scope.EndDate = lastDay;
    $scope.gridShow = false;
    $scope.status = '';
    $scope.$watch('StartDate', function (newValue) {
        $scope.StartDate = $filter('date')(newValue, 'MM/dd/yyyy');
    });

    $scope.$watch('EndDate', function (newValue) {
        $scope.EndDate = $filter('date')(newValue, 'MM/dd/yyyy');
    });

    $scope.Resources = [];
    $scope.search = function () {
        $http({
            cache: true,
            method: 'GET',
            url: '/Home/GetData',
            params: { StartDate: $scope.StartDate, EndDate: $scope.EndDate }
        }).then(function (Resource) {
           
            $scope.gridShow = true;
            $scope.Resources = Resource.data;
            console.log($scope.Resources);
        },
          function (error) {
              $scope.gridShow = false;
              $scope.status = 'Unable to load customer data: ' + error.message;
              console.log($scope.status);
          });
        //$scope.GetData = function (resource) {
        //    $http({
        //        cache: true,
        //        method: 'GET',
        //        url: '/Home/GetSpecificResourceData',
        //        params: { ResourceName: resource }
        //    }).then(function (Resource) {
           
        //        $scope.gridShow = true;
        //        $scope.Resources = Resource.data;
        //        console.log($scope.Resources);
        //    },
        //      function (error) {
        //          $scope.gridShow = false;
        //          $scope.status = 'Unable to load customer data: ' + error.message;
        //          console.log($scope.status);
        //      });
    }

 

    $scope.getTotalEffort = function(res){
    var total = 0;
    for (var i = 0; i < res.length; i++) {
        var product = res[i].Completed_Work_Agg;
        total += product;
    }
    return total;
}

    });

TFSApp.controller('Application', function ($scope, $http, $filter) {
    var date = new Date(), y = date.getFullYear(), m = date.getMonth();
    var firstDay = new Date(y, m, 1);
    var lastDay = new Date(y, m + 1, 0);
    $scope.StartDate = firstDay;
    $scope.EndDate = lastDay;
    $scope.gridShow = false;
    $scope.status = '';
    $scope.$watch('StartDate', function (newValue) {
        $scope.StartDate = $filter('date')(newValue, 'MM/dd/yyyy');
    });

    $scope.$watch('EndDate', function (newValue) {
        $scope.EndDate = $filter('date')(newValue, 'MM/dd/yyyy');
    });

    $scope.Applications = [];
    $scope.search = function () {
             $http({
            cache: true,
            method: 'GET',
            url: '/Home/GetData',
            params: { StartDate: $scope.StartDate, EndDate: $scope.EndDate }
        }).then(function (Application) {
            $scope.gridShow = true;
            $scope.Applications = Application.data;
            console.log($scope.Applications);
        },
          function (error) {
              $scope.gridShow = false;
              $scope.status = 'Unable to load customer data: ' + error.message;
              console.log($scope.status);
          });
    }



    $scope.getTotalEffort = function (res) {
        var total = 0;
        for (var i = 0; i < res.length; i++) {
            var product = res[i].Completed_Work_Agg;
            total += product;
        }
        return total;
    }

});