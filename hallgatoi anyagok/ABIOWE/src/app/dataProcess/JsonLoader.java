package app.dataProcess;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import com.google.gson.stream.MalformedJsonException;

import java.awt.*;
import java.io.*;
import java.net.URI;
import java.net.URL;
import java.net.URLConnection;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.IllegalFormatException;

public class JsonLoader {

    private static ArrayList<Company> companies;

    void loadJSONFromFile(String fileName, boolean withCoords) { //src\data.json
        System.out.printf("LOG: Loading Objects");

        StringBuilder stringBuilder = new StringBuilder();
        try {

            //= = = READ FROM FILE = = =
            BufferedReader br = new BufferedReader(new FileReader(fileName));

            GsonBuilder builder = new GsonBuilder();
            builder.disableHtmlEscaping();

            Gson gson = builder.setPrettyPrinting().create();

            String sr = "";
            while ((sr = br.readLine()) != null) {
                stringBuilder.append(sr);
            }
            br.close();
            //= = = = = = = = = = = = =

            //= = = READ FROM URL= = =
            /*
            String sURL = "https://oktnb132.inf.elte.hu:51010/company.xsodata/COMPANY?$top=1000&$format=json";
            URL url = new URL(sURL);
            URLConnection request = url.openConnection();
            request.connect();

            // Convert to a JSON object to print data
            JsonParser jp = new JsonParser(); //from gson

            JsonElement root = jp.parse(new InputStreamReader((InputStream) request.getContent())); //Convert the input stream to a json element
            */
            //= = = = = = = = = = = = =


            //= = = READ FROM URL V.2= = =
            /*String JSONUrl = "https://oktnb132.inf.elte.hu:51010/company.xsodata/COMPANY?$top=1000&$format=json";

            URL url = new URL(JSONUrl);
            URLConnection yc = url.openConnection();
            BufferedReader in = new BufferedReader(new InputStreamReader(yc.getInputStream()));
            String inputLine;
            while ((inputLine = in.readLine()) != null)
                System.out.println(inputLine);
            in.close();
            */

            //Original JSON input
            String JSONString = stringBuilder.toString(); //root.toString(); //stringBuilder
            //System.out.println(string);
            //System.out.println(JSONString);
            //Modified for parsing

            String corrected = JSONString.substring(25, JSONString.length() - 5);

            try {
                //GsonBuilder builder = new GsonBuilder();
                //builder.disableHtmlEscaping();

                //Gson gson = builder.setPrettyPrinting().create();

                Company[] db = gson.fromJson(corrected, Company[].class);
                companies = new ArrayList<>(Arrays.asList(db));

                for (int i = 0; i < companies.size(); i++) {
                    if (companies.get(i).CIM_EGYBEN.contains("Kolozsvár") ||
                            companies.get(i).CIM_EGYBEN.contains("Ismeretlen") ||
                            companies.get(i).CIM_EGYBEN.contains("Washington")) {
                        companies.remove(companies.get(i));
                        i--;
                    }
                }

                for (Company c : companies) {
                    String[] addres = c.CIM_EGYBEN.split(" ");
                    StringBuilder sb = new StringBuilder();
                    boolean hun = true;

                    int j = 0;
                    while (Character.isDigit(addres[j].charAt(0))) {
                        j++;
                    }
                    //System.out.println(c.CIM_EGYBEN);
                    while (j < addres.length) {
                        if (addres[j].length() != 0 && addres[j].charAt(0) != '(') {
                            sb.append(addres[j] + " ");
                        } else if (addres[j].length() != 0 && addres[j].charAt(0) == '(') {
                            sb.setLength(0);
                            for (int i = 1; i < addres[j].length() && addres[j].charAt(i) != ')'; i++) {
                                sb.append(addres[j].charAt(i));
                            }
                            sb.append(" ");
                            hun = false;
                        }
                        if (addres[j].length() != 0 && Character.isDigit(addres[j].charAt(0))) {
                            break;
                        }
                        j++;
                    }
                    for (int i = 0; i < sb.length(); i++) {
                        if (sb.charAt(i) == ',') {
                            sb.deleteCharAt(i);
                        }
                    }

                    j = 0;
                    while (sb.charAt(j) != ' ') j++;
                    String city = sb.toString().substring(0, j);
                    String street = sb.toString().substring(j + 1, sb.length());

                    if (withCoords) c.coordinate = GeoCodeFetcher.getCoordinates(street, city, "");
                    System.out.println(city + " | " + street + "| " + c.coordinate);

                }
            } catch (IllegalFormatException ex) {
                System.out.println("Message: " + ex.getMessage());
            }

        } catch (IOException e) {
            System.out.println("Message: " + e.getMessage());
        }
        System.out.println("Loaded Obj Count: " + companies.size());
    }

