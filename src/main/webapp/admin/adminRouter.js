
(function(){
var app = angular.module("facade");


app.config([ '$locationProvider', function($locationProvider) {
	$locationProvider.hashPrefix('');
} ]);


app.config(function($stateProvider, $urlRouterProvider) {

	$stateProvider.state("ShowComp", {
		url : "/ShowComp",
		templateUrl : "companypages/getallcompanies.html",
	});

	$stateProvider.state("CreateComp", {
		url : "/CreateComp",
		templateUrl : "companypages/createcompany.html",
	});

	$stateProvider.state("GetComp", {
		url : "/GetComp",
		templateUrl : "companypages/getcompany.html",
	});	
	$stateProvider.state("ShowCus", {
		url : "/ShowCus",
		templateUrl : "customerpages/getallcustomers.html",
	});
	$stateProvider.state("CreateCus", {
		url : "/CreateCus",
		templateUrl : "customerpages/createcustomer.html",
	});
	$stateProvider.state("GetCus", {
		url : "/GetCus",
		templateUrl : "customerpages/getcustomer.html",
	});

	
	$urlRouterProvider.when("", "/ShowComp");
});
})();

