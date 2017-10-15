
(function(){
var app = angular.module("facade");


app.config([ '$locationProvider', function($locationProvider) {
	$locationProvider.hashPrefix('');
} ]);


app.config(function($stateProvider, $urlRouterProvider) {

	$stateProvider.state("purchasecoupon", {
		url : "/purchasecoupon",
		templateUrl : "customerpages/purchasecoupon.html",
	});

	$stateProvider.state("getallpurchasedcoupons", {
		url : "/getallpurchasedcoupons",
		templateUrl : "customerpages/getallpurchasedcoupons.html",
	});

	$stateProvider.state("getallpurchasedcouponsbytype", {
		url : "/getallpurchasedcouponsbytype",
		templateUrl : "customerpages/getallpurchasedcouponsbytype.html",
	});	
	$stateProvider.state("getallpurchasedcouponsbyprice", {
		url : "/getallpurchasedcouponsbyprice",
		templateUrl : "customerpages/getallpurchasedcouponsbyprice.html",
	});

	
	$urlRouterProvider.when("", "/getallpurchasedcoupons");
});
})();

