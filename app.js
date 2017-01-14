var app = angular.module("app", []);

app.controller("ctrl", function ($scope, signalR) {
    $scope.messages = [];
    $scope.user = {};

    signalR.setHubName("chatHub");

    signalR.connectToHub();

    signalR.client().broadcastMessage = function (name, message) {
        var newChat = { name: name, message: message };

        $scope.$apply(function() {
            $scope.messages.push(newChat);
        });
    };

    signalR.connected(function () {
        $scope.send = function() {
            signalR.server().send($scope.user.name, $scope.user.message);
        }
    });
});
