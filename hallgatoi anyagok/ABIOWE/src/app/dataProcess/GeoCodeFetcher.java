package app.dataProcess;


import java.io.InputStream;
import java.net.*;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

import org.xml.sax.SAXException;

public class GeoCodeFetcher {
    //Bing service REST-URL
    public static final String bingLocationUrl = "http://dev.virtualearth.net/REST/v1/Locations";
    //Authentication key to invoke Bing URL [user need to change this key]
    public static final String bingAuthenticationKey = "AkoRGkhQ8LpxAAJG-14kIV_NLySxtb8nNP9bW3GzBekLCq3YPvx2pdR0vFpmRBki";

    private static final String EQUAL = "=";
    private static final String AND = "&";
    private static final String PARAM_COUNTRY = "countryRegion";
    private static final String PARAM_STATE = "adminDistrict";
    private static final String PARAM_CITY = "locality";
    private static final String PARAM_ZIP = "postalCode";
    private static final String PARAM_ADDRESS = "addressLine";
    private static final String PARAM_KEY = "key";
    private static final String PARAM_OUTPUT = "output";
    String Fileurl;

    public static Coordinate getCoordinates(String StreetAddress, String city, String country){

        GeoCodeFetcher geocodeFetcherInstance = new GeoCodeFetcher();
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));

        //String StreetAddress = "Pázmány Péter Sétány 1/C";
        //String city = "Budapest";
        String state = "";
        //String country = "Hungary";
        String zipCode = "";
        String resposeOutputType = "json";
        String coord = "";
        boolean helyesjson = false;

        /*
         * invoking prepareDynamicURL() to prepare URL dynamically by appenidng
         * street address, city, state, country and zipCode
         */
        String dynamicURl = geocodeFetcherInstance.prepareDynamicURL(StreetAddress, city, state, zipCode, country, resposeOutputType);

        String result = null;
        if (!dynamicURl.isEmpty()) {
            result = getResultHttpAsStream(dynamicURl);
        }
        BufferedReader br = null;
        try {
            URL url = new URL(dynamicURl);
            br = new BufferedReader(new InputStreamReader(url.openStream()));

            String foundWord = "coordinates";
            String sCurrentLine;
            String coordinates = "";
            int i = 0;

            //while removed
            sCurrentLine = br.readLine();
            String[] words = sCurrentLine.split("\"");

            for (String word : words) {
                if (word.equals(foundWord)) {
                    coordinates = words[i + 1];
                    helyesjson = true;
                    break;
                }
                i++;
            }
            if (!helyesjson) {
                System.out.println("Hibás JSON");
            }

            if(coordinates.length() != 0) coord = coordinates.substring(2, coordinates.length() - 3);
            //System.out.println(coord);

            int j = 0;
            StringBuilder sb = new StringBuilder();
            while(coord.charAt(j) != ','){
                sb.append(coord.charAt(j));
                j++;
            }

            double x = Double.parseDouble(sb.toString());

            j++;
            sb.setLength(0);
            while(j < coord.length()){
                sb.append(coord.charAt(j));
                j++;
            }

            double y = Double.parseDouble(sb.toString());

            return new Coordinate(x, y);

        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                if (br != null)
                    br.close();
            } catch (IOException ex) {
                System.out.println("*** IOException for URL : ");
            }
        }
        return null;
    }


    public static void main(String[] args) throws IOException, SAXException, URISyntaxException {
    }

    /*
     * This prepareDynamicURL() prepare URL dynamically by appending
     * street address, city, state, country and zipCode as parameter
     * after the static part of Bing api
     */
    private String prepareDynamicURL(String streetAdreess, String city,
                                     String state, String zipCode, String country, String resposeOutputType) {
        StringBuffer sb = new StringBuffer();
        sb.append(bingLocationUrl).append("?");
        sb.append(PARAM_COUNTRY).append(EQUAL).append(country).append(AND);
        try {
            sb.append(PARAM_STATE).append(EQUAL).append(encodeString(state)).append(AND);
        } catch (UnsupportedEncodingException e) {
            System.out.println("Unsupported code of state. Ignore the state");
        }
        try {
            sb.append(PARAM_CITY).append(EQUAL).append(encodeString(city)).append(AND);
        } catch (UnsupportedEncodingException e) {
            System.out.println("Unsupported code of city. Ignore the city");
        }
        sb.append(PARAM_ZIP).append(EQUAL).append(zipCode).append(AND);
        try {
            sb.append(PARAM_ADDRESS).append(EQUAL).append(encodeString(streetAdreess)).append(AND);
        } catch (UnsupportedEncodingException e) {
            System.out.println("Unsupported code of street. Ignore the address line");
        }
        //appending bing authentication key
        sb.append(PARAM_KEY).append(EQUAL).append(bingAuthenticationKey).append(AND);

        /*
         * appending response type/ output type value. Bing return response in
         * XML/ JSON/ Text format.
         */
        sb.append(PARAM_OUTPUT).append(EQUAL).append(resposeOutputType);
        return sb.toString();
    }

    /*
     * this encodeString() used to encode
     * street address, city, state, country and zipCode
     */
    protected String encodeString(String str)
            throws UnsupportedEncodingException {
        return URLEncoder.encode(str.replace(".", "").replace(",", "").replace(":", ""), "UTF-8");//.replace("+", "%20");
    }

    /*
     * this getResultHttpAsStream() used to invoke Bing Rest-api
     * using  HttpURLConnection and converting the result in string format
     */
    protected static final String getResultHttpAsStream(String url) {
        HttpURLConnection conn = null;
        InputStream in = null;
        BufferedReader rd = null;
        StringBuffer sb = new StringBuffer();
        try {
            URL u = new URL(url);
            conn = (HttpURLConnection) u.openConnection();

            if (conn.getResponseCode() == HttpURLConnection.HTTP_OK) {
                //in = conn.getInputStream();
                // Get the response
                rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
                String line;
                while ((line = rd.readLine()) != null) {
                    sb.append(line);
                }
                rd.close();
            }

        } catch (Throwable e) {
            in = null;
        } finally {
            conn = null;
        }
        return sb.toString();
    }
}