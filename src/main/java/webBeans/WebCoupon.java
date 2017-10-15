package webBeans;

import java.io.Serializable;
import java.util.Date;

import javax.xml.bind.annotation.XmlRootElement;

import core.beans.Coupon;
import core.beans.CouponType;

@XmlRootElement
public class WebCoupon implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private long id;
	private String title;
	private Date startDate;
	private Date endDate;
	private int amount;
	private CouponType type;
	private String message;
	private double price;
	private String image;

	public WebCoupon() {
	}

	public WebCoupon(Coupon coupon) {
		super();
		this.id = coupon.getId();
		this.title = coupon.getTitle();
		this.startDate = coupon.getStartDate();
		this.endDate = coupon.getEndDate();
		this.amount = coupon.getAmount();
		this.type = coupon.getType();
		this.message = coupon.getMessage();
		this.price = coupon.getPrice();
		this.image = coupon.getImage();
	}
	
	

	public WebCoupon(long id, String title, Date startDate, Date endDate, int amount, CouponType type, String message,
			double price, String image) {
		super();
		this.id = id;
		this.title = title;
		this.startDate = startDate;
		this.endDate = endDate;
		this.amount = amount;
		this.type = type;
		this.message = message;
		this.price = price;
		this.image = image;
	}

	public Coupon convertToCoupon() {
		Coupon coupon = new Coupon(this.id, this.title, this.startDate, this.endDate, this.amount, this.type,
				this.message, this.price, this.image);
		return coupon;
	}

	@Override
	public String toString() {
		return "WebCoupon [id=" + id + ", title=" + title + ", startDate=" + startDate + ", endDate=" + endDate
				+ ", amount=" + amount + ", type=" + type + ", message=" + message + ", price=" + price + ", image="
				+ image + "]";
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public Date getEndDate() {
		return endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}

	public int getAmount() {
		return amount;
	}

	public void setAmount(int amount) {
		this.amount = amount;
	}

	public CouponType getType() {
		return type;
	}

	public void setType(CouponType type) {
		this.type = type;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}
	

}
