package webFacade;

import java.util.Calendar;
import java.util.Collection;
import java.util.Date;
import java.util.HashSet;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.GenericEntity;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import core.Facade.AdminFacade;
import core.Facade.CompanyFacade;
import core.Facade.CouponClientFacade;
import core.Facade.CustomerFacade;
import core.beans.ClientType;
import core.beans.Coupon;
import core.beans.CouponType;
import core.exceptions.CouponSystemException;
import login.LoginCheck;
import system.CouponSystem;
import webBeans.WebCompany;
import webBeans.WebCoupon;

@Path("company")
public class CompanyResource {

	@Context
	private HttpServletResponse response;

	@Context
	private HttpServletRequest request;

	/**
	 * this method returns a facade if the session is alive,
	 * if the session is invalid it try's to do an auto login with the cookies data.
	 * if the login failed(auto login), it returns null
	 * or if your not with an company facade, it returns null 
	 * @return
	 */
	private CompanyFacade getFacade() {
		if (request.getSession().isNew()) {
			if (LoginCheck.login(request, response).isLoginSuccessful() != true) {
				return null;
			}
		}
		Object facade = (CouponClientFacade) request.getSession().getAttribute("facade");
		if ((facade instanceof CompanyFacade))
			return (CompanyFacade) facade;
		else
			return null;
	}

	@GET
	@Path("getcompanyname")
	public Response getCompanyName(){
		CompanyFacade facade = getFacade();
		if(facade == null)
		{
			return Response.ok("press 'Switch User' to login with the company privileges").status(550).build();
		}

		return Response.ok(facade.getCompanyName()).status(200).build();
	}
	@POST
	@Path("createcoupon")
	public Response createCoupon(WebCoupon webCoupon) {
		CompanyFacade facade = getFacade();
		if(facade == null)
		{
			return Response.ok("press 'Switch User' to login with the company privileges").status(550).build();
		}
		Coupon coupon = webCoupon.convertToCoupon();
		try {
			facade.createCoupon(coupon);
		} catch (CouponSystemException e) {
			return Response.ok(e.getMessage()).status(500).build();
		}
		return Response.ok(coupon.getTitle() + ", was created").status(200).build();

	}

	@DELETE
	@Path("removecoupon/{pid}")
	public Response removeCoupon(@PathParam("pid") long id) {
		CompanyFacade facade = getFacade();
		if(facade == null)
		{
			return Response.ok("press 'Switch User' to login with the company privileges").status(550).build();
		}
		Coupon coupon = null;
		try {
			coupon = facade.getCoupon(id);
			facade.removeCoupon(coupon);
		} catch (CouponSystemException e) {
			return Response.ok(e.getMessage()).status(500).build();
		}
		return Response.ok("Coupon: " + coupon.getTitle() + ", Deleted successfully").status(200).build();

	}

	@PUT
	@Path("updatecoupon")
	public Response updateCoupon(WebCoupon webCoupon) {
		CompanyFacade facade = getFacade();
		if(facade == null)
		{
			return Response.ok("press 'Switch User' to login with the company privileges").status(550).build();
		}
		Coupon coupon = webCoupon.convertToCoupon();
		try {
			facade.updateCoupon(coupon);
		} catch (CouponSystemException e) {
			return Response.ok(e.getMessage()).status(500).build();
		}
		return Response.ok("Coupon: " + coupon.getTitle() + " - All the details updated successfully").status(200)
				.build();
	}

	@GET
	@Path("getcoupon/{pid}")
	public Response getCoupon(@PathParam("pid") long id) {
		CompanyFacade facade = getFacade();
		if(facade == null)
		{
			return Response.ok("press 'Switch User' to login with the company privileges").status(550).build();
		}
		Coupon coupon = null;
		WebCoupon webCoupon = null;
		try {
			coupon = facade.getCoupon(id);
			webCoupon = new WebCoupon(coupon);
		} catch (CouponSystemException e) {
			return Response.ok(e.getMessage()).status(500).build();
		} catch (NullPointerException e) {
			return Response.ok("Coupon id does not exist").status(500).build();
		}
		return Response.ok(webCoupon).status(200).build();

	}

