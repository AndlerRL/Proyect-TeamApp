var app= angular.module('Teamapp');

app.controller('resourcesCtrl', function($scope, $http, $state, ToastService, ResourcesService, Socket) {
   $scope.filesChanged= function(ele) {
      $scope.files= ele.files;
      $scope.$apply();
   }

   $scope.uploadFile= function() {
      var fd= new FormData();
      angular.forEach($scope.files, function(file) {
         fd.append('file', file);        
      });
      fd.append('receivers', $scope.receivers);
      fd.append('subject', $scope.subject);

      $http.post('/resource', fd, {
         transformRequest: angular.identify,
         headers: { 'Content-Type' : undefined }
      }).success(function(response) {
         Socket.emit('new:resource', response);
         ToastService.success('Sent Correctly');
         $state.go('app.resources');
      });
   };
});

app.controller('sentCtrl', function($scope, ResourcesService) {
   ResourcesService.getSentResources().success(function(response) {
      console.log(response);
      $scope.sent= response;
      $scope.orderProp= 'date';
      $scope.reverse= false;
   });
});

app.controller('receivedCtrl', function($scope, ResourcesService) {
   ResourcesService.getReceivedResources().success(function(response) {
      $scope.received= response;
      $scope.orderProp= 'date';
      $scope.reverse= false;
   })
});

app.controller('detailCtrl', function($scope, $stateParams, ResourcesService) {
   if ($stateParams.hasOwnProperty('id_resource')) {
      var id_resource= $stateParams.id_resource;
      ResourcesService.getDetail({ id:id_resource }).success(function(response) {
         $scope.resource= response;
      });
   }
});