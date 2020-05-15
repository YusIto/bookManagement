package app;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown=true)
public class Order implements Serializable{
	/** 商品コード */
	private String itemCd;
	/** 購入数 */
	private int purchaseNum;


	public String getItemCd() {
		return itemCd;
	}
	public void setItemCd(String itemCd) {
		this.itemCd = itemCd;
	}
	public int getPurchaseNum() {
		return purchaseNum;
	}
	public void setPurchaseNum(int purchaseNum) {
		this.purchaseNum = purchaseNum;
	}

	@Override
	public String toString() {
		return "Purchase [itemCd=" + itemCd + ", purchaseNum=" + purchaseNum + "]";
	}


}
