package webFacade;

import java.util.Collection;
import java.util.HashSet;

import javax.servlet.RequestDispatcher;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.GenericEntity;
import javax.ws.rs.core.Response;
import javax.xml.ws.WebServiceContext;

import core.Facade.AdminFacade;
import core.Facade.CouponClientFacade;
import core.beans.Company;
import core.beans.Customer;
import core.exceptions.CouponSystemException;
import login.LoginCheck;
import webBeans.WebCompany;
import webBeans.WebCustomer;
import webBeans.WebLoginData;

@Path("admin")
public class AdminResource {

	@Context
	private HttpServletRequest request;
	@Context
	private HttpServletResponse response;

	/**
	 * this method returns a facade if the session is alive,
	 * if the session is invalid it try's to do an auto login with the cookies data.
	 * if the login failed(auto login), it returns null
	 * or if your not with an admin facade, it returns null 
	 * @return
	 */
	private AdminFacade getFacade() {
		if (request.getSession().isNew()) {
			if (LoginCheck.login(request, response).isLoginSuccessful() != true) {
				return null;
			}
		}
		Object facade = (CouponClientFacade) request.getSession().getAttribute("facade");
		if ((facade instanceof AdminFacade))
			return (AdminFacade) facade;
		else
			return null;
	}

	@POST
	@Path("createcompany")
	public Response createCompany(WebCompany webCompany) {
		AdminFacade facade = getFacade();
		if(facade == null)
		{
			return Response.ok("press 'Switch User' to login as Administrator").status(550).build();
		}
		Company company = webCompany.convertToCompany();
		if (company.getPassword().contains(" ")) {
			return Response.ok("create company aborted, PASSWORD should NOT contain white space").status(500).build();
		}
		if (company.getName().contains(" ")) {
			return Response.ok("create company aborted, NAME should NOT contain white space").status(500).build();
		}
		
		try {
			facade.createCompany(company);
		} catch (CouponSystemException e) {
			return Response.ok(e.getMessage()).status(500).build();
		}
		return Response.ok(company.getName() + ", was created").status(200).build();
	}

	@DELETE
	@Path("removecompany/{pid}")
	public Response removeCompany(@PathParam("pid") long id) {
		AdminFacade facade = getFacade();
		if(facade == null)
		{
			return Response.ok("press 'Switch User' to login as Administrator").status(550).build();
		}
		Company company = null;
		try {
			company = facade.getCompany(id);
			facade.removeCompany(company);
		} catch (CouponSystemException e) {
			return Response.ok(e.getMessage()).status(500).build();
		}
		return Response.ok("Company: " + company.getName() + ", Deleted successfully").status(200).build();
	}

	@PUT
	@Path("updatecompany")
	public Response updateCompany(WebCompany webCompany) {
		AdminFacade facade = getFacade();
		if(facade == null)
		{
			return Response.ok("press 'Switch User' to login as Administrator").status(550).build();
		}
		Company company = webCompany.convertToCompany();
		
		if (company.getPassword().contains(" ")) {
			return Response.ok("update company aborted, PASSWORD should NOT contain white space").status(502).build();
		}
		if (company.getEmail() == null) {
			return Response.ok("update company aborted, email should be: name@domain.com").status(501).build();
		}
		
		try {
			facade.updateCompany(company);
		} catch (CouponSystemException e) {
			return Response.ok(e.getMessage()).status(500).build();
		}
		return Response.ok("Company: " + company.getName() + " - All the details were updated successfully").status(200)
				.build();

	}

	@GET
	@Path("getcompany/{pid}")
	public Response getCompany(@PathParam("pid") long id) {
		AdminFacade facade = getFacade();
		if(facade == null)
		{
			return Response.ok("press 'Switch User' to login as Administrator").status(550).build();
		}
		Company company = null;
		WebCompany webCompany = null;
		try {
			company = facade.getCompany(id);
			webCompany = new WebCompany(company);
		} catch (CouponSystemException e) {
			return Response.ok(e.getMessage()).status(500).build();
		} catch (NullPointerException e) {
			return Response.ok("Company id does not exist").status(500).build();
		}
		return Response.ok(webCompany).status(200).build();
	}

