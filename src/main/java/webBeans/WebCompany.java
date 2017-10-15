package webBeans;


import java.io.Serializable;
import java.util.Collection;

import javax.xml.bind.annotation.XmlRootElement;

import core.beans.Company;
import core.beans.Coupon;

@XmlRootElement
public class WebCompany implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private long id;
	private String name;
	private String password;
	private String email;
	Collection<Coupon> coupons;

	public WebCompany() {
	}
	
	public WebCompany(long id, String name, String password, String email) {
		super();
		this.id = id;
		this.name = name;
		this.password = password;
		this.email = email;
	}

	public WebCompany(Company company) {
		super();
		this.id= company.getId();
		this.name = company.getName();
		this.password = company.getPassword();
		this.email = company.getEmail();
		this.coupons = company.getCoupons();
	}
	
	public Company convertToCompany(){
		Company company = new Company(this.id, this.name, this.password, this.email);
		return company;
	}

	@Override
	public String toString() {
		return "WebCompany [id=" + id + ", name=" + name + ", password=" + password + ", email=" + email + "]";
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Collection<Coupon> getCoupons() {
		return coupons;
	}

	public void setCoupons(Collection<Coupon> coupons) {
		this.coupons = coupons;
	}
	
	
	
	
	
	
}
