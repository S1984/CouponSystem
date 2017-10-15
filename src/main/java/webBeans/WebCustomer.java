package webBeans;

import java.io.Serializable;
import java.util.Collection;

import javax.xml.bind.annotation.XmlRootElement;

import core.beans.Coupon;
import core.beans.Customer;
@XmlRootElement
public class WebCustomer implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private long id;
	private String name;
	private String password;
	Collection<Coupon> coupons;

	public WebCustomer() {
	}

	
	public WebCustomer(long id, String name, String password) {
		super();
		this.id = id;
		this.name = name;
		this.password = password;
	}


	public WebCustomer(Customer customer) {
		this.id = customer.getId();
		this.name = customer.getName();
		this.password = customer.getPassword();
		this.coupons = customer.getCoupons();
	}

	public Customer convertToCustomer(){
		Customer customer = new Customer(this.id, this.name, this.password);
		return customer;
	}

	@Override
	public String toString() {
		return "WebCustomer [id=" + id + ", name=" + name + ", password=" + password + "]";
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

	public Collection<Coupon> getCoupons() {
		return coupons;
	}

	public void setCoupons(Collection<Coupon> coupons) {
		this.coupons = coupons;
	}
	
	
}