	@GET
	@Path("getallcoupons")
	public Response getAllCoupons() {
		CompanyFacade facade = getFacade();
		if(facade == null)
		{
			return Response.ok("press 'Switch User' to login with the company privileges").status(550).build();
		}
		Collection<Coupon> allCoupon = null;
		GenericEntity<Collection<WebCoupon>> entity;
		try {
			allCoupon = facade.getAllCoupons();
			entity = convertAndWarp(allCoupon);
		} catch (CouponSystemException e) {
			return Response.ok(e.getMessage()).status(500).build();
		} catch (NullPointerException e) {
			return Response.ok("No coupons exist at the data base, you should create some").status(500).build();
		}
		return Response.ok(entity).status(200).build();
	}

	@GET
	@Path("getcouponbytype/{pcoupontype}")
	public Response getCouponByType(@PathParam("pcoupontype") String strCoupontype) {
		CouponType coupontype = CouponType.valueOf(strCoupontype);
		CompanyFacade facade = getFacade();
		if(facade == null)
		{
			return Response.ok("press 'Switch User' to login with the company privileges").status(550).build();
		}
		Collection<Coupon> allCoupon = null;
		GenericEntity<Collection<WebCoupon>> entity;
		try {
			allCoupon = facade.getCouponByType(coupontype);
			entity = convertAndWarp(allCoupon);
		} catch (CouponSystemException e) {
			return Response.ok(e.getMessage()).status(500).build();
		} catch (NullPointerException e) {
			return Response.ok("No coupons from this type exist at the data base, you should create some").status(500)
					.build();
		}
		return Response.ok(entity).status(200).build();
	}

	@GET
	@Path("getcouponbypricelimit/{pprice}")
	public Response getCouponByPriceLimit(@PathParam("pprice") double price) {
		CompanyFacade facade = getFacade();
		if(facade == null)
		{
			return Response.ok("press 'Switch User' to login with the company privileges").status(550).build();
		}
		Collection<Coupon> allCoupon = null;
		GenericEntity<Collection<WebCoupon>> entity;

		try {
			allCoupon = facade.getCouponByPriceLimit(price);
			entity = convertAndWarp(allCoupon);
		} catch (CouponSystemException e) {
			return Response.ok(e.getMessage()).status(500).build();
		} catch (NullPointerException e) {
			return Response.ok("No coupons for this price range: " + price).status(500).build();
		}
		return Response.ok(entity).status(200).build();
	}

	/**
	 * get a date as times stamp
	 * 
	 * @param timestamp
	 * @return
	 */
	@GET
	@Path("getcouponbydatelimit/{ptimestamp}")
	public Response getCouponByDateLimit(@PathParam("ptimestamp") long timestamp) {
		Date dateLimit = new Date(timestamp);
		CompanyFacade facade = getFacade();
		if(facade == null)
		{
			return Response.ok("press 'Switch User' to login with the company privileges").status(550).build();
		}
		Collection<Coupon> allCoupon = null;
		GenericEntity<Collection<WebCoupon>> entity;
		
		try {
			allCoupon = facade.getCouponByDateLimit(dateLimit);
			entity = convertAndWarp(allCoupon);
		} catch (CouponSystemException e) {
			return Response.ok(e.getMessage()).status(500).build();
		} catch (NullPointerException e) {
			return Response.ok("No coupons for this date range: " + dateLimit).status(500).build();
		}
		return Response.ok(entity).status(200).build();
	}

	/**
	 * convert collection of coupon to webcoupon and wrap them with GenericEntity
	 * 
	 * @param webCouponsColl
	 * @return
	 */
	private GenericEntity<Collection<WebCoupon>> convertAndWarp(Collection<Coupon> allCoupon) {

		Collection<WebCoupon> allWebCoupon = new HashSet<>();
		for (Coupon currntCoupon : allCoupon) {
			allWebCoupon.add(new WebCoupon(currntCoupon));
		}
		return new GenericEntity<Collection<WebCoupon>>(allWebCoupon) {
		};
	}


}