	@GET
	@Path("getallcompanies")
	public Response getAllCompanies() {
		AdminFacade facade = getFacade();
		if(facade == null)
		{
			return Response.ok("press 'Switch User' to login as Administrator").status(550).build();
		}
		Collection<Company> allCompany = null;
		Collection<WebCompany> allWebCompany = null;
		////
		GenericEntity<Collection<WebCompany>> entity;
		try {
			allCompany = facade.getAllCompanies();
			allWebCompany = new HashSet<>();
			for (Company currntCompany : allCompany) {
				allWebCompany.add(new WebCompany(currntCompany));
			}
			entity = new GenericEntity<Collection<WebCompany>>(allWebCompany) {
			};
		} catch (CouponSystemException e) {
			return Response.ok(e.getMessage()).status(500).build();
		} catch (NullPointerException e) {
			return Response.ok("No Companies exist at the data base, you should create some").status(500).build();
		}
		return Response.ok(entity).status(200).build();
	}

	@POST
	@Path("createcustomer")
	public Response createCustomer(WebCustomer webCustomer) {
		AdminFacade facade = getFacade();
		if(facade == null)
		{
			return Response.ok("press 'Switch User' to login as Administrator").status(550).build();
		}
		Customer customer = webCustomer.convertToCustomer();
		if (customer.getPassword().contains(" ")) {
			return Response.ok("create customer aborted, PASSWORD should NOT contain white space").status(500).build();
		}
		if (customer.getName().contains(" ")) {
			return Response.ok("create customer aborted, NAME should NOT contain white space").status(500).build();
		}
		try {
			facade.createCustomer(customer);
		} catch (CouponSystemException e) {
			return Response.ok(e.getMessage()).status(500).build();
		}
		return Response.ok(customer.getName() + ", was created").status(200).build();
	}

	@DELETE
	@Path("removecustomer/{pid}")
	public Response removeCustomer(@PathParam("pid") long id) {
		AdminFacade facade = getFacade();
		if(facade == null)
		{
			return Response.ok("press 'Switch User' to login as Administrator").status(550).build();
		}
		Customer customer = null;
		try {
			customer = facade.getCustomer(id);
			facade.removeCustomer(customer);
		} catch (CouponSystemException e) {
			return Response.ok(e.getMessage()).status(500).build();
		}
		return Response.ok("Cuatomer: " + customer.getName() + ", Deleted successfully").status(200).build();
	}

	@PUT
	@Path("updatecustomer")
	public Response updateCustomer(WebCustomer webCustomer) {
		AdminFacade facade = getFacade();
		if(facade == null)
		{
			return Response.ok("press 'Switch User' to login as Administrator").status(550).build();
		}
		Customer customer = webCustomer.convertToCustomer();
		if (customer.getPassword().contains(" ")) {
			return Response.ok("create customer aborted, PASSWORD should NOT contain white space").status(500).build();
		}
		try {
			facade.updateCustomer(customer);
		} catch (CouponSystemException e) {
			return Response.ok(e.getMessage()).status(500).build();
		}
		return Response.ok("Customer: " + customer.getName() + " - All the details updated successfully").status(200)
				.build();
	}

	@GET
	@Path("getcustomer/{pid}")
	public Response getCustomer(@PathParam("pid") long id) {
		AdminFacade facade = getFacade();
		if(facade == null)
		{
			return Response.ok("press 'Switch User' to login as Administrator").status(550).build();
		}
		Customer customer = null;
		WebCustomer webCustomer = null;
		try {
			customer = facade.getCustomer(id);
			webCustomer = new WebCustomer(customer);
		} catch (CouponSystemException e) {
			return Response.ok(e.getMessage()).status(500).build();
		} catch (NullPointerException e) {
			return Response.ok("Customer id does not exist").status(500).build();
		}
		return Response.ok(webCustomer).status(200).build();
	}

	@GET
	@Path("getallcustomers")
	public Response getAllCustomer() {
		AdminFacade facade = getFacade();
		if(facade == null)
		{
			return Response.ok("press 'Switch User' to login as Administrator").status(550).build();
		}
		Collection<Customer> allCustomer = null;
		Collection<WebCustomer> allWebCustomer = null;
		GenericEntity<Collection<WebCustomer>> entity;
		try {
			allCustomer = facade.getAllCustomer();
			allWebCustomer = new HashSet<>();
			for (Customer currntCustomer : allCustomer) {
				allWebCustomer.add(new WebCustomer(currntCustomer));
			}
			entity = new GenericEntity<Collection<WebCustomer>>(allWebCustomer) {
			};
		} catch (CouponSystemException e) {
			return Response.ok(e.getMessage()).status(500).build();
		} catch (NullPointerException e) {
			return Response.ok("No Customers exist at the data base, you should create some").status(500).build();
		}
		return Response.ok(entity).status(200).build();
	}

}
