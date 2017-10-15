
function Coupon(coup)
{

		this.id = coup.id;
		this.title = coup.title;
		this.startDate = new Date(coup.startDate);
		this.endDate = new Date(coup.endDate);
		this.amount = coup.amount;
		this.type = coup.type;
		this.message = coup.message;
		this.price = coup.price;
		this.image = coup.image;
}