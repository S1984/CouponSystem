
(function(){
var app = angular.module("facade");


app.config([ '$locationProvider', function($locationProvider) {
	$locationProvider.hashPrefix('');
} ]);


app.config(function($stateProvider, $urlRouterProvider) {

	$stateProvider.state("ShowCoup", {
		url : "/ShowCoup",
		templateUrl : "companypages/getAllCoupons.html",
	});

	$stateProvider.state("ShowID", {
		url : "/ShowID",
		templateUrl : "companypages/getAllCouponsByID.html",
	});

	$stateProvider.state("ShowType", {
		url : "/ShowType",
		templateUrl : "companypages/getAllCouponsByType.html",
	});	
	$stateProvider.state("ShowPrice", {
		url : "/ShowPrice",
		templateUrl : "companypages/getAllCouponsByPrice.html",
	});
	$stateProvider.state("ShowDate", {
		url : "/ShowDate",
		templateUrl : "companypages/getAllCouponsByDate.html",
	});
	$stateProvider.state("CreateCoup", {
		url : "/CreateCoup",
		templateUrl : "companypages/createCoupon.html",
	});

	
	$urlRouterProvider.when("", "/ShowCoup");
});
})();