    public void loadJSONFromODATA(String fileName, boolean withCoords) { //src\data.json
        System.out.printf("LOG: Loading Objects");

        StringBuilder stringBuilder = new StringBuilder();
        try {
            //= = = READ FROM URL= = =

            //String sURL = "https://oktnb132.inf.elte.hu:51010/company.xsodata/COMPANY?$top=1000&$format=json";
            URL url = new URL(fileName);
            URLConnection request = url.openConnection();
            request.connect();

            // Convert to a JSON object to print data
            JsonParser jp = new JsonParser(); //from gson

            //Convert the input stream to a json element
            JsonElement root = jp.parse(new InputStreamReader((InputStream) request.getContent()));

            //Original JSON input
            String JSONString = root.toString(); //root.toString(); //stringBuilder

            String corrected = JSONString.substring(25, JSONString.length() - 5);

            try {
                GsonBuilder builder = new GsonBuilder();
                builder.disableHtmlEscaping();
                Gson gson = builder.setPrettyPrinting().create();

                Company[] db = gson.fromJson(corrected, Company[].class);
                companies = new ArrayList<>(Arrays.asList(db));

                for (int i = 0; i < companies.size(); i++) {
                    if (companies.get(i).CIM_EGYBEN.contains("Kolozsvár") ||
                            companies.get(i).CIM_EGYBEN.contains("Ismeretlen") ||
                            companies.get(i).CIM_EGYBEN.contains("Washington")) {
                        companies.remove(companies.get(i));
                        i--;
                    }
                }

                for (Company c : companies) {
                    String[] addres = c.CIM_EGYBEN.split(" ");
                    StringBuilder sb = new StringBuilder();
                    boolean hun = true;

                    int j = 0;
                    while (Character.isDigit(addres[j].charAt(0))) {
                        j++;
                    }
                    //System.out.println(c.CIM_EGYBEN);
                    while (j < addres.length) {
                        if (addres[j].length() != 0 && addres[j].charAt(0) != '(') {
                            sb.append(addres[j] + " ");
                        } else if (addres[j].length() != 0 && addres[j].charAt(0) == '(') {
                            sb.setLength(0);
                            for (int i = 1; i < addres[j].length() && addres[j].charAt(i) != ')'; i++) {
                                sb.append(addres[j].charAt(i));
                            }
                            sb.append(" ");
                            hun = false;
                        }
                        if (addres[j].length() != 0 && Character.isDigit(addres[j].charAt(0))) {
                            break;
                        }
                        j++;
                    }
                    for (int i = 0; i < sb.length(); i++) {
                        if (sb.charAt(i) == ',') {
                            sb.deleteCharAt(i);
                        }
                    }

                    j = 0;
                    while (sb.charAt(j) != ' ') j++;
                    String city = sb.toString().substring(0, j);
                    String street = sb.toString().substring(j + 1, sb.length());

                    System.out.println("\n");
                    if (withCoords) c.coordinate = GeoCodeFetcher.getCoordinates(street, city, "");
                    System.out.println(city + " | " + street + "| " + c.coordinate);

                }
            } catch (IllegalFormatException ex) {
                System.out.println("Message: " + ex.getMessage());
            }

        } catch (IOException e) {
            System.out.println("Message: " + e.getMessage());
        }
        System.out.println("Loaded Obj Count: " + companies.size());
    }

    private void exportToFile(String outputFileName) {
        System.out.println("LOG: Exporting Objects to TXT");
        try {
            BufferedWriter bw = new BufferedWriter(new FileWriter(outputFileName));
            int i = 1;
            for (Company c : companies) {
                //System.out.print(c.TARS_ROV_NEV + "\t" + c.coordinate);
                bw.write(c.TARS_ROV_NEV + "\t" + c.coordinate);
                i++;
            }

            bw.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    void exportToJSON() {
        Gson gson = new Gson();
        ArrayList<Coordinate> coords = new ArrayList<>();
        ArrayList<Pushpin> pushpins = new ArrayList<>();
        int i = 0;
        for (Company company : companies) {
            if (!(coords.contains(company.coordinate))) {
                coords.add(company.coordinate);
                pushpins.add(new Pushpin(company.coordinate, company.TARS_ROV_NEV, company.CIM_EGYBEN));
            }
            i++;
        }

        System.out.println("Distinct: Pushpins: " + coords.size());
        try {
            BufferedWriter bw = new BufferedWriter(new FileWriter("src\\app\\frontend\\transfer.json"));
            gson.toJson(pushpins, bw);
            bw.close();
        } catch (IOException e) {
            e.printStackTrace();
        }

    }
    //http://localhost:63342/dataVisualisation/app/frontend/index.html
    void launchBrowser() {
        try {
            Desktop desktop = java.awt.Desktop.getDesktop();
            String url = new File("src\\app\\frontend\\index.html").toURI().toString();
            URI oURL = new URI(url);
            desktop.browse(oURL);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void listNames() {
        for (Company c : companies) {
            System.out.println(c.TARS_ROV_NEV + " " + c.coordinate);
        }
    }
}
