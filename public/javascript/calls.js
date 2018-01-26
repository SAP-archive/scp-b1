$(document).ready(function () {
	// Connect Button (on modal window)
	$.get("/GetItems", function (json) {
		displayItems(json);
	});
});

function displayItems(json) {
	var items = json.value;
	$("#resultTable tbody").empty();
	//Lines	
	for (var i = 0; i < items.length; i++) {
		$("#resultTable tbody").append(
			"<tr>" +
			"<td>" + (i + 1) + "</td>" +
			"<td>" + items[i].ItemCode + "</td>" +
			"<td>" + items[i].ItemName + "</td>" +
			"<td>" + items[i].QuantityOnStock + "</td>" +
			"<td>" + (items[i].QuantityOrderedFromVendors +
				items[i].QuantityOrderedByCustomers) + "</td>" +
			"</tr>");
	}
}