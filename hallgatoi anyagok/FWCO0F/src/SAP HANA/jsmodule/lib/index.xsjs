$.response.contentType = "text/html";
var output;


output += "<script src=\"https://d3js.org/d3.v5.min.js\"></script>"

var conn = $.db.getConnection();
var pstmt = conn.prepareStatement("SELECT REGIO, COUNT(TARS_ROV_NEV), SUM(JEGYZ_TOKE_ERT_HUF) FROM \"TARSASAGOK_HDI_DB\".\"Tarsasag.Tarsasag\" GROUP BY REGIO");



var rs;
var meta;
rs = pstmt.executeQuery();
meta = rs.getMetaData();

var i=1;
var colCount;
colCount = meta.getColumnCount();
output = output + "<table border=\"1\"><tr>";
for (i=1; i<= colCount ; i++){	output = output + "<td>" + meta.getColumnName(i) + "</td>"; }
output = output + "</tr>";
while(rs.next())
{
	output=output+"<tr>";
	for ( i = 1; i<= colCount ; i++)
	{
		output = output + "<td>" + rs.getString(i) + "</td>";
	}
	output=output+"</tr>";
}
output = output + "</table>";
rs.close();
pstmt.close();
conn.close();
$.response.setBody(output);